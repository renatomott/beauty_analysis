import React from 'react';
import { Camera } from 'lucide-react';
import { DimensionScore } from '../types';
import { useApp } from '../context/ThemeLanguageContext';

interface HighlightsAndAttentionProps {
  highlights: string[];
  particularities: string[];
  photoArtifacts: string[];
  scores: Record<string, DimensionScore | undefined>;
}

export const HighlightsAndAttention: React.FC<HighlightsAndAttentionProps> = ({
  highlights,
  particularities,
  photoArtifacts,
  scores,
}) => {
  const { t, language } = useApp();

  const confidenceTableItems = [
    {
      label: language === 'en' ? 'Apparent Symmetry' : 'Simetria Aparente',
      data: scores.symmetry,
    },
    {
      label: language === 'en' ? 'General Proportions' : 'Proporções Gerais',
      data: scores.proportions,
    },
    {
      label: language === 'en' ? 'Eye Region' : 'Região dos Olhos',
      data: scores.eyes,
    },
    {
      label: language === 'en' ? 'Jawline Contour' : 'Contorno Mandibular',
      data: scores.jawline,
    },
    {
      label: language === 'en' ? 'Apparent Skin' : 'Pele Aparente',
      data: scores.skin,
    },
    {
      label: language === 'en' ? 'Expression & Presence' : 'Expressão & Presença',
      data: scores.expressiveness,
    },
  ].filter((item) => item.data !== undefined);

  return (
    <div className="space-y-6">
      {/* PONTOS FORTES / DE DESTAQUE */}
      <div className="border border-[#1A1A1A]/10 bg-white p-5 sm:p-6 transition-colors dark:border-[#383633] dark:bg-[#1E1D1B]">
        <div className="border-b border-[#1A1A1A]/10 pb-3 dark:border-[#383633]">
          <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
            {t('harmonyInEvidenceTag')}
          </span>
          <h3 className="font-serif text-xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
            {t('strongPointsTitle')}
          </h3>
        </div>

        <ul className="mt-4 space-y-2.5 text-xs text-[#1A1A1A]/85 dark:text-[#ECEAE5]/85">
          {highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[8px] font-bold dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
                ✓
              </span>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PONTOS DE ATENÇÃO / PARTICULARIDADES OBSERVADAS */}
      <div className="border border-[#1A1A1A]/10 bg-white p-5 sm:p-6 transition-colors dark:border-[#383633] dark:bg-[#1E1D1B]">
        <div className="border-b border-[#1A1A1A]/10 pb-3 dark:border-[#383633]">
          <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
            {t('particularitiesTag')}
          </span>
          <h3 className="font-serif text-xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
            {t('attentionPointsTitle')}
          </h3>
        </div>

        <ul className="mt-4 space-y-3 text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
          {particularities.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-[#1A1A1A] text-[9px] font-serif italic text-[#1A1A1A] dark:border-[#ECEAE5] dark:text-[#ECEAE5]">
                i
              </span>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>

        {/* Artefatos Fotográficos sub-note */}
        {photoArtifacts && photoArtifacts.length > 0 && (
          <div className="mt-4 border border-[#1A1A1A]/10 bg-[#EFEEEA]/60 p-3 text-[11px] text-[#1A1A1A]/70 dark:border-[#383633] dark:bg-[#272523]/60 dark:text-[#ECEAE5]/70">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[9px] text-[#1A1A1A] dark:text-[#ECEAE5] mb-1">
              <Camera className="h-3 w-3 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span>{t('photoInfluencesTitle')}</span>
            </div>
            <ul className="space-y-1 list-disc pl-4 text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
              {photoArtifacts.map((art, idx) => (
                <li key={idx}>{art}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* TABELA DE CONFIANÇA */}
      <div className="border border-[#1A1A1A]/10 bg-white p-5 sm:p-6 transition-colors dark:border-[#383633] dark:bg-[#1E1D1B]">
        <div className="border-b border-[#1A1A1A]/10 pb-3 dark:border-[#383633]">
          <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
            {t('reliabilityIndexTag')}
          </span>
          <h3 className="font-serif text-xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
            {t('confidenceTableTitle')}
          </h3>
        </div>

        <div className="mt-3 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1A1A1A]/10 text-[9px] font-bold tracking-widest text-[#1A1A1A]/60 uppercase dark:border-[#383633] dark:text-[#ECEAE5]/60">
                <th className="pb-2">{t('tableColDimension')}</th>
                <th className="pb-2 text-center">{t('tableColScore')}</th>
                <th className="pb-2 text-right">{t('tableColConfidence')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/5 dark:divide-[#383633]">
              {confidenceTableItems.map((item, idx) => {
                const confRaw = item.data?.confidence || 'Alta';
                const isLow = confRaw === 'Baixa' || confRaw === 'Low';
                const isMid = confRaw === 'Média' || confRaw === 'Medium';
                const confDisplay = language === 'en'
                  ? (isLow ? 'Low' : isMid ? 'Medium' : 'High')
                  : (isLow ? 'Baixa' : isMid ? 'Média' : 'Alta');

                return (
                  <tr key={idx} className="hover:bg-[#EFEEEA]/40 dark:hover:bg-[#272523]/40 transition-colors">
                    <td className="py-2 text-[11px] font-medium text-[#1A1A1A] dark:text-[#ECEAE5]">{item.label}</td>
                    <td className="py-2 text-center font-serif italic text-[#1A1A1A] dark:text-[#ECEAE5] text-sm">
                      {item.data?.score?.toFixed(1).replace('.', language === 'en' ? '.' : ',') || '-'}
                    </td>
                    <td className="py-2 text-right">
                      <span
                        className={`px-1 py-0.5 text-[8px] font-bold uppercase tracking-widest border ${
                          isLow
                            ? 'border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-600/40 dark:bg-rose-950/40 dark:text-rose-300'
                            : isMid
                            ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-600/40 dark:bg-amber-950/40 dark:text-amber-300'
                            : 'border-emerald-800/20 bg-emerald-50/50 text-emerald-800 dark:border-emerald-600/40 dark:bg-emerald-950/40 dark:text-emerald-300'
                        }`}
                      >
                        {confDisplay}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
