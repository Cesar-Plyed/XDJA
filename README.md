# XDJA Construction - Premium Construction & Renovation Services

## Overview

XDJA Construction is a modern, responsive web application built with React, TypeScript, and Vite. The application serves as a comprehensive digital presence for a construction and renovation services company, featuring bilingual content (English/Spanish), dark/light theme support, and enterprise-grade SEO optimization.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Configuration](#configuration)
6. [Internationalization](#internationalization)
7. [Theme Management](#theme-management)
8. [Legal Compliance](#legal-compliance)
9. [SEO & Metadata](#seo--metadata)
10. [Deployment](#deployment)
11. [Best Practices](#best-practices)

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── NavBar.tsx       # Navigation bar with language switcher
│   ├── HeroSection.tsx  # Hero section with call-to-action
│   ├── AboutSection.tsx # About company information
│   ├── ServicesSection.tsx # Services listing
│   ├── PortfolioSection.tsx # Project portfolio display
│   ├── TestimonialsSection.tsx # Client testimonials
│   ├── ImageScroll.tsx  # Parallax image gallery
│   ├── ContactSection.tsx # Contact form with WhatsApp integration
│   ├── Footer.tsx       # Footer with links and contact info
│   ├── Popup.tsx        # Modal popup component
│   ├── ThemeToggle.tsx  # Dark/light theme toggle
│   ├── LanguageSwitcher.tsx # Language selector (ES/EN)
│   ├── CookieBanner.tsx # Cookie consent banner
│   └── MobileMenu.tsx   # Mobile navigation menu
├── hooks/               # Custom React hooks
│   ├── useResponsive.ts # Responsive design hook
│   ├── useTheme.ts      # Theme management hook
│   └── useMediaQuery.ts # Media query hook
├── i18n/                # Internationalization
│   ├── translations.json # All translations (ES/EN)
│   └── I18nProvider.tsx # I18n context provider
├── pages/               # Full-page components
│   ├── PrivacyPolicyPage.tsx
│   ├── CookiesPolicyPage.tsx
│   └── TermsOfServicePage.tsx
├── styles/              # SCSS stylesheets
│   ├── themes.scss      # CSS custom properties for themes
│   ├── app.scss         # Global app styles
│   └── [component].scss # Component-specific styles
├── assets/              # Static assets
│   ├── Icon/           # SVG icons
│   └── Images/         # Project images
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Features

### Core Features

- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Bilingual Support**: Full English/Spanish internationalization with persistent language selection
- **Dark/Light Theme**: User-selectable theme with system preference detection and localStorage persistence
- **Cookie Consent Management**: GDPR-compliant cookie banner with explicit user consent
- **Legal Documentation**: Complete privacy policy, terms of service, and cookie policy
- **SEO Optimization**: Comprehensive meta tags, Open Graph, Twitter Cards, and Schema.org structured data

### Business Features

- **Portfolio Section**: Showcase completed projects with descriptions
- **Client Testimonials**: Display 5-star reviews from satisfied customers
- **Service Listing**: Detailed service descriptions with icons
- **Contact Integration**: Direct WhatsApp, email, and phone contact options
- **Lead Generation**: Contact form that integrates with WhatsApp for instant messaging
- **Professional Branding**: Premium design with consistent visual identity

### Technical Features

- **Component-Based Architecture**: Reusable, maintainable components
- **Type-Safe**: Full TypeScript implementation
- **Performance Optimized**: Lazy loading, code splitting, and optimized bundle size
- **Accessibility**: WCAG 2.1 compliant with semantic HTML and ARIA labels
- **Analytics Ready**: Vercel Analytics integration

## Technology Stack

### Frontend Framework

- **React 18.3.1**: UI library
- **TypeScript 5.6.2**: Type-safe JavaScript
- **Vite 6.0.5**: Next-generation build tool
- **React Router DOM 7.1.3**: Client-side routing (optional for expansion)

### Styling

- **SCSS 1.83.4**: Advanced CSS preprocessing
- **Tailwind CSS 4.0.0**: Utility-first CSS framework
- **Mantine UI 7.16.2**: Component library (available)

### Animation

- **Motion 11.18.1**: React animations and transitions

### Performance & Analytics

- **Vercel Analytics 1.4.1**: Web performance monitoring
- **React Lazy Load Image Component 1.6.3**: Optimized image loading

### Development Tools

- **ESLint 9.17.0**: Code quality
- **Tailwind CSS Vite Plugin 4.0.0**: Vite integration
- **PostCSS 8.5.1**: CSS transformation

## Getting Started

### Prerequisites

- Node.js 18+ or npm 9+
- Git
- Modern web browser

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Cesar-Plyed/XDJA.git
cd XDJA
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## Configuration

### Environment Variables

Create a `.env.local` file in the project root (if needed for future features):

```env
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id
```

### WhatsApp Integration

The contact form uses WhatsApp Web API. Update the phone number in:

1. `src/components/ContactSection.tsx` (line with `wa.me`)
2. `src/i18n/translations.json` (contact section)

Current number: `+15743046758`

### Company Information

Update these files with your company details:

1. `index.html` - Meta tags and Schema.org data
2. `src/i18n/translations.json` - Company name, descriptions, contact info
3. `src/components/Footer.tsx` - Footer links and copyright year
4. `src/components/HeroSection.tsx` - Hero copy

## Internationalization

### Adding New Translations

Edit `src/i18n/translations.json` and add your keys to both `es` and `en` objects:

```json
{
  "es": {
    "newFeature": {
      "title": "Nuevo Título",
      "description": "Nueva descripción"
    }
  },
  "en": {
    "newFeature": {
      "title": "New Title",
      "description": "New description"
    }
  }
}
```

### Using Translations in Components

```typescript
import { useI18n } from '../i18n/I18nProvider';

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  return <h1>{t('newFeature.title')}</h1>;
}
```

### Supported Locales

- **es** - Spanish
- **en** - English (default)

## Theme Management

### Theme System

The application uses CSS custom properties (variables) for theming. Themes are defined in `src/styles/themes.scss`:

- **Light Theme**: Default, based on `--color-bg`, `--color-text`, etc.
- **Dark Theme**: Applied when `html[data-theme="dark"]` or `html.dark` is set

### Using Themes in Components

```scss
.my-component {
  background-color: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

### Available CSS Variables

```scss
--color-bg              // Primary background
--color-bg-secondary    // Secondary background
--color-text            // Primary text
--color-text-secondary  // Secondary text
--color-border          // Border color
--color-primary         // Primary action color
--color-primary-hover   // Primary hover state
--color-accent          // Accent/highlight color
--color-shadow          // Shadow color
--color-card            // Card background
```

## Legal Compliance

### Privacy Policy

The application includes a comprehensive privacy policy that specifies:

- Data collection practices (minimal by design)
- Data usage (only for customer inquiries)
- No data sharing with third parties
- Security measures
- Cookie usage

**Location**: `src/pages/PrivacyPolicyPage.tsx`

### Cookie Policy

Explains the use of functional cookies for theme/language preference storage.

**Location**: `src/pages/CookiesPolicyPage.tsx`

### Terms of Service

Standard terms covering acceptable use, liability limitations, and service modifications.

**Location**: `src/pages/TermsOfServicePage.tsx`

### Cookie Consent Banner

Displays on first visit with options to accept or decline functional cookies.

**Location**: `src/components/CookieBanner.tsx`

**Important Notes**:

1. Legal pages are templates and should be reviewed by a qualified attorney for your jurisdiction
2. Current policies assume no third-party analytics by default
3. If adding analytics, update the cookie policy accordingly
4. Never use these policies without legal review for your specific use case

## SEO & Metadata

### Meta Tags Implementation

The application includes comprehensive meta tags in `index.html`:

- **Title**: Page title for SERPs
- **Description**: Meta description (155-160 characters)
- **Keywords**: Relevant search terms
- **Author**: Company name
- **Robots**: Indexing directives

### Open Graph Tags

Enables rich previews on social media:

- Facebook sharing
- LinkedIn integration
- WhatsApp preview thumbnails

### Twitter Cards

Enables summary cards with image for Twitter sharing.

### Structured Data (Schema.org)

Implements LocalBusiness schema for:

- Business name, address, phone
- Rating and review count
- Social media links
- Business category

**Current Data**:

```javascript
{
  "@type": "LocalBusiness",
  "name": "XDJA Construction LLC",
  "url": "https://xdja.vercel.app",
  "telephone": "+15743046758",
  "email": "xdjaconstructionllc@gmail.com",
  "ratingValue": "5",
  "ratingCount": "50"
}
```

**Important**: Update `ratingCount` only with verified, auditable reviews. False ratings can result in search engine penalties.

### Canonical URL

Set to `https://xdja.vercel.app` to prevent duplicate content issues.

### Sitemap & Robots.txt

For production deployment, add:

1. `public/sitemap.xml` - Site structure for search engines
2. `public/robots.txt` - Crawling directives

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Vite configuration
4. Deploy on push to main branch

### Environment Setup

1. Update domain in `index.html` meta tags
2. Configure environment variables in Vercel dashboard
3. Verify all redirects and rewrites

### Pre-Deployment Checklist

- [ ] All TypeScript types compile without errors: `npm run build`
- [ ] No ESLint warnings: `npm run lint`
- [ ] Update `index.html` with correct domain and company info
- [ ] Replace placeholder images (og-image.png)
- [ ] Test contact form WhatsApp integration
- [ ] Verify dark/light theme switching
- [ ] Test language switching (ES/EN)
- [ ] Verify cookie banner appears on first visit
- [ ] Test responsive design on mobile/tablet
- [ ] Run Lighthouse audit for performance/SEO
- [ ] Review legal pages for jurisdiction compliance
- [ ] Update Schema.org data with actual business information
- [ ] Test all external links (Facebook, WhatsApp, email)

### Performance Optimization

- Vite optimizes bundle size automatically
- Code splitting per route (if using Router)
- Lazy loading for images via `react-lazy-load-image-component`
- CSS variables for efficient theming
- Minimal JavaScript for fast Time to Interactive (TTI)

## Best Practices

### Component Development

1. **Keep Components Small**: Each component should have a single responsibility
2. **Use TypeScript**: Define prop interfaces for all components
3. **Accessibility**: Always include semantic HTML and ARIA labels
4. **Styling**: Use SCSS variables and follow BEM naming convention

### Performance

1. **Lazy Load Images**: Use `LazyLoadImage` component for off-screen images
2. **Optimize Bundle**: Review bundle size with `npm run build -- --report`
3. **Cache Strategy**: Configure browser cache headers for static assets
4. **Minification**: Vite automatically minifies for production

### Security

1. **No Sensitive Data in Frontend**: All credentials must be server-side
2. **Content Security Policy**: Add CSP headers to Vercel config if needed
3. **HTTPS Only**: Always use HTTPS in production
4. **XSS Prevention**: Never use `dangerouslySetInnerHTML` with user input

### SEO

1. **Keywords**: Use target keywords naturally in headings and content
2. **Internal Links**: Link between sections to improve crawlability
3. **Page Speed**: Aim for Lighthouse score > 90
4. **Mobile First**: Test extensively on mobile devices
5. **Structured Data**: Validate Schema.org JSON-LD with Google's tool

### Maintenance

1. **Dependencies**: Run `npm audit` regularly for security updates
2. **Type Safety**: Enable strict TypeScript rules in `tsconfig.app.json`
3. **Logging**: Use console sparingly; remove before production
4. **Git Workflow**: Use feature branches and pull requests for changes

## File Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useResponsive.ts`)
- **Styles**: lowercase with hyphens (e.g., `hero-section.scss`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`)
- **Types**: PascalCase (e.g., `ComponentProps`)

## Troubleshooting

### Build Errors

**TypeScript Errors**:

```bash
npm run build
```

Fix any reported type mismatches in editor before deploying.

**ESLint Warnings**:

```bash
npm run lint -- --fix
```

Automatic fix for common issues.

### Runtime Issues

**Theme Not Persisting**:

1. Check `localStorage` in browser DevTools
2. Verify `xdja-theme` key is being set
3. Check for localStorage permission issues

**Language Not Changing**:

1. Verify I18nProvider wraps entire app
2. Check translation keys exist in `translations.json`
3. Inspect `xdja-locale` in localStorage

**Cookies Banner Not Appearing**:

1. Clear browser cookies and localStorage
2. Verify `cookiesConsent` state in App.tsx
3. Check CookieBanner component renders when null

## Support & Contact

- **Email**: xdjaconstructionllc@gmail.com
- **Phone**: +1 (574) 304-6758
- **WhatsApp**: https://wa.me/+15743046758
- **Facebook**: https://www.facebook.com/xdjaconstructionllc

## License

Copyright 2025 XDJA Construction LLC. All rights reserved.

## Version History

### 2.0.0 (Current - Production Ready)

- Complete refactor to single responsive codebase
- Added bilingual support (English/Spanish)
- Implemented comprehensive legal documentation
- Added cookie consent management
- Implemented dark/light theme system
- Added portfolio and testimonials sections
- Full SEO optimization with meta tags and Schema.org
- Mobile menu implementation
- Contact form WhatsApp integration

### 1.0.0 (Legacy)

- Initial release with separate mobile/desktop components
- Basic functionality

---

**Last Updated**: 2025-09-26

**Maintained By**: XDJA Construction Development Team
