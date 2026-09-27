# Refactor to Single Component & Production Ready

## Goal
Consolidate all React components into a single `App.tsx` file, remove legacy component directories (ComponentsGl, ComponentsPh, ComponentsWn), move ImageScroll carousel labels to translations, and prepare for production deployment.

## Current State Analysis

### Active Components (src/components/)
- NavBar, HeroSection, AboutSection, ServicesSection, PortfolioSection
- TestimonialsSection, ImageScroll, ContactSection, Footer
- ThemeToggle, CookieBanner, LanguageSwitcher, Popup, MobileMenu, Information

### Legacy Directories (TO REMOVE)
- `src/ComponentsGl/` - pup.tsx, illustration.tsx
- `src/ComponentsPh/` - navBarPh.tsx, footerPh.tsx, informationPh.tsx, imageScrollPh.tsx
- `src/ComponentsWn/` - navBar.tsx, information.tsx, imageScroll.tsx, footer.tsx

### Key Issues
1. **ImageScroll carousel labels hardcoded** in `ImagesLoader.tsx` ("Farming", "Flooring", "Siding", "Windows & doors", "Drywall")
2. **Multiple duplicate component implementations** across 4 directories
3. **Unused dependencies**: @mantine/core, bootstrap, react-router-dom (only Link used in MobileMenu), react-spinners
4. **Class component** in footerPh.tsx/footer.tsx (should be functional)
5. **Popup content hardcoded** in NavBar (not in translations)

## Plan

### Phase 1: Consolidate Components into Single App.tsx
1. Merge all component logic into `src/App.tsx` as internal functions
2. Keep hooks (useTheme, useResponsive, useI18n) as separate files (reusable)
3. Keep I18nProvider separate (context provider)
4. Keep asset loaders (ImagesLoader, iconLoad) separate

### Phase 2: Update Translations (translations.json)
Add new keys:
```json
{
  "imageScroll": {
    "farming": "Farming",
    "flooring": "Flooring",
    "siding": "Siding",
    "windowsDoors": "Windows & doors",
    "drywall": "Drywall"
  },
  "popup": {
    "welcome": "Welcome to XDJA",
    "description": "We are experts in construction and space renovation with criteria, safety and clarity.",
    "cta": "Contact us to learn more about our services."
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "portfolio": "Portfolio",
    "contact": "Contact"
  }
}
```

### Phase 3: Remove Legacy Directories
- Delete `src/ComponentsGl/`, `src/ComponentsPh/`, `src/ComponentsWn/`
- Delete `src/Styles/` (legacy styles)
- Update imports in any remaining files

### Phase 4: Production Build Optimization
1. **Remove unused dependencies** from package.json
2. **Add production build config** to vite.config.ts:
   - Minification
   - Source maps (hidden)
   - Asset hashing
   - Code splitting
3. **Update tsconfig** for production (strict mode already enabled)
4. **Add .env.production** for analytics ID
5. **Configure headers** for caching (via vercel.json or netlify.toml)

### Phase 5: Clean Up & Validate
1. Run `npm run build` - verify no errors
2. Run `npm run lint` - fix any warnings
3. Run `npx tsc --noEmit` - verify types
4. Test preview with `npm run preview`

## Files to Modify

### Primary Changes
- `src/App.tsx` - Single consolidated component
- `src/i18n/translations.json` - Add carousel labels & popup text
- `src/assets/Images/ImagesLoader.tsx` - Use translations for alt texts
- `package.json` - Remove unused deps
- `vite.config.ts` - Production build config

### Files to Delete
- `src/components/*.tsx` (14 files)
- `src/components/index.ts`
- `src/ComponentsGl/` (entire directory)
- `src/ComponentsPh/` (entire directory)
- `src/ComponentsWn/` (entire directory)
- `src/Styles/` (entire directory)

### Files to Keep (unchanged)
- `src/hooks/useTheme.ts`
- `src/hooks/useResponsive.ts`
- `src/hooks/useMediaQuery.ts`
- `src/hooks/index.ts`
- `src/i18n/I18nProvider.tsx`
- `src/main.tsx`
- `src/styles/*.scss` (active styles)

## Production Deployment Checklist
- [ ] Build succeeds without errors
- [ ] All translations work for both languages
- [ ] ImageScroll carousel labels translate
- [ ] Theme toggle persists
- [ ] Language switcher persists
- [ ] Cookie consent persists
- [ ] Mobile menu works
- [ ] Form submits to WhatsApp
- [ ] Analytics loads (Vercel)
- [ ] Assets optimized (images, CSS, JS)
- [ ] No console errors in production build

## Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Large App.tsx file | Keep organized with clear section comments |
| Breaking translations | Test both es/en after changes |
| Lost functionality | Compare behavior before/after |
| Build failures | Run build incrementally |

## Validation Steps
1. `npm run build` - must pass
2. `npm run lint` - must pass
3. `npx tsc --noEmit` - must pass
4. `npm run preview` - manual visual verification
5. Test language switching (ES/EN)
6. Test theme toggle
7. Test mobile responsiveness
8. Test form submission