# XDJA Construction - Premium Construction & Renovation Services

## Overview

XDJA Construction is a modern, responsive web application built with React, TypeScript, and Vite. It is the digital presence for a construction and renovation services company, featuring bilingual content (English/Spanish), dark/light theme support, a reviews system backed by an external API, an authenticated admin dashboard, and enterprise-grade SEO optimization.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Configuration](#configuration)
6. [Routing](#routing)
7. [Internationalization](#internationalization)
8. [Theme Management](#theme-management)
9. [Backend Integration](#backend-integration)
10. [Legal Compliance](#legal-compliance)
11. [SEO & Metadata](#seo--metadata)
12. [Deployment](#deployment)
13. [Best Practices](#best-practices)
14. [Troubleshooting](#troubleshooting)

## Project Structure

The UI follows an **Atomic Design** structure under `src/components/`, and every folder exposes a barrel `index.ts`.

```
src/
├── components/
│   ├── atoms/            # Presentational building blocks
│   │   ├── Button/
│   │   ├── Icon/         # Icon component + brand icons
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Logo/
│   │   ├── Spinner/
│   │   ├── Turnstile/    # Cloudflare Turnstile captcha widget
│   │   └── Typography/
│   ├── molecules/        # Compositions of atoms
│   │   ├── Card/
│   │   ├── FormField/
│   │   ├── ProjectCard/
│   │   ├── Rating/
│   │   ├── ReviewCard/
│   │   └── SectionLink/
│   ├── organisms/        # Self-contained UI sections
│   │   ├── AboutSection/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── ProjectsCarousel/
│   │   ├── ReviewForm/
│   │   ├── ReviewsSection/
│   │   └── ServicesGrid/
│   └── templates/        # Layout shells
│       ├── AuthLayout/   # Login / admin shell
│       └── MainLayout/   # Public shell (header, footer, cookie banner, legal modal)
├── hooks/
│   ├── useApi.ts              # Data-fetching hooks for the backend
│   ├── useCopyToClipboard.ts
│   ├── useMediaQuery.ts
│   ├── usePortfolioItems.ts   # Static + database project sources
│   ├── useResponsive.ts
│   ├── useReviews.ts          # Paginated reviews with filter
│   ├── useSectionNavigation.ts
│   └── useTheme.ts
├── i18n/
│   ├── I18nProvider.tsx  # Context provider
│   ├── translations.json # All ES/EN strings
│   └── useI18n.ts        # Context definition + hook
├── lib/
│   └── api.ts            # Typed fetch client for the backend
├── pages/                # Route-level components
│   ├── AdminDashboardPage/
│   ├── CookiesPolicyPage/
│   ├── HomePage/
│   ├── LoginPage/
│   ├── PrivacyPolicyPage/
│   ├── ProjectsPage/
│   ├── ReviewsPage/
│   └── TermsOfServicePage/
├── routes/
│   ├── paths.ts          # Centralized route path constants
│   └── routes.tsx        # React Router configuration
├── styles/               # SCSS stylesheets (one per section/component)
│   ├── index.scss        # Import order for all partials
│   ├── themes.scss       # CSS custom properties for light/dark themes
│   ├── atoms.scss        # Atomic component styles
│   ├── app.scss          # Global reset and base styles
│   └── [component].scss
├── types/
│   ├── api.ts            # Backend request/response types
│   └── portfolio.ts      # PortfolioItem view model
├── assets/
│   ├── Icon/             # SVG icon loader
│   └── Images/           # Project images and metadata
├── App.tsx               # I18nProvider + router
└── main.tsx              # Application entry point
```

### Path Aliases

Aliases are declared in `vite.config.ts` and `tsconfig.app.json`:

| Alias               | Resolves to             |
| ------------------- | ----------------------- |
| `@components/atoms`  | `src/components/atoms`  |
| `@components/molecules` | `src/components/molecules` |
| `@components/organisms` | `src/components/organisms` |
| `@components/templates` | `src/components/templates` |
| `@routes`            | `src/routes`            |
| `@hooks`             | `src/hooks`             |
| `@pages`             | `src/pages`             |
| `@styles`            | `src/styles`            |
| `@types_cm`          | `src/types`             |
| `@i18n`              | `src/i18n`              |
| `@lib`               | `src/lib`               |
| `@assets`            | `src/assets`            |

## Features

### Core Features

- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Bilingual Support**: Full English/Spanish internationalization with persistent language selection
- **Dark/Light Theme**: User-selectable theme with system preference detection and `localStorage` persistence
- **Cookie Consent Management**: GDPR-compliant cookie banner with explicit user consent
- **Legal Documentation**: Complete privacy policy, terms of service, and cookie policy
- **SEO Optimization**: Meta tags, Open Graph, Twitter Cards, and Schema.org structured data

### Business Features

- **Projects Page** (`/projects`): Full paginated project catalogue with "load more"
- **Projects Carousel**: Blurred-backdrop slideshow on the home page mixing static and database projects
- **Reviews System**: Paginated reviews with per-project filtering, on-demand translation between ES/EN, and a submission form protected by Cloudflare Turnstile
- **Review Page** (`/reviews`): Dedicated listing with filters and a `?write=1` deep link that opens the review form
- **Admin Dashboard** (`/admin`): Authenticated project management with image upload to Vercel Blob
- **Service Listing**: Detailed service descriptions with icons
- **Contact Integration**: Direct WhatsApp, email, and phone contact options
- **Lead Generation**: Contact form that integrates with WhatsApp for instant messaging

### Technical Features

- **Atomic Design**: Scalable component hierarchy (atoms → molecules → organisms → templates)
- **Type-Safe**: Full TypeScript implementation with a typed API client
- **Performance Optimized**: Manual vendor chunking, code splitting, and hashed asset output
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation
- **Analytics Ready**: Vercel Analytics integration

## Technology Stack

### Frontend Framework

- **React 18.3.1**: UI library
- **TypeScript 5.6.2**: Type-safe JavaScript
- **Vite 6.0.5**: Build tool and dev server
- **React Router DOM 7.18.4**: Client-side routing

### Styling

- **SCSS 1.83.4**: CSS preprocessing with BEM naming conventions and CSS custom properties

### UI

- **Bootstrap 5.3.8**: Base CSS utilities and reset
- **lucide-react 1.48.0**: Icon set
- **Motion 11.18.1**: React animations and transitions

### Backend & Storage

- **@vercel/blob 2.8.0**: Direct-to-blob image uploads from the admin dashboard
- **Cloudflare Turnstile**: Captcha protection on the review form

### Performance & Analytics

- **@vercel/analytics 1.4.1**: Web performance monitoring
- **react-lazy-load-image-component 1.6.3**: Optimized image loading

### Development Tools

- **ESLint 9.17.0**: Code quality
- **typescript-eslint 8.18.2**: TypeScript lint rules
- **eslint-plugin-react-hooks / react-refresh**: Hook and component rules

## Getting Started

### Prerequisites

- Node.js 18+ or npm 9+
- Git
- A modern web browser

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

4. Open your browser and navigate to `http://localhost:3000`

> The dev server runs on port **3000** and proxies `/api` requests to `http://localhost:4000` (see `vite.config.ts`).

### Available Scripts

| Script            | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the dev server on port 3000 with API proxy |
| `npm run build`   | Type-check with `tsc -b`, then build to `dist/`  |
| `npm run lint`    | Run ESLint over the project                     |
| `npm run preview` | Serve the production build on port 4173         |

## Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_API_BASE_URL=/api
```

| Variable            | Default | Description                                                        |
| ------------------- | ------- | ------------------------------------------------------------------ |
| `VITE_API_BASE_URL` | `/api`  | Base URL for all backend calls. In dev, `/api` is proxied to `localhost:4000`. |

Only variables prefixed with `VITE_` are exposed to the client bundle. Never place secrets in them — all privileged operations (project creation, image upload tokens) are authenticated server-side with a bearer token.

### WhatsApp Integration

The contact form uses the WhatsApp Web API. Update the phone number in:

1. `src/components/organisms/Hero/Hero.tsx` and `src/components/organisms/Footer/Footer.tsx` (the `wa.me` links)
2. `src/i18n/translations.json` (contact section)

Current number: `+15743046758`

### Company Information

Update these files with your company details:

1. `index.html` — Meta tags and Schema.org data
2. `src/i18n/translations.json` — Company name, descriptions, contact info
3. `src/components/organisms/Footer/Footer.tsx` — Footer links and copyright year
4. `src/components/organisms/Hero/Hero.tsx` — Hero copy

## Routing

Routes are defined in `src/routes/routes.tsx` with `createBrowserRouter`, and path constants live in `src/routes/paths.ts` so that links never hardcode a string.

```tsx
import { ROUTES } from '@routes/paths';

<Link to={ROUTES.reviews}>Reviews</Link>
```

| Path        | Component              | Layout       |
| ----------- | ---------------------- | ------------ |
| `/`         | `HomePage`             | `MainLayout` |
| `/projects` | `ProjectsPage`         | `MainLayout` |
| `/reviews`  | `ReviewsPage`          | `MainLayout` |
| `/privacy`  | `PrivacyPolicyPage`    | `MainLayout` |
| `/terms`    | `TermsOfServicePage`   | `MainLayout` |
| `/cookies`  | `CookiesPolicyPage`    | `MainLayout` |
| `/login`    | `LoginPage`            | `AuthLayout` |
| `/admin`    | `AdminDashboardPage`   | `AuthLayout` |

`MainLayout` renders the header, footer, cookie banner, legal modal, and Vercel Analytics. `AuthLayout` is a minimal centered shell for authentication pages.

`/reviews?write=1` opens the review form directly (see `WRITE_REVIEW_PARAM` in `paths.ts`).

## Internationalization

### Adding New Translations

Edit `src/i18n/translations.json` and add your keys to **both** the `es` and `en` objects:

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

A helper script is available to merge new keys without overwriting existing text:

```bash
node mergeTranslations.mjs src/i18n/translations.json src/i18n/translations.additions.json
```

### Using Translations in Components

```tsx
import { useI18n } from '@i18n/useI18n';

function MyComponent() {
  const { t, locale, setLocale } = useI18n();

  return <h1>{t('newFeature.title')}</h1>;
}
```

`t(key, params)` resolves dot-separated keys against the active locale and interpolates `{placeholder}` tokens. It returns the key itself when a translation is missing, which makes gaps obvious in the UI.

### Supported Locales

- **en** — English (default)
- **es** — Spanish

The active locale is persisted in `localStorage` under `xdja-locale` and mirrored to `document.documentElement.lang`.

## Theme Management

### Theme System

The application uses CSS custom properties for theming. Themes are defined in `src/styles/themes.scss` and toggled via the `data-theme` attribute on the root element.

- **Light Theme**: Default, based on `--color-bg`, `--color-text`, etc.
- **Dark Theme**: Applied when the root element carries the dark theme attribute

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

## Backend Integration

All backend communication goes through the typed client in `src/lib/api.ts`. It wraps `fetch`, parses JSON responses, and throws an `ApiError` carrying the HTTP status and optional field-level `details`.

### Endpoints Used

| Method   | Endpoint                          | Purpose                                  | Auth |
| -------- | --------------------------------- | ---------------------------------------- | ---- |
| `GET`    | `/api/health`                     | Health check                             | No   |
| `POST`   | `/api/auth/login`                 | Admin login, returns a bearer token (+ `refreshToken` when Redis is on) | No   |
| `POST`   | `/api/auth/refresh`               | Silent session renewal (single-use token rotation) | No*  |
| `POST`   | `/api/auth/logout`                | Revoke the refresh token                 | No*  |
| `GET`    | `/api/projects`                   | Paginated projects                       | No   |
| `GET`    | `/api/projects/:id`               | Single project                           | No   |
| `POST`   | `/api/projects`                   | Create a project                         | Yes  |
| `DELETE` | `/api/projects/:id`               | Delete a project (its reviews move to history) | Yes  |
| `GET`    | `/api/projects/upload-token`      | Request a direct upload token            | Yes  |
| `POST`   | `/api/projects/upload`            | Base64 image upload fallback             | Yes  |
| `GET`    | `/api/reviews`                    | Paginated reviews, optional project filter | No |
| `GET`    | `/api/reviews/project/:projectId` | Reviews for a single project             | No   |
| `GET`    | `/api/reviews/:id/translate`      | Translate a review to `es` or `en`       | No   |
| `POST`   | `/api/reviews`                    | Submit a review (Turnstile-protected)    | No   |
| `DELETE` | `/api/reviews/:id`                | Delete a review (snapshot kept 30 days)  | Yes  |
| `GET`    | `/api/reviews/history`            | Deleted-review history, paginated        | Yes  |

`*` carries the refresh token in the body instead of a bearer header.

### Authentication

The admin session uses two keys in `localStorage`: `xdja-auth-token` (24 h access JWT) and `xdja-refresh-token` (single-use rotation token, present only when the backend has Upstash Redis configured). `api.getAuthHeaders()` attaches the bearer header.

When an authenticated request returns `401`, `src/lib/api.ts` renews the session **silently**: all concurrent `401`s share a single in-flight `POST /auth/refresh` (the refresh token is single-use, so parallel refreshes would log the admin out), then the original request is retried once. Outcomes:

- refresh `200` → both tokens rotated in place, retry continues;
- refresh `401` → tokens cleared, the UI redirects to `/login`;
- refresh `503`/`429`/network → tokens kept, a retryable error message is shown (no logout).

`api.logout()` revokes the refresh token server-side (best effort) and clears both keys.

### Uploads

`AdminDashboardPage` uploads images to Vercel Blob using a short-lived token requested from the backend (`uploadImageDirect`), with a base64 endpoint as a fallback (`uploadImage` / `uploadImageBase64`).

### Data Loading Strategy

- `usePortfolioItems.ts` merges two sources: static projects from `ImagesLoader` and database projects. The carousel takes `CAROUSEL_MAX_ITEMS` (10) slides total, the `/projects` page paginates with "load more".
- `useReviews.ts` guards against out-of-order responses with a request-id ref, which matters when the project filter changes quickly.

## Legal Compliance

### Privacy Policy, Cookie Policy, and Terms of Service

All three documents are rendered as pages and as a modal (opened from the footer):

- `src/pages/PrivacyPolicyPage/PrivacyPolicyPage.tsx`
- `src/pages/CookiesPolicyPage/CookiesPolicyPage.tsx`
- `src/pages/TermsOfServicePage/TermsOfServicePage.tsx`

The privacy policy specifies data collection practices (minimal by design), data usage (only for customer inquiries), no third-party data sharing, security measures, and cookie usage. The cookie policy explains the use of functional cookies for theme and language preference storage.

### Cookie Consent Banner

`src/components/templates/MainLayout/CookieBanner.tsx` displays on first visit with options to accept or decline functional cookies. Consent is persisted in `localStorage` under `xdja-cookies-consent`.

**Important Notes**:

1. Legal pages are templates and should be reviewed by a qualified attorney for your jurisdiction
2. Current policies assume no third-party analytics by default
3. If adding analytics, update the cookie policy accordingly
4. Never use these policies without legal review for your specific use case

## SEO & Metadata

### Meta Tags

`index.html` contains the title, description, keywords, author, and robots directives.

### Open Graph and Twitter Cards

Enable rich previews on Facebook, LinkedIn, WhatsApp, and Twitter.

### Structured Data (Schema.org)

Implements `LocalBusiness` schema for business name, address, phone, ratings, social links, and category.

```json
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

1. `public/sitemap.xml` — Site structure for search engines
2. `public/robots.txt` — Crawling directives

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect the repository to Vercel
3. Vercel auto-detects the Vite configuration
4. Deploy on push to the `main` branch

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full deployment checklist.

### SPA Routing

Because the app uses `createBrowserRouter`, configure a rewrite so client-side routes fall back to `index.html`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Pre-Deployment Checklist

- [ ] All TypeScript types compile without errors: `npm run build`
- [ ] No ESLint warnings: `npm run lint`
- [ ] Update `index.html` with correct domain and company info
- [ ] Replace placeholder images (og-image.png)
- [ ] Test contact form WhatsApp integration
- [ ] Verify dark/light theme switching
- [ ] Test language switching (ES/EN)
- [ ] Verify cookie banner appears on first visit
- [ ] Test the reviews list, project filter, translation, and form submission
- [ ] Verify image upload from the admin dashboard
- [ ] Test responsive design on mobile/tablet
- [ ] Run Lighthouse audit for performance/SEO
- [ ] Review legal pages for jurisdiction compliance
- [ ] Update Schema.org data with actual business information
- [ ] Test all external links (Facebook, WhatsApp, email)

### Performance Optimization

- Vite optimizes bundle size automatically, with manual chunks for React, Motion, and Analytics
- Routes are split by the router and heavy sections are loaded per page
- Lazy loading for images via `react-lazy-load-image-component`
- CSS variables for efficient theming

## Best Practices

### Component Development

1. **Keep Components Small**: Each component should have a single responsibility
2. **Pick the Right Tier**: atoms are presentational, molecules compose atoms, organisms are full sections, templates are page shells
3. **Use TypeScript**: Define prop interfaces for all components
4. **Accessibility**: Always include semantic HTML and ARIA labels
5. **Styling**: Use SCSS variables and follow BEM naming conventions

### Styling

`src/styles/index.scss` defines the import order. Order matters: themes and atoms load first so sections can override them, and `layoutFixes.scss` loads last as a compatibility layer.

### Performance

1. **Lazy Load Images**: Use `LazyLoadImage` for off-screen images
2. **Keep Bundle Lean**: Review chunk sizes in the `npm run build` output
3. **Cache Strategy**: Configure browser cache headers for static assets
4. **Minification**: Vite minifies automatically for production

### Security

1. **No Sensitive Data in Frontend**: All credentials must be server-side; `VITE_*` variables are public
2. **Content Security Policy**: Add CSP headers to the Vercel config if needed
3. **HTTPS Only**: Always use HTTPS in production
4. **XSS Prevention**: Never use `dangerouslySetInnerHTML` with user input

### SEO

1. **Keywords**: Use target keywords naturally in headings and content
2. **Internal Links**: Link between pages and sections to improve crawlability
3. **Page Speed**: Aim for a Lighthouse score above 90
4. **Mobile First**: Test extensively on mobile devices
5. **Structured Data**: Validate Schema.org JSON-LD with Google's tool

### Maintenance

1. **Dependencies**: Run `npm audit` regularly for security updates
2. **Type Safety**: Keep strict TypeScript rules in `tsconfig.app.json`
3. **Logging**: Use `console` sparingly; remove before production
4. **Git Workflow**: Use feature branches and pull requests for changes
5. **Comments in English**: Keep code comments in English so the whole codebase is consistent

## File Naming Conventions

- **Components**: PascalCase, one folder per component (e.g., `ProjectCard/ProjectCard.tsx`)
- **Hooks**: camelCase with a `use` prefix (e.g., `usePortfolioItems.ts`)
- **Styles**: camelCase matching the component (e.g., `projectsPage.scss`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `CAROUSEL_MAX_ITEMS`)
- **Types**: PascalCase (e.g., `PortfolioItem`)

## Troubleshooting

### Build Errors

**TypeScript errors**:

```bash
npm run build
```

Fix any reported type mismatches before deploying.

**ESLint errors**:

```bash
npm run lint
```

### Runtime Issues

**Backend calls fail in development**:
Vite proxies `/api` to `http://localhost:4000`. Confirm the backend is running, or set `VITE_API_BASE_URL` to the backend URL.

**Theme not persisting**:
Check `localStorage` in DevTools and verify the `xdja-theme` key is being set.

**Language not changing**:
Verify `I18nProvider` wraps the app in `App.tsx`, that the keys exist in `translations.json`, and inspect `xdja-locale` in `localStorage`.

**Cookie banner keeps appearing**:
Clear localStorage and reload; consent is stored under `xdja-cookies-consent`.

**Reviews render raw keys**:
`t()` returns the key when a translation is missing. Add the key to both `es` and `en` in `translations.json`.

**Deep links 404 after deployment**:
Add the SPA rewrite to `index.html` (see [Deployment](#deployment)).

## Support & Contact

- **Email**: xdjaconstructionllc@gmail.com
- **Phone**: +1 (574) 304-6758
- **WhatsApp**: https://wa.me/+15743046758
- **Facebook**: https://www.facebook.com/xdjaconstructionllc

## License

Copyright 2025 XDJA Construction LLC. All rights reserved.

## Version History

### 2.1.0 (Current)

- Added `/projects` page with paginated project catalogue
- Added `/reviews` page with project filter, on-demand translation, and Turnstile-protected form
- Refactored routing into `MainLayout` / `AuthLayout` with centralized path constants
- Rebuilt the portfolio section as `ProjectsCarousel` with a blurred backdrop
- Added `ProjectCard`, `SectionLink`, and brand icon components
- Added `usePortfolioItems`, `useReviews`, `useSectionNavigation`, and `useCopyToClipboard` hooks
- Translated all code comments to English

### 2.0.0

- Complete refactor to a single responsive codebase
- Added bilingual support (English/Spanish)
- Implemented comprehensive legal documentation
- Added cookie consent management
- Implemented dark/light theme system
- Full SEO optimization with meta tags and Schema.org
- Mobile menu and WhatsApp contact integration

### 1.0.0 (Legacy)

- Initial release with separate mobile/desktop components
- Basic functionality

---

**Last Updated**: 2026-09-28

**Maintained By**: XDJA Construction Development Team
