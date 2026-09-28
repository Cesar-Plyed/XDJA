import { FC } from 'react';
import { useI18n } from '@i18n/useI18n';
import { Typography } from '@components/atoms/Typography/Typography';
import { Icon } from '@components/atoms/Icon/Icon';

interface FooterProps {
  onLegalClick: (type: 'privacy' | 'cookies' | 'terms') => void;
}

export const Footer: FC<FooterProps> = ({ onLegalClick }) => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__section footer__section--about">
            <Typography variant="h4" weight="bold" className="footer__brand">
              <Icon name="building2" size={28} className="footer__brand-icon" />
              XDJA
            </Typography>
            <Typography variant="p" color="muted" className="footer__description">
              {t('footer.description')}
            </Typography>
            <div className="footer__social">
              <a
                href="https://www.facebook.com/xdjaconstructionllc?mibextid=LQQJ4d"
                className="footer__social-link footer__social-link--facebook"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="share2" size={20} />
              </a>
              <a
                href="https://www.instagram.com/xdjaconstructionllc?igsh=MWxqZ3R5Z3R5Z3R5Zg=="
                className="footer__social-link footer__social-link--instagram"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="image" size={20} />
              </a>
            </div>
          </div>

          <div className="footer__section">
            <Typography variant="h5" weight="semibold" className="footer__title">
              {t('footer.contact_us')}
            </Typography>
            <address className="footer__contact">
              <div className="footer__contact-item">
                <Icon name="phone" size={18} className="footer__contact-icon" />
                <a href="tel:+15743046758" className="footer__contact-link">
                  +1 (574) 304-6758
                </a>
              </div>
              <div className="footer__contact-item">
                <Icon name="mail" size={18} className="footer__contact-icon" />
                <a href="mailto:xdjaconstructionllc@gmail.com" className="footer__contact-link">
                  xdjaconstructionllc@gmail.com
                </a>
              </div>
            </address>
          </div>

          <div className="footer__section">
            <Typography variant="h5" weight="semibold" className="footer__title">
              {t('footer.quick_links')}
            </Typography>
            <nav className="footer__links" aria-label={t('footer.quick_links')}>
              <ul className="footer__links-list">
                <li>
                  <button onClick={() => window.location.href = '#about'} className="footer__link">
                    {t('nav.about')}
                  </button>
                </li>
                <li>
                  <button onClick={() => window.location.href = '#services'} className="footer__link">
                    {t('nav.services')}
                  </button>
                </li>
                <li>
                  <button onClick={() => window.location.href = '#portfolio'} className="footer__link">
                    {t('nav.portfolio')}
                  </button>
                </li>
                <li>
                  <button onClick={() => window.location.href = '#reviews'} className="footer__link">
                    {t('nav.reviews')}
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer__section">
            <Typography variant="h5" weight="semibold" className="footer__title">
              {t('footer.legal')}
            </Typography>
            <nav className="footer__links" aria-label={t('footer.legal')}>
              <ul className="footer__links-list">
                <li>
                  <button onClick={() => onLegalClick('privacy')} className="footer__link">
                    {t('legal.privacy_title')}
                  </button>
                </li>
                <li>
                  <button onClick={() => onLegalClick('cookies')} className="footer__link">
                    {t('legal.cookies_policy_title')}
                  </button>
                </li>
                <li>
                  <button onClick={() => onLegalClick('terms')} className="footer__link">
                    {t('legal.terms_title')}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            <Typography variant="small" color="muted">
              {t('footer.copyright').replace('2025', currentYear.toString())}
            </Typography>
          </div>
          <div className="footer__made-with">
            <Typography variant="small" color="muted">
              {t('footer.description')}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export type { FooterProps };