import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, AlertCircle } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';

interface MethodologySectionProps {
  notes: string[];
  limitations: string[];
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ notes, limitations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useApp();

  return (
    <div className="border border-[#1A1A1A]/10 bg-white p-5 sm:p-6 transition-colors dark:border-[#383633] dark:bg-[#1E1D1B]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-2.5">
          <BookOpen className="h-4 w-4 text-[#1A1A1A] dark:text-[#ECEAE5]" />
          <div>
            <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
              {t('algorithmicTransparencyTag')}
            </span>
            <h3 className="font-serif text-xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('methodologyTitle')}
            </h3>
          </div>
        </div>
        <div className="border border-[#1A1A1A]/20 p-1 text-[#1A1A1A] hover:bg-[#EFEEEA] transition-colors dark:border-[#383633] dark:text-[#ECEAE5] dark:hover:bg-[#272523]">
          {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-6 space-y-6 border-t border-[#1A1A1A]/10 pt-5 text-xs leading-relaxed text-[#1A1A1A]/80 dark:border-[#383633] dark:text-[#ECEAE5]/80">
          <div>
            <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px] dark:text-[#ECEAE5]">
              {t('computerVisionFundamentalsTitle')}
            </h4>
            <ul className="mt-2 space-y-2 list-disc pl-4 text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
              {notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px] flex items-center gap-1.5 dark:text-[#ECEAE5]">
              <AlertCircle className="h-3.5 w-3.5 text-amber-800 dark:text-amber-400" />
              <span>{t('limitationsTitle')}</span>
            </h4>
            <ul className="mt-2 space-y-2 list-disc pl-4 text-[#1A1A1A]/70 dark:text-[#ECEAE5]/70">
              {limitations.map((lim, idx) => (
                <li key={idx}>{lim}</li>
              ))}
            </ul>
          </div>

          <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/60 p-4 dark:border-[#383633] dark:bg-[#272523]/50">
            <p className="font-serif text-sm italic text-[#1A1A1A]/90 dark:text-[#ECEAE5]/90 leading-relaxed">
              {t('methodologyQuote')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
