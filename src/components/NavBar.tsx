import { FC, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { iconLd } from '../assets/Icon/iconLoad';
import Popup from './Popup';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { useResponsive } from '../hooks/useResponsive';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/navBar.scss';

const NavBar: FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isMobile } = useResponsive();
  const { t } = useI18n();
  const icon: string = iconLd.src;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="navbar">
      <header className="navbar__header">
        <div className="navbar__logo">
          <LazyLoadImage
            src={icon}
            alt="XDJA Logo"
            width={100}
            height={100}
            className={`navbar__logo-img navbar__logo-img--${isMobile ? 'mobile' : 'desktop'}`}
            onClick={togglePopup}
            title="Click to learn more about XDJA"
          />
        </div>

        {isMobile && (
          <button
            className={`navbar__hamburger ${showMobileMenu ? 'navbar__hamburger--open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={showMobileMenu}
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        )}
      </header>

      {isMobile && <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />}

      {!isMobile && (
        <nav className="navbar__desktop-menu">
          <a href="#home" className="navbar__link">{t('nav.home')}</a>
          <a href="#about" className="navbar__link">{t('nav.about')}</a>
          <a href="#services" className="navbar__link">{t('nav.services')}</a>
          <a href="#portfolio" className="navbar__link">{t('nav.portfolio')}</a>
          <a href="#contact" className="navbar__link">{t('nav.contact')}</a>
        </nav>
      )}

      {!isMobile && <LanguageSwitcher />}

      {showPopup && (
        <Popup show={showPopup} onClose={togglePopup}>
          <div className="popup__body">
            <h2>Welcome to XDJA</h2>
            <p>We are experts in construction and space renovation with criteria, safety and clarity.</p>
            <p>Contact us to learn more about our services.</p>
          </div>
        </Popup>
      )}
    </nav>
  );
};

export default NavBar;
