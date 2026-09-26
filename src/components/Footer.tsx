import { FC } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import '../styles/footer.scss';

const Footer: FC = () => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__grid">
          <div className="footer__section">
            <h3 className="footer__title">{t('footer.contact_us')}</h3>
            <p className="footer__text">
              <a href="tel:+15743046758" className="footer__link">
                +1 (574) 304-6758
              </a>
            </p>
            <p className="footer__text">
              <a href="mailto:xdjaconstructionllc@gmail.com" className="footer__link">
                xdjaconstructionllc@gmail.com
              </a>
            </p>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{t('footer.follow_us')}</h3>
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

          <div className="footer__section">
            <h3 className="footer__title">{t('footer.legal')}</h3>
            <div className="footer__links">
              <a href="#privacy" className="footer__link">{t('nav.privacy')}</a>
              <a href="#cookies" className="footer__link">{t('nav.cookies')}</a>
              <a href="#terms" className="footer__link">{t('nav.terms')}</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            {t('footer.copyright')}
          </p>
          <p className="footer__description">
            {t('footer.description')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
