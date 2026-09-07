import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Data: string) => void;
  tagLabel: string;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  tagLabel,
}) => {
  const { language } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedImage(null);
      setCameraError(null);
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setIsLoading(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsLoading(false);
    } catch (err: any) {
      console.error('Erro ao acessar a câmera:', err);
      setCameraError(
        language === 'en'
          ? 'Unable to access device camera. Please verify your browser permissions.'
          : 'Não foi possível acessar a câmera do dispositivo. Verifique as permissões de acesso do navegador.'
      );
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleTakeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Mirror image for natural selfie feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg overflow-hidden border border-[#1A1A1A]/30 dark:border-[#383633] bg-[#FBF9F6] dark:bg-[#1E1D1B] shadow-2xl transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 px-5 py-4 dark:border-[#383633]">
          <div>
            <h3 className="font-serif text-lg font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
              {language === 'en' ? 'Capture Photo with Camera' : 'Capturar Foto com a Câmera'}
            </h3>
            <p className="text-xs text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
              Slot: <span className="font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">{tagLabel}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors dark:text-[#ECEAE5]/60 dark:hover:text-[#ECEAE5]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Video / Snapshot Area */}
        <div className="relative flex aspect-4/3 w-full items-center justify-center bg-black overflow-hidden">
          {cameraError ? (
            <div className="p-6 text-center text-xs text-white/80">
              <p className="text-rose-300 font-medium">{cameraError}</p>
              <button
                onClick={startCamera}
                className="mt-4 border border-white/40 bg-white/10 px-4 py-2 text-[10px] uppercase tracking-widest text-white hover:bg-white/20"
              >
                {language === 'en' ? 'Try Again' : 'Tentar Novamente'}
              </button>
            </div>
          ) : capturedImage ? (
            <img
              src={capturedImage}
              alt="Foto Capturada"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover -scale-x-100"
              />
              {/* Face Positioning Guide Overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-64 w-48 rounded-[50%] border-2 border-dashed border-white/60 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]" />
                <span className="absolute bottom-4 text-[10px] font-bold tracking-widest uppercase text-white bg-black/80 px-3 py-1">
                  {language === 'en' ? 'Position face within the guide' : 'Posicione seu rosto dentro da demarcação'}
                </span>
              </div>
            </>
          )}

          {isLoading && !cameraError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white/70 text-xs">
              {language === 'en' ? 'Starting camera...' : 'Iniciando câmera...'}
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between border-t border-[#1A1A1A]/10 px-5 py-4 bg-[#EFEEEA]/60 dark:border-[#383633] dark:bg-[#141413]">
          <button
            type="button"
            onClick={onClose}
            className="border border-[#1A1A1A]/30 bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A] hover:bg-[#EFEEEA] transition-colors dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5] dark:hover:bg-[#383633]"
          >
            {language === 'en' ? 'Cancel' : 'Cancelar'}
          </button>

          {capturedImage ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRetake}
                className="flex items-center gap-1.5 border border-[#1A1A1A]/30 bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A] hover:bg-[#EFEEEA] transition-colors dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5] dark:hover:bg-[#383633]"
              >
                <RefreshCw className="h-3 w-3" />
                <span>{language === 'en' ? 'Retake' : 'Tirar Outra'}</span>
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex items-center gap-1.5 border border-[#1A1A1A] bg-[#1A1A1A] px-5 py-2 text-[10px] font-medium uppercase tracking-widest text-white shadow-xs hover:bg-black transition-colors dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-white"
              >
                <Check className="h-3 w-3" />
                <span>{language === 'en' ? 'Use Photo' : 'Usar Esta Foto'}</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={Boolean(cameraError) || isLoading}
              onClick={handleTakeSnapshot}
              className="flex items-center gap-2 border border-[#1A1A1A] bg-[#1A1A1A] px-6 py-2.5 text-[10px] font-medium uppercase tracking-widest text-white shadow-xs hover:bg-black disabled:opacity-50 transition-colors dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-white"
            >
              <Camera className="h-3.5 w-3.5" />
              <span>{language === 'en' ? 'Capture Photo' : 'Capturar Foto'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
