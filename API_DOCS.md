# API Documentation

Base URL: `https://your-backend.vercel.app/api`

## Authentication

Admin endpoints require the header `Authorization: Bearer <JWT>`.
Get a token with `POST /api/auth/login`. Tokens expire after 24 hours.

## CORS

In production only the origins listed in the `ALLOWED_ORIGINS` environment variable (comma separated, no spaces, no trailing slash) can call the API from a browser.

## Rate Limits

Rate limiting requires Upstash Redis. If Redis is not configured it is disabled.

| Endpoint group | Limit | Window |
|----------------|-------|--------|
| General | 100 requests | 15 min |
| Reviews (create) | 5 requests | 1 hour |
| Login | 5 requests | 15 min |

Response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

## Endpoints

### Health

```
GET /health
GET /api/health
```
Response (200): `{ "status": "ok", "timestamp": "2026-01-01T00:00:00.000Z" }`

---

### Auth

#### Admin Login
```
POST /api/auth/login
Content-Type: application/json

{ "email": "admin@example.com", "password": "your-password" }
```
Response (200):
```json
{ "token": "eyJhbGciOiJIUzI1NiIs...", "expiresIn": "24h" }
```
Errors: `400` (`Invalid credentials` or `Admin authentication not configured`), `429`.

---

### Projects

#### Create Project (Admin)
```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Project",
  "description": "Optional description",
  "imageUrls": ["https://<store>.public.blob.vercel-storage.com/projects/a.jpg"]
}
```
Response (201): project object with images.

#### List Projects
```
GET /api/projects?page=1&pageSize=10
```
Response (200):
```json
{ "items": [], "total": 42, "page": 1, "pageSize": 10 }
```

#### Get Project by ID
```
GET /api/projects/:id
```
Response (200): project object with images.

#### Image Upload Token (Admin)
```
POST /api/projects/upload-token
Authorization: Bearer <token>
Content-Type: application/json
```
Used by the Vercel Blob client SDK (see "Image Upload" below). The body is the SDK's `HandleUploadBody`; you normally do not call this endpoint manually. Returns `503` if `BLOB_READ_WRITE_TOKEN` is not configured.

---

### Reviews

#### Create Review
```
POST /api/reviews
Content-Type: application/json

{
  "projectId": "uuid-or-null",
  "rating": 5,
  "description": "Great project!",
  "alias": "john_doe",
  "language": "en",
  "turnstileToken": "cf-turnstile-response-token"
}
```
Response (201): review object.

Validation:
- `rating`: integer 1-5 (required).
- `description`: 1-700 words (required, sanitized).
- `alias`: max 60 characters (optional, sanitized).
- `language`: `"es"` or `"en"` (default `"es"`).
- `turnstileToken`: Cloudflare Turnstile token (required). If `TURNSTILE_SECRET_KEY` is not configured, verification is skipped.
- `projectId`: valid UUID or `null`.

#### List All Reviews
```
GET /api/reviews?page=1&pageSize=10&projectId=<uuid>
```
`projectId` is optional. `pageSize` max 50. Response (200): paginated reviews.

#### List Reviews by Project
```
GET /api/reviews/project/:projectId?page=1&pageSize=10
```
Response (200): paginated reviews.

#### Translate Review
```
GET /api/reviews/:id/translate?lang=en
```
Response (200):
```json
{ "translatedText": "Translated text...", "originalLanguage": "es" }
```
- Returns the original text if it is already in the target language.
- Cached for 30 days.
- Sends the review text to the DeepL API. Requires `DEEPL_API_KEY`.

---

## Image Upload (Vercel Blob, client upload)

Images go directly from the browser to Vercel Blob. The backend only issues a short-lived token and later receives the resulting URLs.

Requirements:
- The Blob store must be created with **Public** access.
- `BLOB_READ_WRITE_TOKEN` must be set on the backend.

Frontend (browser):
```typescript
import { upload } from "@vercel/blob/client";

const blob = await upload(`projects/${file.name}`, file, {
  access: "public",
  handleUploadUrl: `${API_BASE_URL}/projects/upload-token`,
  headers: { Authorization: `Bearer ${adminToken}` },
});
// blob.url -> send in POST /api/projects as imageUrls[]
```

Backend (`ProjectController`, server side):
```typescript
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

const result = await handleUpload({
  token: env.BLOB_READ_WRITE_TOKEN,
  request: req,
  body: req.body as HandleUploadBody,
  onBeforeGenerateToken: async () => ({
    allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    maximumSizeInBytes: 10 * 1024 * 1024,
    addRandomSuffix: true,
  }),
});
```

---

## Error Responses

```json
// 400 Validation error
{ "error": "Validation Error", "details": [{ "field": "rating", "message": "Maximum rating is 5" }] }

// 400 Domain validation
{ "error": "Review cannot exceed 700 words" }

// 401 Unauthorized
{ "error": "Missing or invalid authorization header" }

// 404 Not found
{ "error": "Project with id xxx not found" }

// 429 Rate limited
{ "error": "Too many requests", "message": "Rate limit exceeded. Please try again later." }

// 500 Server error
{ "error": "Internal server error" }
```

---

## Data Models

### Project
```typescript
{
  id: string;            // UUID
  title: string;         // max 150
  description: string | null; // max 2000
  images: ProjectImage[];
  createdAt: string;     // ISO 8601
  updatedAt: string;     // ISO 8601
}
```

### ProjectImage
```typescript
{
  id: string;            // UUID
  projectId: string;
  url: string;
  order: number;
  createdAt: string;
}
```

### Review
```typescript
{
  id: string;            // UUID
  projectId: string | null;
  rating: number;        // 1-5
  description: string;   // sanitized, max 700 words
  alias: string | null;  // sanitized, max 60
  language: "es" | "en";
  createdAt: string;
}
```