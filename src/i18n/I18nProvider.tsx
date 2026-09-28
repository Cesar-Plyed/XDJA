import { useState, ReactNode, useEffect } from 'react';
import translations from './translations.json';
import { type Locale, I18nContext } from './useI18n';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('xdja-locale');
    return (saved as Locale) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('xdja-locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[locale];

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k] ?? key;
    }

    return (value as string) || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
