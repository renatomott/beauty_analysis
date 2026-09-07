import React from 'react';
import { CheckCircle, HelpCircle } from 'lucide-react';
import { MultiPhotoConsistencyInfo } from '../types';
import { useApp } from '../context/ThemeLanguageContext';

interface MultiPhotoConsistencyProps {
  consistency?: MultiPhotoConsistencyInfo;
  photoCount: number;
}

export const MultiPhotoConsistency: React.FC<MultiPhotoConsistencyProps> = ({
  consistency,
  photoCount,
}) => {
  const { t, language } = useApp();
  if (!consistency || photoCount <= 1) return null;

  return (
    <div className="border border-[#1A1A1A]/10 bg-white p-5 sm:p-6 transition-colors dark:border-[#383633] dark:bg-[#1E1D1B]">
      <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3 dark:border-[#383633]">
        <div>
          <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
            {t('crossValidationTag')}
          </span>
          <h3 className="font-serif text-xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
            {t('photoConsistencyTitle')}
          </h3>
        </div>
        <span className="border border-[#1A1A1A]/20 bg-[#EFEEEA] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A] dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5]">
          {language === 'en' ? 'Level' : 'Nível'}: {consistency.level}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Traços Confirmados */}
        <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/40 p-4 dark:border-[#383633] dark:bg-[#272523]/50">
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wider dark:text-[#ECEAE5]">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-800 dark:text-emerald-300" />
            <span>{t('confirmedTraitsTitle')}</span>
          </span>
          <ul className="mt-2 space-y-1.5 text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
            {consistency.consistentTraits.map((trait, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#1A1A1A]/40 dark:text-[#ECEAE5]/40">—</span>
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Variações e Artefatos da Foto */}
        <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/40 p-4 dark:border-[#383633] dark:bg-[#272523]/50">
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wider dark:text-[#ECEAE5]">
            <HelpCircle className="h-3.5 w-3.5 text-amber-800 dark:text-amber-300" />
            <span>{t('angleVariationsTitle')}</span>
          </span>
          <ul className="mt-2 space-y-1.5 text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
            {consistency.photoArtifacts.map((art, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#1A1A1A]/40 dark:text-[#ECEAE5]/40">—</span>
                <span>{art}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {consistency.notes && (
        <p className="mt-3 text-xs text-[#1A1A1A]/60 italic font-serif dark:text-[#ECEAE5]/60">
          {language === 'en' ? 'Technical Note: ' : 'Nota técnica: '}
          {consistency.notes}
        </p>
      )}
    </div>
  );
};
