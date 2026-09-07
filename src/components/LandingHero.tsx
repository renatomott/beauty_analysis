import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Shield,
  FileText,
  Layers,
  Camera,
  CheckCircle2,
  ScanEye,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';

interface LandingHeroProps {
  onStart: () => void;
  onViewSample: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart, onViewSample }) => {
  const { t, language } = useApp();

  return (
    <div className="relative overflow-hidden py-12 sm:py-20 lg:py-24 transition-colors">
      {/* Decorative background grid line accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center opacity-40 dark:opacity-20">
        <div className="h-full w-full max-w-6xl border-x border-[#1A1A1A]/10 dark:border-[#ECEAE5]/10" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 border border-[#1A1A1A]/20 bg-white px-3 py-1 shadow-xs dark:border-[#383633] dark:bg-[#1E1D1B]">
          <Sparkles className="h-3 w-3 text-[#1A1A1A] dark:text-[#ECEAE5]" />
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
            {t('heroTag')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif mt-6 text-4xl font-normal tracking-tight uppercase text-[#1A1A1A] sm:text-6xl sm:leading-[1.1] dark:text-[#ECEAE5]">
          {t('heroTitlePart1')}{' '}
          <span className="italic font-serif underline decoration-[#1A1A1A]/30 decoration-1 underline-offset-8 dark:decoration-[#ECEAE5]/30">
            {t('heroTitlePart2')}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-xs sm:text-sm tracking-wider uppercase opacity-75 leading-relaxed text-[#1A1A1A] dark:text-[#ECEAE5]">
          {t('heroSubtitle')}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            id="landing-cta-start-btn"
            onClick={onStart}
            className="flex w-full items-center justify-center gap-2 bg-[#1A1A1A] px-6 py-3 text-[10px] font-medium tracking-widest text-white uppercase transition-colors hover:bg-[#2A2A2A] sm:w-auto dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-[#DCD9D3]"
          >
            <span>{t('heroCtaStart')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            id="landing-cta-sample-btn"
            onClick={onViewSample}
            className="flex w-full items-center justify-center gap-2 border border-[#1A1A1A] bg-transparent px-6 py-3 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-[#1A1A1A] hover:text-white sm:w-auto dark:border-[#ECEAE5]/40 dark:text-[#ECEAE5] dark:hover:bg-[#ECEAE5] dark:hover:text-[#141413]"
          >
            <ScanEye className="h-3.5 w-3.5" />
            <span>{t('heroCtaSample')}</span>
          </button>
        </div>

        {/* Editorial quote block */}
        <div className="mx-auto mt-12 max-w-xl border border-[#1A1A1A]/10 bg-[#EFEEEA]/60 p-5 dark:border-[#383633] dark:bg-[#1E1D1B]">
          <p className="font-serif text-lg italic text-[#1A1A1A] sm:text-xl dark:text-[#ECEAE5]">
            {t('quoteText')}
          </p>
          <p className="mt-2 text-[9px] tracking-[0.2em] font-bold text-[#1A1A1A]/60 uppercase dark:text-[#ECEAE5]/60">
            {t('quoteAuthor')}
          </p>
        </div>

        {/* Pillar Features */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
          <div className="border border-[#1A1A1A]/10 bg-white p-5 dark:border-[#383633] dark:bg-[#1E1D1B]">
            <div className="flex h-7 w-7 items-center justify-center border border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
              <Layers className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-serif mt-3 text-base font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('pillar1Title')}
            </h3>
            <p className="mt-1 text-[11px] text-[#1A1A1A]/70 leading-relaxed dark:text-[#ECEAE5]/70">
              {t('pillar1Desc')}
            </p>
          </div>

          <div className="border border-[#1A1A1A]/10 bg-white p-5 dark:border-[#383633] dark:bg-[#1E1D1B]">
            <div className="flex h-7 w-7 items-center justify-center border border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-serif mt-3 text-base font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('pillar2Title')}
            </h3>
            <p className="mt-1 text-[11px] text-[#1A1A1A]/70 leading-relaxed dark:text-[#ECEAE5]/70">
              {t('pillar2Desc')}
            </p>
          </div>

          <div className="border border-[#1A1A1A]/10 bg-white p-5 dark:border-[#383633] dark:bg-[#1E1D1B]">
            <div className="flex h-7 w-7 items-center justify-center border border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-serif mt-3 text-base font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('pillar3Title')}
            </h3>
            <p className="mt-1 text-[11px] text-[#1A1A1A]/70 leading-relaxed dark:text-[#ECEAE5]/70">
              {t('pillar3Desc')}
            </p>
          </div>

          <div className="border border-[#1A1A1A]/10 bg-white p-5 dark:border-[#383633] dark:bg-[#1E1D1B]">
            <div className="flex h-7 w-7 items-center justify-center border border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
              <Shield className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-serif mt-3 text-base font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
              {t('pillar4Title')}
            </h3>
            <p className="mt-1 text-[11px] text-[#1A1A1A]/70 leading-relaxed dark:text-[#ECEAE5]/70">
              {t('pillar4Desc')}
            </p>
          </div>
        </div>

        {/* How it works grid */}
        <div className="mt-14 border border-[#1A1A1A]/10 bg-[#EFEEEA]/60 p-6 text-left sm:p-8 dark:border-[#383633] dark:bg-[#1E1D1B]">
          <div className="mb-6 flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3 dark:border-[#383633]">
            <div className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#1A1A1A] uppercase dark:text-[#ECEAE5]">
                {t('howItWorksTitle')}
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/60 dark:text-[#ECEAE5]/60">
              {language === 'en' ? 'Biometric Pipeline' : 'Fluxo Biométrico'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-[#1A1A1A]/10 bg-white p-4 dark:border-[#383633] dark:bg-[#141413]">
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
                {t('step1Title')}
              </h4>
              <p className="mt-1.5 text-[10px] text-[#1A1A1A]/70 leading-relaxed dark:text-[#ECEAE5]/70">
                {t('step1Desc')}
              </p>
            </div>
            <div className="border border-[#1A1A1A]/10 bg-white p-4 dark:border-[#383633] dark:bg-[#141413]">
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
                {t('step2Title')}
              </h4>
              <p className="mt-1.5 text-[10px] text-[#1A1A1A]/70 leading-relaxed dark:text-[#ECEAE5]/70">
                {t('step2Desc')}
              </p>
            </div>
            <div className="border border-[#1A1A1A]/10 bg-white p-4 dark:border-[#383633] dark:bg-[#141413]">
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
                {t('step3Title')}
              </h4>
              <p className="mt-1.5 text-[10px] text-[#1A1A1A]/70 leading-relaxed dark:text-[#ECEAE5]/70">
                {t('step3Desc')}
              </p>
            </div>
            <div className="border border-[#1A1A1A]/10 bg-white p-4 dark:border-[#383633] dark:bg-[#141413]">
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#1A1A1A] dark:text-[#ECEAE5]">
                {t('step4Title')}
              </h4>
              <p className="mt-1.5 text-[10px] text-[#1A1A1A]/70 leading-relaxed dark:text-[#ECEAE5]/70">
                {t('step4Desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
