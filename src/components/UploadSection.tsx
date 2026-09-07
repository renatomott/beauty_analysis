import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Sparkles,
  ArrowRight,
  User,
} from 'lucide-react';
import { PhotoSlot } from '../types';
import { readFileAsBase64 } from '../utils/imageUtils';
import { CameraCaptureModal } from './CameraCaptureModal';
import { useApp } from '../context/ThemeLanguageContext';

interface UploadSectionProps {
  photoSlots: PhotoSlot[];
  onUpdateSlots: (slots: PhotoSlot[]) => void;
  onProceedToQualityCheck: () => void;
  onLoadDemoPhoto: () => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  photoSlots,
  onUpdateSlots,
  onProceedToQualityCheck,
  onLoadDemoPhoto,
}) => {
  const { t, language } = useApp();
  const [activeCameraSlotIndex, setActiveCameraSlotIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetSlotForUpload, setTargetSlotForUpload] = useState<number | null>(null);

  const filledCount = photoSlots.filter((s) => Boolean(s.base64Data)).length;

  const handleFilesSelected = async (files: FileList | null, slotIndex?: number) => {
    if (!files || files.length === 0) return;

    const newSlots = [...photoSlots];
    const incomingFiles = Array.from(files).slice(0, 6);

    for (let i = 0; i < incomingFiles.length; i++) {
      const file = incomingFiles[i];
      if (!file.type.startsWith('image/')) continue;

      try {
        const { base64, mimeType } = await readFileAsBase64(file);
        const targetIdx =
          slotIndex !== undefined && i === 0
            ? slotIndex
            : newSlots.findIndex((s) => !s.base64Data);

        if (targetIdx !== -1 && targetIdx < newSlots.length) {
          newSlots[targetIdx] = {
            ...newSlots[targetIdx],
            file,
            previewUrl: base64,
            base64Data: base64,
            mimeType,
          };
        }
      } catch (err) {
        console.error('Falha ao processar arquivo:', err);
      }
    }

    onUpdateSlots(newSlots);
  };

  const handleRemovePhoto = (slotIndex: number) => {
    const newSlots = [...photoSlots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      file: undefined,
      previewUrl: '',
      base64Data: '',
    };
    onUpdateSlots(newSlots);
  };

  const handleTriggerUpload = (slotIndex: number) => {
    setTargetSlotForUpload(slotIndex);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleCameraCapture = (base64Data: string) => {
    if (activeCameraSlotIndex === null) return;
    const newSlots = [...photoSlots];
    newSlots[activeCameraSlotIndex] = {
      ...newSlots[activeCameraSlotIndex],
      previewUrl: base64Data,
      base64Data,
      mimeType: 'image/jpeg',
    };
    onUpdateSlots(newSlots);
    setActiveCameraSlotIndex(null);
  };

  const getSlotDisplayLabel = (index: number) => {
    const enTags = [
      'Neutral Frontal',
      'Smiling Frontal',
      'Left Profile',
      'Right Profile',
      'Left 3/4 Angle',
      'Right 3/4 Angle',
    ];
    return language === 'en' ? enTags[index] || `Photo ${index + 1}` : photoSlots[index]?.tag || `Foto ${index + 1}`;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 transition-colors">
      {/* Hidden generic file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={targetSlotForUpload === null}
        className="hidden"
        onChange={(e) => {
          handleFilesSelected(e.target.files, targetSlotForUpload ?? undefined);
          setTargetSlotForUpload(null);
        }}
      />

      {/* Header */}
      <div className="text-center">
        <span className="border border-[#1A1A1A]/20 bg-white px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-[#1A1A1A] uppercase dark:border-[#383633] dark:bg-[#1E1D1B] dark:text-[#ECEAE5]">
          {t('uploadStepIndicator')}
        </span>
        <h2 className="font-serif mt-3 text-3xl font-normal uppercase tracking-tight text-[#1A1A1A] sm:text-4xl dark:text-[#ECEAE5]">
          {t('uploadTitle')}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-[#1A1A1A]/70 dark:text-[#ECEAE5]/70">
          {t('uploadSubtitle')}
        </p>
      </div>

      {/* Main Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFilesSelected(e.dataTransfer.files);
        }}
        className={`mt-8 border-2 border-dashed p-6 text-center transition-all sm:p-10 ${
          isDragging
            ? 'border-[#1A1A1A] bg-[#EFEEEA]/80 scale-[1.01] dark:border-[#ECEAE5] dark:bg-[#1E1D1B]'
            : 'border-[#1A1A1A]/20 bg-white hover:border-[#1A1A1A]/40 dark:border-[#383633] dark:bg-[#1E1D1B] dark:hover:border-[#504D48]'
        }`}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
          <UploadCloud className="h-6 w-6" />
        </div>
        <h3 className="font-serif mt-4 text-xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
          {t('dropzonePrompt')}
        </h3>
        <p className="mt-1 text-xs text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
          {t('dropzoneSupported')}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            id="upload-choose-files-btn"
            onClick={() => handleTriggerUpload(photoSlots.findIndex((s) => !s.base64Data))}
            className="flex items-center gap-2 border border-[#1A1A1A] bg-[#1A1A1A] px-5 py-2.5 text-[10px] font-medium uppercase tracking-widest text-white shadow-xs hover:bg-black transition-colors dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-[#DCD9D3]"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            <span>{t('chooseFilesBtn')}</span>
          </button>
          <button
            type="button"
            id="upload-camera-btn"
            onClick={() => setActiveCameraSlotIndex(photoSlots.findIndex((s) => !s.base64Data) || 0)}
            className="flex items-center gap-2 border border-[#1A1A1A] bg-white px-5 py-2.5 text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A] hover:bg-[#EFEEEA] transition-colors dark:border-[#383633] dark:bg-[#141413] dark:text-[#ECEAE5] dark:hover:bg-[#272523]"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>{t('useCameraBtn')}</span>
          </button>
          <button
            type="button"
            id="upload-sample-ref-btn"
            onClick={onLoadDemoPhoto}
            className="flex items-center gap-1.5 border border-[#1A1A1A]/20 bg-[#EFEEEA] px-4 py-2.5 text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A] hover:bg-[#EFEEEA]/80 transition-colors dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5] dark:hover:bg-[#383633]"
          >
            <Sparkles className="h-3 w-3 text-[#1A1A1A] dark:text-[#ECEAE5]" />
            <span>{t('useSamplePhotoBtn')}</span>
          </button>
        </div>
      </div>

      {/* Multi-angle slots grid */}
      <div className="mt-10">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-serif text-lg font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('recommendedAnglesTitle')} ({filledCount}/6)
            </h3>
            <p className="text-xs text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
              {t('anglesDescription')}
            </p>
          </div>
          {/* Confidence meter tag */}
          <div className="flex items-center gap-2 border border-[#1A1A1A]/15 bg-[#EFEEEA] px-3 py-1 text-[10px] uppercase tracking-wider text-[#1A1A1A] dark:border-[#383633] dark:bg-[#1E1D1B] dark:text-[#ECEAE5]">
            <Info className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
            <span>
              {language === 'en' ? 'Analysis confidence:' : 'Confiabilidade da análise:'}{' '}
              <strong className="font-bold text-[#1A1A1A] dark:text-[#ECEAE5]">
                {filledCount === 0
                  ? (language === 'en' ? 'Awaiting photos' : 'Aguardando fotos')
                  : filledCount === 1
                  ? (language === 'en' ? 'Good (Single angle)' : 'Boa (Ângulo único)')
                  : filledCount < 4
                  ? (language === 'en' ? 'High (Multiple angles)' : 'Alta (Múltiplas perspectivas)')
                  : (language === 'en' ? 'Excellent (Full 3D profile)' : 'Excelente (Consistência total)')}
              </strong>
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {photoSlots.map((slot, index) => {
            const hasImage = Boolean(slot.base64Data);
            const isPrimary = index === 0;
            const displayLabel = getSlotDisplayLabel(index);

            return (
              <div
                key={slot.id}
                className={`relative flex flex-col justify-between border p-2.5 transition-all ${
                  hasImage
                    ? 'border-[#1A1A1A] bg-white shadow-xs dark:border-[#ECEAE5]/40 dark:bg-[#1E1D1B]'
                    : isPrimary
                    ? 'border-[#1A1A1A]/40 bg-white dark:border-[#ECEAE5]/20 dark:bg-[#1E1D1B]'
                    : 'border-[#1A1A1A]/15 bg-[#EFEEEA]/40 dark:border-[#383633] dark:bg-[#141413]'
                }`}
              >
                {/* Image slot container */}
                <div className="relative aspect-3/4 w-full overflow-hidden bg-[#EFEEEA] dark:bg-[#272523]">
                  {hasImage ? (
                    <>
                      <img
                        src={slot.previewUrl}
                        alt={displayLabel}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        title={t('removePhotoTooltip')}
                        className="absolute top-1.5 right-1.5 bg-[#1A1A1A]/80 p-1 text-white hover:bg-[#1A1A1A] dark:bg-[#ECEAE5]/80 dark:text-[#141413] dark:hover:bg-[#ECEAE5]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <div className="absolute bottom-1.5 left-1.5 bg-[#1A1A1A] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white dark:bg-[#ECEAE5] dark:text-[#141413]">
                        {language === 'en' ? `Photo ${index + 1}` : `Foto ${index + 1}`}
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-2 text-center">
                      <User className="h-6 w-6 text-[#1A1A1A]/30 dark:text-[#ECEAE5]/30" />
                      <span className="mt-2 text-[10px] font-bold uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
                        {displayLabel}
                      </span>
                      {isPrimary && (
                        <span className="mt-1 border border-[#1A1A1A]/20 bg-[#EFEEEA] px-1 text-[8px] font-bold text-[#1A1A1A] uppercase tracking-wider dark:border-[#383633] dark:bg-[#272523] dark:text-[#ECEAE5]">
                          {language === 'en' ? 'Essential' : 'Essencial'}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Slot caption and action buttons */}
                <div className="mt-2 text-left">
                  <span className="block truncate text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
                    {displayLabel}
                  </span>
                  <div className="mt-2 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleTriggerUpload(index)}
                      className="flex-1 border border-[#1A1A1A]/20 bg-white py-1 text-[9px] font-medium uppercase tracking-wider text-[#1A1A1A] hover:bg-[#EFEEEA] transition-colors dark:border-[#383633] dark:bg-[#141413] dark:text-[#ECEAE5] dark:hover:bg-[#272523]"
                    >
                      {hasImage
                        ? (language === 'en' ? 'Replace' : 'Trocar')
                        : (language === 'en' ? 'File' : 'Arquivo')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCameraSlotIndex(index)}
                      title={language === 'en' ? 'Capture with camera for this slot' : 'Tirar foto com câmera para este slot'}
                      className="border border-[#1A1A1A]/20 bg-white p-1 text-[#1A1A1A] hover:bg-[#EFEEEA] transition-colors dark:border-[#383633] dark:bg-[#141413] dark:text-[#ECEAE5] dark:hover:bg-[#272523]"
                    >
                      <Camera className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guidelines reminder box */}
      <div className="mt-8 border border-[#1A1A1A]/10 bg-white p-4 text-xs text-[#1A1A1A]/80 shadow-2xs dark:border-[#383633] dark:bg-[#1E1D1B] dark:text-[#ECEAE5]/80">
        <div className="flex items-start gap-2.5">
          <HelpCircle className="h-4 w-4 shrink-0 text-[#1A1A1A] mt-0.5 dark:text-[#ECEAE5]" />
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('tipsTitle')}
            </p>
            <p>• {t('tip1')}</p>
            <p>• {t('tip2')}</p>
            <p>• {t('tip3')}</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA to Quality Check */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#1A1A1A]/10 pt-6 sm:flex-row dark:border-[#383633]">
        <div className="text-xs text-[#1A1A1A]/70 dark:text-[#ECEAE5]/70">
          {filledCount === 0 ? (
            <span className="flex items-center gap-1.5 text-amber-900 font-medium dark:text-amber-300">
              <AlertCircle className="h-4 w-4" />
              {t('addAtLeastOnePhoto')}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-emerald-900 font-medium dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              {filledCount}{' '}
              {language === 'en'
                ? 'photo(s) ready for validation.'
                : 'foto(s) pronta(s) para validação técnica.'}
            </span>
          )}
        </div>

        <button
          id="upload-proceed-btn"
          disabled={filledCount === 0}
          onClick={onProceedToQualityCheck}
          className="flex w-full items-center justify-center gap-2 border border-[#1A1A1A] bg-[#1A1A1A] px-8 py-3 text-[10px] font-medium uppercase tracking-widest text-white shadow-xs transition-all hover:bg-black disabled:opacity-40 disabled:pointer-events-none sm:w-auto dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-[#DCD9D3]"
        >
          <span>{t('proceedToQualityBtn')}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Camera Capture Modal */}
      {activeCameraSlotIndex !== null && (
        <CameraCaptureModal
          isOpen={activeCameraSlotIndex !== null}
          onClose={() => setActiveCameraSlotIndex(null)}
          onCapture={handleCameraCapture}
          tagLabel={getSlotDisplayLabel(activeCameraSlotIndex)}
        />
      )}
    </div>
  );
};
