export type QualityRating = 'Excelente' | 'Boa' | 'Aceitável' | 'Insuficiente' | 'Excellent' | 'Good' | 'Acceptable' | 'Poor';
export type ConfidenceLevel = 'Alta' | 'Média' | 'Baixa' | 'High' | 'Medium' | 'Low';

export interface PhotoSlot {
  id: string;
  file?: File;
  previewUrl?: string;
  base64Data?: string;
  mimeType?: string;
  tag: 'Frontal neutra' | 'Frontal sorrindo' | 'Perfil esquerdo' | 'Perfil direito' | '3/4 esquerdo' | '3/4 direito' | 'Outra';
  isFrontal?: boolean;
}

export interface DimensionScore {
  score: number; // 0.0 to 10.0
  confidence: ConfidenceLevel;
  analysis: string; // O que foi observado
  interpretation?: string; // Pequena interpretação estética / proporcional
  notEvaluable?: boolean;
}

export interface PhotoQualityFeedback {
  overall: QualityRating;
  comments: string[];
  lighting: string;
  framing: string;
  resolution: string;
  expression: string;
  suggestions?: string;
  canProceed: boolean;
}

export interface FaceShapeInfo {
  primary: string; // Oval, Redondo, Quadrado, Retangular, Alongado, Coração, Diamante, Triangular
  secondary?: string;
  confidence: ConfidenceLevel;
  description: string;
}

export interface FacialCallout {
  label: string;
  position: 'top-left' | 'mid-left' | 'bottom-left' | 'top-right' | 'mid-right' | 'bottom-right';
  x: number; // 0-100%
  y: number; // 0-100%
}

export interface FacialLandmarksGuide {
  faceCenterLineX: number; // 0-100%
  eyeLineY: number; // 0-100%
  eyebrowLineY: number; // 0-100%
  noseBaseY: number; // 0-100%
  mouthLineY: number; // 0-100%
  chinBottomY: number; // 0-100%
  trichionY: number; // hairline approx
  headTiltAngleDegrees?: number; // Tilt of bipupilar line in degrees (positive = clockwise, negative = counter-clockwise)
  pupilLeft?: { x: number; y: number };
  pupilRight?: { x: number; y: number };
  thirds: {
    upperRatio: number;
    middleRatio: number;
    lowerRatio: number;
  };
  callouts: FacialCallout[];
}

export interface MultiPhotoConsistency {
  level: ConfidenceLevel;
  consistentTraits: string[];
  photoArtifacts: string[];
  notes: string;
}

export type MultiPhotoConsistencyInfo = MultiPhotoConsistency;

export interface ProfessionalPhotoAdvice {
  bestAngle: string;
  smileAmount: string;
  framing: string;
  lighting: string;
  background: string;
  clothingHair: string;
  linkedinAdvice: string;
  instagramAdvice: string;
  whatsappAdvice: string;
  corporateAdvice: string;
}

export interface FacialAnalysisResult {
  analysisVersion: string;
  overallScore: number;
  analysisConfidence: number; // 0-100%

  photoQuality: {
    overall: QualityRating;
    comments: string[];
  };

  summary: string;

  faceShape: FaceShapeInfo;

  skinTypeObserved?: string; // e.g. "Mista (tendência a levemente oleosa na zona T)"

  subScores: {
    harmony: number;
    symmetry: number;
    eyes: number;
    contour: number;
    skin: number;
  };

  scores: {
    harmony: DimensionScore;
    symmetry: DimensionScore;
    proportions: DimensionScore;
    facialThirds: DimensionScore;
    horizontalBalance: DimensionScore;
    eyes: DimensionScore;
    eyebrows: DimensionScore;
    nose: DimensionScore;
    lips: DimensionScore;
    smile: DimensionScore;
    jawline: DimensionScore;
    chin: DimensionScore;
    skin: DimensionScore;
    hair: DimensionScore;
    beard: DimensionScore;
    expressiveness: DimensionScore;
    photographicPresence: DimensionScore;
  };

  landmarks?: FacialLandmarksGuide;

  highlights: string[];
  observedParticularities: string[];
  photoArtifacts: string[];

  multiPhotoConsistency?: MultiPhotoConsistency;

  recommendations: {
    skincare: string[];
    eyes: string[];
    hairBeard: string[];
    stylePhotography: string[];
    professionalPhoto: ProfessionalPhotoAdvice;
  };

  methodologyNotes: string[];
  limitations: string[];
  isDevelopmentSample?: boolean;
}

export const SCORE_WEIGHTS = {
  harmonyAndProportions: 0.25, // Harmonia e proporções
  apparentSymmetry: 0.20,      // Simetria aparente
  eyesAndEyebrows: 0.15,       // Olhos e sobrancelhas
  nose: 0.10,                  // Nariz
  smileAndLips: 0.10,          // Sorriso e região labial
  jawlineAndChin: 0.10,        // Contorno facial / mandíbula / queixo
  expressivenessAndPresence: 0.10, // Expressividade e presença visual
};
