import { PhotoQualityFeedback, FacialAnalysisResult, PhotoSlot } from '../types';

export async function requestQualityCheck(
  photo: PhotoSlot,
  language: 'pt' | 'en' = 'pt'
): Promise<PhotoQualityFeedback> {
  try {
    const response = await fetch('/api/analyze-quality', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64Data: photo.base64Data,
        mimeType: photo.mimeType,
        tag: photo.tag,
        language,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let errJson: any = {};
      try {
        errJson = JSON.parse(errText);
      } catch (e) {
        // Not JSON
      }
      throw new Error(errJson.error || errJson.details || errText || `Erro HTTP ${response.status}`);
    }

    const data = await response.json();
    return data as PhotoQualityFeedback;
  } catch (error: any) {
    console.error('Falha ao verificar qualidade:', error);
    throw error;
  }
}

export async function requestFacialAnalysis(
  photos: PhotoSlot[],
  onProgress?: (stepText: string, percent: number) => void,
  language: 'pt' | 'en' = 'pt'
): Promise<FacialAnalysisResult> {
  const stepsPt = [
    { text: 'Verificando qualidade e enquadramento...', percent: 15 },
    { text: 'Calculando alinhamentos e simetria interpupilar...', percent: 35 },
    { text: 'Avaliando divisões proporcionais e terços faciais...', percent: 55 },
    { text: 'Comparando traços e consistência entre fotos...', percent: 75 },
    { text: 'Consolidando métricas e estruturando relatório...', percent: 90 },
  ];

  const stepsEn = [
    { text: 'Verifying photo quality and framing...', percent: 15 },
    { text: 'Calculating alignment and interpupillary symmetry...', percent: 35 },
    { text: 'Evaluating classical divisions and facial thirds...', percent: 55 },
    { text: 'Comparing traits and cross-photo consistency...', percent: 75 },
    { text: 'Consolidating metrics and structuring editorial dossier...', percent: 90 },
  ];

  const steps = language === 'en' ? stepsEn : stepsPt;

  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      onProgress?.(steps[currentStep].text, steps[currentStep].percent);
      currentStep++;
    }
  }, 1200);

  try {
    const payloadPhotos = photos.map((p) => ({
      base64Data: p.base64Data,
      mimeType: p.mimeType,
      tag: p.tag,
      isFrontal: p.isFrontal ?? (p.tag === 'Frontal neutra' || p.tag === 'Frontal sorrindo' || p.tag.includes('Frontal')),
    }));

    const response = await fetch('/api/analyze-face', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ photos: payloadPhotos, language }),
    });

    clearInterval(interval);
    onProgress?.(language === 'en' ? 'Finalizing editorial dossier...' : 'Finalizando relatório editorial...', 98);

    if (!response.ok) {
      const errText = await response.text();
      let errJson: any = {};
      try {
        errJson = JSON.parse(errText);
      } catch (e) {
        // Not JSON
      }
      throw new Error(errJson.error || errJson.details || errText || `Erro HTTP ${response.status}`);
    }

    const data: FacialAnalysisResult = await response.json();
    return data;
  } catch (error) {
    clearInterval(interval);
    throw error;
  }
}
