# Telemetry & User Data Analysis

Last reviewed: 2026-09-28. This document describes what the code does today. It is a technical inventory, **not legal advice** and not a certification of compliance with GDPR, CCPA, LFPDPPP or any other law. Have a qualified lawyer review it, together with the public Privacy and Cookies policies, before relying on it.

Scope: this repository (backend) plus the client-side behavior of the companion frontend where it affects personal data.

## 1. Data Submitted by Users (Backend)

| Data | Source | Stored | Purpose |
|------|--------|--------|---------|
| Project title, description, image URLs | `POST /api/projects` (admin) | Yes (Postgres) | Display projects |
| Review rating (1-5) | `POST /api/reviews` | Yes (Postgres) | Display reviews |
| Review text | `POST /api/reviews` | Yes (Postgres) | Display reviews |
| Review alias (optional) | `POST /api/reviews` | Yes (Postgres) | Display reviews |
| Review language | `POST /api/reviews` | Yes (Postgres) | Translation context |
| Turnstile token | `POST /api/reviews` | No (verified only) | Anti-spam |

Reviews are public. Users may enter personal data in the free-text fields; the alias is optional and can be a pseudonym.

## 2. Data Collected Automatically

| Data | Where | Stored | Purpose |
|------|-------|--------|---------|
| Client IP | Request headers (`x-vercel-forwarded-for`, `x-real-ip`, `x-forwarded-for`) | **Yes, temporarily**: used as part of the rate-limit key in Upstash Redis (`general:<ip>`, `review:<ip>`, `login:<ip>`) until the window expires (15 min to 1 h) | Rate limiting |
| Client IP | Sent to Cloudflare during Turnstile verification | Per Cloudflare | Bot verification |
| Request logs (path, status, timestamps, IP) | Vercel platform logs | Per Vercel retention settings | Debugging, security |
| Application error logs | `console.error` in `errorHandler` | Vercel logs | Debugging |
| Admin JWT | `Authorization` header | No (verified only) | Admin auth |

The backend does not log User-Agent or request bodies on purpose, but full error objects are logged and could contain fragments of input. Do not put personal data in error messages.

## 3. Data Collected by the Frontend

| Item | Mechanism | Purpose |
|------|-----------|---------|
| Vercel Web Analytics | `@vercel/analytics` (`<Analytics />`) | Aggregate page views and visitor metrics |
| `xdja-cookies-consent` | `localStorage` | Remembers cookie banner choice |
| `xdja-theme` | `localStorage` | Remembers light/dark theme |
| `xdja-auth-token`, `xdja-user` | `localStorage` (admin only) | Admin session |

**Known gap:** `<Analytics />` is rendered unconditionally in `MainLayout.tsx`, so it loads even if the visitor declines cookies. Either gate it behind consent (`{cookiesConsent === true && <Analytics />}`) or state clearly in the Cookies Policy that cookieless analytics always run. Confirm with your lawyer which option fits your audience.

**Admin token in `localStorage`:** it is readable by any script running on the page (XSS risk). Sanitization and the absence of user-generated HTML reduce this risk, but an HttpOnly cookie would be safer.

## 4. Third-Party Processing

| Service | Data received | Purpose |
|---------|---------------|---------|
| Neon (Postgres) | All project and review data | Primary storage |
| Upstash Redis | IP-based rate-limit keys, cached API responses | Rate limiting, caching |
| Vercel (hosting, Blob, Analytics) | Requests, logs, uploaded images, page-view analytics | Hosting and storage |
| DeepL API | Review text, only when a visitor requests a translation | Translation |
| Cloudflare Turnstile | Token, IP, browser signals | Bot verification |

Notes:
- The DeepL endpoint in use is `api-free.deepl.com` (DeepL API Free). Read DeepL's current terms: the free plan may handle submitted text differently from the paid Pro plan. Upgrade to Pro if that is a concern.
- Confirm where each provider stores data (region) and sign or accept each provider's Data Processing Addendum.

## 5. Data NOT Collected by This Backend

- No advertising or behavioral-tracking SDKs (no Google Analytics, Mixpanel, etc.).
- No cookies set by the backend.
- No user accounts for the public; the only account is the admin.
- No visitor passwords, payment data, or precise location.
- No email addresses from visitors (the admin email exists only as an environment variable).

## 6. Retention

| Data | Retention | Deletion |
|------|-----------|----------|
| Projects | Indefinite | Manual, directly in the database (no delete endpoint exists) |
| Reviews | Indefinite | Manual, directly in the database (no delete endpoint exists) |
| Rate-limit keys (contain IP) | Sliding window, 15 min to 1 h | Automatic expiry in Redis |
| Cached responses | 3 min to 30 days | Automatic expiry in Redis |
| Translations cache | 30 days | Automatic expiry |
| Uploaded images | Indefinite | Manual, in Vercel Blob |
| Vercel logs | Per Vercel plan and settings | Per Vercel |

## 7. Data Subject Requests

There are no self-service endpoints. Requests (access, correction, deletion, export) are handled manually by the site owner through database queries. Define who receives such requests and a response time, and publish a contact address in the Privacy Policy.

## 8. Security Measures

1. TLS in transit (enforced by Vercel and the providers).
2. Encryption at rest is provided by the hosting providers; verify each provider's documentation.
3. `sanitize-html` strips HTML from review description and alias.
4. Rate limiting on general, review, and login endpoints (requires Upstash; fails open on Redis errors).
5. Admin authentication with JWT (HS256, 24 h). Rotating `ADMIN_JWT_SECRET` invalidates all sessions.
6. Admin password verification uses HMAC-SHA256 without a per-user salt. This is weak; migrating to `scrypt` or `argon2` is recommended.
7. Secrets only in environment variables.
8. CORS restricted to `ALLOWED_ORIGINS` in production.
9. Blob uploads use short-lived client tokens issued by an admin-only endpoint.

## 9. Recommendations

1. Gate Vercel Analytics behind cookie consent, or document it.
2. Publish a Privacy Policy and a Cookies Policy that match this document, including the third parties in section 4 and a contact address.
3. Add an admin endpoint or script to delete reviews and projects.
4. Add audit logs for admin actions.
5. Set a Vercel log retention period.
6. Move the admin session to an HttpOnly cookie and the password hash to `scrypt`/`argon2`.
7. Consider hashing IPs in rate-limit keys.
8. Re-run this review whenever a new service or data field is added.