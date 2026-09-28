import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import translations from './translations.json';
import { type Locale, I18nContext } from './useI18n';

const STORAGE_KEY = 'xdja-locale';

const isLocale = (value: unknown): value is Locale => value === 'es' || value === 'en';

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem(STORAGE_KEY);
  return isLocale(saved) ? saved : 'en';
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const value = key
        .split('.')
        .reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], translations[locale]);
      const text = typeof value === 'string' ? value : key;
      return params ? text.replace(/\{(\w+)\}/g, (match, name: string) => String(params[name] ?? match)) : text;
    },
    [locale]
  );

  const contextValue = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}