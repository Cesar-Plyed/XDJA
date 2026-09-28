import { FC, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@hooks/useTheme';
import { useI18n } from '@i18n/useI18n';
import { Typography } from '@components/atoms/Typography/Typography';
import { NavItem } from '@components/molecules/NavItem/NavItem';
import { Icon } from '@components/atoms/Icon/Icon';
import { Button } from '@components/atoms/Button/Button';
import { Logo } from '@components/atoms/Logo/Logo';


export const Header: FC = () => {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '#about', label: t('nav.about') },
    { to: '#services', label: t('nav.services') },
    { to: '#portfolio', label: t('nav.portfolio') },
    { to: '/reviews', label: t('nav.reviews') },
    { to: '#contact', label: t('nav.contact') },
  ];

  const handleNavClick = (to: string, e: React.MouseEvent) => {
    if (to.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <NavLink to="/" className="header__logo" aria-label={t('nav.home')}>
          <Logo size={40} className="header__logo-icon" />
          <Typography variant="h4" weight="bold" className="header__logo-text">
            XDJA
          </Typography>
        </NavLink>

        <nav className="header__nav" role="navigation" aria-label={t('nav.main_navigation')}>
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.to} className="header__nav-item">
                <NavItem
                  to={item.to}
                  label={item.label}
                  onClick={(e: React.MouseEvent) => handleNavClick(item.to, e)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <div className="header__lang-switcher">
            <button
              className={`header__lang-btn ${locale === 'es' ? 'header__lang-btn--active' : ''}`}
              onClick={() => setLocale('es')}
              aria-pressed={locale === 'es'}
              aria-label="Español"
            >
              ES
            </button>
            <button
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
            onClick={() => window.open('https://wa.me/+15743046758', '_blank', 'noopener,noreferrer')}
            className="header__cta"
          >
            {t('nav.whatsapp')}
          </Button>

          <button
            className="header__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
              {navItems.map((item) => (
                <li key={item.to}>
                  <button
                    className="header__mobile-nav-link"
                    onClick={() => {
                      if (item.to.startsWith('#')) {
                        const element = document.querySelector(item.to);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        navigate(item.to);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <div className="header__mobile-divider" />
              </li>
              <li>
                <a
                  href="https://wa.me/+15743046758"
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