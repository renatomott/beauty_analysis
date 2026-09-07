import { FacialAnalysisResult } from '../types';

export const SAMPLE_ANALYSIS_DATA: FacialAnalysisResult = {
  analysisVersion: "1.0",
  overallScore: 8.8,
  analysisConfidence: 92,

  photoQuality: {
    overall: "Excelente",
    comments: [
      "Enquadramento frontal com excelente iluminação e foco nítido.",
      "Rosto integralmente visível, sem oclusões ou sombras pesadas.",
      "Expressão com sorriso expansivo que permite avaliar a linha do sorriso e dentição."
    ]
  },

  summary: "Seu rosto apresenta traços harmoniosos, expressivos e marcantes, com notável equilíbrio entre os elementos. O sorriso é um dos seus pontos mais fortes, juntamente com a definição mandibular, sobrancelhas bem estruturadas e olhar confiante. No conjunto, transmite credibilidade, autenticidade e empatia — atributos perceptuais que valorizam fortemente a sua presença visual.",

  faceShape: {
    primary: "Oval",
    secondary: "tendência a retangular",
    confidence: "Alta",
    description: "Estrutura craniofacial equilibrada, com proporção vertical harmoniosa e mandíbula com linhas bem definidas que conferem solidez à composição."
  },

  skinTypeObserved: "Mista (tendência a levemente oleosa na zona T)",

  subScores: {
    harmony: 8.9,
    symmetry: 8.6,
    eyes: 8.7,
    contour: 8.8,
    skin: 8.4
  },

  scores: {
    harmony: {
      score: 8.9,
      confidence: "Alta",
      analysis: "Transição suave e proporcional entre os terços faciais, com coerência visual entre largura das têmporas, maçãs do rosto e ângulo mandibular.",
      interpretation: "Excelente senso de coesão espacial e equilíbrio entre as feições centrais e o contorno."
    },
    symmetry: {
      score: 8.6,
      confidence: "Alta",
      analysis: "Boa correspondência bilateral entre os lados esquerdo e direito, com pequenas assimetrias naturais comuns em anatomias humanas saudáveis.",
      interpretation: "A assimetria observada é sutil e confere naturalidade e dinamismo à fisionomia."
    },
    proportions: {
      score: 8.8,
      confidence: "Alta",
      analysis: "Relações faciais equilibradas entre os terços superior, médio e inferior, respeitando a regra clássica de proporcionalidade áurea.",
      interpretation: "Distribuição vertical das massas faciais muito bem calibrada."
    },
    facialThirds: {
      score: 8.8,
      confidence: "Alta",
      analysis: "Terço superior (testa) amplo e desobstruído; terço médio (glabela à base nasal) proporcional; terço inferior (lábios e mento) com boa projeção durante o sorriso.",
      interpretation: "Equilíbrio notável nas três faixas estruturais."
    },
    horizontalBalance: {
      score: 8.7,
      confidence: "Alta",
      analysis: "Divisão em quintos horizontais adequada: a distância intercantal (entre os olhos) corresponde aproximadamente à largura da base alar nasal.",
      interpretation: "Conformidade visual harmoniosa com os cânones de proporção ocular e nasal."
    },
    eyes: {
      score: 8.7,
      confidence: "Alta",
      analysis: "Olhar expressivo, bem posicionado horizontalmente e com eixos canthais levemente ascendentes, transmitindo vivacidade.",
      interpretation: "Presença ocular cativante e de boa densidade ciliar."
    },
    eyebrows: {
      score: 8.9,
      confidence: "Alta",
      analysis: "Sobrancelhas densas, bem delineadas, com arco moderado e boa simetria postural em relação aos arcos supraciliares.",
      interpretation: "Emolduram com precisão a região frontal e conferem autoridade visual serena."
    },
    nose: {
      score: 8.6,
      confidence: "Alta",
      analysis: "Dorso retilíneo, base nasal centralizada na linha média e largura das asas nasais coerente com o diâmetro da distância interocular.",
      interpretation: "Traço central neutro e integrado com facilidade ao restante da composição."
    },
    lips: {
      score: 9.1,
      confidence: "Alta",
      analysis: "Sorriso amplo e simétrico, com excelente arco do sorriso e boa exposição dentária sem exposição gengival excessiva.",
      interpretation: "Um dos grandes destaques do rosto, irradiando receptividade e magnetismo interpessoal."
    },
    smile: {
      score: 9.1,
      confidence: "Alta",
      analysis: "Curvatura do lábio inferior acompanha a linha dos dentes incisivos superiores com alinhamento preciso.",
      interpretation: "Corredores bucais equilibrados e contração simétrica dos músculos zigomáticos."
    },
    jawline: {
      score: 8.8,
      confidence: "Alta",
      analysis: "Mandíbula estruturada e queixo bem definido, reforçados por corte de barba alinhado que demarca o ângulo goniaco.",
      interpretation: "Linha de mandíbula forte e contemporânea, definindo a base do rosto com nitidez."
    },
    chin: {
      score: 8.7,
      confidence: "Alta",
      analysis: "Mento com projeção anterior equilibrada, alinhado ao plano facial de Ricketts em relação ao nariz e lábios.",
      interpretation: "Excelente finalização do terço inferior, sem retrognatismo ou prognatismo aparente."
    },
    skin: {
      score: 8.4,
      confidence: "Média",
      analysis: "Textura uniforme na maior parte das áreas visíveis, com boa viçosidade geral e linhas de expressão naturais ao redor dos olhos e boca.",
      interpretation: "Aspecto saudável e com luminosidade natural na região malar."
    },
    hair: {
      score: 8.7,
      confidence: "Alta",
      analysis: "Volume e densidade capilar bem distribuídos, com corte que preserva o contorno superior e respeita a silhueta craniana.",
      interpretation: "Harmoniza com a largura das têmporas e a linha do queixo."
    },
    beard: {
      score: 8.8,
      confidence: "Alta",
      analysis: "Barba aparada e desenhada de forma a valorizar a linha da mandíbula e conectar o mento às têmporas com elegância.",
      interpretation: "Enfatiza o contorno angular com sofisticação."
    },
    expressiveness: {
      score: 9.0,
      confidence: "Alta",
      analysis: "Alta expressividade periorbital e zigomática durante o sorriso, transmitindo confiança sem rigidez.",
      interpretation: "Comunicação não verbal aberta e magnética."
    },
    photographicPresence: {
      score: 8.9,
      confidence: "Alta",
      analysis: "Contato visual direto com o sensor da câmera, postura frontal confiante e sem tensão cervical perceptível.",
      interpretation: "Presença de destaque indicada para materiais de liderança e comunicação corporativa."
    }
  },

  landmarks: {
    faceCenterLineX: 50,
    eyeLineY: 44,
    eyebrowLineY: 37,
    noseBaseY: 59,
    mouthLineY: 72,
    chinBottomY: 89,
    trichionY: 18,
    headTiltAngleDegrees: -2.4,
    pupilLeft: { x: 38, y: 45.1 },
    pupilRight: { x: 62, y: 43.1 },
    thirds: {
      upperRatio: 33,
      middleRatio: 34,
      lowerRatio: 33
    },
    callouts: [
      { label: "Cabelo com bom volume e proporção", position: "top-left", x: 30, y: 16 },
      { label: "Sobrancelhas densas e bem desenhadas", position: "mid-left", x: 32, y: 36 },
      { label: "Olhar expressivo e simétrico", position: "mid-left", x: 28, y: 46 },
      { label: "Boa definição de mandíbula", position: "bottom-left", x: 28, y: 76 },
      { label: "Proporções equilibradas entre os terços", position: "top-right", x: 70, y: 18 },
      { label: "Nariz central e proporcional", position: "mid-right", x: 72, y: 56 },
      { label: "Sorriso amplo e harmonioso", position: "bottom-right", x: 72, y: 74 }
    ]
  },

  highlights: [
    "Sorriso marcante e expressivo",
    "Boa definição de mandíbula",
    "Sobrancelhas fortes e bem desenhadas",
    "Olhar confiante e simétrico",
    "Proporções faciais equilibradas",
    "Traços marcantes e harmônicos",
    "Transmite simpatia, credibilidade e autenticidade",
    "Cabelo com bom volume e estilo",
    "Boa harmonia geral entre os elementos"
  ],

  observedParticularities: [
    "Pequenas assimetrias naturais entre os olhos (esperadas em anatomias humanas reais).",
    "Discreta diferença de elevação do arco na sobrancelha esquerda.",
    "Linhas de expressão dinâmicas mais visíveis na contração periorbital do sorriso.",
    "Avaliação da textura profunda da pele pode ser influenciada pela luz difusa da foto.",
    "O terço superior apresenta boa amplitude em relação à largura zigomática."
  ],

  photoArtifacts: [
    "Leve aproximação da lente pode aumentar sutilmente a proeminência central em fotos muito fechadas.",
    "Iluminação superior suave cria sombreamento leve sob o queixo."
  ],

  multiPhotoConsistency: {
    level: "Alta",
    consistentTraits: [
      "Definição mandibular estruturada e consistente",
      "Alinhamento dos arcos de sobrancelha",
      "Amplitude e arco do sorriso",
      "Proporção entre terços faciais"
    ],
    photoArtifacts: [
      "Variações sutis de sombra lateral",
      "Diferença entre sorriso dinâmico e expressão neutra"
    ],
    notes: "Consistência postural e angular muito alta entre os registros visuais."
  },

  recommendations: {
    skincare: [
      "Limpeza facial suave pela manhã e à noite com gel syndet neutro.",
      "Hidratação com textura leve em sérum ou gel, equilibrando a zona T.",
      "Uso diário indispensável de protetor solar de amplo espectro (FPS 30 ou superior).",
      "Controle suave de brilho na testa e nariz com loções matificantes leves.",
      "Consulta dermatológica periódica para avaliação preventiva e personalizada."
    ],
    eyes: [
      "Manter rotina regular de sono para prevenir congestão vascular periorbital.",
      "Hidratação e massagem suave periocular para manter a elasticidade.",
      "Uso de óculos de sol com lentes UV400 para evitar contração involuntária das sobrancelhas.",
      "Se desejar, produtos antioxidantes específicos com cafeína ou vitamina C sob orientação profissional."
    ],
    hairBeard: [
      "O corte de cabelo atual valoriza a proporção do formato facial.",
      "Manter a barba desenhada e alinhada ao comprimento da linha mandibular.",
      "Laterais levemente mais baixas com volume moderado no topo harmonizam com o formato retangular/oval.",
      "Óleo ou balm para barba para hidratação dos fios e aspecto impecável."
    ],
    stylePhotography: [
      "Paleta de cores que realça o contraste: tons de azul marinho, cinza grafite, verde oliva e preto.",
      "Camisas de gola estruturada ou decotes sutis que valorizam a linha dos ombros.",
      "Estilo sofisticado e minimalista reforça a credibilidade e presença executiva."
    ],
    professionalPhoto: {
      "bestAngle": "Frontal ou com leve rotação de 5° a 10°, mantendo o olhar diretamente conectado à lente.",
      "smileAmount": "Sorriso acolhedor com exposição dentária moderada ou sorriso contido sereno.",
      "framing": "Enquadramento em plano médio curto (busto ao peito), com proporção áurea de respiro superior.",
      "lighting": "Luz difusa a 45 graus (luz Rembrandt ou Butterfly suave) para realçar a linha do maxilar sem sombras duras.",
      "background": "Cenário arquitetônico desfocado ou fundo neutro em cinza quente ou off-white.",
      "clothingHair": "Blazer estruturado com camiseta ou camisa social sem gravata para equilíbrio entre autoridade e acessibilidade.",
      "linkedinAdvice": "Postura frontal confiante, ombros alinhados, olhar direto à câmera para autoridade e empatia comercial.",
      "instagramAdvice": "Iluminação dourada de fim de tarde, ambiente leve e sorriso espontâneo que reforce autenticidade pessoal.",
      "whatsappAdvice": "Corte focado no rosto para garantir clareza e reconhecimento imediato no avatar circular.",
      "corporateAdvice": "Iluminação profissional com iluminação de recorte suave no topo da cabeça para destaque do fundo."
    }
  },

  methodologyNotes: [
    "A análise é realizada através de algoritmos de visão computacional multimodal que mapeiam vetores biométricos geométricos nas fotos enviadas.",
    "Os cálculos ponderam alinhamento interpupilar, proporção áurea facial de terços e quintos, curvatura do arco do sorriso e contorno mandibular.",
    "A beleza é uma experiência humana complexa e subjetiva, atravessada por contexto sociocultural, carisma e individualidade. Este sistema calcula um índice de proporcionalidade geométrica e visual, e NÃO uma medida absoluta ou médica."
  ],

  limitations: [
    "Fotografias comuns em 2D podem sofrer compressão de perspectiva pela distância focal da câmera de smartphones.",
    "Expressões ativas, iluminação não uniforme e rotações de cabeça influenciam as medições visuais.",
    "Os resultados têm finalidade de autoconhecimento estético e orientação de imagem pessoal, sem valor de diagnóstico dermatológico ou cirúrgico."
  ]
};

export const SAMPLE_ANALYSIS_DATA_EN: FacialAnalysisResult = {
  analysisVersion: "1.0",
  overallScore: 8.8,
  analysisConfidence: 92,

  photoQuality: {
    overall: "Excelente",
    comments: [
      "Frontal framing with excellent lighting and sharp focus.",
      "Face fully visible without occlusions or harsh shadows.",
      "Expressive smile allowing assessment of smile line and dental arch."
    ]
  },

  summary: "Your face exhibits balanced, expressive, and distinct traits with remarkable harmony among features. The smile is one of your strongest assets, alongside clean jawline definition, well-structured eyebrows, and confident gaze. Overall, it projects credibility, authenticity, and empathy — perceptual qualities that significantly elevate your visual presence.",

  faceShape: {
    primary: "Oval",
    secondary: "trending rectangular",
    confidence: "High",
    description: "Harmonious craniofacial structure with balanced vertical proportion and defined jaw contours conferring visual solidity to the composition."
  },

  skinTypeObserved: "Combination (slightly oily tendency in T-zone)",

  subScores: {
    harmony: 8.9,
    symmetry: 8.6,
    eyes: 8.7,
    contour: 8.8,
    skin: 8.4
  },

  scores: {
    harmony: {
      score: 8.9,
      confidence: "High",
      analysis: "Smooth and proportional transition across facial thirds, with visual coherence between temple width, cheekbones, and mandibular angle.",
      interpretation: "Exceptional sense of spatial cohesion and balance between central features and contour."
    },
    symmetry: {
      score: 8.6,
      confidence: "High",
      analysis: "Strong bilateral correspondence between left and right sides, with natural minor asymmetries typical of healthy human anatomy.",
      interpretation: "Observed asymmetry is subtle, imparting natural dynamism and character to the visage."
    },
    proportions: {
      score: 8.8,
      confidence: "High",
      analysis: "Balanced facial ratios between upper, middle, and lower thirds, adhering closely to classical golden ratio principles.",
      interpretation: "Well-calibrated vertical distribution of facial masses."
    },
    facialThirds: {
      score: 8.8,
      confidence: "High",
      analysis: "Upper third (forehead) open and clean; middle third (glabella to subnasale) balanced; lower third (lips and chin) displaying strong projection.",
      interpretation: "Remarkable equilibrium across all three structural tiers."
    },
    horizontalBalance: {
      score: 8.7,
      confidence: "High",
      analysis: "Proper division into horizontal fifths: intercanthal distance closely matches alar base width.",
      interpretation: "Harmonious compliance with classical eye and nasal proportion canons."
    },
    eyes: {
      score: 8.7,
      confidence: "High",
      analysis: "Expressive gaze, well-positioned horizontally with subtly ascending canthal tilt, conveying liveliness.",
      interpretation: "Captivating ocular presence with healthy lash density."
    },
    eyebrows: {
      score: 8.9,
      confidence: "High",
      analysis: "Dense, well-shaped eyebrows with moderate arch and solid postural symmetry relative to supraorbital ridges.",
      interpretation: "Accurately frame the frontal area and deliver a serene sense of visual authority."
    },
    nose: {
      score: 8.6,
      confidence: "High",
      analysis: "Straight dorsum with proportional alar base width aligned with inner eye corners.",
      interpretation: "Balanced nasal structure integrating naturally into facial center."
    },
    lips: {
      score: 9.1,
      confidence: "High",
      analysis: "Expansive and harmonic smile with balanced curvature and well-defined Cupid's bow.",
      interpretation: "Primary focal highlight of the face, transmitting friendliness and interpersonal charisma."
    },
    smile: {
      score: 9.1,
      confidence: "High",
      analysis: "Lower lip curvature follows maxillary incisor line with precise alignment.",
      interpretation: "Equilibrated buccal corridors and symmetrical zygomatic muscle contraction."
    },
    jawline: {
      score: 8.8,
      confidence: "High",
      analysis: "Structured jawline with clean gonial angle and harmonious chin projection reinforced by groomed beard outline.",
      interpretation: "Strong contemporary mandibular contour defining lower facial frame with authority."
    },
    chin: {
      score: 8.7,
      confidence: "High",
      analysis: "Harmonious anterior chin projection aligned along Rickett's aesthetic plane relative to nose and lips.",
      interpretation: "Excellent lower third culmination without apparent microgenia or prognathism."
    },
    skin: {
      score: 8.4,
      confidence: "Medium",
      analysis: "Healthy skin tone with uniform pigmentation and natural vitality, presenting subtle T-zone reflection under flash.",
      interpretation: "Fresh, healthy dermal presentation responsive to basic hydration."
    },
    hair: {
      score: 8.7,
      confidence: "High",
      analysis: "Well-distributed hair density with a cut preserving top contour and respecting cranial silhouette.",
      interpretation: "Harmonizes with temple breadth and jawline angles."
    },
    beard: {
      score: 8.8,
      confidence: "High",
      analysis: "Neatly trimmed beard designed to enhance jawline and connect chin to temples with sophistication.",
      interpretation: "Emphasizes angular facial contours with refined presence."
    },
    expressiveness: {
      score: 9.0,
      confidence: "High",
      analysis: "Dynamic micro-expressions radiating confidence, approachable charm, and engagement.",
      interpretation: "High perceptual charisma reinforcing personal presence."
    },
    photographicPresence: {
      score: 8.9,
      confidence: "High",
      analysis: "Direct optical eye-contact with camera sensor, relaxed posture, and natural engagement.",
      interpretation: "Outstanding presence recommended for executive and leadership communication."
    }
  },

  landmarks: {
    faceCenterLineX: 50,
    eyeLineY: 44,
    eyebrowLineY: 37,
    noseBaseY: 59,
    mouthLineY: 72,
    chinBottomY: 89,
    trichionY: 18,
    headTiltAngleDegrees: -2.4,
    pupilLeft: { x: 38, y: 45.1 },
    pupilRight: { x: 62, y: 43.1 },
    thirds: {
      upperRatio: 33,
      middleRatio: 34,
      lowerRatio: 33
    },
    callouts: [
      { label: "Hair with balanced volume and proportion", position: "top-left", x: 30, y: 16 },
      { label: "Dense, well-shaped eyebrows", position: "mid-left", x: 32, y: 36 },
      { label: "Expressive and symmetrical gaze", position: "mid-left", x: 28, y: 46 },
      { label: "Strong jawline definition", position: "bottom-left", x: 28, y: 76 },
      { label: "Balanced proportions across thirds", position: "top-right", x: 70, y: 18 },
      { label: "Centered, proportional nasal bridge", position: "mid-right", x: 72, y: 56 },
      { label: "Expansive and harmonic smile", position: "bottom-right", x: 72, y: 74 }
    ]
  },

  highlights: [
    "Expansive and magnetic smile, representing the primary aesthetic focal point.",
    "Proportional balance between vertical facial thirds (33% / 34% / 33%).",
    "Structured mandibular contour giving definition to the lower facial frame.",
    "Dense, well-delineated eyebrows providing masculine and serene framing.",
    "Positive canthal tilt conveying focus, vitality, and alertness.",
    "Bilateral symmetry within optimal parameters of natural human harmony."
  ],

  observedParticularities: [
    "Slight anatomical deviation between left and right jaw corners, conferring personal character.",
    "Dynamic expression lines more evident around periorbital smile contraction.",
    "Deep dermal texture assessment partially influenced by diffuse photographic lighting.",
    "Forehead presents generous width relative to zygomatic breadth."
  ],

  photoArtifacts: [
    "Close focal distance may subtly exaggerate central features in close-ups.",
    "Soft overhead lighting casts a gentle shade beneath the chin."
  ],

  multiPhotoConsistency: {
    level: "High",
    consistentTraits: [
      "Structured and consistent jawline definition",
      "Alignment of eyebrow arches",
      "Amplitude and curve of smile",
      "Proportion across facial thirds"
    ],
    photoArtifacts: [
      "Subtle side-lighting variations",
      "Difference between dynamic smile and neutral rest"
    ],
    notes: "High postural and angular consistency across visual records."
  },

  recommendations: {
    skincare: [
      "Gentle facial cleansing morning and night with neutral syndet cleanser.",
      "Lightweight hydration serum or gel, balancing T-zone hydration.",
      "Daily broad-spectrum sunscreen application (SPF 30+).",
      "Gentle shine control on forehead and nose using lightweight mattifying lotion.",
      "Periodic dermatological checkups for tailored preventative care."
    ],
    eyes: [
      "Maintain consistent sleep schedule to prevent periorbital vascular congestion.",
      "Gentle periocular hydration and light massage to support tissue elasticity.",
      "UV400 sunglasses outdoors to minimize involuntary squinting.",
      "Targeted antioxidant eye serums with caffeine or vitamin C if desired."
    ],
    hairBeard: [
      "Current haircut flatters the proportions of your facial shape.",
      "Keep beard neatly trimmed and aligned with your jawline.",
      "Slightly tapered sides with moderate top volume harmonize with oval/rectangular structure.",
      "Nourishing beard oil or balm for softened texture and clean finish."
    ],
    stylePhotography: [
      "Flattering contrast palette: navy blue, charcoal gray, olive green, and crisp black.",
      "Structured collar shirts or clean crew necks that accentuate the shoulder line.",
      "Sleek minimalist styling reinforces executive presence and credibility."
    ],
    professionalPhoto: {
      "bestAngle": "Frontal or slight 5° to 10° angle, keeping eyes directly engaged with the lens.",
      "smileAmount": "Approachable warm smile with moderate tooth display or serene rested smile.",
      "framing": "Short medium portrait (chest up) with classical upper headroom.",
      "lighting": "Soft 45-degree diffused lighting (Rembrandt or soft Butterfly) highlighting the jawline.",
      "background": "Softly blurred architectural backdrop or warm gray / off-white neutral wall.",
      "clothingHair": "Structured blazer with t-shirt or dress shirt for balanced authority and warmth.",
      "linkedinAdvice": "Confident frontal posture, leveled shoulders, direct gaze for authority and warmth.",
      "instagramAdvice": "Warm afternoon golden-hour light, relaxed setting with spontaneous smile.",
      "whatsappAdvice": "Close crop on face to ensure instant clarity and recognition in small circular avatar.",
      "corporateAdvice": "Professional lighting with subtle rim light on hair to separate cleanly from backdrop."
    }
  },

  methodologyNotes: [
    "Analysis performed via multimodal computer vision algorithms mapping geometric biometric vectors from submitted photos.",
    "Computations weigh interpupillary alignment, classical facial thirds and fifths, smile arc curvature, and jaw contour.",
    "Human beauty is multifaceted and deeply subjective, shaped by culture, charm, and individuality. This tool calculates a geometric proportionality index, NOT an absolute or medical verdict."
  ],

  limitations: [
    "Standard 2D smartphone photos can exhibit perspective distortion depending on focal length.",
    "Active facial expressions, uneven lighting, and head tilts influence measurements.",
    "Results serve visual self-awareness and styling guidance, without medical or dermatological diagnostic validity."
  ]
};

export function getSampleAnalysisData(lang: 'pt' | 'en'): FacialAnalysisResult {
  return lang === 'en' ? SAMPLE_ANALYSIS_DATA_EN : SAMPLE_ANALYSIS_DATA;
}
