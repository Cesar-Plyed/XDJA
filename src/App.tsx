import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { I18nProvider } from './i18n/I18nProvider';
import { useI18n } from './i18n/I18nProvider';
import { useResponsive } from './hooks/useResponsive';
import { useTheme } from './hooks/useTheme';
import { imgLd } from './assets/Images/ImagesLoader';
import { iconLd } from './assets/Icon/iconLoad';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  motion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';
import {
  Check,
  Building2,
  Hammer,
  Palette,
  Sparkles,
  Home,
  Store,
  Star,
  Moon,
  Sun,
  X,
  Menu,
  MessageSquare,
  Share2,
  Scale,
  Shield,
  Cookie,
} from 'lucide-react';
import './styles/themes.scss';
import './styles/app.scss';
import './styles/heroSection.scss';
import './styles/aboutSection.scss';
import './styles/servicesSection.scss';
import './styles/portfolioSection.scss';
import './styles/testimonialsSection.scss';
import './styles/imagesScroll.scss';
import './styles/contactSection.scss';
import './styles/footer.scss';
import './styles/navBar.scss';
import './styles/mobileMenu.scss';
import './styles/languageSwitcher.scss';
import './styles/themeToggle.scss';
import './styles/cookieBanner.scss';
import './styles/popup.scss';

interface ImageCardProps {
  src: string;
  altKey: string;
  descKey: string;
  hideDetailsKey: string;
  className: string;
}

function ImageCard({ src, altKey, descKey, hideDetailsKey, className }: ImageCardProps) {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ target: ref });
  const parallaxX = useTransform(scrollXProgress, [0, 1], [-150, 150]);
  const [showDetails, setShowDetails] = useState(true);

  return (
    <section className="image-container" ref={ref}>
      <div className="image-container__wrapper">
        <img src={src} alt="" className={className} />
        <motion.div
          className="image-container__label"
          style={{ x: parallaxX }}
        >
          <motion.div
            className="image-container__details"
            initial={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{ opacity: showDetails ? 1 : 0, height: showDetails ? 'auto' : 0, paddingTop: showDetails ? '1.5rem' : 0, paddingBottom: showDetails ? '0.5rem' : 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <h2 className="image-container__title">{altKey}</h2>
            <p className="image-container__desc">{descKey}</p>
          </motion.div>
        </motion.div>
      </div>
      <button
        className="image-container__toggle"
        onClick={() => setShowDetails(!showDetails)}
        aria-expanded={showDetails}
        aria-controls="details"
      >
        {showDetails ? hideDetailsKey : (hideDetailsKey === 'Ocultar detalles' ? 'Mostrar detalles' : 'Show details')}
      </button>
    </section>
  );
}

const ImageScroll = ({ t }: { t: (key: string) => string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToImage = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const children = container.children;
      const target = children[index] as HTMLElement;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setActiveIndex(index);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const total = imgLd.length;
        let newIndex = activeIndex;
        
        if (e.key === 'ArrowRight') {
          newIndex = (activeIndex + 1) % total;
        } else if (e.key === 'ArrowLeft') {
          newIndex = (activeIndex - 1 + total) % total;
        }
        
        scrollToImage(newIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <section className="image-scroll">
      <div className="image-scroll__container">
        <div id="example" ref={containerRef} className="image-scroll__content">
          {imgLd.map((image) => (
            <ImageCard
              key={image.id}
              src={image.src}
              altKey={t(image.altKey)}
              descKey={t(image.descKey)}
              hideDetailsKey={t('imageScroll.hideDetails')}
              className="image-scroll__img"
            />
          ))}
        </div>
        <nav className="image-scroll__nav" aria-label="Image navigation">
          {imgLd.map((_, index) => (
            <button
              key={index}
              className={`image-scroll__nav-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToImage(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            />
          ))}
        </nav>
      </div>
    </section>
  );
};

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
          <X className="popup__close-icon" size={24} />
        </button>
        <div className="popup__content">{children}</div>
      </div>
    </div>
  );
};

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sections: Array<{ title: string; content: React.ReactNode }>;
  icon?: React.ReactNode;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, sections, icon }) => {
  if (!isOpen) return null;

  return (
    <div className="legal-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
      <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal__header">
          {icon && <div className="legal-modal__icon">{icon}</div>}
          <h2 id="legal-modal-title" className="legal-modal__title">{title}</h2>
          <button className="legal-modal__close" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>
        <div className="legal-modal__body">
          {sections.map((section, index) => (
            <section key={index} className="legal-modal__section">
              <h3 className="legal-modal__section-title">{section.title}</h3>
              <div className="legal-modal__section-content">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ t }: { t: (key: string) => string }) => {
  return (
    <section id="home" className="hero">
      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
          <div className="hero__actions">
            <a href="#contact" className="hero__cta hero__cta--primary">
              {t('hero.cta_primary')}
            </a>
            <a href="#portfolio" className="hero__cta hero__cta--secondary">
              {t('hero.cta_secondary')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ t }: { t: (key: string) => string }) => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__content">
          <h2 className="about__title">{t('about.title')}</h2>
          <p className="about__text">{t('about.description')}</p>
        </div>

        <div className="about__features">
          <div className="about__feature">
            <div className="about__feature-icon"><Check className="feature-check" size={24} /></div>
            <h3 className="about__feature-title">{t('about.feature1_title')}</h3>
            <p className="about__feature-text">{t('about.feature1_text')}</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon"><Check className="feature-check" size={24} /></div>
            <h3 className="about__feature-title">{t('about.feature2_title')}</h3>
            <p className="about__feature-text">{t('about.feature2_text')}</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon"><Check className="feature-check" size={24} /></div>
            <h3 className="about__feature-title">{t('about.feature3_title')}</h3>
            <p className="about__feature-text">{t('about.feature3_text')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = ({ t }: { t: (key: string) => string }) => {
  const services = [
    {
      id: 1,
      title: t('services.service1_title'),
      description: t('services.service1_text'),
      icon: Building2,
    },
    {
      id: 2,
      title: t('services.service2_title'),
      description: t('services.service2_text'),
      icon: Hammer,
    },
    {
      id: 3,
      title: t('services.service3_title'),
      description: t('services.service3_text'),
      icon: Palette,
    },
    {
      id: 4,
      title: t('services.service4_title'),
      description: t('services.service4_text'),
      icon: Sparkles,
    },
  ];

  return (
    <section id="services" className="services">
      <div className="services__container">
        <h2 className="services__title">{t('services.title')}</h2>
        <p className="services__subtitle">{t('services.subtitle')}</p>

        <div className="services__grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="service-card">
                <div className="service-card__icon"><Icon className="service-icon" size={32} /></div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = ({ t }: { t: (key: string) => string }) => {
  const projects = [
    {
      id: 1,
      title: t('portfolio.project1_title'),
      description: t('portfolio.project1_desc'),
      icon: Building2,
    },
    {
      id: 2,
      title: t('portfolio.project2_title'),
      description: t('portfolio.project2_desc'),
      icon: Home,
    },
    {
      id: 3,
      title: t('portfolio.project3_title'),
      description: t('portfolio.project3_desc'),
      icon: Building2,
    },
    {
      id: 4,
      title: t('portfolio.project4_title'),
      description: t('portfolio.project4_desc'),
      icon: Store,
    },
  ];

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">{t('portfolio.title')}</h2>
        <p className="portfolio__subtitle">{t('portfolio.subtitle')}</p>
        <div className="portfolio__grid">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div key={project.id} className="portfolio-card">
                <div className="portfolio-card__image"><Icon className="portfolio-icon" size={48} /></div>
                <h3 className="portfolio-card__title">{project.title}</h3>
                <p className="portfolio-card__description">{project.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = ({ t }: { t: (key: string) => string }) => {
  const testimonials = [
    {
      id: 1,
      author: t('testimonials.testimonial1_author'),
      role: t('testimonials.testimonial1_role'),
      text: t('testimonials.testimonial1_text'),
      rating: 5,
    },
    {
      id: 2,
      author: t('testimonials.testimonial2_author'),
      role: t('testimonials.testimonial2_role'),
      text: t('testimonials.testimonial2_text'),
      rating: 5,
    },
    {
      id: 3,
      author: t('testimonials.testimonial3_author'),
      role: t('testimonials.testimonial3_role'),
      text: t('testimonials.testimonial3_text'),
      rating: 5,
    },
  ];

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <h2 className="testimonials__title">{t('testimonials.title')}</h2>
        <div className="testimonials__grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-card__rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="testimonial-card__star"><Star className="star-icon" size={16} fill="currentColor" /></span>
                ))}
              </div>
              <p className="testimonial-card__text">"{testimonial.text}"</p>
              <div className="testimonial-card__author">
                <p className="testimonial-card__name">{testimonial.author}</p>
                <p className="testimonial-card__role">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const Footer = ({ t, onLegalClick }: { t: (key: string) => string; onLegalClick: (type: 'privacy' | 'cookies' | 'terms') => void }) => {
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
                <Share2 className="social-icon" size={20} />
                <span className="social-label">Facebook</span>
              </a>
              <a
                href="https://wa.me/+15743046758"
                className="footer__social-link footer__social-link--whatsapp"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="social-icon" size={20} />
                <span className="social-label">WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{t('footer.legal')}</h3>
            <div className="footer__links">
              <button className="footer__link" onClick={() => onLegalClick('privacy')}>{t('nav.privacy')}</button>
              <button className="footer__link" onClick={() => onLegalClick('cookies')}>{t('nav.cookies')}</button>
              <button className="footer__link" onClick={() => onLegalClick('terms')}>{t('nav.terms')}</button>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            {t('footer.copyright').replace('2025', currentYear.toString())}
          </p>
          <p className="footer__description">
            {t('footer.description')}
          </p>
        </div>
      </div>
    </footer>
  );
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Current theme: ${theme}`}
    >
      {theme === 'light' ? <Moon className="theme-icon" size={24} /> : <Sun className="theme-icon" size={24} />}
    </button>
  );
};

const LanguageSwitcher = ({ locale, setLocale }: { locale: 'es' | 'en'; setLocale: (l: 'es' | 'en') => void }) => {
  return (
    <div className="language-switcher">
      <button
        className={`language-switcher__btn ${locale === 'es' ? 'language-switcher__btn--active' : ''}`}
        onClick={() => setLocale('es')}
        aria-label="Switch to Spanish"
        title="Español"
      >
        ES
      </button>
      <button
        className={`language-switcher__btn ${locale === 'en' ? 'language-switcher__btn--active' : ''}`}
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </button>
    </div>
  );
};

const MobileMenu = ({ isOpen, onClose, t }: { isOpen: boolean; onClose: () => void; t: (key: string) => string }) => {
  const menuItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      {isOpen && <div className="mobile-menu-overlay" onClick={onClose} />}
      <nav className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-menu__list">
          {menuItems.map((item) => (
            <li key={item.label} className="mobile-menu__item">
              <a
                href={item.href}
                className="mobile-menu__link"
                onClick={onClose}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

const CookieBanner = ({ onAccept, onDecline, t }: { onAccept: () => void; onDecline: () => void; t: (key: string) => string }) => {
  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <h3 className="cookie-banner__title">{t('cookies.banner_title')}</h3>
        <p className="cookie-banner__text">{t('cookies.banner_text')}</p>
      </div>
      <div className="cookie-banner__actions">
        <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={onAccept}>
          {t('cookies.accept')}
        </button>
        <button className="cookie-banner__btn cookie-banner__btn--decline" onClick={onDecline}>
          {t('cookies.decline')}
        </button>
      </div>
    </div>
  );
};

const NavBar = ({ t, locale, setLocale }: { t: (key: string) => string; locale: 'es' | 'en'; setLocale: (l: 'es' | 'en') => void }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isMobile } = useResponsive();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="navbar">
      <header className="navbar__header">
        <div className="navbar__logo">
          <LazyLoadImage
            src={iconLd.src}
            alt="XDJA Logo"
            width={100}
            height={100}
            className={`navbar__logo-img navbar__logo-img--${isMobile ? 'mobile' : 'desktop'}`}
            onClick={togglePopup}
            title="Click to learn more about XDJA"
          />
        </div>

        {isMobile && (
          <button
            className={`navbar__hamburger ${showMobileMenu ? 'navbar__hamburger--open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={showMobileMenu}
          >
            <Menu className="hamburger-icon" size={24} />
          </button>
        )}
      </header>

      {isMobile && <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} t={t} />}

      {!isMobile && (
        <nav className="navbar__desktop-menu">
          <a href="#home" className="navbar__link">{t('nav.home')}</a>
          <a href="#about" className="navbar__link">{t('nav.about')}</a>
          <a href="#services" className="navbar__link">{t('nav.services')}</a>
          <a href="#portfolio" className="navbar__link">{t('nav.portfolio')}</a>
          <a href="#contact" className="navbar__link">{t('nav.contact')}</a>
        </nav>
      )}

      {!isMobile && <LanguageSwitcher locale={locale} setLocale={setLocale} />}

      {showPopup && (
        <Popup show={showPopup} onClose={togglePopup}>
          <div className="popup__body">
            <h2>{t('popup.welcome')}</h2>
            <p>{t('popup.description')}</p>
            <p>{t('popup.cta')}</p>
          </div>
        </Popup>
      )}
    </nav>
  );
};

function AppContent() {
  const [mounted, setMounted] = useState(false);
  const [cookiesConsent, setCookiesConsent] = useState<boolean | null>(null);
  const [legalModal, setLegalModal] = useState<'privacy' | 'cookies' | 'terms' | null>(null);
  const { locale, setLocale, t } = useI18n();

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

  const openLegalModal = (type: 'privacy' | 'cookies' | 'terms') => {
    setLegalModal(type);
  };

  const closeLegalModal = () => {
    setLegalModal(null);
  };

  const getLegalModalContent = () => {
    switch (legalModal) {
      case 'privacy':
        return (
          <LegalModal
            isOpen={!!legalModal}
            onClose={closeLegalModal}
            title={t('legal.privacy_title')}
            icon={<Shield className="legal-modal__icon-svg" size={32} />}
            sections={[
              { title: t('legal.privacy_section1_title'), content: <p>{t('legal.privacy_section1_text')}</p> },
              { title: t('legal.privacy_section2_title'), content: <p>{t('legal.privacy_section2_text')}</p> },
              { title: t('legal.privacy_section3_title'), content: <p>{t('legal.privacy_section3_text')}</p> },
              { title: t('legal.privacy_section4_title'), content: <p>{t('legal.privacy_section4_text')}</p> },
              { title: t('legal.privacy_section5_title'), content: <p>{t('legal.privacy_section5_text')}</p> },
              { title: t('legal.privacy_section6_title'), content: <p>{t('legal.privacy_section6_text')}</p> },
            ]}
          />
        );
      case 'cookies':
        return (
          <LegalModal
            isOpen={!!legalModal}
            onClose={closeLegalModal}
            title={t('legal.cookies_policy_title')}
            icon={<Cookie className="legal-modal__icon-svg" size={32} />}
            sections={[
              { title: t('legal.cookies_section1_title'), content: <p>{t('legal.cookies_section1_text')}</p> },
              { title: t('legal.cookies_section2_title'), content: <p>{t('legal.cookies_section2_text')}</p> },
              { title: t('legal.cookies_section3_title'), content: <p>{t('legal.cookies_section3_text')}</p> },
              { title: t('legal.cookies_section4_title'), content: <p>{t('legal.cookies_section4_text')}</p> },
              { title: t('legal.cookies_section5_title'), content: <p>{t('legal.cookies_section5_text')}</p> },
            ]}
          />
        );
      case 'terms':
        return (
          <LegalModal
            isOpen={!!legalModal}
            onClose={closeLegalModal}
            title={t('legal.terms_title')}
            icon={<Scale className="legal-modal__icon-svg" size={32} />}
            sections={[
              { title: t('legal.terms_section1_title'), content: <p>{t('legal.terms_section1_text')}</p> },
              { title: t('legal.terms_section2_title'), content: <p>{t('legal.terms_section2_text')}</p> },
              { title: t('legal.terms_section3_title'), content: <p>{t('legal.terms_section3_text')}</p> },
              { title: t('legal.terms_section4_title'), content: <p>{t('legal.terms_section4_text')}</p> },
              { title: t('legal.terms_section5_title'), content: <p>{t('legal.terms_section5_text')}</p> },
              { title: t('legal.terms_section6_title'), content: <p>{t('legal.terms_section6_text')}</p> },
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavBar t={t} locale={locale} setLocale={setLocale} />
        <ThemeToggle />
      </header>

      <main className="app-main">
        <HeroSection t={t} />
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <PortfolioSection t={t} />
        <TestimonialsSection t={t} />
        <ImageScroll t={t} />
      </main>

      <Footer t={t} onLegalClick={openLegalModal} />
      {cookiesConsent === null && (
        <CookieBanner
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
          t={t}
        />
      )}
      {getLegalModalContent()}
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