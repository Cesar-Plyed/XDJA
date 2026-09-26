import React from 'react';
import '../styles/popup.scss';

interface PopupProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" onClick={onClose} aria-label="Close popup">
          ×
        </button>
        <div className="popup__content">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
