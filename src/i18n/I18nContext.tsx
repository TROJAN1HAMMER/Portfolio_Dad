import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LanguageCode, TranslationDictionary, LanguageOption } from './types';
import { SUPPORTED_LANGUAGES } from './types';
import { en } from './translations/en';
import { hi } from './translations/hi';
import { ml } from './translations/ml';
import { kn } from './translations/kn';
import { ta } from './translations/ta';
import { BUSINESS_CONFIG } from '../config/business';

const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en,
  hi,
  ml,
  kn,
  ta,
};

const STORAGE_KEY = 'agentbalu_selected_language';

interface I18nContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;
  supportedLanguages: LanguageOption[];
  buildLocalizedWhatsAppUrl: (categoryKey?: string, organization?: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') as LanguageCode | null;
      if (urlLang && TRANSLATIONS[urlLang]) {
        return urlLang;
      }
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    if (TRANSLATIONS[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (err) {
        // LocalStorage access issues handled gracefully
      }
    }
  };

  const currentTranslation = TRANSLATIONS[language] || en;

  // Dynamically update document.documentElement.lang and SEO title & meta description
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      if (currentTranslation.meta) {
        document.title = currentTranslation.meta.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', currentTranslation.meta.description);
        }
      }
    }
  }, [language, currentTranslation]);

  // Builds localized WhatsApp inquiry URL
  const buildLocalizedWhatsAppUrl = (categoryKey?: string, organization?: string): string => {
    const base = `https://wa.me/91${BUSINESS_CONFIG.advisor.phoneRaw}`;
    let message = currentTranslation.whatsappMessages.generalGreeting;
    if (categoryKey) {
      message = currentTranslation.whatsappMessages.categoryInquiry(categoryKey, organization);
    }
    return `${base}?text=${encodeURIComponent(message)}`;
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: currentTranslation,
        supportedLanguages: SUPPORTED_LANGUAGES,
        buildLocalizedWhatsAppUrl,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
