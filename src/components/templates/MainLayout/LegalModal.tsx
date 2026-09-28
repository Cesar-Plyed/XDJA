import { IconName } from '@components/atoms/Icon/Icon';
import { Typography } from '@components/atoms/Typography/Typography';
import { Icon } from '@components/atoms/Icon/Icon';
import { Button } from "@components/atoms/Button/Button";
import { FC } from 'react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'cookies' | 'terms';
  t: (key: string) => string;
}

const modalContent: Record<'privacy' | 'cookies' | 'terms', { icon: IconName; titleKey: string; sections: Array<{ titleKey: string; textKey: string }> }> = {
  privacy: {
    icon: 'shield',
    titleKey: 'legal.privacy_title',
    sections: [
      { titleKey: 'legal.privacy_section1_title', textKey: 'legal.privacy_section1_text' },
      { titleKey: 'legal.privacy_section2_title', textKey: 'legal.privacy_section2_text' },
      { titleKey: 'legal.privacy_section3_title', textKey: 'legal.privacy_section3_text' },
      { titleKey: 'legal.privacy_section4_title', textKey: 'legal.privacy_section4_text' },
      { titleKey: 'legal.privacy_section5_title', textKey: 'legal.privacy_section5_text' },
      { titleKey: 'legal.privacy_section6_title', textKey: 'legal.privacy_section6_text' },
    ],
  },
  cookies: {
    icon: 'cookie',
    titleKey: 'legal.cookies_policy_title',
    sections: [
      { titleKey: 'legal.cookies_section1_title', textKey: 'legal.cookies_section1_text' },
      { titleKey: 'legal.cookies_section2_title', textKey: 'legal.cookies_section2_text' },
      { titleKey: 'legal.cookies_section3_title', textKey: 'legal.cookies_section3_text' },
      { titleKey: 'legal.cookies_section4_title', textKey: 'legal.cookies_section4_text' },
      { titleKey: 'legal.cookies_section5_title', textKey: 'legal.cookies_section5_text' },
    ],
  },
  terms: {
    icon: 'scale',
    titleKey: 'legal.terms_title',
    sections: [
      { titleKey: 'legal.terms_section1_title', textKey: 'legal.terms_section1_text' },
      { titleKey: 'legal.terms_section2_title', textKey: 'legal.terms_section2_text' },
      { titleKey: 'legal.terms_section3_title', textKey: 'legal.terms_section3_text' },
      { titleKey: 'legal.terms_section4_title', textKey: 'legal.terms_section4_text' },
      { titleKey: 'legal.terms_section5_title', textKey: 'legal.terms_section5_text' },
      { titleKey: 'legal.terms_section6_title', textKey: 'legal.terms_section6_text' },
    ],
  },
};

export const LegalModal: FC<LegalModalProps> = ({ isOpen, onClose, type, t }) => {
  if (!isOpen) return null;

  const content = modalContent[type];

  return (
    <div
      className="legal-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal__header">
          <div className="legal-modal__icon">
            <Icon name={content.icon} size={32} className="legal-modal__icon-svg" />
          </div>
          <Typography id="legal-modal-title" variant="h2" weight="bold" className="legal-modal__title">
            {t(content.titleKey)}
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label={t('common.close')}
            className="legal-modal__close"
          >
            <Icon name="x" size={24} />
          </Button>
        </div>
        <div className="legal-modal__body">
          {content.sections.map((section, index) => (
            <section key={index} className="legal-modal__section">
              <Typography variant="h3" weight="semibold" className="legal-modal__section-title">
                {t(section.titleKey)}
              </Typography>
              <Typography variant="p" color="muted" className="legal-modal__section-text">
                {t(section.textKey)}
              </Typography>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export type { LegalModalProps };