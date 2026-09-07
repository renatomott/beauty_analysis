import React from 'react';
import { DimensionScore, ConfidenceLevel } from '../types';
import { useApp } from '../context/ThemeLanguageContext';

interface DetailedScoresGridProps {
  scores: {
    harmony: DimensionScore;
    symmetry: DimensionScore;
    proportions: DimensionScore;
    facialThirds?: DimensionScore;
    horizontalBalance?: DimensionScore;
    eyes: DimensionScore;
    eyebrows: DimensionScore;
    nose: DimensionScore;
    lips: DimensionScore;
    smile: DimensionScore;
    jawline: DimensionScore;
    chin: DimensionScore;
    skin: DimensionScore;
    hair?: DimensionScore;
    beard?: DimensionScore;
    expressiveness: DimensionScore;
    photographicPresence: DimensionScore;
  };
}

interface ScoreCardItem {
  id: string;
  titlePt: string;
  titleEn: string;
  scoreData?: DimensionScore;
  isOptional?: boolean;
}

export const DetailedScoresGrid: React.FC<DetailedScoresGridProps> = ({ scores }) => {
  const { t, language } = useApp();

  const items: ScoreCardItem[] = [
    { id: 'simetria', titlePt: 'SIMETRIA FACIAL', titleEn: 'FACIAL SYMMETRY', scoreData: scores.symmetry },
    { id: 'proporcoes', titlePt: 'PROPORÇÕES GERAIS', titleEn: 'GENERAL PROPORTIONS', scoreData: scores.proportions },
    { id: 'tercos', titlePt: 'TERÇOS FACIAIS', titleEn: 'FACIAL THIRDS', scoreData: scores.facialThirds },
    { id: 'estrutura', titlePt: 'ESTRUTURA ÓSSEA / MANDÍBULA', titleEn: 'BONE STRUCTURE / JAWLINE', scoreData: scores.jawline },
    { id: 'olhos', titlePt: 'OLHOS & OLHAR', titleEn: 'EYES & CANTHAL TILT', scoreData: scores.eyes },
    { id: 'sobrancelhas', titlePt: 'SOBRANCELHAS', titleEn: 'EYEBROWS & ARCH', scoreData: scores.eyebrows },
    { id: 'nariz', titlePt: 'NARIZ & BASE NASAL', titleEn: 'NOSE & NASAL BASE', scoreData: scores.nose },
    { id: 'labios', titlePt: 'LÁBIOS & SORRISO', titleEn: 'LIPS & SMILE', scoreData: scores.smile || scores.lips },
    { id: 'queixo', titlePt: 'QUEIXO / MENTO', titleEn: 'CHIN / MENTUM', scoreData: scores.chin },
    { id: 'pele', titlePt: 'PELE APARENTE', titleEn: 'APPARENT SKIN TEXTURE', scoreData: scores.skin },
    { id: 'cabelo', titlePt: 'CABELO & SILHUETA', titleEn: 'HAIR & SILHOUETTE', scoreData: scores.hair, isOptional: true },
    { id: 'barba', titlePt: 'BARBA & CONTORNO', titleEn: 'BEARD & CONTOUR', scoreData: scores.beard, isOptional: true },
    { id: 'expressividade', titlePt: 'EXPRESSIVIDADE', titleEn: 'EXPRESSIVENESS', scoreData: scores.expressiveness },
    { id: 'presenca', titlePt: 'PRESENÇA FOTOGRÁFICA', titleEn: 'PHOTOGRAPHIC PRESENCE', scoreData: scores.photographicPresence },
  ];

  const getConfidenceBadge = (confidence?: ConfidenceLevel) => {
    switch (confidence) {
      case 'Alta':
        return (
          <span className="text-[8px] uppercase tracking-widest font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-800/20 dark:border-emerald-500/30 px-1 py-0.5 bg-emerald-50/50 dark:bg-emerald-950/40">
            {language === 'en' ? 'High Confidence' : 'Alta Confiança'}
          </span>
        );
      case 'Média':
        return (
          <span className="text-[8px] uppercase tracking-widest font-bold text-amber-800 dark:text-amber-300 border border-amber-800/20 dark:border-amber-500/30 px-1 py-0.5 bg-amber-50/50 dark:bg-amber-950/40">
            {language === 'en' ? 'Medium Confidence' : 'Média Confiança'}
          </span>
        );
      case 'Baixa':
        return (
          <span className="text-[8px] uppercase tracking-widest font-bold text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-600 px-1 py-0.5 bg-stone-50 dark:bg-stone-800">
            {language === 'en' ? 'Low Confidence' : 'Baixa Confiança'}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-[#1A1A1A]/10 bg-white p-4 sm:p-6 transition-colors dark:border-[#383633] dark:bg-[#1E1D1B]">
      {/* Title */}
      <div className="border-b border-[#1A1A1A]/10 pb-3 dark:border-[#383633]">
        <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
          {t('dimensionEvaluationTag')}
        </span>
        <h3 className="font-serif text-xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
          {t('detailedAnalysisTitle')}
        </h3>
      </div>

      {/* List of score cards */}
      <div className="mt-4 divide-y divide-[#1A1A1A]/5 dark:divide-[#383633]">
        {items.map((item) => {
          const data = item.scoreData;
          if (!data || (item.isOptional && data.notEvaluable)) return null;

          const scoreVal = data.score ?? 8.5;
          const percentage = Math.min(100, Math.max(0, scoreVal * 10));
          const title = language === 'en' ? item.titleEn : item.titlePt;

          return (
            <div key={item.id} className="py-3.5 first:pt-1 last:pb-1">
              {/* Header row: Title, Score and Confidence */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
                    {title}
                  </span>
                  <div className="mt-1">{getConfidenceBadge(data.confidence)}</div>
                </div>
                <div className="text-right">
                  <span className="font-serif text-xl italic text-[#1A1A1A] dark:text-[#ECEAE5]">
                    {scoreVal.toFixed(1).replace('.', language === 'en' ? '.' : ',')}
                  </span>
                </div>
              </div>

              {/* Visual Score Bar (sleek thin black bar matching editorial theme) */}
              <div className="mt-2 h-1 w-full bg-[#1A1A1A]/5 dark:bg-[#383633] rounded-none">
                <div
                  className="h-full bg-[#1A1A1A] dark:bg-[#ECEAE5]"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Textual Observation */}
              <p className="mt-2 text-[11px] leading-relaxed text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
                {data.analysis}
              </p>

              {/* Small aesthetic interpretation */}
              {data.interpretation && (
                <p className="mt-1 text-[10px] italic font-serif text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
                  “{data.interpretation}”
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
