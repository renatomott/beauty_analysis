import React from 'react';
import { Scan, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';

interface ProcessingOverlayProps {
  currentStepText: string;
  percent: number;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({
  currentStepText,
  percent,
}) => {
  const { t, language } = useApp();

  const steps = language === 'en' ? [
    'Checking image quality and illumination...',
    'Mapping facial landmarks and interpupillary alignment...',
    'Calculating facial thirds and symmetry quotients...',
    'Comparing multi-angle structural consistency...',
    'Consolidating biometric metrics and formatting report...',
  ] : [
    'Verificando qualidade das imagens e iluminação...',
    'Mapeando vetores faciais e alinhamento interpupilar...',
    'Calculando divisões dos terços faciais e simetria...',
    'Comparando consistência estrutural entre as fotos...',
    'Consolidando métricas e estruturando relatório...',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FBF9F6]/95 dark:bg-[#141413]/95 p-4 backdrop-blur-xs transition-colors">
      <div className="w-full max-w-md border border-[#1A1A1A] bg-white p-8 text-center shadow-2xl dark:border-[#383633] dark:bg-[#1E1D1B]">
        {/* Animated Scanning Icon */}
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center border border-[#1A1A1A] bg-[#EFEEEA] text-[#1A1A1A] dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5]">
          <Scan className="h-8 w-8 text-[#1A1A1A] animate-pulse dark:text-[#ECEAE5]" />
        </div>

        {/* Title */}
        <h3 className="font-serif mt-6 text-2xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
          {t('analyzingProportionsTitle')}
        </h3>
        <p className="mt-1 text-xs text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
          {t('analyzingProportionsSub')}
        </p>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5 dark:text-[#ECEAE5]">
            <span className="truncate pr-2 text-[10px]">{currentStepText || (language === 'en' ? 'Processing...' : 'Processando...')}</span>
            <span className="text-[10px]">{Math.round(percent)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden bg-[#EFEEEA] border border-[#1A1A1A]/20 dark:border-[#383633] dark:bg-[#272523]">
            <div
              className="h-full bg-[#1A1A1A] transition-all duration-500 ease-out dark:bg-[#ECEAE5]"
              style={{ width: `${Math.min(100, Math.max(10, percent))}%` }}
            />
          </div>
        </div>

        {/* Micro-steps checklist */}
        <div className="mt-6 space-y-2 text-left">
          {steps.map((step, idx) => {
            const stepThreshold = (idx + 1) * 20;
            const isDone = percent >= stepThreshold;
            const isCurrent = percent < stepThreshold && percent >= idx * 20;

            return (
              <div
                key={idx}
                className={`flex items-center gap-2 text-xs transition-opacity ${
                  isDone
                    ? 'text-[#1A1A1A] dark:text-[#ECEAE5]'
                    : isCurrent
                    ? 'text-[#1A1A1A] font-medium dark:text-[#ECEAE5]'
                    : 'text-[#1A1A1A]/30 dark:text-[#ECEAE5]/30'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-800 dark:text-emerald-400" />
                ) : isCurrent ? (
                  <div className="h-3.5 w-3.5 shrink-0 border-2 border-[#1A1A1A] border-t-transparent animate-spin dark:border-[#ECEAE5] dark:border-t-transparent" />
                ) : (
                  <div className="h-3.5 w-3.5 shrink-0 border border-[#1A1A1A]/30 dark:border-[#383633]" />
                )}
                <span className="truncate text-[11px]">{step}</span>
              </div>
            );
          })}
        </div>

        {/* Privacy reassurance note */}
        <p className="mt-6 border-t border-[#1A1A1A]/10 pt-4 text-[10px] text-[#1A1A1A]/50 uppercase tracking-wider dark:border-[#383633] dark:text-[#ECEAE5]/50">
          {language === 'en'
            ? 'Confidential processing • Your photos can be deleted at any time'
            : 'Processamento sigiloso • Suas fotos podem ser excluídas a qualquer momento'}
        </p>
      </div>
    </div>
  );
};
