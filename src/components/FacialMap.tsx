import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Layers,
  MapPin,
} from 'lucide-react';
import { FacialLandmarksGuide, FaceShapeInfo } from '../types';
import { useApp } from '../context/ThemeLanguageContext';

interface FacialMapProps {
  photoUrl: string;
  originalPhotoUrl?: string;
  landmarks?: FacialLandmarksGuide;
  faceShape: FaceShapeInfo;
  skinTypeObserved?: string;
}

export const FacialMap: React.FC<FacialMapProps> = ({
  photoUrl,
  originalPhotoUrl,
  landmarks,
  faceShape,
  skinTypeObserved,
}) => {
  const { t, language, theme } = useApp();
  const [viewMode, setViewMode] = useState<'stylized' | 'original'>('stylized');
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [showThirds, setShowThirds] = useState(true);
  const [showCallouts, setShowCallouts] = useState(true);

  // Default calibrated percentage landmarks if model returned partial
  const centerX = landmarks?.faceCenterLineX ?? 50;
  const eyeY = landmarks?.eyeLineY ?? 44;
  const eyebrowY = landmarks?.eyebrowLineY ?? 37;
  const noseY = landmarks?.noseBaseY ?? 59;
  const mouthY = landmarks?.mouthLineY ?? 72;
  const chinY = landmarks?.chinBottomY ?? 89;
  const trichionY = landmarks?.trichionY ?? 18;

  const defaultCallouts = language === 'en' ? [
    { label: 'Harmonious hairline and volume', position: 'top-left', x: 26, y: 16 },
    { label: 'Well-defined dense eyebrow arch', position: 'mid-left', x: 28, y: 36 },
    { label: 'Expressive and symmetrical gaze', position: 'mid-left', x: 24, y: 46 },
    { label: 'Defined mandibular gonial angle', position: 'bottom-left', x: 26, y: 76 },
    { label: 'Balanced vertical facial thirds', position: 'top-right', x: 74, y: 18 },
    { label: 'Proportional central nasal bridge', position: 'mid-right', x: 76, y: 56 },
    { label: 'Harmonious smile curve alignment', position: 'bottom-right', x: 74, y: 74 },
  ] : [
    { label: 'Cabelo com bom volume e proporção', position: 'top-left', x: 26, y: 16 },
    { label: 'Sobrancelhas densas e bem desenhadas', position: 'mid-left', x: 28, y: 36 },
    { label: 'Olhar expressivo e simétrico', position: 'mid-left', x: 24, y: 46 },
    { label: 'Boa definição de mandíbula', position: 'bottom-left', x: 26, y: 76 },
    { label: 'Proporções equilibradas entre os terços', position: 'top-right', x: 74, y: 18 },
    { label: 'Nariz central e proporcional', position: 'mid-right', x: 76, y: 56 },
    { label: 'Sorriso amplo e harmonioso', position: 'bottom-right', x: 74, y: 74 },
  ];

  const callouts = landmarks?.callouts || defaultCallouts;
  const lineColor = theme === 'dark' ? '#ECEAE5' : '#1A1A1A';

  // Helper to render geometric shape outline
  const renderShapeIcon = (primaryShape: string) => {
    const shapeLower = primaryShape.toLowerCase();
    if (shapeLower.includes('redondo') || shapeLower.includes('round')) {
      return (
        <div className="h-14 w-14 rounded-full border-2 border-[#1A1A1A] bg-[#1A1A1A]/5 dark:border-[#ECEAE5] dark:bg-[#ECEAE5]/10" />
      );
    }
    if (shapeLower.includes('quadrado') || shapeLower.includes('square')) {
      return (
        <div className="h-14 w-14 rounded-md border-2 border-[#1A1A1A] bg-[#1A1A1A]/5 dark:border-[#ECEAE5] dark:bg-[#ECEAE5]/10" />
      );
    }
    if (shapeLower.includes('retangular') || shapeLower.includes('alongado') || shapeLower.includes('oblong') || shapeLower.includes('rectangular')) {
      return (
        <div className="h-16 w-12 rounded-lg border-2 border-[#1A1A1A] bg-[#1A1A1A]/5 dark:border-[#ECEAE5] dark:bg-[#ECEAE5]/10" />
      );
    }
    if (shapeLower.includes('coração') || shapeLower.includes('triangular') || shapeLower.includes('heart')) {
      return (
        <div className="h-14 w-12 border-2 border-[#1A1A1A] bg-[#1A1A1A]/5 dark:border-[#ECEAE5] dark:bg-[#ECEAE5]/10 [clip-path:polygon(50%_100%,0_0,100%_0)]" />
      );
    }
    if (shapeLower.includes('diamante') || shapeLower.includes('diamond')) {
      return (
        <div className="h-14 w-12 border-2 border-[#1A1A1A] bg-[#1A1A1A]/5 dark:border-[#ECEAE5] dark:bg-[#ECEAE5]/10 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]" />
      );
    }
    // Default Oval
    return (
      <div className="h-16 w-12 rounded-[50%] border-2 border-[#1A1A1A] bg-[#1A1A1A]/5 dark:border-[#ECEAE5] dark:bg-[#ECEAE5]/10" />
    );
  };

  return (
    <div className="border border-[#1A1A1A]/10 bg-white p-4 sm:p-6 transition-colors dark:border-[#383633] dark:bg-[#1E1D1B]">
      {/* Title and Controls */}
      <div className="flex flex-col justify-between gap-3 border-b border-[#1A1A1A]/10 pb-4 sm:flex-row sm:items-center dark:border-[#383633]">
        <div>
          <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
            {t('biometricMappingTag')}
          </span>
          <h3 className="font-serif text-xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
            {t('facialMapTitle')}
          </h3>
        </div>

        {/* Toggles */}
        <div className="no-print flex flex-wrap items-center gap-1.5 text-xs text-[#1A1A1A] dark:text-[#ECEAE5]">
          {/* Sketch vs Original Toggle */}
          {originalPhotoUrl && originalPhotoUrl !== photoUrl && (
            <div className="flex items-center border border-[#1A1A1A]/20 dark:border-[#383633] p-0.5 bg-white/70 dark:bg-[#1E1D1B] mr-1">
              <button
                type="button"
                onClick={() => setViewMode('stylized')}
                className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold transition-all ${
                  viewMode === 'stylized'
                    ? 'bg-[#1A1A1A] text-white dark:bg-[#ECEAE5] dark:text-[#141413]'
                    : 'text-[#1A1A1A]/70 dark:text-[#ECEAE5]/70 hover:text-[#1A1A1A]'
                }`}
              >
                {t('sketchToggleStylized')}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('original')}
                className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold transition-all ${
                  viewMode === 'original'
                    ? 'bg-[#1A1A1A] text-white dark:bg-[#ECEAE5] dark:text-[#141413]'
                    : 'text-[#1A1A1A]/70 dark:text-[#ECEAE5]/70 hover:text-[#1A1A1A]'
                }`}
              >
                {t('sketchToggleOriginal')}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowGuidelines(!showGuidelines)}
            className={`flex items-center gap-1 border px-2.5 py-1 text-[9px] uppercase tracking-widest transition-colors ${
              showGuidelines
                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]'
                : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A] hover:bg-[#EFEEEA] dark:border-[#383633] dark:bg-[#141413] dark:text-[#ECEAE5] dark:hover:bg-[#272523]'
            }`}
          >
            {showGuidelines ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            <span>{t('facialMapLinesToggle')}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowThirds(!showThirds)}
            className={`flex items-center gap-1 border px-2.5 py-1 text-[9px] uppercase tracking-widest transition-colors ${
              showThirds
                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]'
                : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A] hover:bg-[#EFEEEA] dark:border-[#383633] dark:bg-[#141413] dark:text-[#ECEAE5] dark:hover:bg-[#272523]'
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>{t('facialMapThirdsToggle')}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCallouts(!showCallouts)}
            className={`flex items-center gap-1 border px-2.5 py-1 text-[9px] uppercase tracking-widest transition-colors ${
              showCallouts
                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]'
                : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A] hover:bg-[#EFEEEA] dark:border-[#383633] dark:bg-[#141413] dark:text-[#ECEAE5] dark:hover:bg-[#272523]'
            }`}
          >
            <MapPin className="h-3 w-3" />
            <span>{t('facialMapCalloutsToggle')}</span>
          </button>
        </div>
      </div>

      {/* Main Photographic Canvas Container */}
      <div className={`relative mt-4 flex items-center justify-center overflow-hidden border border-[#1A1A1A]/10 transition-colors ${
        viewMode === 'stylized'
          ? 'bg-white dark:bg-[#1A1918]'
          : 'bg-[#EFEEEA] dark:bg-[#141413]'
      } dark:border-[#383633]`}>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Badge in top left */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2 py-0.5 bg-white/90 dark:bg-[#1E1D1B]/90 backdrop-blur text-[9px] uppercase tracking-widest font-bold border border-[#1A1A1A]/15 dark:border-[#383633] text-[#1A1A1A] dark:text-[#ECEAE5]">
            {viewMode === 'stylized' ? t('sketchBadge') : (language === 'en' ? 'Facial Biometric Map' : 'Mapa Facial 1.0')}
          </span>
        </div>

        <div className="relative w-full max-w-[420px] aspect-3/4 select-none overflow-hidden">
          {/* Facial Image */}
          <img
            src={viewMode === 'stylized' ? photoUrl : (originalPhotoUrl || photoUrl)}
            alt="Mapeamento Facial Frontal"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: landmarks?.headTiltAngleDegrees
                ? `rotate(${-landmarks.headTiltAngleDegrees}deg) scale(1.08)`
                : 'none',
              transformOrigin: 'center center'
            }}
          />

          {/* SVG Overlay for Vector Geometric Lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Center Midline (Linha Central Facial) */}
            {showGuidelines && (
              <line
                x1={centerX}
                y1={trichionY - 5}
                x2={centerX}
                y2={chinY + 5}
                stroke={lineColor}
                strokeWidth="0.4"
                strokeDasharray="1.5, 1"
                opacity="0.85"
              />
            )}

            {/* Horizontal Alignment Guides */}
            {showGuidelines && (
              <>
                {/* Eyebrow Line */}
                <line
                  x1={centerX - 28}
                  y1={eyebrowY}
                  x2={centerX + 28}
                  y2={eyebrowY}
                  stroke={lineColor}
                  strokeWidth="0.35"
                  strokeDasharray="1, 1"
                  opacity="0.75"
                />

                {/* Eye Line (Plano Bipupilar) */}
                <line
                  x1={centerX - 30}
                  y1={eyeY}
                  x2={centerX + 30}
                  y2={eyeY}
                  stroke={lineColor}
                  strokeWidth="0.45"
                  strokeDasharray="2, 1"
                  opacity="0.9"
                />

                {/* Subnasal / Nose Base Line */}
                <line
                  x1={centerX - 22}
                  y1={noseY}
                  x2={centerX + 22}
                  y2={noseY}
                  stroke={lineColor}
                  strokeWidth="0.35"
                  strokeDasharray="1, 1"
                  opacity="0.75"
                />

                {/* Mouth / Smile Line */}
                <line
                  x1={centerX - 26}
                  y1={mouthY}
                  x2={centerX + 26}
                  y2={mouthY}
                  stroke={lineColor}
                  strokeWidth="0.35"
                  strokeDasharray="1, 1"
                  opacity="0.75"
                />

                {/* Chin Base Line */}
                <line
                  x1={centerX - 18}
                  y1={chinY}
                  x2={centerX + 18}
                  y2={chinY}
                  stroke={lineColor}
                  strokeWidth="0.35"
                  strokeDasharray="1, 1"
                  opacity="0.75"
                />
              </>
            )}

            {/* Facial Thirds Dividers */}
            {showThirds && (
              <>
                {/* Upper to Middle divider */}
                <line
                  x1="5"
                  y1={eyebrowY}
                  x2="95"
                  y2={eyebrowY}
                  stroke={lineColor}
                  strokeWidth="0.3"
                  strokeDasharray="2, 2"
                  opacity="0.6"
                />
                {/* Middle to Lower divider */}
                <line
                  x1="5"
                  y1={noseY}
                  x2="95"
                  y2={noseY}
                  stroke={lineColor}
                  strokeWidth="0.3"
                  strokeDasharray="2, 2"
                  opacity="0.6"
                />
              </>
            )}
          </svg>

          {/* Thirds Labels at the edge */}
          {showThirds && (
            <div className="pointer-events-none absolute right-2 top-0 bottom-0 flex flex-col justify-between py-6 text-[8px] font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
              <span className="bg-white/90 dark:bg-[#1E1D1B]/90 border border-[#1A1A1A]/10 dark:border-[#383633] px-1 py-0.5">
                {language === 'en' ? 'Upper 1/3' : '1/3 Sup'}
              </span>
              <span className="bg-white/90 dark:bg-[#1E1D1B]/90 border border-[#1A1A1A]/10 dark:border-[#383633] px-1 py-0.5">
                {language === 'en' ? 'Mid 1/3' : '1/3 Méd'}
              </span>
              <span className="bg-white/90 dark:bg-[#1E1D1B]/90 border border-[#1A1A1A]/10 dark:border-[#383633] px-1 py-0.5">
                {language === 'en' ? 'Lower 1/3' : '1/3 Inf'}
              </span>
            </div>
          )}

          {/* Callouts Labels around the face */}
          {showCallouts &&
            callouts.map((callout, idx) => {
              const isLeft = callout.x < 50;
              return (
                <div
                  key={idx}
                  className="pointer-events-none absolute z-10 -translate-y-1/2"
                  style={{
                    left: `${callout.x}%`,
                    top: `${callout.y}%`,
                    transform: isLeft ? 'translate(-85%, -50%)' : 'translate(-15%, -50%)',
                  }}
                >
                  <div className="flex items-center">
                    <span
                      className={`max-w-[125px] bg-white/95 dark:bg-[#1E1D1B]/95 p-1 px-1.5 text-[9px] font-medium tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5] shadow-xs backdrop-blur-xs leading-tight sm:max-w-[145px] ${
                        isLeft
                          ? 'border-r-2 border-[#1A1A1A] dark:border-[#ECEAE5] text-right'
                          : 'border-l-2 border-[#1A1A1A] dark:border-[#ECEAE5] text-left'
                      }`}
                    >
                      {callout.label}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Face Shape and Skin Type Dual Card */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Formato do Rosto */}
        <div className="flex items-center justify-between border border-[#1A1A1A]/10 bg-[#EFEEEA]/50 p-4 dark:border-[#383633] dark:bg-[#272523]/50">
          <div>
            <span className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/60 uppercase dark:text-[#ECEAE5]/60">
              {t('faceShapeLabel')}
            </span>
            <p className="font-serif mt-0.5 text-xl font-normal italic text-[#1A1A1A] dark:text-[#ECEAE5]">
              {faceShape.primary}
            </p>
            {faceShape.secondary && (
              <p className="text-[11px] text-[#1A1A1A]/70 dark:text-[#ECEAE5]/70">({faceShape.secondary})</p>
            )}
            <span className="mt-1.5 inline-block border border-[#1A1A1A]/20 bg-white px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#1A1A1A] dark:border-[#383633] dark:bg-[#141413] dark:text-[#ECEAE5]">
              {language === 'en' ? 'Confidence' : 'Confiança'} {faceShape.confidence}
            </span>
          </div>
          <div className="flex shrink-0 items-center justify-center p-2">
            {renderShapeIcon(faceShape.primary)}
          </div>
        </div>

        {/* Tipo de Pele Observado */}
        <div className="flex flex-col justify-center border border-[#1A1A1A]/10 bg-[#EFEEEA]/50 p-4 dark:border-[#383633] dark:bg-[#272523]/50">
          <span className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/60 uppercase dark:text-[#ECEAE5]/60">
            {t('skinAspectLabel')}
          </span>
          <p className="font-serif mt-0.5 text-xl font-normal italic text-[#1A1A1A] dark:text-[#ECEAE5]">
            {skinTypeObserved || (language === 'en' ? 'Even Texture' : 'Uniforme')}
          </p>
          <p className="mt-1 text-[11px] text-[#1A1A1A]/70 leading-snug dark:text-[#ECEAE5]/70">
            {skinTypeObserved?.includes('Mista') || skinTypeObserved?.includes('Combination')
              ? (language === 'en'
                  ? 'Natural luminosity in the T-zone and balanced texture across zygomatic arches.'
                  : 'Luminosidade natural na zona T e textura equilibrada nas maçãs do rosto.')
              : (language === 'en'
                  ? 'Healthy texture without signs of pronounced dehydration under provided ambient light.'
                  : 'Aspecto saudável sem evidência de ressecamento acentuado sob a iluminação fornecida.')}
          </p>
        </div>
      </div>

      {/* Description of Face Shape */}
      {faceShape.description && (
        <div className="mt-3 border border-[#1A1A1A]/10 bg-white p-3 text-xs text-[#1A1A1A]/80 leading-relaxed dark:border-[#383633] dark:bg-[#141413] dark:text-[#ECEAE5]/80">
          <strong className="font-bold text-[#1A1A1A] uppercase text-[10px] tracking-wider block mb-1 dark:text-[#ECEAE5]">
            {t('craniofacialStructureLabel')}:
          </strong>
          {faceShape.description}
        </div>
      )}
    </div>
  );
};
