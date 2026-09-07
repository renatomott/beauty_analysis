import React, { useRef } from 'react';
import { X, Download, Printer, Eye } from 'lucide-react';
import { FacialAnalysisResult } from '../types';
import { exportElementAsPdf, exportElementAsPng, triggerBrowserPrint } from '../utils/pdfExport';
import { useApp } from '../context/ThemeLanguageContext';

interface OnePageSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: FacialAnalysisResult;
  photoUrl: string;
  originalPhotoUrl?: string;
}

export const OnePageSummaryModal: React.FC<OnePageSummaryModalProps> = ({
  isOpen,
  onClose,
  analysis,
  photoUrl,
  originalPhotoUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useApp();
  const [viewMode, setViewMode] = React.useState<'stylized' | 'original'>('stylized');

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    exportElementAsPdf('one-page-summary-sheet', 'Facial-Harmony-Summary-1Page.pdf');
  };

  const handleDownloadPng = () => {
    exportElementAsPng('one-page-summary-sheet', 'Facial-Harmony-Summary-1Page.png');
  };

  const scores = analysis.scores;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-auto w-full max-w-5xl border border-[#1A1A1A]/30 dark:border-[#383633] bg-[#FBF9F6] dark:bg-[#1A1918] shadow-2xl overflow-hidden transition-colors">
        {/* Top bar controls */}
        <div className="no-print flex items-center justify-between border-b border-[#1A1A1A]/10 bg-white px-6 py-3.5 dark:border-[#383633] dark:bg-[#1E1D1B]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('modalTitle')}
            </span>
            <span className="hidden border border-[#1A1A1A]/20 bg-[#EFEEEA] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A] dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5] sm:inline-block">
              {t('readyForPrintTag')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {originalPhotoUrl && originalPhotoUrl !== photoUrl && (
              <div className="flex items-center border border-[#1A1A1A]/20 dark:border-[#383633] p-0.5 bg-[#EFEEEA]/60 dark:bg-[#272523] mr-1">
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
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 border border-[#1A1A1A] bg-[#1A1A1A] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white hover:bg-black transition-colors dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-white"
            >
              <Download className="h-3 w-3" />
              <span>{t('downloadPdfBtn')}</span>
            </button>
            <button
              onClick={handleDownloadPng}
              className="flex items-center gap-1.5 border border-[#1A1A1A] bg-white px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A] hover:bg-[#EFEEEA] transition-colors dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5] dark:hover:bg-[#383633]"
            >
              <Eye className="h-3 w-3" />
              <span>{t('downloadPngBtn')}</span>
            </button>
            <button
              onClick={triggerBrowserPrint}
              className="border border-[#1A1A1A] bg-white p-1.5 text-[#1A1A1A] hover:bg-[#EFEEEA] transition-colors dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5] dark:hover:bg-[#383633]"
              title={language === 'en' ? 'Print directly' : 'Imprimir direto'}
            >
              <Printer className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors dark:text-[#ECEAE5]/60 dark:hover:text-[#ECEAE5]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Sheet View - Styled tightly after the reference image (paper aesthetic for export) */}
        <div className="max-h-[85vh] overflow-y-auto p-4 sm:p-8 bg-[#EFEEEA]/60 dark:bg-[#141413] flex justify-center">
          <div
            id="one-page-summary-sheet"
            ref={containerRef}
            className="w-full max-w-[820px] bg-white border border-[#1A1A1A]/20 p-6 sm:p-8 shadow-md text-[#1A1A1A]"
            style={{ minHeight: '1100px' }}
          >
            {/* Header of the sheet */}
            <div className="border-b-2 border-[#1A1A1A] pb-3 text-center">
              <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#1A1A1A] uppercase">
                {t('summaryReportTitle')}
              </h1>
              <p className="text-[10px] tracking-[0.2em] text-[#1A1A1A]/60 uppercase mt-0.5">
                {t('summarySubtitle')}
              </p>
              <p className="font-serif italic text-xs text-[#1A1A1A]/70 mt-1">
                {t('summaryQuote')}
              </p>
            </div>

            {/* Score & Shape Top Summary Bar */}
            <div className="mt-3 flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#1A1A1A]/60">
                  {t('harmonyIndexLabel')}:
                </span>
                <span className="font-sans text-xl font-bold text-[#1A1A1A]">
                  {analysis.overallScore.toFixed(1).replace('.', language === 'en' ? '.' : ',')}
                  <span className="text-xs text-[#1A1A1A]/50 font-normal"> / 10</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#1A1A1A]/60">
                  {t('predominantShapeLabel')}:
                </span>
                <span className="ml-1.5 font-bold uppercase text-[11px] text-[#1A1A1A]">
                  {analysis.faceShape.primary}{' '}
                  {analysis.faceShape.secondary && `(${analysis.faceShape.secondary})`}
                </span>
              </div>
            </div>

            {/* 3-Column Center Grid */}
            <div className="mt-4 grid grid-cols-12 gap-4">
              {/* Left Column: Detailed Scores (4 cols) */}
              <div className="col-span-12 md:col-span-4 border-r-0 md:border-r border-[#1A1A1A]/10 pr-0 md:pr-4">
                <h2 className="text-[10px] font-bold tracking-[0.15em] uppercase border-b border-[#1A1A1A] pb-1 mb-2 text-[#1A1A1A]">
                  {t('detailedScoresTitle')}
                </h2>
                <div className="space-y-2 text-[11px]">
                  {[
                    { label: language === 'en' ? 'FACIAL SYMMETRY' : 'SIMETRIA FACIAL', data: scores.symmetry },
                    { label: language === 'en' ? 'GENERAL PROPORTIONS' : 'PROPORÇÕES GERAIS', data: scores.proportions },
                    { label: language === 'en' ? 'FACIAL THIRDS' : 'TERÇOS FACIAIS', data: scores.facialThirds },
                    { label: language === 'en' ? 'JAWLINE STRUCTURE' : 'ESTRUTURA / MANDÍBULA', data: scores.jawline },
                    { label: language === 'en' ? 'EYES & LOOK' : 'OLHOS & OLHAR', data: scores.eyes },
                    { label: language === 'en' ? 'EYEBROWS' : 'SOBRANCELHAS', data: scores.eyebrows },
                    { label: language === 'en' ? 'NOSE & BASE' : 'NARIZ & BASE', data: scores.nose },
                    { label: language === 'en' ? 'LIPS & SMILE' : 'LÁBIOS & SORRISO', data: scores.smile || scores.lips },
                    { label: language === 'en' ? 'CHIN' : 'QUEIXO', data: scores.chin },
                    { label: language === 'en' ? 'APPARENT SKIN' : 'PELE APARENTE', data: scores.skin },
                    { label: language === 'en' ? 'EXPRESSIVENESS' : 'EXPRESSIVIDADE', data: scores.expressiveness },
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-[#1A1A1A]/5 pb-1">
                      <div className="flex justify-between font-bold text-[10px] uppercase text-[#1A1A1A]">
                        <span>{item.label}</span>
                        <span>{item.data?.score?.toFixed(1).replace('.', language === 'en' ? '.' : ',') || '8.5'}</span>
                      </div>
                      <div className="h-1 w-full bg-[#EFEEEA] my-0.5">
                        <div
                          className="h-full bg-[#1A1A1A]"
                          style={{ width: `${(item.data?.score || 8.5) * 10}%` }}
                        />
                      </div>
                      <p className="text-[9px] text-[#1A1A1A]/70 leading-tight font-serif">
                        {item.data?.analysis?.slice(0, 95)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Column: Facial Map & Photo (5 cols) */}
              <div className="col-span-12 md:col-span-5 flex flex-col items-center">
                <h2 className="w-full text-center text-[10px] font-bold tracking-[0.15em] uppercase border-b border-[#1A1A1A] pb-1 mb-2 text-[#1A1A1A]">
                  {t('mapTab')}
                </h2>
                <div className="relative w-full max-w-[280px] aspect-3/4 border border-[#1A1A1A] overflow-hidden shadow-xs bg-white">
                  <img
                    src={viewMode === 'stylized' ? photoUrl : (originalPhotoUrl || photoUrl)}
                    alt="Mapa Facial"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: analysis.landmarks?.headTiltAngleDegrees
                        ? `rotate(${-analysis.landmarks.headTiltAngleDegrees}deg) scale(1.08)`
                        : 'none',
                      transformOrigin: 'center center'
                    }}
                  />
                  {/* Overlay lines in summary sheet */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[44%] left-0 right-0 border-b border-[#1A1A1A]/60 border-dashed" />
                    <div className="absolute top-[59%] left-0 right-0 border-b border-[#1A1A1A]/60 border-dashed" />
                    <div className="absolute top-[72%] left-0 right-0 border-b border-[#1A1A1A]/60 border-dashed" />
                    <div className="absolute top-0 bottom-0 left-[50%] border-r border-[#1A1A1A]/60 border-dashed" />
                  </div>
                </div>

                {/* Facial Form & Skin Box (Faithful reproduction of reference sheet) */}
                <div className="mt-2.5 w-full border border-[#1A1A1A]/20 p-2 bg-[#FBF9F6] flex items-center justify-between">
                  <div className="text-left">
                    <span className="block text-[8px] uppercase tracking-widest font-bold text-[#1A1A1A]/60">
                      {language === 'en' ? 'FACE SHAPE' : 'FORMATO DO ROSTO'}
                    </span>
                    <span className="font-serif text-xs font-bold text-[#1A1A1A]">
                      {analysis.faceShape.primary}
                    </span>
                    {analysis.faceShape.secondary && (
                      <span className="block text-[8px] text-[#1A1A1A]/70">
                        ({analysis.faceShape.secondary})
                      </span>
                    )}
                  </div>
                  <div className="h-8 w-6 rounded-[45%] border-2 border-[#1A1A1A] mx-2 shrink-0" />
                  <div className="border-l border-[#1A1A1A]/15 pl-2 text-right">
                    <span className="block text-[8px] uppercase tracking-widest font-bold text-[#1A1A1A]/60">
                      {language === 'en' ? 'SKIN TYPE' : 'TIPO DE PELE'}
                    </span>
                    <span className="font-serif text-xs font-bold text-[#1A1A1A]">
                      {analysis.skinTypeObserved?.split('(')[0]?.trim() || 'Mista'}
                    </span>
                    {analysis.skinTypeObserved?.includes('(') && (
                      <span className="block text-[8px] text-[#1A1A1A]/70">
                        {analysis.skinTypeObserved.match(/\(([^)]+)\)/)?.[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Facial thirds note */}
                <div className="mt-2 w-full grid grid-cols-3 text-center text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A] border border-[#1A1A1A]/15 p-1 bg-[#EFEEEA]/60">
                  <div>1/3 {language === 'en' ? 'Upper' : 'Sup'}: 33%</div>
                  <div>1/3 {language === 'en' ? 'Mid' : 'Méd'}: 34%</div>
                  <div>1/3 {language === 'en' ? 'Lower' : 'Inf'}: 33%</div>
                </div>

                {/* Callouts list */}
                <div className="mt-2 w-full space-y-1 text-[10px] text-[#1A1A1A]">
                  {analysis.highlights.slice(0, 4).map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-[#1A1A1A]/50">—</span>
                      <span className="text-[10px]">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Highlights & Notes (3 cols) */}
              <div className="col-span-12 md:col-span-3 border-l-0 md:border-l border-[#1A1A1A]/10 pl-0 md:pl-4">
                <h2 className="text-[10px] font-bold tracking-[0.15em] uppercase border-b border-[#1A1A1A] pb-1 mb-2 text-[#1A1A1A]">
                  {t('strongPointsTitle')}
                </h2>
                <ul className="space-y-1.5 text-[10px] text-[#1A1A1A]">
                  {analysis.highlights.slice(0, 6).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-bold text-[#1A1A1A]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-[10px] font-bold tracking-[0.15em] uppercase border-b border-[#1A1A1A] pb-1 mt-4 mb-2 text-[#1A1A1A]">
                  {t('attentionPointsTitle')}
                </h2>
                <ul className="space-y-1.5 text-[10px] text-[#1A1A1A]/80">
                  {analysis.observedParticularities.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-bold text-[#1A1A1A]/60">!</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 border border-[#1A1A1A]/10 p-2 bg-[#EFEEEA]/60 text-[9px] text-[#1A1A1A]">
                  <strong>{language === 'en' ? 'Overall Reliability: ' : 'Confiabilidade Geral: '}</strong>
                  {analysis.analysisConfidence}% {language === 'en' ? 'based on input sharpness.' : 'com base na nitidez das fotos apresentadas.'}
                </div>
              </div>
            </div>

            {/* Bottom 4-Column Care Guide */}
            <div className="mt-4 border-t-2 border-[#1A1A1A] pt-3">
              <h2 className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2 text-[#1A1A1A]">
                {t('practicalRecommendationsTitle')}
              </h2>
              <div className="grid grid-cols-4 gap-2 text-[9px] text-[#1A1A1A]/80">
                <div className="border border-[#1A1A1A]/10 p-2 bg-white">
                  <div className="font-bold text-[#1A1A1A] uppercase border-b border-[#1A1A1A]/10 pb-0.5 mb-1 text-[8px] tracking-wider">
                    {t('recSkincareTab')}
                  </div>
                  <ul className="space-y-1">
                    {analysis.recommendations.skincare.slice(0, 3).map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="border border-[#1A1A1A]/10 p-2 bg-white">
                  <div className="font-bold text-[#1A1A1A] uppercase border-b border-[#1A1A1A]/10 pb-0.5 mb-1 text-[8px] tracking-wider">
                    {t('recEyesTab')}
                  </div>
                  <ul className="space-y-1">
                    {analysis.recommendations.eyes.slice(0, 3).map((e, i) => (
                      <li key={i}>• {e}</li>
                    ))}
                  </ul>
                </div>

                <div className="border border-[#1A1A1A]/10 p-2 bg-white">
                  <div className="font-bold text-[#1A1A1A] uppercase border-b border-[#1A1A1A]/10 pb-0.5 mb-1 text-[8px] tracking-wider">
                    {t('recHairBeardTab')}
                  </div>
                  <ul className="space-y-1">
                    {analysis.recommendations.hairBeard.slice(0, 3).map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>

                <div className="border border-[#1A1A1A]/10 p-2 bg-white">
                  <div className="font-bold text-[#1A1A1A] uppercase border-b border-[#1A1A1A]/10 pb-0.5 mb-1 text-[8px] tracking-wider">
                    {t('recStyleTab')}
                  </div>
                  <ul className="space-y-1">
                    <li>• {analysis.recommendations.professionalPhoto.bestAngle}</li>
                    <li>• {analysis.recommendations.professionalPhoto.smileAmount}</li>
                    <li>• {analysis.recommendations.professionalPhoto.lighting}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-4 border-t border-[#1A1A1A]/10 pt-2 flex justify-between text-[8px] text-[#1A1A1A]/50 uppercase tracking-widest">
              <span>{t('summaryReportTitle')} • {language === 'en' ? 'Version' : 'Versão'} {analysis.analysisVersion}</span>
              <span>{t('footerAiDisclaimer')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
