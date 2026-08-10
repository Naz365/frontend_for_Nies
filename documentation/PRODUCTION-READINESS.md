# Production Readiness & Infrastructure Deployment Specification

**Target Platform**: N.I. Engineering Services  
**Phase**: Phase 0 — Production Reality Check & Integration Execution  

---

## 1. System Topology Architecture

```
                                  [ DNS Routing / Cloudflare CDN ]
                                                 │
          ┌──────────────────────────────────────┼──────────────────────────────────────┐
          │                                      │                                      │
          ▼                                      ▼                                      ▼
[ Public Marketing & Store ]           [ Public REST API v1 ]              [ Private Administration ]
   niengineeringbd.com                api.niengineeringbd.com              manage.niengineeringbd.com
          │                                      │                                      │
  Astro Static / SSR                     Laravel 12 API Engine                   Filament v3 Admin Portal
  (Edge CDN / Node Host)                 (PHP 8.3+ PHP-FPM / Octane)             (Session Authenticated)
          │                                      │                                      │
          └──────────────────────────────────────┼──────────────────────────────────────┘
                                                 │
                                                 ▼
                                     [ Database & Storage Layer ]
                                                 │
                          ┌──────────────────────┴──────────────────────┐
                          ▼                                             ▼
                 Managed PostgreSQL 16                         Persistent Object Storage
                  (Host: 5432 / SSL)                           (AWS S3 / MinIO / DigitalOcean)
```

---

## 2. Infrastructure & Environment Audit Matrix

| Audit Dimension | Target Production Requirement | Current Status / Findings | Remediation Required Before Launch |
| :--- | :--- | :--- | :--- |
| **DNS Configuration** | CNAME/A records pointing `niengineeringbd.com` to Astro CDN, `api.` & `manage.` to Laravel host. | Conceptual architecture established; DNS cutover pending final signoff. | Configure authoritative DNS zone records with 300s TTL for cutover. |
| **HTTPS / TLS** | Strict SSL/TLS (TLS 1.3) with HSTS and automated renewal. | Standard SSL on edge reverse proxy. | Enforce `Strict-Transport-Security: max-age=31536000; includeSubDomains`. |
| **CORS Policy** | Whitelist `https://niengineeringbd.com` and `https://manage.niengineeringbd.com` with `X-Cart-Session` allowed. | Default open in dev; needs strict production CORS headers in `bootstrap/app.php`. | Register allowed origins and custom headers in middleware. |
| **API Base URL** | `https://api.niengineeringbd.com/api/v1` | Hardcoded render fallback in some components; standardized in `src/lib/api/client.ts`. | Inject `PUBLIC_API_URL` consistently via environment variables. |
| **Database Engine** | Managed PostgreSQL (v15+) with connection pooling and automated daily snapshots. | SQLite used in local development; PostgreSQL driver verified in `config/database.php`. | Provision managed PostgreSQL database instance and run additive migrations. |
| **Media Storage** | Persistent S3-compatible object storage with CDN cache headers for product & project images. | `FILESYSTEM_DISK=public` (local storage disk). | Configure S3 disk in `config/filesystems.php` for multi-instance cloud deployments. |
| **Queue Worker** | Asynchronous queue driver (`redis` or `database`) for email delivery, order notifications, and webhooks. | `QUEUE_CONNECTION=sync` | Set `QUEUE_CONNECTION=database` and run background worker `php artisan queue:work`. |
| **Cache Driver** | In-memory `redis` or persistent `database` cache for rate limiters and API response caches. | `CACHE_STORE=file` | Set up Redis or PostgreSQL database cache table (`cache`). |
| **Mail Transport** | Transactional SMTP (Postmark / SendGrid / Amazon SES) for quote alerts & order receipts. | `MAIL_MAILER=log` | Configure production SMTP credentials in backend `.env`. |
| **Application Logging**| Centralized structured JSON logging (`LOG_CHANNEL=stderr` or Datadog/CloudWatch) with secret scrubbing. | `LOG_CHANNEL=stack` (file-based). | Set `LOG_CHANNEL=stderr` for containerized runtime. |
| **Health Checks** | Verified HTTP endpoints: `/up` (Laravel), `/api/ping`, and `/api/v1/health`. | All 3 health endpoints verified working in routes. | Attach cloud container orchestrator liveness & readiness probes to `/up`. |

---

## 3. Standardized Reproducible Deployment Procedure

### Frontend Deployment (`niengineeringbd.com`)
```bash
# 1. Install locked dependencies
npm ci

# 2. Build static production bundle
PUBLIC_API_URL="https://api.niengineeringbd.com/api/v1" \
PUBLIC_SITE_URL="https://niengineeringbd.com" \
npm run build

# 3. Deploy output directory (dist/) to CDN / static web server
```

### Backend Deployment (`api.niengineeringbd.com` & `manage.niengineeringbd.com`)
```bash
# 1. Install production PHP dependencies
php composer.phar install --no-dev --prefer-dist --optimize-autoloader --no-interaction

# 2. Clear stale bootstrap caches
php artisan optimize:clear

# 3. Execute safe additive database migrations (NEVER USE migrate:fresh)
php artisan migrate --force

# 4. Cache configurations, routes, and views for high performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan filament:cache-components

# 5. Create storage symlink if using public disk
php artisan storage:link || true
```

### Safe Production Migration Policy
> [!IMPORTANT]
> **Zero-Downtime Migration Rule**: All production database migrations must be purely additive (new tables, nullable new columns, non-destructive indexes). Never use `php artisan migrate:fresh`, `migrate:reset`, or `db:wipe` in any non-local environment.

### Rollback Strategy
1. **Frontend Rollback**: Revert CDN deployment to previous immutable release commit SHA.
2. **Backend Code Rollback**: Re-deploy previous release container image or checkout previous Git commit SHA and run `php artisan optimize:clear && php artisan config:cache`.
3. **Database Rollback**: If a newly added migration must be reverted, run targeted `php artisan migrate:rollback --step=1`.
