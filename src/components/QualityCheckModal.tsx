import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Sun,
  Maximize2,
  Smile,
  ShieldAlert,
} from 'lucide-react';
import { PhotoQualityFeedback, QualityRating, PhotoSlot } from '../types';
import { useApp } from '../context/ThemeLanguageContext';

interface QualityCheckModalProps {
  isOpen: boolean;
  isLoading: boolean;
  feedback: PhotoQualityFeedback | null;
  primaryPhoto: PhotoSlot | null;
  totalPhotos: number;
  onConfirmStart: () => void;
  onBackToUpload: () => void;
}

export const QualityCheckModal: React.FC<QualityCheckModalProps> = ({
  isOpen,
  isLoading,
  feedback,
  primaryPhoto,
  totalPhotos,
  onConfirmStart,
  onBackToUpload,
}) => {
  const { t, language } = useApp();

  if (!isOpen) return null;

  const getRatingBadge = (rating: QualityRating) => {
    switch (rating) {
      case 'Excelente':
        return (
          <span className="inline-flex items-center gap-1.5 border border-emerald-800/30 bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
            <CheckCircle className="h-3 w-3" />
            {t('qualityRatingExcellent')}
          </span>
        );
      case 'Boa':
        return (
          <span className="inline-flex items-center gap-1.5 border border-sky-800/30 bg-sky-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-sky-800 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800">
            <CheckCircle className="h-3 w-3" />
            {t('qualityRatingGood')}
          </span>
        );
      case 'Aceitável':
        return (
          <span className="inline-flex items-center gap-1.5 border border-amber-800/30 bg-amber-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
            <AlertTriangle className="h-3 w-3" />
            {t('qualityRatingAcceptable')}
          </span>
        );
      case 'Insuficiente':
        return (
          <span className="inline-flex items-center gap-1.5 border border-rose-800/30 bg-rose-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800">
            <XCircle className="h-3 w-3" />
            {t('qualityRatingPoor')}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/70 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl overflow-hidden border border-[#1A1A1A] bg-[#FBF9F6] shadow-2xl transition-colors dark:border-[#383633] dark:bg-[#141413]">
        {/* Header */}
        <div className="border-b border-[#1A1A1A]/10 px-6 py-5 dark:border-[#383633]">
          <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
            {t('qualityProtocolTag')}
          </span>
          <h3 className="font-serif mt-1 text-2xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
            {t('qualityModalTitle')}
          </h3>
          <p className="mt-1 text-xs text-[#1A1A1A]/70 dark:text-[#ECEAE5]/70">
            {t('qualityModalSubtitle')}
          </p>
        </div>

        {/* Content Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-8 w-8 animate-spin border-2 border-[#1A1A1A]/20 border-t-[#1A1A1A] dark:border-[#ECEAE5]/20 dark:border-t-[#ECEAE5]" />
              <p className="font-serif mt-4 text-lg font-normal text-[#1A1A1A] dark:text-[#ECEAE5]">
                {t('evaluatingQualityMsg')}
              </p>
              <p className="mt-1 text-xs text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
                {t('evaluatingQualitySub')}
              </p>
            </div>
          ) : feedback ? (
            <div className="space-y-6">
              {/* Photo preview & Badge */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {primaryPhoto && (
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-[#1A1A1A]/20 dark:border-[#383633]">
                    <img
                      src={primaryPhoto.previewUrl}
                      alt={language === 'en' ? 'Primary Photo' : 'Foto Principal'}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-[#1A1A1A] px-1 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white dark:bg-[#ECEAE5] dark:text-[#141413]">
                      {language === 'en' ? 'Primary' : 'Principal'}
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    {getRatingBadge(feedback.overall)}
                    <span className="text-xs text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
                      • {totalPhotos} {language === 'en' ? 'evaluated photo(s)' : 'foto(s) avaliada(s)'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#1A1A1A]/85 leading-relaxed dark:text-[#ECEAE5]/85">
                    {feedback.suggestions ||
                      (language === 'en'
                        ? 'This photograph exhibits adequate sharpness and facial alignment for biometric mapping.'
                        : 'Esta fotografia apresenta excelente nitidez e alinhamento facial para o cálculo das proporções áureas e simetria.')}
                  </p>
                </div>
              </div>

              {/* Technical Criteria Breakdown */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="border border-[#1A1A1A]/10 bg-white p-3 text-left dark:border-[#383633] dark:bg-[#1E1D1B]">
                  <div className="flex items-center gap-1.5 text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
                    <Sun className="h-3 w-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{t('qualityCriteriaLighting')}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-[#1A1A1A] dark:text-[#ECEAE5]">
                    {feedback.lighting || (language === 'en' ? 'Adequate' : 'Adequada e uniforme')}
                  </p>
                </div>

                <div className="border border-[#1A1A1A]/10 bg-white p-3 text-left dark:border-[#383633] dark:bg-[#1E1D1B]">
                  <div className="flex items-center gap-1.5 text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
                    <Maximize2 className="h-3 w-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{t('qualityCriteriaFraming')}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-[#1A1A1A] dark:text-[#ECEAE5]">
                    {feedback.framing || (language === 'en' ? 'Centered' : 'Centralizado')}
                  </p>
                </div>

                <div className="border border-[#1A1A1A]/10 bg-white p-3 text-left dark:border-[#383633] dark:bg-[#1E1D1B]">
                  <div className="flex items-center gap-1.5 text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
                    <Sparkles className="h-3 w-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{t('qualityCriteriaResolution')}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-[#1A1A1A] dark:text-[#ECEAE5]">
                    {feedback.resolution || (language === 'en' ? 'Sharp' : 'Nítida')}
                  </p>
                </div>

                <div className="border border-[#1A1A1A]/10 bg-white p-3 text-left dark:border-[#383633] dark:bg-[#1E1D1B]">
                  <div className="flex items-center gap-1.5 text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
                    <Smile className="h-3 w-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{t('qualityCriteriaExpression')}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-[#1A1A1A] dark:text-[#ECEAE5]">
                    {feedback.expression || (language === 'en' ? 'Natural' : 'Natural')}
                  </p>
                </div>
              </div>

              {/* Observed feedback comments */}
              {feedback.comments && feedback.comments.length > 0 && (
                <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/50 p-4 dark:border-[#383633] dark:bg-[#1E1D1B]">
                  <span className="text-[10px] font-bold tracking-wider text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
                    {t('qualityNotesTitle')}
                  </span>
                  <ul className="mt-2 space-y-1.5 text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
                    {feedback.comments.map((comment, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#1A1A1A]/40 dark:text-[#ECEAE5]/40">—</span>
                        <span>{comment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback.overall === 'Insuficiente' && (
                <div className="flex items-start gap-2.5 border border-rose-300 bg-rose-50 p-4 text-xs text-rose-800 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-200">
                  <ShieldAlert className="h-4 w-4 shrink-0 text-rose-700 dark:text-rose-400 mt-0.5" />
                  <div>
                    <strong className="font-semibold">
                      {language === 'en' ? 'Attention:' : 'Atenção:'}
                    </strong>{' '}
                    {language === 'en'
                      ? 'The photograph has limitations that may compromise biometric calculation accuracy. We recommend submitting a well-lit frontal portrait with an unobstructed face.'
                      : 'A fotografia fornecida possui limitações que podem comprometer a acurácia dos scores. Recomendamos enviar uma foto frontal bem iluminada com rosto desobstruído.'}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer controls */}
        <div className="flex flex-col-reverse items-center justify-between gap-3 border-t border-[#1A1A1A]/10 bg-[#EFEEEA]/60 px-6 py-4 sm:flex-row dark:border-[#383633] dark:bg-[#1E1D1B]">
          <button
            type="button"
            onClick={onBackToUpload}
            className="flex items-center gap-1.5 border border-[#1A1A1A] bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A] hover:bg-[#EFEEEA] transition-colors dark:border-[#383633] dark:bg-[#141413] dark:text-[#ECEAE5] dark:hover:bg-[#272523]"
          >
            <RefreshCw className="h-3 w-3 text-[#1A1A1A] dark:text-[#ECEAE5]" />
            <span>{t('replacePhotosBtn')}</span>
          </button>

          <button
            type="button"
            id="quality-confirm-btn"
            disabled={isLoading || (feedback && !feedback.canProceed && feedback.overall === 'Insuficiente')}
            onClick={onConfirmStart}
            className="flex w-full items-center justify-center gap-2 border border-[#1A1A1A] bg-[#1A1A1A] px-6 py-2.5 text-[10px] font-medium uppercase tracking-widest text-white shadow-xs hover:bg-black disabled:opacity-40 sm:w-auto transition-colors dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-[#DCD9D3]"
          >
            <span>{t('startFullAnalysisBtn')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
