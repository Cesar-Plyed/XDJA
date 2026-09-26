import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { I18nProvider } from './i18n/I18nProvider';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ImageScroll from './components/ImageScroll';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import CookieBanner from './components/CookieBanner';
import { useResponsive } from './hooks/useResponsive';
import './styles/themes.scss';
import './styles/app.scss';

function AppContent() {
  const { isMobile } = useResponsive();
  const [mounted, setMounted] = useState(false);
  const [cookiesConsent, setCookiesConsent] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('xdja-cookies-consent');
    setCookiesConsent(saved === 'accepted');
  }, []);

  if (!mounted) return null;

  const handleAcceptCookies = () => {
    localStorage.setItem('xdja-cookies-consent', 'accepted');
    setCookiesConsent(true);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('xdja-cookies-consent', 'declined');
    setCookiesConsent(false);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavBar />
        <ThemeToggle />
      </header>

      <main className="app-main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ImageScroll />
        <ContactSection />
      </main>

      <Footer />
      {cookiesConsent === null && (
        <CookieBanner
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
        />
      )}
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
