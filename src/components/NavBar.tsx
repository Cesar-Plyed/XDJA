import { FC, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { iconLd } from '../assets/Icon/iconLoad';
import Popup from './Popup';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/navBar.scss';

const NavBar: FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { isMobile } = useResponsive();
  const icon: string = iconLd.src;

  const togglePopup = () => {
    setShowPopup(!showPopup);
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
          />
        </div>
      </header>
      {showPopup && (
        <Popup show={showPopup} onClose={togglePopup}>
          <p>Thank you for visiting us.</p>
        </Popup>
      )}
    </nav>
  );
};

export default NavBar;
