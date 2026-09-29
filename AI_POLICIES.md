# AI Policies for xdja-backend

Rules for AI-assisted development in this project. Last reviewed: 2026-09-28.

## AI Usage Disclosure

- Parts of this codebase and its documentation were written or reviewed with AI coding assistants.
- Every AI-generated change must be reviewed and understood by a human developer before it is merged or deployed.
- AI output is not a guarantee of correctness, security, or legal compliance.
- Never paste secrets (tokens, passwords, connection strings, `.env` contents) or real personal data into an AI tool.

## Architecture & Patterns

- **Clean Architecture**: layers `domain` -> `application` -> `infrastructure`.
- **Dependency rule**: inner layers never depend on outer layers.
- **Dependency injection**: concrete implementations are wired only in `container.ts`.
- **Repository pattern**: domain defines interfaces, infrastructure implements them.
- **Use cases**: single responsibility; orchestrate entities and ports.

## TypeScript Standards

- Strict mode enabled (`strict: true`, `noUncheckedIndexedAccess: true`).
- Avoid `any`; use `unknown` or proper types. Any exception must be justified in a comment.
- Public methods should declare explicit return types.
- Zod validates HTTP input.
- Use path aliases: `@/domain`, `@/application`, `@/infrastructure`, `@/shared`.

## Error Handling

- Domain errors: `ValidationError` (400), `NotFoundError` (404), `DomainError` (500).
- The centralized `errorHandler` middleware maps errors to HTTP responses.
- Do not log request bodies or personal data in error messages.

## Security

- **Input sanitization**: `sanitize-html` is applied to review `description` and `alias` (public input) in the `Review` entity. Project data is admin-only input.
- **Rate limiting**: sliding window via Upstash Redis (general, review, login). It is disabled if Redis is not configured and fails open if Redis errors.
- **Auth**: JWT (HS256, 24h expiry). Admin-only endpoints are protected by `adminAuthMiddleware`.
- **CORS**: restrictive in production; only origins listed in `ALLOWED_ORIGINS` are allowed.
- **Body limit**: 2 MB JSON.
- **SQL injection**: Prisma parameterized queries only; no `$queryRawUnsafe`.
- **Secrets**: environment variables only; never in code or in the repository.
- **Uploads**: images go directly from the browser to Vercel Blob using a short-lived client token issued by an admin-only endpoint. The Blob read-write token never leaves the server.

## Database

- All queries go through Prisma Client.
- Migrations are version-controlled in `prisma/migrations/`.
- The database may be shared with other projects. This project uses its own Postgres schema (`schema=xdja` in `DATABASE_URL` and `DIRECT_DATABASE_URL`). Never run `prisma migrate reset` or `prisma db push` against a shared database.
- Field limits (rating 1-5, description length, alias length) are enforced by Zod and by column types. There are no database `CHECK` constraints.

## Caching

- Upstash Redis (REST API, serverless-compatible).
- Versioned keys instead of pattern deletion.
- TTLs: project list 5 min, project detail 10 min, review list by project 3 min, translations 30 days.

## Testing

- Vitest is configured. Automated tests are not yet included in the repository.
- New logic should ship with tests that use fake repositories (no real DB or Redis).

## Prohibited Patterns

- Direct Prisma usage in controllers or use cases.
- `any` without justification.
- Business logic in controllers.
- Circular dependencies between layers.
- Secrets in code.
- Multer or server-side file handling in serverless functions (use Vercel Blob client upload).
- `SCAN` for cache invalidation (use versioned keys).
- Returning storage tokens to the browser.

## Required for New Features

1. Domain entity with validation.
2. Repository interface in `domain`.
3. Zod DTO in `application/dtos`.
4. Port interface if a new external service is used.
5. Use case in `application/use-cases`.
6. Implementation in `infrastructure`.
7. Wiring in `container.ts`.
8. Controller and route.
9. Tests with fakes.
10. Update `README.md`, `API_DOCS.md` and `TELEMETRY_ANALYSIS.md` if endpoints, env vars, or data collection change.

## AI Review Checklist

When AI generates or modifies code, verify:

- [ ] Follows Clean Architecture layers.
- [ ] Uses Zod for input validation.
- [ ] Sanitizes public user text.
- [ ] Handles errors through the `DomainError` hierarchy.
- [ ] No hardcoded secrets.
- [ ] Proper TypeScript types.
- [ ] Tests included for new logic.
- [ ] No framework imports in `domain` or `application`.
- [ ] Any new third-party service or data collected is documented in `TELEMETRY_ANALYSIS.md`.

## Model Preferences

- Default: the model configured for the session.
- Complex refactoring: prefer models with strong reasoning.
- Quick fixes: faster models are acceptable.
- Do not switch models without a request from the project owner.

## Documentation Updates

- `README.md`: update on new endpoints, env vars, or architecture changes.
- `API_DOCS.md`: update on any endpoint change.
- `TELEMETRY_ANALYSIS.md`: update whenever data collection or third-party services change.