import React from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Eye, Camera, Sun, Moon, Globe } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';

interface NavbarProps {
  currentStep: 'landing' | 'upload' | 'report';
  onGoHome: () => void;
  onStartAnalysis: () => void;
  onLoadSample: () => void;
  onClearImages: () => void;
  hasPhotos: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onGoHome,
  onStartAnalysis,
  onLoadSample,
  onClearImages,
  hasPhotos,
}) => {
  const { theme, toggleTheme, language, setLanguage, t } = useApp();

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-[#1A1A1A]/10 bg-[#FBF9F6]/95 backdrop-blur-md transition-colors dark:border-[#383633] dark:bg-[#141413]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <button
          id="nav-brand-btn"
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-85 focus:outline-none"
        >
          <div className="flex h-8 w-8 items-center justify-center border border-[#1A1A1A] bg-[#1A1A1A] text-[#FBF9F6] dark:border-[#ECEAE5] dark:bg-[#ECEAE5] dark:text-[#141413]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="font-serif text-lg font-normal tracking-tight uppercase text-[#1A1A1A] sm:text-xl dark:text-[#ECEAE5]">
              {t('appTitle')}
            </span>
            <span className="ml-2 hidden border border-[#1A1A1A]/20 px-1.5 py-0.5 text-[9px] font-bold tracking-[0.2em] text-[#1A1A1A]/70 uppercase sm:inline-block dark:border-[#ECEAE5]/20 dark:text-[#ECEAE5]/70">
              {t('aiSubtitle')}
            </span>
          </div>
        </button>

        {/* Center: Status / Privacy info */}
        <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[#1A1A1A]/60 lg:flex dark:text-[#ECEAE5]/60">
          <ShieldCheck className="h-3.5 w-3.5 text-[#1A1A1A] dark:text-[#ECEAE5]" />
          <span>{t('privacyActive')}</span>
        </div>

        {/* Right Controls: Language Selector, Theme Toggle & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher (PT / EN) */}
          <div
            id="nav-language-selector"
            className="flex items-center border border-[#1A1A1A]/20 bg-[#EFEEEA]/60 p-0.5 text-[10px] font-medium uppercase tracking-wider dark:border-[#383633] dark:bg-[#1E1D1B]"
            role="group"
            aria-label={t('languageSelector')}
          >
            <button
              id="nav-lang-pt-btn"
              onClick={() => setLanguage('pt')}
              className={`px-2 py-1 transition-colors ${
                language === 'pt'
                  ? 'bg-[#1A1A1A] text-white font-bold dark:bg-[#ECEAE5] dark:text-[#141413]'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] dark:text-[#ECEAE5]/60 dark:hover:text-[#ECEAE5]'
              }`}
              title="Português (Brasil)"
            >
              PT
            </button>
            <button
              id="nav-lang-en-btn"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 transition-colors ${
                language === 'en'
                  ? 'bg-[#1A1A1A] text-white font-bold dark:bg-[#ECEAE5] dark:text-[#141413]'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] dark:text-[#ECEAE5]/60 dark:hover:text-[#ECEAE5]'
              }`}
              title="English (US)"
            >
              EN
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            id="nav-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
            title={theme === 'dark' ? t('themeLight') : t('themeDark')}
            className="flex h-8 w-8 items-center justify-center border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] transition-colors hover:bg-[#EFEEEA] focus:outline-none dark:border-[#383633] dark:bg-[#1E1D1B] dark:text-[#ECEAE5] dark:hover:bg-[#272523]"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[#F3E8B5]" />
            ) : (
              <Moon className="h-4 w-4 text-[#1A1A1A]" />
            )}
          </button>

          {/* Action Buttons */}
          {currentStep === 'landing' ? (
            <>
              <button
                id="nav-load-sample-btn"
                onClick={onLoadSample}
                className="hidden sm:flex items-center gap-1.5 border border-[#1A1A1A] bg-transparent px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-[#1A1A1A] hover:text-white dark:border-[#ECEAE5]/40 dark:text-[#ECEAE5] dark:hover:bg-[#ECEAE5] dark:hover:text-[#141413]"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{t('viewSample')}</span>
              </button>
              <button
                id="nav-start-btn"
                onClick={onStartAnalysis}
                className="flex items-center gap-1.5 bg-[#1A1A1A] px-3.5 py-1.5 text-[10px] font-medium tracking-widest text-white uppercase transition-colors hover:bg-[#2A2A2A] dark:bg-[#ECEAE5] dark:text-[#141413] dark:hover:bg-[#DCD9D3]"
              >
                <Camera className="h-3.5 w-3.5" />
                <span>{t('startAnalysis')}</span>
              </button>
            </>
          ) : currentStep === 'report' ? (
            <>
              <button
                id="nav-new-analysis-btn"
                onClick={onStartAnalysis}
                className="flex items-center gap-1.5 border border-[#1A1A1A] bg-transparent px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-[#1A1A1A] hover:text-white dark:border-[#ECEAE5]/40 dark:text-[#ECEAE5] dark:hover:bg-[#ECEAE5] dark:hover:text-[#141413]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t('newAnalysis')}</span>
              </button>
              {hasPhotos && (
                <button
                  id="nav-clear-images-btn"
                  onClick={onClearImages}
                  title={language === 'en' ? 'Delete photos from memory for privacy' : 'Excluir fotos da memória por privacidade'}
                  className="border border-[#1A1A1A]/20 bg-[#EFEEEA] px-2.5 sm:px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 dark:border-[#383633] dark:bg-[#1E1D1B] dark:text-[#ECEAE5]/80 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
                >
                  <span className="hidden sm:inline">{t('deletePhotos')}</span>
                  <span className="sm:hidden">{language === 'en' ? 'Delete' : 'Excluir'}</span>
                </button>
              )}
            </>
          ) : (
            <button
              id="nav-back-home-btn"
              onClick={onGoHome}
              className="border border-[#1A1A1A] px-3 py-1.5 text-[10px] font-medium tracking-widest text-[#1A1A1A] uppercase transition-colors hover:bg-[#1A1A1A] hover:text-white dark:border-[#ECEAE5]/40 dark:text-[#ECEAE5] dark:hover:bg-[#ECEAE5] dark:hover:text-[#141413]"
            >
              {t('home')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
