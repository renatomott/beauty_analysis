import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { UploadSection } from './components/UploadSection';
import { QualityCheckModal } from './components/QualityCheckModal';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import { ReportView } from './components/ReportView';
import { PhotoSlot, FacialAnalysisResult, PhotoQualityFeedback } from './types';
import { getSampleAnalysisData } from './data/defaultAnalysis';
import { requestQualityCheck, requestFacialAnalysis } from './services/api';
import { useApp } from './context/ThemeLanguageContext';
import { createPencilSketch } from './utils/imageStylizer';

const DEFAULT_PORTRAIT_URL =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop';
const STYLIZED_SAMPLE_PORTRAIT = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=600';

const INITIAL_SLOTS: PhotoSlot[] = [
  { id: '1', tag: 'Frontal neutra', isFrontal: true },
  { id: '2', tag: 'Frontal sorrindo', isFrontal: true },
  { id: '3', tag: 'Perfil esquerdo' },
  { id: '4', tag: 'Perfil direito' },
  { id: '5', tag: '3/4 esquerdo' },
  { id: '6', tag: '3/4 direito' },
];

export default function App() {
  const { language } = useApp();
  const [currentStep, setCurrentStep] = useState<'landing' | 'upload' | 'report'>('landing');
  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>(INITIAL_SLOTS);
  const [primaryPhotoUrl, setPrimaryPhotoUrl] = useState<string>(STYLIZED_SAMPLE_PORTRAIT);
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState<string>(DEFAULT_PORTRAIT_URL);
  const [isSampleLoaded, setIsSampleLoaded] = useState(false);

  // Quality check states
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [isQualityLoading, setIsQualityLoading] = useState(false);
  const [qualityFeedback, setQualityFeedback] = useState<PhotoQualityFeedback | null>(null);

  // Analysis processing states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState({ text: 'Iniciando...', percent: 10 });
  const [analysisResult, setAnalysisResult] = useState<FacialAnalysisResult | null>(null);

  // Notification / privacy feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync sample data if language changes while sample is viewed
  useEffect(() => {
    if (isSampleLoaded && currentStep === 'report') {
      setAnalysisResult(getSampleAnalysisData(language));
    }
  }, [language, isSampleLoaded, currentStep]);

  const hasPhotos = photoSlots.some((s) => Boolean(s.base64Data));

  // Handler: Direct Demo Report
  const handleLoadSample = () => {
    setIsSampleLoaded(true);
    setAnalysisResult(getSampleAnalysisData(language));
    setPrimaryPhotoUrl(STYLIZED_SAMPLE_PORTRAIT);
    setOriginalPhotoUrl(DEFAULT_PORTRAIT_URL);
    setCurrentStep('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Preload demo photo into slot 1 for testing upload flow
  const handleLoadDemoPhoto = async () => {
    try {
      showToast(language === 'en' ? 'Loading reference photo...' : 'Carregando foto de referência...');
      // Convert URL image to base64 for slot 1
      const response = await fetch(DEFAULT_PORTRAIT_URL);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const newSlots = [...photoSlots];
        newSlots[0] = {
          ...newSlots[0],
          previewUrl: base64data,
          base64Data: base64data,
          mimeType: 'image/jpeg',
        };
        setPhotoSlots(newSlots);
        setPrimaryPhotoUrl(base64data);
        setOriginalPhotoUrl(base64data);
        showToast(language === 'en' ? 'Reference photo loaded in frontal slot.' : 'Foto de referência carregada no slot frontal.');
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      // Fallback
      const newSlots = [...photoSlots];
      newSlots[0] = {
        ...newSlots[0],
        previewUrl: DEFAULT_PORTRAIT_URL,
        base64Data: DEFAULT_PORTRAIT_URL,
        mimeType: 'image/jpeg',
      };
      setPhotoSlots(newSlots);
      setPrimaryPhotoUrl(DEFAULT_PORTRAIT_URL);
      setOriginalPhotoUrl(DEFAULT_PORTRAIT_URL);
      showToast(language === 'en' ? 'Reference photo configured.' : 'Foto de referência configurada.');
    }
  };

  // Handler: Move to Quality Check
  const handleProceedToQualityCheck = async () => {
    const filled = photoSlots.filter((s) => Boolean(s.base64Data));
    if (filled.length === 0) return;

    const primary = filled[0];
    const rawPhoto = primary.previewUrl || primary.base64Data || DEFAULT_PORTRAIT_URL;
    setPrimaryPhotoUrl(rawPhoto);
    setOriginalPhotoUrl(rawPhoto);

    setIsQualityModalOpen(true);
    setIsQualityLoading(true);

    try {
      const feedback = await requestQualityCheck(primary, language);
      setQualityFeedback(feedback);
    } catch (err: any) {
      console.error(err);
      setIsQualityModalOpen(false);
      showToast(
        language === 'en'
          ? `Quality check failed: ${err.message}. Please check API Key and quotas.`
          : `Falha na verificação: ${err.message}. Verifique a chave da API e cotas.`
      );
    } finally {
      setIsQualityLoading(false);
    }
  };

  // Handler: Confirm and Start Full Facial Analysis
  const handleConfirmStartAnalysis = async () => {
    setIsQualityModalOpen(false);
    setIsAnalyzing(true);
    setAnalysisProgress({
      text: language === 'en' ? 'Starting multimodal facial analysis...' : 'Iniciando análise facial multimodal...',
      percent: 15,
    });

    const filledSlots = photoSlots.filter((s) => Boolean(s.base64Data));
    const primary = filledSlots[0];
    const rawPhoto = primary?.previewUrl || primary?.base64Data || DEFAULT_PORTRAIT_URL;
    setOriginalPhotoUrl(rawPhoto);

    // Generate stylized pencil sketch for report
    try {
      setAnalysisProgress({
        text: language === 'en' ? 'Creating architectural sketch...' : 'Criando croqui arquitetônico...',
        percent: 25,
      });
      const sketchUrl = await createPencilSketch(rawPhoto);
      setPrimaryPhotoUrl(sketchUrl);
    } catch (sketchErr) {
      console.warn('Sketch generation failed, using original:', sketchErr);
      setPrimaryPhotoUrl(rawPhoto);
    }

    try {
      const result = await requestFacialAnalysis(filledSlots, (text, percent) => {
        setAnalysisProgress({ text, percent });
      }, language);

      setIsSampleLoaded(false);
      setAnalysisResult(result);
      setCurrentStep('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      if (result.isDevelopmentSample) {
        showToast(
          language === 'en'
            ? 'API Key missing. Displaying sample development data.'
            : 'Chave da API ausente. Exibindo dados de simulação.'
        );
      } else {
        showToast(
          language === 'en'
            ? 'Facial Harmony Dossier completed successfully.'
            : 'Relatório de Harmonia Facial concluído com sucesso.'
        );
      }
    } catch (err: any) {
      console.error('Falha na análise facial:', err);
      showToast(
        language === 'en'
          ? `Analysis failed: ${err.message}. Please check API Key and quotas.`
          : `Falha na análise: ${err.message}. Verifique a chave da API e cotas.`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handler: Privacy image erasure
  const handleClearImages = () => {
    setPhotoSlots(INITIAL_SLOTS);
    setPrimaryPhotoUrl(STYLIZED_SAMPLE_PORTRAIT);
    setOriginalPhotoUrl(DEFAULT_PORTRAIT_URL);
    showToast(
      language === 'en'
        ? 'Your photographs have been completely removed from the session.'
        : 'Suas fotografias foram completamente excluídas da sessão.'
    );
    if (currentStep === 'upload') {
      setCurrentStep('landing');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#1A1A1A] selection:bg-[#EFEEEA] selection:text-[#1A1A1A] dark:bg-[#141413] dark:text-[#ECEAE5] dark:selection:bg-[#272523] dark:selection:text-[#ECEAE5] transition-colors">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 border border-[#1A1A1A] bg-[#1A1A1A] px-4 py-2.5 text-[11px] font-medium tracking-wide uppercase text-white shadow-xl dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar
        currentStep={currentStep}
        onGoHome={() => setCurrentStep('landing')}
        onStartAnalysis={() => {
          setCurrentStep('upload');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLoadSample={handleLoadSample}
        onClearImages={handleClearImages}
        hasPhotos={hasPhotos}
      />

      {/* Main Flow Views */}
      <main>
        {currentStep === 'landing' && (
          <LandingHero
            onStart={() => {
              setCurrentStep('upload');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewSample={handleLoadSample}
          />
        )}

        {currentStep === 'upload' && (
          <UploadSection
            photoSlots={photoSlots}
            onUpdateSlots={setPhotoSlots}
            onProceedToQualityCheck={handleProceedToQualityCheck}
            onLoadDemoPhoto={handleLoadDemoPhoto}
          />
        )}

        {currentStep === 'report' && analysisResult && (
          <ReportView
            analysis={analysisResult}
            primaryPhotoUrl={primaryPhotoUrl}
            originalPhotoUrl={originalPhotoUrl}
            photoSlots={photoSlots}
            onNewAnalysis={() => {
              setCurrentStep('upload');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearImages={handleClearImages}
          />
        )}
      </main>

      {/* Quality Check Modal */}
      <QualityCheckModal
        isOpen={isQualityModalOpen}
        isLoading={isQualityLoading}
        feedback={qualityFeedback}
        primaryPhoto={photoSlots.find((s) => Boolean(s.base64Data)) || null}
        totalPhotos={photoSlots.filter((s) => Boolean(s.base64Data)).length}
        onConfirmStart={handleConfirmStartAnalysis}
        onBackToUpload={() => setIsQualityModalOpen(false)}
      />

      {/* Processing AI Overlay */}
      {isAnalyzing && (
        <ProcessingOverlay
          currentStepText={analysisProgress.text}
          percent={analysisProgress.percent}
        />
      )}
    </div>
  );
}

