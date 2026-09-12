import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import {
  QUALITY_CHECK_SYSTEM_PROMPT,
  FACIAL_ANALYSIS_SYSTEM_PROMPT,
  ANALYSIS_JSON_SCHEMA_INSTRUCTION,
} from './src/prompts/facialAnalysisPrompt';
import { SAMPLE_ANALYSIS_DATA, getSampleAnalysisData } from './src/data/defaultAnalysis';


const app = express();
const PORT = 3000;

// Increase payload limit to support multiple base64 facial photos (up to 6 photos)
app.use(express.json({ limit: '35mb' }));
app.use(express.urlencoded({ extended: true, limit: '35mb' }));

// Lazy Gemini client helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Photo Quality Pre-check Endpoint
app.post('/api/analyze-quality', async (req, res) => {
  try {
    const { base64Data, mimeType = 'image/jpeg', tag = 'Foto', language = 'pt' } = req.body;

    if (!base64Data) {
      return res.status(400).json({
        error: language === 'en' ? 'No image provided for verification.' : 'Nenhuma imagem fornecida para verificação.',
      });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback quality response when developing without an API key configured
      if (language === 'en') {
        return res.json({
          overall: 'Boa',
          comments: [
            'Image received with good proportions and centering.',
            'Resolution is suitable for facial mapping and proportions.',
          ],
          lighting: 'Even and suitable',
          framing: 'Centered, face prominent',
          resolution: 'Sharp',
          expression: 'Natural',
          suggestions: 'Quality is sufficient for facial feature analysis.',
          canProceed: true,
          isSimulated: true,
        });
      }
      return res.json({
        overall: 'Boa',
        comments: [
          'Imagem recebida com boa proporção e enquadramento.',
          'Resolução adequada para mapeamento facial.',
        ],
        lighting: 'Adequada e uniforme',
        framing: 'Centralizado, rosto em destaque',
        resolution: 'Nítida',
        expression: 'Natural',
        suggestions: 'A qualidade é suficiente para análise das feições.',
        canProceed: true,
        isSimulated: true,
      });
    }

    const cleanBase64 = base64Data.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');

    const languageInstruction = language === 'en'
      ? 'All comments, lighting, framing, resolution, expression, and suggestions descriptions in the output JSON MUST BE IN ENGLISH.'
      : 'Todos os comentários, observações e sugestões no JSON de saída DEVEM ESTAR EM PORTUGUÊS (BRASIL).';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          {
            text: `${QUALITY_CHECK_SYSTEM_PROMPT}\n\n${languageInstruction}\n\nAnalise a qualidade desta fotografia facial identificada como: "${tag}". Retorne o JSON solicitado.`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Erro no quality check:', error);
    let details = error.message || String(error);
    try {
      const parsedDetails = JSON.parse(details);
      if (parsedDetails?.error?.message) {
        details = parsedDetails.error.message;
      }
    } catch (e) {
      // not JSON
    }
    return res.status(500).json({
      error: 'Não foi possível completar a análise de qualidade.',
      details,
    });
  }
});

// Full Facial Analysis Endpoint (Multimodal IA)
app.post('/api/analyze-face', async (req, res) => {
  try {
    const { photos, language = 'pt' } = req.body as {
      photos: Array<{
        base64Data: string;
        mimeType: string;
        tag: string;
        isFrontal?: boolean;
      }>;
      language?: 'pt' | 'en';
    };

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({
        error: language === 'en'
          ? 'At least one photo is required for facial analysis.'
          : 'Pelo menos uma fotografia é necessária para a análise.',
      });
    }

    const ai = getGeminiClient();
    if (!ai) {
      console.warn('GEMINI_API_KEY ausente. Retornando dados de referência técnica.');
      const sample = getSampleAnalysisData(language);
      return res.json({
        ...sample,
        isDevelopmentSample: true,
      });
    }

    // Build multimodal parts: attach each photo with description
    const parts: any[] = [];

    photos.forEach((photo, idx) => {
      const cleanBase64 = photo.base64Data.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: photo.mimeType || 'image/jpeg',
          data: cleanBase64,
        },
      });
      parts.push({
        text: `[PHOTO ${idx + 1} of ${photos.length}] Angle/Tag: "${photo.tag || 'Not specified'}". ${
          photo.isFrontal ? '(Primary frontal reference photo for Facial Map and measurements)' : ''
        }`,
      });
    });

    const langInstruction = language === 'en'
      ? `CRITICAL LANGUAGE DIRECTIVE:
- ALL generated text in the response MUST BE IN NATURAL, PROFESSIONAL ENGLISH.
- This includes: summary, faceShape descriptions, all scores analysis and interpretation strings, facialThirds labels, highlights array, observedParticularities, photoArtifacts, multiPhotoConsistency notes, all recommendations (skincare, eyes, hairBeard, stylePhotography, professionalPhoto), methodologyNotes, and limitations.
- Keep landmark coordinates as numeric percentages (0 to 100).`
      : `DIRETRIZ DE IDIOMA:
- Todos os campos de texto do resultado DEVEM SER EM PORTUGUÊS (BRASIL), com linguagem elegante, técnica e respeitosa.`;

    const promptText = `
${FACIAL_ANALYSIS_SYSTEM_PROMPT}

${ANALYSIS_JSON_SCHEMA_INSTRUCTION}

${langInstruction}

INSTRUÇÕES ADICIONAIS DE EXECUÇÃO:
- Foram fornecidas ${photos.length} fotografia(s) da mesma pessoa.
- Examine detalhadamente a foto frontal para calibrar os terços faciais, simetria e o Mapa Facial.
- Se houver fotos adicionais (sorrindo, perfil ou 3/4), utilize-as para validar consistência vs artefatos fotográficos no bloco "multiPhotoConsistency".
- Calcule os scores reais conforme o que é visível. Cada score DEVE possuir uma análise textual correspondente.
- Assegure-se de estimar as porcentagens em 'landmarks' (0 a 100) relativas à foto frontal.
- Respeite escrupulosamente os princípios éticos: não dê diagnósticos médicos, não rotule ninguém como bonito ou feio, foque em proporções geométricas, equilíbrio visual e características observáveis.
- Retorne EXCLUSIVAMENTE o objeto JSON válido, sem texto adicional antes ou depois.
`;

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawJsonText = response.text || '';
    let parsedResult;
    try {
      parsedResult = JSON.parse(rawJsonText);
    } catch (parseErr) {
      console.error('Falha no parse do JSON da Gemini:', parseErr, rawJsonText);
      // Try extracting json block if enclosed
      const match = rawJsonText.match(/\{[\s\S]*\}/);
      if (match) {
        parsedResult = JSON.parse(match[0]);
      } else {
        throw new Error('Formato de resposta inválido do modelo.');
      }
    }

    return res.json(parsedResult);
  } catch (error: any) {
    console.error('Erro na análise facial:', error);
    let details = error.message || String(error);
    try {
      const parsedDetails = JSON.parse(details);
      if (parsedDetails?.error?.message) {
        details = parsedDetails.error.message;
      }
    } catch (e) {
      // not JSON
    }
    return res.status(500).json({
      error: 'Não foi possível completar a análise facial no momento.',
      details,
    });
  }
});

// Vite / Static setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de Análise Facial rodando na porta ${PORT}`);
  });
}

startServer();
