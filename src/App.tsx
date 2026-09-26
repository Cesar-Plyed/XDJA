import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ImageScroll from './components/ImageScroll';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { useResponsive } from './hooks/useResponsive';
import './styles/themes.scss';
import './styles/app.scss';

function App() {
  const { isMobile } = useResponsive();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
        <ImageScroll />
        <ContactSection />
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
