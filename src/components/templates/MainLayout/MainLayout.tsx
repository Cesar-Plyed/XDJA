import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { CookieBanner } from '@components/templates/MainLayout/CookieBanner';
import { LegalModal } from '@components/templates/MainLayout/LegalModal';
import { Header } from '@components/organisms/Header/Header';
import { Footer } from '@components/organisms/Footer/Footer';
import { useHashScroll } from '@hooks/useSectionNavigation';
import { useTheme } from '@hooks/useTheme';
import { useI18n } from '@i18n/useI18n';

type LegalDocument = 'privacy' | 'cookies' | 'terms';
type CookiesConsent = boolean | null;

const CONSENT_KEY = 'xdja-cookies-consent';

const readConsent = (): CookiesConsent => {
  const saved = localStorage.getItem(CONSENT_KEY);
  if (saved === 'accepted') return true;
  if (saved === 'declined') return false;
  return null;
};

export const MainLayout: FC = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [cookiesConsent, setCookiesConsent] = useState<CookiesConsent>(readConsent);
  const [legalModal, setLegalModal] = useState<LegalDocument | null>(null);

  useHashScroll();

  const saveConsent = (accepted: boolean) => {
    localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'declined');
    setCookiesConsent(accepted);
  };

  return (
    <div className={`app-shell ${theme}`}>
      <Header />
      <main className="app-main" id="main-content" role="main">
        <Outlet />
      </main>
      <Footer onLegalClick={setLegalModal} />
      {cookiesConsent === null && (
        <CookieBanner onAccept={() => saveConsent(true)} onDecline={() => saveConsent(false)} t={t} />
      )}
      {legalModal && <LegalModal isOpen onClose={() => setLegalModal(null)} type={legalModal} t={t} />}
      {cookiesConsent === true && <Analytics />}
    </div>
  );
};