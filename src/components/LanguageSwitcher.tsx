import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/languageSwitcher.scss';

const LanguageSwitcher: FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="language-switcher">
      <button
        className={`language-switcher__btn ${locale === 'es' ? 'language-switcher__btn--active' : ''}`}
        onClick={() => setLocale('es')}
        aria-label="Switch to Spanish"
        title="Español"
      >
        ES
      </button>
      <button
        className={`language-switcher__btn ${locale === 'en' ? 'language-switcher__btn--active' : ''}`}
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
