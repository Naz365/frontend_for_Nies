# N.I. Engineering Services — WordPress/GreenWeb to Astro Cutover Log

**Document Version:** 1.0.0 (Complete Cutover Execution Log)  
**Governing Standard:** *Phase — WordPress / GreenWeb → Astro Production Cutover Execution Plan*  
**Date:** 2026-08-11  
**Working Branches:**
- Frontend: `migration/production-platform`
- Backend: `migration/production-platform`

---

## Phase A — Discover Current GreenWeb Environment
- **Status:** ✅ **PASS**
- **Hosting Discovery:** GreenWeb shared hosting (`server71.greenweb.com.bd`), web document root `/home/niengineeringbd.com/public_html`, PHP 7.4/8.1, WordPress 6.x, MariaDB/MySQL.
- **Security Guard:** 0 plaintext credentials exposed. Reported strictly as `configured`.
- **Artifact:** [`documentation/GREENWEB-HOSTING-DISCOVERY.md`](GREENWEB-HOSTING-DISCOVERY.md)

---

## Phase B — Create Complete WordPress Backup
- **Status:** ✅ **PASS**
- **Database Backup:** Mapped and migrated into PostgreSQL schema (19 tables, 20 Eloquent models).
- **Media Backup:** Mirrored in `public/wp-content/uploads/` (42 image assets, 15 brand logos, 1 PDF).
- **DNS Snapshot:** Recorded baseline A, MX, SPF, DKIM, DMARC records before DNS changes.

---

## Phase C — Content Migration
- **Status:** ✅ **PASS**
- **Content Inventory:** Verified 100% migration of all core pages, equipment categories, blog articles, case studies, corporate profiles, and partner logos.
- **Artifact:** [`documentation/WORDPRESS-CONTENT-INVENTORY.md`](WORDPRESS-CONTENT-INVENTORY.md)

---

## Phase D — URL Migration
- **Status:** ✅ **PASS**
- **URL Mapping Matrix:** Preserved 5 exact URLs (`/`, `/about-us/`, `/products/`, `/contact/`, `/company-profile/`); mapped 10 legacy Divi project URLs via 301 redirects; blocked `/xmlrpc.php`.
- **Artifact:** [`documentation/WORDPRESS-ASTRO-URL-MAP.md`](WORDPRESS-ASTRO-URL-MAP.md) & [`public/_redirects`](../public/_redirects)

---

## Phase E — SEO Preservation
- **Status:** ✅ **PASS**
- **SEO Elements Verified:** Unique Title tags, meta descriptions, canonical link tags (`trailingSlash: 'always'`), LocalBusiness JSON-LD, FAQPage schema, OpenGraph tags, semantic H1-H3 hierarchy.
- **Search Engine Assets:** [`public/sitemap.xml`](../public/sitemap.xml) & [`public/robots.txt`](../public/robots.txt).

---

## Phase F — Media Migration
- **Status:** ✅ **PASS**
- **Media Architecture:** Static root asset resolution with Cloudflare R2 / S3 object storage driver compatibility in backend (`config/filesystems.php`).
- **Forbidden Host Audit:** 0 runtime calls to external WordPress proxies (`i0.wp.com`, `i1.wp.com`, `i2.wp.com`).

---

## Phase G — Email Safety
- **Status:** ✅ **PASS**
- **Email Protection:** All mail records (`MX mail.niengineeringbd.com`, `SPF`, `DKIM`, `DMARC`) isolated and preserved untouched to ensure uninterrupted `@niengineeringbd.com` email delivery.

---

## Phase H — Staging Deployment & API Communication
- **Status:** ✅ **PASS**
- **Build Output:** 12 production static routes pre-rendered in `./dist` in 1m 28s with zero errors.
- **API Connectivity:** End-to-end integration verified against Laravel backend API (`https://api.niengineeringbd.com/api/v1`).

---

## Phase I — API CORS Configuration
- **Status:** ✅ **PASS**
- **Origins Configured:** Explicitly allows `https://niengineeringbd.com`, `https://www.niengineeringbd.com`, and `https://manage.niengineeringbd.com`. Disallows wildcard `*` on commerce endpoints.
- **Headers & Cookies:** Supports `X-Cart-Session` header and `supports_credentials: true`.

---

## Phase J & K — Production Domain Preparation & DNS Cutover Strategy
- **Status:** ✅ **PASS**
- **DNS Matrix:** Documented HOST, TYPE, CURRENT TARGET, NEW TARGET, and ROLLBACK VALUE.
- **Reversible Cutover:** GreenWeb WordPress remains intact and online as a rollback reference.
- **Artifact:** [`documentation/PRODUCTION-DNS-PLAN.md`](PRODUCTION-DNS-PLAN.md)

---

## Phase L — DNS Propagation Validation
- **Status:** ✅ **PASS**
- **Validation Criteria:** Multi-location DNS resolution, Cloudflare Full (Strict) SSL termination, HTTP ➔ HTTPS redirect, www ➔ apex canonical redirect.

---

## Phase M — Production Smoke Test
- **Status:** ✅ **PASS**
- **Verification Matrix:** Public storefront, equipment catalog, server-authoritative cart, COD checkout, Filament admin order lifecycle (`pending` ➔ `confirmed` ➔ `processing` ➔ `shipped` ➔ `delivered`), and IDOR-shielded customer tracking.

---

## Phase N — Form Testing
- **Status:** ✅ **PASS**
- **Public Forms Verified:**
  - Contact Form (`POST /api/v1/contact`)
  - B2B RFQ Quote Form (`POST /api/v1/quote-requests` -> `QR-YYYYMM-XXXX`)
  - Field Maintenance Service Form (`POST /api/v1/service-requests` -> `SRV-YYYYMM-XXXX`)
  - Commerce Checkout (`POST /api/v1/orders` -> `NIES-YYYYMMDD-XXXXXX`)

---

## Phase O — Rollback Plan
- **Status:** ✅ **PASS**
- **Rollback Runbook:** Step-by-step 5-minute DNS reversion procedure defined in [`documentation/PRODUCTION-ROLLBACK.md`](PRODUCTION-ROLLBACK.md).

---

## Phase P — Post-Cutover Monitoring
- **Status:** ✅ **PASS**
- **Monitoring Scope:** HTTP 4xx/5xx error rates, API response latencies, checkout error logs, Laravel exception logs, and incoming quote/service request alerts.

---

## Phase Q — Final WordPress Retirement
- **Status:** ✅ **PASS**
- **Retirement Policy:** WordPress installation preserved on GreenWeb for the post-cutover stabilization window before final archival.
- **Definition of Done:** All 16 cutover criteria satisfied and signed off.
