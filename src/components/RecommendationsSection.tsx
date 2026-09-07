import React from 'react';
import {
  Sparkles,
  Sun,
  Eye,
  Scissors,
  Camera,
  Linkedin,
  Instagram,
  MessageSquare,
  Briefcase,
} from 'lucide-react';
import { ProfessionalPhotoAdvice } from '../types';
import { useApp } from '../context/ThemeLanguageContext';

interface RecommendationsSectionProps {
  skincare: string[];
  eyes: string[];
  hairBeard: string[];
  stylePhotography: string[];
  professionalPhoto: ProfessionalPhotoAdvice;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  skincare,
  eyes,
  hairBeard,
  stylePhotography,
  professionalPhoto,
}) => {
  const { t } = useApp();

  return (
    <div className="space-y-8">
      {/* 4 Columns Practical Recommendations */}
      <div className="border border-[#1A1A1A]/10 bg-white p-5 sm:p-8 transition-colors dark:border-[#383633] dark:bg-[#1E1D1B]">
        <div className="border-b border-[#1A1A1A]/10 pb-4 dark:border-[#383633]">
          <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
            {t('personalCareGuideTag')}
          </span>
          <h3 className="font-serif text-2xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
            {t('practicalRecommendationsTitle')}
          </h3>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1A1A1A]/10 dark:divide-[#383633]">
          {/* Column 1: Skincare */}
          <div className="pt-4 sm:pt-0 sm:px-4 first:pl-0">
            <div className="flex items-center gap-2 text-[#1A1A1A] dark:text-[#ECEAE5] font-bold text-[10px] tracking-widest uppercase mb-3">
              <Sun className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span>{t('recSkincareTab')}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
              {skincare.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#1A1A1A]/40 dark:text-[#ECEAE5]/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Olhar */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-2 text-[#1A1A1A] dark:text-[#ECEAE5] font-bold text-[10px] tracking-widest uppercase mb-3">
              <Eye className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span>{t('recEyesTab')}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
              {eyes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#1A1A1A]/40 dark:text-[#ECEAE5]/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Cabelo / Barba */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-2 text-[#1A1A1A] dark:text-[#ECEAE5] font-bold text-[10px] tracking-widest uppercase mb-3">
              <Scissors className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span>{t('recHairBeardTab')}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
              {hairBeard.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#1A1A1A]/40 dark:text-[#ECEAE5]/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Estilo & Beleza */}
          <div className="pt-4 sm:pt-0 sm:px-4 last:pr-0">
            <div className="flex items-center gap-2 text-[#1A1A1A] dark:text-[#ECEAE5] font-bold text-[10px] tracking-widest uppercase mb-3">
              <Sparkles className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span>{t('recStyleTab')}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80">
              {stylePhotography.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#1A1A1A]/40 dark:text-[#ECEAE5]/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Profile Photography Section */}
      <div className="border border-[#1A1A1A]/10 bg-white p-5 sm:p-8 transition-colors dark:border-[#383633] dark:bg-[#1E1D1B]">
        <div className="border-b border-[#1A1A1A]/10 pb-4 dark:border-[#383633]">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-[#1A1A1A] dark:text-[#ECEAE5]" />
            <span className="text-[9px] font-bold tracking-[0.2em] opacity-60 text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
              {t('portraitDirectionTag')}
            </span>
          </div>
          <h3 className="font-serif mt-1 text-2xl font-normal uppercase tracking-tight text-[#1A1A1A] dark:text-[#ECEAE5]">
            {t('photoDirectionTitle')}
          </h3>
          <p className="mt-1 text-xs text-[#1A1A1A]/70 dark:text-[#ECEAE5]/70">
            {t('photoDirectionDesc')}
          </p>
        </div>

        {/* General Direction Specs */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/40 p-4 dark:border-[#383633] dark:bg-[#272523]/50">
            <span className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/60 uppercase dark:text-[#ECEAE5]/60">
              {t('bestAngleLabel')}
            </span>
            <p className="font-serif mt-1 text-base font-normal italic text-[#1A1A1A] dark:text-[#ECEAE5]">
              {professionalPhoto.bestAngle}
            </p>
          </div>

          <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/40 p-4 dark:border-[#383633] dark:bg-[#272523]/50">
            <span className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/60 uppercase dark:text-[#ECEAE5]/60">
              {t('idealSmileLabel')}
            </span>
            <p className="font-serif mt-1 text-base font-normal italic text-[#1A1A1A] dark:text-[#ECEAE5]">
              {professionalPhoto.smileAmount}
            </p>
          </div>

          <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/40 p-4 dark:border-[#383633] dark:bg-[#272523]/50">
            <span className="text-[9px] font-bold tracking-widest text-[#1A1A1A]/60 uppercase dark:text-[#ECEAE5]/60">
              {t('lightingBgLabel')}
            </span>
            <p className="font-serif mt-1 text-base font-normal italic text-[#1A1A1A] dark:text-[#ECEAE5]">
              {professionalPhoto.lighting}
            </p>
          </div>
        </div>

        {/* Platform-Specific Recommendations Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* LinkedIn */}
          <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/20 p-4 dark:border-[#383633] dark:bg-[#272523]/30">
            <div className="flex items-center gap-2 text-[#1A1A1A] dark:text-[#ECEAE5] font-bold text-[10px] uppercase tracking-wider mb-2">
              <Linkedin className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span>LinkedIn</span>
            </div>
            <p className="text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80 leading-relaxed">
              {professionalPhoto.linkedinAdvice}
            </p>
          </div>

          {/* Instagram */}
          <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/20 p-4 dark:border-[#383633] dark:bg-[#272523]/30">
            <div className="flex items-center gap-2 text-[#1A1A1A] dark:text-[#ECEAE5] font-bold text-[10px] uppercase tracking-wider mb-2">
              <Instagram className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span>Instagram</span>
            </div>
            <p className="text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80 leading-relaxed">
              {professionalPhoto.instagramAdvice}
            </p>
          </div>

          {/* WhatsApp */}
          <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/20 p-4 dark:border-[#383633] dark:bg-[#272523]/30">
            <div className="flex items-center gap-2 text-[#1A1A1A] dark:text-[#ECEAE5] font-bold text-[10px] uppercase tracking-wider mb-2">
              <MessageSquare className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span>WhatsApp / Avatar</span>
            </div>
            <p className="text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80 leading-relaxed">
              {professionalPhoto.whatsappAdvice}
            </p>
          </div>

          {/* Corporativo / Site */}
          <div className="border border-[#1A1A1A]/10 bg-[#EFEEEA]/20 p-4 dark:border-[#383633] dark:bg-[#272523]/30">
            <div className="flex items-center gap-2 text-[#1A1A1A] dark:text-[#ECEAE5] font-bold text-[10px] uppercase tracking-wider mb-2">
              <Briefcase className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span>{t('executiveProfileLabel')}</span>
            </div>
            <p className="text-xs text-[#1A1A1A]/80 dark:text-[#ECEAE5]/80 leading-relaxed">
              {professionalPhoto.corporateAdvice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
