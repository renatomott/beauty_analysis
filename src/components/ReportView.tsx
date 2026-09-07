import React, { useState } from 'react';
import {
  Download,
  FileText,
  Printer,
  Sparkles,
  Shield,
  Trash2,
  Share2,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { FacialAnalysisResult, PhotoSlot } from '../types';
import { FacialMap } from './FacialMap';
import { DetailedScoresGrid } from './DetailedScoresGrid';
import { HighlightsAndAttention } from './HighlightsAndAttention';
import { MultiPhotoConsistency } from './MultiPhotoConsistency';
import { RecommendationsSection } from './RecommendationsSection';
import { MethodologySection } from './MethodologySection';
import { OnePageSummaryModal } from './OnePageSummaryModal';
import { exportElementAsPdf, exportElementAsPng, triggerBrowserPrint } from '../utils/pdfExport';
import { useApp } from '../context/ThemeLanguageContext';

interface ReportViewProps {
  analysis: FacialAnalysisResult;
  primaryPhotoUrl: string;
  originalPhotoUrl?: string;
  photoSlots: PhotoSlot[];
  onNewAnalysis: () => void;
  onClearImages: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  analysis,
  primaryPhotoUrl,
  originalPhotoUrl,
  photoSlots,
  onNewAnalysis,
  onClearImages,
}) => {
  const { t, language } = useApp();
  const [isOnePageModalOpen, setIsOnePageModalOpen] = useState(false);
  const [exportProgressMsg, setExportProgressMsg] = useState<string | null>(null);

  const activePhotoCount = photoSlots.filter((p) => Boolean(p.base64Data)).length;

  const handleDownloadFullPdf = async () => {
    try {
      setExportProgressMsg(
        language === 'en'
          ? 'Generating high-resolution editorial PDF...'
          : 'Gerando PDF editorial em alta resolução...'
      );
      await exportElementAsPdf('full-facial-report', 'Relatorio-Harmonia-Facial-Completo.pdf', (msg) => {
        setExportProgressMsg(msg);
      });
      setTimeout(() => setExportProgressMsg(null), 2500);
    } catch (err: any) {
      console.error(err);
      setExportProgressMsg(null);
      alert(
        language === 'en'
          ? 'Could not generate PDF at this moment. You can also use the Print button.'
          : 'Não foi possível gerar o PDF no momento. Você também pode usar o botão Imprimir.'
      );
    }
  };

  const handleDownloadPng = async () => {
    try {
      setExportProgressMsg(
        language === 'en' ? 'Capturing PNG image...' : 'Capturando imagem PNG...'
      );
      await exportElementAsPng('full-facial-report', 'Relatorio-Harmonia-Facial.png');
      setTimeout(() => setExportProgressMsg(null), 2500);
    } catch (err) {
      setExportProgressMsg(null);
      alert(language === 'en' ? 'Error exporting PNG.' : 'Erro ao exportar PNG.');
    }
  };

  return (
    <div className="relative pb-24 transition-colors">
      {/* Top Floating / Sticky Action Toolbar */}
      <div className="no-print sticky top-0 z-30 w-full border-b border-[#1A1A1A]/10 bg-[#FBF9F6]/95 py-2.5 backdrop-blur-md dark:border-[#383633] dark:bg-[#141413]/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#1A1A1A] uppercase hidden sm:inline dark:text-[#ECEAE5]">
              {language === 'en' ? 'Report Actions:' : 'Ações do Relatório:'}
            </span>
            <button
              id="report-btn-pdf"
              onClick={handleDownloadFullPdf}
              className="flex items-center gap-1.5 bg-[#1A1A1A] px-3.5 py-1.5 text-[10px] font-medium tracking-widest text-white uppercase transition-colors hover:bg-[#2A2A2A] dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-[#DCD9D3]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{t('reportDownloadPdfBtn')}</span>
            </button>
            <button
              id="report-btn-onepage"
              onClick={() => setIsOnePageModalOpen(true)}
              className="flex items-center gap-1.5 border border-[#1A1A1A] bg-transparent px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-[#1A1A1A] hover:text-white dark:border-[#383633] dark:text-[#ECEAE5] dark:hover:bg-[#ECEAE5] dark:hover:text-[#141413]"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{t('reportOnePageBtn')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPng}
              className="hidden sm:flex items-center gap-1.5 border border-[#1A1A1A]/30 bg-white px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-[#EFEEEA] dark:border-[#383633] dark:bg-[#1E1D1B] dark:text-[#ECEAE5] dark:hover:bg-[#272523]"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>{t('exportPngBtn')}</span>
            </button>
            <button
              onClick={triggerBrowserPrint}
              className="flex items-center gap-1 border border-[#1A1A1A]/30 bg-white px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-[#EFEEEA] dark:border-[#383633] dark:bg-[#1E1D1B] dark:text-[#ECEAE5] dark:hover:bg-[#272523]"
              title={language === 'en' ? 'Print directly from browser' : 'Imprimir direto do navegador'}
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t('printBtn')}</span>
            </button>
            <button
              onClick={onNewAnalysis}
              className="flex items-center gap-1 border border-[#1A1A1A]/30 bg-white px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-[#EFEEEA] dark:border-[#383633] dark:bg-[#1E1D1B] dark:text-[#ECEAE5] dark:hover:bg-[#272523]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('newAnalysisBtn')}</span>
            </button>
            <button
              onClick={onClearImages}
              title={language === 'en' ? 'Permanently delete photos from memory' : 'Excluir fotos da memória permanentemente'}
              className="flex items-center gap-1 border border-[#1A1A1A]/20 bg-[#EFEEEA] px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5] dark:hover:bg-rose-950/50 dark:hover:text-rose-300"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>{t('deletePhotosBtn')}</span>
            </button>
          </div>
        </div>

        {/* Progress notification pill if exporting */}
        {exportProgressMsg && (
          <div className="mx-auto mt-2 max-w-sm border border-[#1A1A1A] bg-[#1A1A1A] px-4 py-1.5 text-center text-[10px] tracking-widest uppercase text-white shadow-md dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
            {exportProgressMsg}
          </div>
        )}
      </div>

      {/* Main Report Container (Target for PDF & Print) */}
      <div
        id="full-facial-report"
        className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 space-y-8"
      >
        {/* Editorial Header (matching Design HTML layout) */}
        <header className="flex flex-col md:flex-row justify-between md:items-end border-b border-[#1A1A1A]/10 pb-4 mb-6 gap-4 dark:border-[#383633]">
          <div>
            <div className="inline-block border border-[#1A1A1A]/20 px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] text-[#1A1A1A]/70 uppercase mb-2 dark:border-[#383633] dark:text-[#ECEAE5]/70">
              {t('officialEditionTag')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-tight leading-none uppercase text-[#1A1A1A] dark:text-[#ECEAE5]">
              {language === 'en' ? (
                <>Facial Harmony<br className="hidden sm:inline" /> Analysis Report</>
              ) : (
                <>Relatório de<br className="hidden sm:inline" /> Harmonia Facial</>
              )}
            </h1>
            <p className="text-[10px] tracking-[0.2em] uppercase mt-2 opacity-60 text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('reportTagline')}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[11px] tracking-[0.1em] uppercase italic opacity-70 mb-2 font-serif text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('reportQuote')}
            </p>
            <div className="flex gap-2 md:justify-end">
              <button
                onClick={handleDownloadFullPdf}
                className="px-3 py-1.5 border border-[#1A1A1A] text-[10px] uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors dark:border-[#383633] dark:text-[#ECEAE5] dark:hover:bg-[#ECEAE5] dark:hover:text-[#141413]"
              >
                {t('reportDownloadPdfBtn')}
              </button>
              <button
                onClick={onNewAnalysis}
                className="px-3 py-1.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-[#DCD9D3]"
              >
                {t('newAnalysisBtn')}
              </button>
            </div>
          </div>
        </header>

        {/* Overall Score & Sub-scores Hero Banner */}
        <div className="border border-[#1A1A1A]/10 bg-white p-6 sm:p-8 dark:border-[#383633] dark:bg-[#1E1D1B]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Score Big Display */}
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2 className="text-[11px] font-bold uppercase tracking-widest opacity-60 text-[#1A1A1A] dark:text-[#ECEAE5]">
                  {t('overallHarmonyIndex')}
                </h2>
                <span className="text-4xl sm:text-5xl font-serif italic text-[#1A1A1A] dark:text-[#ECEAE5]">
                  {analysis.overallScore.toFixed(1).replace('.', language === 'en' ? '.' : ',')}
                  <span className="text-lg opacity-40 not-italic font-sans">/10</span>
                </span>
              </div>
              <div className="h-1.5 w-64 max-w-full bg-[#1A1A1A]/5 rounded-none dark:bg-[#383633]">
                <div
                  className="h-full bg-[#1A1A1A] dark:bg-[#ECEAE5]"
                  style={{ width: `${Math.min(100, Math.max(0, analysis.overallScore * 10))}%` }}
                />
              </div>
            </div>

            {/* Confidence Indicators Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/40 px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#1A1A1A] dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5]">
                <span className="opacity-60">{t('analysisConfidenceLabel')}: </span>
                <strong className="font-bold text-[#1A1A1A] dark:text-[#ECEAE5]">
                  {analysis.analysisConfidence}%
                </strong>
              </div>
              <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/40 px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#1A1A1A] dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5]">
                <span className="opacity-60">{t('processedPhotosLabel')}: </span>
                <strong className="font-bold text-[#1A1A1A] dark:text-[#ECEAE5]">{activePhotoCount || 1}</strong>
              </div>
            </div>
          </div>

          {/* Sub-Scores Bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#1A1A1A]/5 pt-5 sm:grid-cols-5 dark:border-[#383633]">
            <div className="border border-[#1A1A1A]/5 bg-[#EFEEEA]/30 p-3 text-center dark:border-[#383633] dark:bg-[#272523]/50">
              <p className="text-[9px] uppercase tracking-widest opacity-50 mb-1 dark:text-[#ECEAE5]">{t('subScoreHarmony')}</p>
              <span className="text-2xl font-serif italic text-[#1A1A1A] dark:text-[#ECEAE5]">
                {analysis.subScores.harmony.toFixed(1).replace('.', language === 'en' ? '.' : ',')}
              </span>
            </div>
            <div className="border border-[#1A1A1A]/5 bg-[#EFEEEA]/30 p-3 text-center dark:border-[#383633] dark:bg-[#272523]/50">
              <p className="text-[9px] uppercase tracking-widest opacity-50 mb-1 dark:text-[#ECEAE5]">{t('subScoreSymmetry')}</p>
              <span className="text-2xl font-serif italic text-[#1A1A1A] dark:text-[#ECEAE5]">
                {analysis.subScores.symmetry.toFixed(1).replace('.', language === 'en' ? '.' : ',')}
              </span>
            </div>
            <div className="border border-[#1A1A1A]/5 bg-[#EFEEEA]/30 p-3 text-center dark:border-[#383633] dark:bg-[#272523]/50">
              <p className="text-[9px] uppercase tracking-widest opacity-50 mb-1 dark:text-[#ECEAE5]">{t('subScoreEyes')}</p>
              <span className="text-2xl font-serif italic text-[#1A1A1A] dark:text-[#ECEAE5]">
                {analysis.subScores.eyes.toFixed(1).replace('.', language === 'en' ? '.' : ',')}
              </span>
            </div>
            <div className="border border-[#1A1A1A]/5 bg-[#EFEEEA]/30 p-3 text-center dark:border-[#383633] dark:bg-[#272523]/50">
              <p className="text-[9px] uppercase tracking-widest opacity-50 mb-1 dark:text-[#ECEAE5]">{t('subScoreContour')}</p>
              <span className="text-2xl font-serif italic text-[#1A1A1A] dark:text-[#ECEAE5]">
                {analysis.subScores.contour.toFixed(1).replace('.', language === 'en' ? '.' : ',')}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 border border-[#1A1A1A]/5 bg-[#EFEEEA]/30 p-3 text-center dark:border-[#383633] dark:bg-[#272523]/50">
              <p className="text-[9px] uppercase tracking-widest opacity-50 mb-1 dark:text-[#ECEAE5]">{t('subScoreSkin')}</p>
              <span className="text-2xl font-serif italic text-[#1A1A1A] dark:text-[#ECEAE5]">
                {analysis.subScores.skin.toFixed(1).replace('.', language === 'en' ? '.' : ',')}
              </span>
            </div>
          </div>

          {/* Executive Summary paragraph */}
          <div className="mt-6 border-t border-[#1A1A1A]/5 pt-4 dark:border-[#383633]">
            <h3 className="text-[11px] font-bold uppercase tracking-widest opacity-60 mb-2 dark:text-[#ECEAE5]">
              {t('executiveSummaryTitle')}
            </h3>
            <p className="text-xs leading-relaxed text-justify italic font-serif text-[#4A4A4A] dark:text-[#ECEAE5]/80">
              {analysis.summary}
            </p>
          </div>
        </div>

        {/* Master 3-Column Editorial Grid (matching the reference layout) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Column 1: Detailed Scores (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <DetailedScoresGrid scores={analysis.scores as any} />
          </div>

          {/* Column 2: Facial Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <FacialMap
              photoUrl={primaryPhotoUrl}
              originalPhotoUrl={originalPhotoUrl}
              landmarks={analysis.landmarks}
              faceShape={analysis.faceShape}
              skinTypeObserved={analysis.skinTypeObserved}
            />

            {/* Multi Photo Consistency module */}
            <MultiPhotoConsistency
              consistency={analysis.multiPhotoConsistency}
              photoCount={activePhotoCount}
            />
          </div>

          {/* Column 3: Highlights & Attention (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <HighlightsAndAttention
              highlights={analysis.highlights}
              particularities={analysis.observedParticularities}
              photoArtifacts={analysis.photoArtifacts}
              scores={analysis.scores as any}
            />
          </div>
        </div>

        {/* Bottom Section: Practical Recommendations & Professional Photo */}
        <RecommendationsSection
          skincare={analysis.recommendations.skincare}
          eyes={analysis.recommendations.eyes}
          hairBeard={analysis.recommendations.hairBeard}
          stylePhotography={analysis.recommendations.stylePhotography}
          professionalPhoto={analysis.recommendations.professionalPhoto}
        />

        {/* Methodology & Limitations Transparency Section */}
        <MethodologySection
          notes={analysis.methodologyNotes}
          limitations={analysis.limitations}
        />

        {/* Privacy & Ethical Guarantee Notice */}
        <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/60 p-6 text-center text-xs text-[#1A1A1A]/70 sm:p-8 dark:border-[#383633] dark:bg-[#1E1D1B] dark:text-[#ECEAE5]/70">
          <div className="mx-auto flex h-8 w-8 items-center justify-center border border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
            <Shield className="h-4 w-4" />
          </div>
          <h4 className="font-serif mt-3 text-lg font-normal uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
            {t('privacyCommitmentTitle')}
          </h4>
          <p className="mx-auto mt-2 max-w-2xl text-[11px] leading-relaxed text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
            {t('privacyCommitmentDesc')}
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={onClearImages}
              className="flex items-center gap-1.5 border border-[#1A1A1A] bg-transparent px-4 py-2 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 dark:border-[#383633] dark:text-[#ECEAE5] dark:hover:bg-rose-950/50 dark:hover:text-rose-300"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>{t('deleteImagesSessionBtn')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1-Page Summary Modal */}
      <OnePageSummaryModal
        isOpen={isOnePageModalOpen}
        onClose={() => setIsOnePageModalOpen(false)}
        analysis={analysis}
        photoUrl={primaryPhotoUrl}
        originalPhotoUrl={originalPhotoUrl}
      />
    </div>
  );
};
