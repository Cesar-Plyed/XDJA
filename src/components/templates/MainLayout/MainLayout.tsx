import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { CookieBanner } from '@components/templates/MainLayout/CookieBanner';
import { LegalModal } from '@components/templates/MainLayout/LegalModal';
import { useI18n } from '@i18n/useI18n';
import { useTheme } from '@hooks/useTheme';
import { Analytics } from '@vercel/analytics/react';
import { Header } from '@components/organisms/Header/Header';
import { Footer } from '@components/organisms/Footer/Footer';

interface MainLayoutProps {
  onLegalClick: (type: 'privacy' | 'cookies' | 'terms') => void;
  legalModal: 'privacy' | 'cookies' | 'terms' | null;
  closeLegalModal: () => void;
  cookiesConsent: boolean | null;
  handleAcceptCookies: () => void;
  handleDeclineCookies: () => void;
}

export const MainLayout: FC<MainLayoutProps> = ({
  onLegalClick,
  legalModal,
  closeLegalModal,
  cookiesConsent,
  handleAcceptCookies,
  handleDeclineCookies,
}) => {
  const { t } = useI18n();
  const { theme } = useTheme();

  return (
    <div className={`app-shell ${theme}`}>
      <Header />
      <main className="app-main" id="main-content" role="main">
        <Outlet />
      </main>
      <Footer onLegalClick={onLegalClick} />
      {cookiesConsent === null && (
        <CookieBanner
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
          t={t}
        />
      )}
      {legalModal && (
        <LegalModal
          isOpen
          onClose={closeLegalModal}
          type={legalModal}
          t={t}
        />
      )}
      <Analytics />
    </div>
  );
};

export type { MainLayoutProps };