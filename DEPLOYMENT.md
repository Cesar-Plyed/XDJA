# DEPLOYMENT.md

## Deployment Guide - XDJA Construction Website

## Pre-Deployment Checklist

### Code Quality

- [ ] All TypeScript errors resolved: `npm run build`
- [ ] No ESLint warnings: `npm run lint`
- [ ] All components tested locally: `npm run dev`
- [ ] Code review completed
- [ ] Tests pass in browser DevTools console (no errors)

### Configuration

- [ ] Company information updated in `index.html`
- [ ] WhatsApp number verified in `ContactSection.tsx`
- [ ] Email addresses updated in footer and contact
- [ ] Phone number verified and formatted
- [ ] Social media links updated (Facebook)
- [ ] Canonical URL set correctly
- [ ] Domain configured in all meta tags

### Content

- [ ] All text reviewed for accuracy and spelling
- [ ] Testimonials with verified attribution
- [ ] Portfolio projects with correct descriptions
- [ ] Services accurately described
- [ ] Company mission and values clear
- [ ] Legal pages reviewed by attorney

### Media & Assets

- [ ] Logo/icon placed in `public/`
- [ ] Open Graph image (og-image.png) created and optimized
- [ ] All images compressed and optimized
- [ ] Favicons generated and included
- [ ] Placeholder images replaced with real content

### SEO & Analytics

- [ ] Meta title and description finalized
- [ ] Keywords research completed
- [ ] Schema.org data accurate and verified
- [ ] Robots.txt configured
- [ ] Sitemap.xml generated
- [ ] Google Search Console setup
- [ ] Google Analytics configured (if applicable)
- [ ] Vercel Analytics enabled

### Security

- [ ] No sensitive data in code or config files
- [ ] Environment variables secured
- [ ] HTTPS enforced
- [ ] Content Security Policy configured
- [ ] Dependencies audited: `npm audit`
- [ ] No console errors or warnings

### Performance

- [ ] Lighthouse score >= 90 (all categories)
- [ ] Page load time < 3 seconds
- [ ] Mobile Core Web Vitals optimized
- [ ] Images lazy-loaded
- [ ] Code split and minified

### Browser Compatibility

- [ ] Tested on Chrome (desktop)
- [ ] Tested on Safari (desktop)
- [ ] Tested on Firefox (desktop)
- [ ] Tested on Chrome Mobile
- [ ] Tested on Safari Mobile
- [ ] No layout shifts (CLS < 0.1)

### Accessibility

- [ ] Screen reader tested
- [ ] Keyboard navigation functional
- [ ] Color contrast verified (4.5:1 minimum)
- [ ] All buttons and links have labels
- [ ] Forms are properly labeled
- [ ] WCAG 2.1 AA compliant

## Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform as it's built for Vite applications.

#### Step 1: Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "Import Project"
4. Select the XDJA repository
5. Click "Import"

#### Step 2: Configure Environment

1. In Vercel dashboard, go to project settings
2. Navigate to "Environment Variables"
3. Add any required variables (if applicable)
4. Ensure "Auto-expose System Environment Variables" is enabled

#### Step 3: Configure Build Settings

Vercel auto-detects Vite configuration. Verify:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher

#### Step 4: Custom Domain

1. Go to project "Settings" > "Domains"
2. Add your custom domain (e.g., `xdja-construction.com`)
3. Update DNS records as instructed
4. Wait for DNS propagation (typically 24 hours)

#### Step 5: SSL Certificate

Vercel automatically provisions free SSL certificates via Let's Encrypt.

1. SSL certificate auto-provisioned after domain added
2. Verify certificate in browser address bar
3. Redirect HTTP to HTTPS in Vercel settings

### Alternative: Netlify

#### Step 1: Connect Repository

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Select GitHub and authorize
4. Select XDJA repository

#### Step 2: Build Configuration

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18.x

#### Step 3: Deploy

1. Click "Deploy site"
2. Wait for build to complete (typically 2-5 minutes)
3. Verify deployment at generated URL
4. Add custom domain in Site settings

### Manual Deployment (Self-Hosted)

If deploying to your own server:

#### Build

```bash
npm run build
```

Production files are in `dist/` directory.

#### Upload to Server

```bash
# Using SCP
scp -r dist/* user@server.com:/var/www/xdja/

# Using FTP
# Upload dist/ contents to public_html/ or www/ directory
```

#### Web Server Configuration

**Nginx**:

```nginx
server {
  listen 80;
  server_name xdja-construction.com www.xdja-construction.com;
  
  location / {
    root /var/www/xdja;
    try_files $uri $uri/ /index.html;
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
  
  # Redirect HTTP to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name xdja-construction.com www.xdja-construction.com;
  
  ssl_certificate /path/to/certificate.crt;
  ssl_certificate_key /path/to/private.key;
  
  # ... rest of SSL configuration
}
```

**Apache**:

```apache
<VirtualHost *:80>
  ServerName xdja-construction.com
  ServerAlias www.xdja-construction.com
  DocumentRoot /var/www/xdja
  
  <Directory /var/www/xdja>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
  </Directory>
  
  <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
  
  # Redirect to HTTPS
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>
```

## Post-Deployment Verification

### Functionality Testing

1. **Navigation**
   - [ ] All links working
   - [ ] Language switcher functions
   - [ ] Theme toggle works
   - [ ] Mobile menu opens/closes

2. **Content**
   - [ ] All text displays correctly
   - [ ] Images load properly
   - [ ] Videos play (if applicable)
   - [ ] Testimonials visible
   - [ ] Portfolio projects display

3. **Contact**
   - [ ] Contact form submits
   - [ ] WhatsApp link works
   - [ ] Email link functions
   - [ ] Phone link works

4. **Theme & Internationalization**
   - [ ] Dark theme applies globally
   - [ ] Light theme applies globally
   - [ ] Theme persists on refresh
   - [ ] Spanish translations correct
   - [ ] English translations correct
   - [ ] Language persists on refresh

5. **Legal Pages**
   - [ ] Privacy policy accessible
   - [ ] Cookies policy accessible
   - [ ] Terms visible
   - [ ] All links in footer work

### Performance Monitoring

1. **Lighthouse Audit**

```bash
# In DevTools > Lighthouse
# Target scores:
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 95+
# - SEO: 100
```

2. **Core Web Vitals**
   - Largest Contentful Paint (LCP): < 2.5s
   - First Input Delay (FID): < 100ms
   - Cumulative Layout Shift (CLS): < 0.1

3. **Monitoring with Vercel Analytics**

- Access via Vercel dashboard
- Monitor real user metrics
- Set up alerts for performance regressions

### SEO Verification

1. **Google Search Console**
   - [ ] Site added to Search Console
   - [ ] Sitemap submitted
   - [ ] No indexation issues
   - [ ] No security issues reported
   - [ ] Mobile usability verified
   - [ ] Core Web Vitals monitored

2. **Meta Tags**
   - [ ] Title tags correct in search results
   - [ ] Meta descriptions display properly
   - [ ] Schema.org data validated

3. **Structured Data**

Validate with Google's Structured Data Testing Tool:

https://search.google.com/structured-data/testing-tool

## Rollback Procedures

### Vercel

1. Go to project deployments
2. Find previous working deployment
3. Click the menu and select "Promote to Production"
4. Verify site reverted to previous version

### Netlify

1. Go to Deploy settings
2. Find previous deployment in history
3. Click "Publish deploy"
4. Verify site reverted

### Manual Deployment

```bash
# Restore previous backup
rm -rf /var/www/xdja/*
cp -r /var/backups/xdja-backup-2025-01-15/* /var/www/xdja/
```

## Continuous Deployment

### Auto-Deploy on Push

Vercel and Netlify both support automatic deployment when you push to `main`:

1. No additional configuration needed
2. Push triggers automatic build
3. Built site auto-deployed if build succeeds
4. Rollback available via platform dashboard

### CI/CD Pipeline (Optional)

For additional safety, configure pull request previews:

1. **Vercel**: Automatic for all GitHub PRs
2. **Netlify**: Enable in site settings

This creates a preview URL for each PR, allowing testing before merge to main.

## Monitoring & Maintenance

### Weekly Tasks

- [ ] Review Vercel/Netlify dashboards for errors
- [ ] Check Core Web Vitals in Search Console
- [ ] Monitor 404 errors
- [ ] Check contact form submissions

### Monthly Tasks

- [ ] Run security audit: `npm audit`
- [ ] Check dependency updates: `npm outdated`
- [ ] Review error logs
- [ ] Analyze user engagement in Analytics
- [ ] Backup site data

### Quarterly Tasks

- [ ] Full site audit (performance, SEO, accessibility)
- [ ] Update legal documents if needed
- [ ] Review and update content
- [ ] Security penetration testing
- [ ] Competitor analysis

## Disaster Recovery

### Backup Strategy

1. **Vercel/Netlify Backups**
   - Automatic via Git history
   - 90-day deployment history
   - Always push to GitHub before deploying

2. **Manual Backups**
   ```bash
   # Weekly backup to local storage
   tar -czf xdja-backup-$(date +%Y-%m-%d).tar.gz .
   ```

3. **Database Backups** (if applicable)
   - Schedule nightly backups
   - Store in secure location
   - Test restore procedures

### Recovery Process

1. **Website Down**
   - Check Vercel/Netlify status page
   - Review recent deployments
   - Rollback to last known good state
   - Monitor uptime

2. **Data Loss**
   - Restore from Git repository
   - Restore from backup server
   - Contact hosting provider support

3. **Security Breach**
   - Immediately take site offline
   - Rotate credentials
   - Scan for malware
   - Restore from clean backup
   - Contact security team

## Support

For deployment issues:

- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://support.netlify.com
- **GitHub Issues**: Open issue in repository
- **Email**: xdjaconstructionllc@gmail.com

---

**Last Updated**: 2025-09-26
