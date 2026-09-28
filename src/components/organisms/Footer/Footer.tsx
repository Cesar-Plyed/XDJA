import { FC } from 'react';
import { useI18n } from '@i18n/useI18n';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import type { SectionId } from '@hooks/useSectionNavigation';
import { Typography } from '@components/atoms/Typography/Typography';
import { Icon } from '@components/atoms/Icon/Icon';
import { FacebookIcon } from '@components/atoms/Icon/BrandIcons';
import { SectionLink } from '@components/molecules/SectionLink/SectionLink';

type LegalDocument = 'privacy' | 'cookies' | 'terms';

interface FooterProps {
  onLegalClick: (type: LegalDocument) => void;
}

const FACEBOOK_URL = 'https://www.facebook.com/xdjaconstructionllc?mibextid=LQQJ4d';

const QUICK_LINKS = [
  { id: 'about', labelKey: 'nav.about' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'portfolio', labelKey: 'nav.portfolio' },
  { id: 'reviews', labelKey: 'nav.reviews' },
] as const satisfies ReadonlyArray<{ id: SectionId; labelKey: string }>;

const LEGAL_LINKS = [
  { type: 'privacy', labelKey: 'legal.privacy_title' },
  { type: 'cookies', labelKey: 'legal.cookies_policy_title' },
  { type: 'terms', labelKey: 'legal.terms_title' },
] as const satisfies ReadonlyArray<{ type: LegalDocument; labelKey: string }>;

export const Footer: FC<FooterProps> = ({ onLegalClick }) => {
  const { t } = useI18n();
  const { status, copy } = useCopyToClipboard();
  const currentYear = new Date().getFullYear();

  const copyLabel = status === 'copied' ? t('footer.link_copied') : t('footer.copy_link');
  const feedback =
    status === 'copied' ? t('footer.link_copied') : status === 'error' ? t('footer.copy_error') : '';

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
            <div className="footer__social" role="group" aria-label={t('footer.follow_us')}>
              <button
                type="button"
                className="footer__social-link footer__social-link--copy"
                onClick={() => void copy(window.location.href)}
                aria-label={copyLabel}
                title={copyLabel}
              >
                <Icon name={status === 'copied' ? 'check' : 'link'} size={20} />
              </button>
              <a
                href={FACEBOOK_URL}
                className="footer__social-link footer__social-link--facebook"
                aria-label={t('footer.facebook')}
                title={t('footer.facebook')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon size={20} />
              </a>
              <span className="footer__social-feedback" role="status" aria-live="polite">{feedback}</span>
            </div>
          </div>

          <div id="contact" className="footer__section">
            <Typography variant="h5" weight="semibold" className="footer__title">
              {t('footer.contact_us')}
            </Typography>
            <address className="footer__contact">
              <div className="footer__contact-item">
                <Icon name="phone" size={18} className="footer__contact-icon" />
                <a href="tel:+15743046758" className="footer__contact-link">+1 (574) 304-6758</a>
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
                {QUICK_LINKS.map(({ id, labelKey }) => (
                  <li key={id}>
                    <SectionLink section={id} className="footer__link">{t(labelKey)}</SectionLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="footer__section">
            <Typography variant="h5" weight="semibold" className="footer__title">
              {t('footer.legal')}
            </Typography>
            <nav className="footer__links" aria-label={t('footer.legal')}>
              <ul className="footer__links-list">
                {LEGAL_LINKS.map(({ type, labelKey }) => (
                  <li key={type}>
                    <button type="button" onClick={() => onLegalClick(type)} className="footer__link">
                      {t(labelKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <Typography variant="small" color="muted" className="footer__copyright">
            {t('footer.copyright', { year: currentYear })}
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export type { FooterProps };