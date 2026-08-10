# Security Verification & Vulnerability Assessment Report

**Phase**: Phase 0 — Production Reality Check  
**Inspection Date**: 2026-08-10  
**Scope**: Frontend Astro Codebase, Backend Laravel 12 API, Dependency Trees, and Database Layers  

---

## 1. Security Scan Tooling Results

### Frontend Dependency Scan (`npm audit`)
- **Tool**: `npm audit` (npm v10.9.3)
- **Result**: `1 high severity vulnerability`
- **Vulnerability**: `nanoid < 3.3.17` (Indefinite loop risk with zero-sized custom generators).
- **Remediation**: Run `npm update nanoid` / `npm audit fix`.

### Backend Dependency Scan (`composer audit`)
- **Tool**: `composer audit` (Composer 2.10-dev)
- **Result**: `6 vulnerability advisories affecting 1 package` (`league/commonmark < 2.9.0`).
- **Advisories**:
  - `PKSA-5mzr-szzf-z6cn` (Medium): Denial of service via deeply nested XML output
  - `PKSA-cqd6-fg4n-nxpf` (High): Denial of service via colliding heading slugs
  - `PKSA-1q6p-sqkj-8mmj` (High): Denial of service via duplicate footnote definitions
  - `PKSA-mc58-w91n-f5gv` (High): Denial of service via adjacent inline attribute blocks
  - `CVE-2026-71488` (High): Quadratic-time denial of service when parsing crafted Markdown
  - `CVE-2026-71478` (Medium): Unsafe-link filter bypass via embedded control bytes
- **Remediation**: Update `league/commonmark` to version `>= 2.9.0`.

---

## 2. Multi-Vector Security Assessment Matrix

| Security Vector | Severity | Inspection Finding | Posture / Status | Required Action |
| :--- | :--- | :--- | :--- | :--- |
| **Exposed Secrets** | High | Git history and files inspected. No production database passwords or live Stripe/SSLCommerz API secret keys are tracked. `.env` is gitignored. | **SECURE** | Ensure `.env` is never committed to remote repositories. |
| **Unsafe Env Handling** | Medium | `APP_DEBUG=true` in local `.env`. If deployed to production with `APP_DEBUG=true`, stack traces leak internal paths and SQL. | **CAUTION** | Enforce `APP_DEBUG=false` and `APP_ENV=production` in production deployment pipeline. |
| **IDOR / BOLA Vulnerability** | High | `GET /api/v1/orders/{order_number}` returns customer name, address, and purchased items. The phone number check is optional in `OrderController.php` (line 82: `if ($request->filled('phone')) ...`). Anyone guessing or obtaining an order number can view sensitive PII. | **VULNERABLE** | Require mandatory `phone` verification or mask recipient PII on public tracking queries. |
| **Price & Total Tampering** | Critical | Evaluated `CheckoutService.php`. Server recalculates all unit prices, subtotals, and totals strictly from the database `Product` table with pessimistic stock locking (`lockForUpdate`). | **PROTECTED** (PASS) | Maintain server-authoritative calculations. |
| **Stock & Quantity Boundary Manipulation** | Critical | Evaluated negative quantities, zero quantities, string injections, and excessive quantities (> available stock). Validated by automated test suite. | **PROTECTED** (PASS) | Input validation and DB constraints reject malformed requests. |
| **SQL Injection Exposure** | High | Analyzed Eloquent models and queries across controllers. All queries utilize PDO prepared statements and parameterized bindings. | **PROTECTED** (PASS) | No raw unescaped SQL concatenation found. |
| **Cross-Site Scripting (XSS)** | Medium | Astro components auto-escape HTML expressions. Single instance in `blog/[slug].astro` uses `set:html={post.content}` which originates from authenticated admin Filament editor. | **LOW RISK** | Sanitize rich text HTML in backend before storage using Purifier / DOMPurify. |
| **CSRF Protection** | Medium | CSRF verification is active on web/Filament routes and excluded only for stateless `/api/*` endpoints in `bootstrap/app.php`. | **PROTECTED** (PASS) | Standard Laravel CSRF protection active. |
| **Mass Assignment** | Medium | All Eloquent models (`Product`, `Order`, `Customer`, `Cart`, `QuoteRequest`, `ServiceRequest`) have strict `$fillable` definitions. | **PROTECTED** (PASS) | Protected against mass assignment exploits. |
| **Rate Limiting (DDoS / Spam)** | High | Public endpoints (`/api/v1/orders`, `/api/v1/contact`, `/api/v1/quote-requests`) currently lack explicit `throttle` middleware in `routes/api.php`. | **VULNERABLE** | Attach `throttle:10,1` (10 requests per minute) to public mutation endpoints. |
| **File Upload Security** | High | Filament product image uploads restrict accepted file types to `['image/jpeg', 'image/png', 'image/webp']` in `ProductResource.php`. | **PROTECTED** (PASS) | MIME validation active. |
| **Error Masking / False Success** | Medium | `src/components/ContactForm.astro` simulates a successful submission even if the backend returns a 500 error or network fails. | **BAD UX / RISK** | Display truthful error alerts to users when submissions fail. |
