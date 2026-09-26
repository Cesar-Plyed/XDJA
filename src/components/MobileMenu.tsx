import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/mobileMenu.scss';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: 'Inicio', href: '#home' },
    { label: 'Nosotros', href: '#about' },
    { label: 'Servicios', href: '#services' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <>
      {isOpen && <div className="mobile-menu-overlay" onClick={onClose} />}
      <nav className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-menu__list">
          {menuItems.map((item) => (
            <li key={item.label} className="mobile-menu__item">
              <a
                href={item.href}
                className="mobile-menu__link"
                onClick={onClose}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu;
