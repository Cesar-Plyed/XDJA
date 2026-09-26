import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__grid">
          <div className="footer__section">
            <h3 className="footer__title">Contact Us</h3>
            <p className="footer__text">
              <a href="tel:+15743046758" className="footer__link">
                (574) 304-6758
              </a>
            </p>
            <p className="footer__text">
              <a href="mailto:xdjaconstructionllc@gmail.com" className="footer__link">
                xdjaconstructionllc@gmail.com
              </a>
            </p>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">Follow Us</h3>
            <div className="footer__social">
              <a
                href="https://www.facebook.com/xdjaconstructionllc?mibextid=LQQJ4d"
                className="footer__social-link footer__social-link--facebook"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://wa.me/+15743046758"
                className="footer__social-link footer__social-link--whatsapp"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} XDJA Construction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
