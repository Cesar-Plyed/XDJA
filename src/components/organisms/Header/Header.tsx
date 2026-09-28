import { FC, useEffect, useState } from 'react';
import { useTheme } from '@hooks/useTheme';
import type { SectionId } from '@hooks/useSectionNavigation';
import { useI18n } from '@i18n/useI18n';
import { Typography } from '@components/atoms/Typography/Typography';
import { SectionLink } from '@components/molecules/SectionLink/SectionLink';
import { Icon } from '@components/atoms/Icon/Icon';
import { Button } from '@components/atoms/Button/Button';
import { Logo } from '@components/atoms/Logo/Logo';

const WHATSAPP_URL = 'https://wa.me/+15743046758';

const NAV_SECTIONS = [
  { id: 'about', labelKey: 'nav.about' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'portfolio', labelKey: 'nav.portfolio' },
  { id: 'reviews', labelKey: 'nav.reviews' },
  { id: 'contact', labelKey: 'nav.contact' },
] as const satisfies ReadonlyArray<{ id: SectionId; labelKey: string }>;

export const Header: FC = () => {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <SectionLink section="home" className="header__logo" aria-label={t('nav.home')} onNavigate={closeMobileMenu}>
          <Logo size={40} className="header__logo-icon" />
          <Typography variant="h4" weight="bold" className="header__logo-text">XDJA</Typography>
        </SectionLink>

        <nav className="header__nav" aria-label={t('nav.main_navigation')}>
          <ul className="header__nav-list">
            {NAV_SECTIONS.map(({ id, labelKey }) => (
              <li key={id} className="header__nav-item">
                <SectionLink section={id} className="nav-item">
                  <span className="nav-item__label">{t(labelKey)}</span>
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <div className="header__lang-switcher">
            <button
              type="button"
              className={`header__lang-btn ${locale === 'es' ? 'header__lang-btn--active' : ''}`}
              onClick={() => setLocale('es')}
              aria-pressed={locale === 'es'}
              aria-label="Español"
            >
              ES
            </button>
            <button
              type="button"
              className={`header__lang-btn ${locale === 'en' ? 'header__lang-btn--active' : ''}`}
              onClick={() => setLocale('en')}
              aria-pressed={locale === 'en'}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t('theme.switch_to_dark') : t('theme.switch_to_light')}
            className="header__theme-toggle"
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} size={20} />
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Icon name="messageSquare" size={18} />}
            onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
            className="header__cta"
          >
            {t('nav.whatsapp')}
          </Button>

          <button
            type="button"
            className="header__mobile-toggle"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? t('nav.close_menu') : t('nav.open_menu')}
          >
            <Icon name={isMobileMenuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="header__mobile-menu" role="dialog" aria-label={t('nav.mobile_menu')}>
          <nav className="header__mobile-nav">
            <ul className="header__mobile-nav-list">
              {NAV_SECTIONS.map(({ id, labelKey }) => (
                <li key={id}>
                  <SectionLink section={id} className="header__mobile-nav-link" onNavigate={closeMobileMenu}>
                    {t(labelKey)}
                  </SectionLink>
                </li>
              ))}
              <li><div className="header__mobile-divider" /></li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header__mobile-nav-link header__mobile-nav-link--cta"
                >
                  <Icon name="messageSquare" size={20} className="header__mobile-nav-icon" />
                  {t('nav.whatsapp')}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};