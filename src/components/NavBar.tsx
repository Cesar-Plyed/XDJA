import { FC, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { iconLd } from '../assets/Icon/iconLoad';
import Popup from './Popup';
import MobileMenu from './MobileMenu';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/navBar.scss';

const NavBar: FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isMobile } = useResponsive();
  const icon: string = iconLd.src;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const iconSize = isMobile ? '9vw' : '5vw';

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
          <a href="#home" className="navbar__link">Inicio</a>
          <a href="#about" className="navbar__link">Nosotros</a>
          <a href="#services" className="navbar__link">Servicios</a>
          <a href="#contact" className="navbar__link">Contacto</a>
        </nav>
      )}

      {showPopup && (
        <Popup show={showPopup} onClose={togglePopup}>
          <div className="popup__body">
            <h2>¡Bienvenido a XDJA!</h2>
            <p>Somos expertos en construcción y renovación de espacios con criterio, seguridad y claridad.</p>
            <p>Contáctanos para conocer más sobre nuestros servicios.</p>
          </div>
        </Popup>
      )}
    </nav>
  );
};

export default NavBar;
