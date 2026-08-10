# Phase 0 Production Gap Report & Action Roadmap

**Project**: N.I. Engineering Services Digital Platform  
**Audit Completion Date**: 2026-08-10  
**Phase Status**: PHASE 0 AUDIT COMPLETE  

---

## 1. Executive Summary & Production Reality Check

The baseline audit confirms that the core architectural building blocks of N.I. Engineering Services are viable:
- **Astro Frontend** builds 11 production static routes cleanly in ~12 seconds.
- **Laravel 12 Backend & Filament v3** has a working domain schema with 19 migrations and atomic transaction checkout services.
- **Authoritative Pricing & Stock Locking**: Proven mathematically immune to client-side tampering via 40 automated tests.

However, several critical integration gaps prevent the system from operating as a unified production platform today. Specifically, the frontend still contains hardcoded client-side fallbacks and `localStorage` state in `src/pages/shop.astro` and `src/pages/blog/index.astro`, while backend public tracking endpoints exhibit IDOR vulnerabilities and lack explicit rate limiting.

---

## 2. Comprehensive Gap Analysis Matrix

### A. Data Authority & Frontend State Gaps
1. **Client-Side Cart Management in `shop.astro`**: `src/pages/shop.astro` manages cart state in `localStorage.getItem('nies_cart')` rather than utilizing the existing, robust `src/lib/api/cart.ts` server-backed cart API.
2. **Client-Side Order Backup**: `shop.astro` saves placed orders into `localStorage.getItem('nies_customer_orders')` and generates fake fallback order numbers (`ORD-XXXXXX`) when offline.
3. **Static Catalog Fallbacks in Blog & Shop**: `src/pages/blog/index.astro` reads from `localStorage.getItem('nies_blog_posts')` rather than calling `GET /api/v1/blog`.
4. **Hardcoded Placeholder Business Info**: Dummy phone numbers (`+880 1700-000000`) and fake WhatsApp contact links (`8801700000000`) exist in `Layout.astro`, `ContactForm.astro`, `api.ts`, and `shop.astro`, diverging from the verified business phone `+880 1711 135 731`.

### B. API Contracts & Envelope Gaps
1. **Response Envelope Inconsistency**: `BlogPostController`, `ProjectController`, and `SiteSettingController` return raw `{ "data": [...] }` without the standard `"success": true` boolean used by `ProductController` and `CategoryController`.
2. **Product Category Slug Constraint**: `ProductResource` in Filament only sets `category_id`. Creating a product without `category_slug` triggers a SQL `NOT NULL constraint failed: products.category_slug` error.
3. **Hardcoded Base URLs**: `src/pages/shop.astro` hardcodes `https://ni-engineering-backend.onrender.com/api/v1/orders` inline instead of importing `src/lib/api/orders.ts`.
4. **Relative API Endpoints in Components**: `src/components/ContactForm.astro` posts to `/api/v1/contact` (fails when frontend and API are hosted on distinct subdomains without reverse proxy).

### C. Security, Privacy & Compliance Gaps
1. **IDOR / BOLA Risk on Order Tracking**: `GET /api/v1/orders/{order_number}` returns full customer names, phone numbers, shipping addresses, and order items even if no phone verification is provided.
2. **Absence of API Rate Limiting**: Public endpoints (`POST /api/v1/orders`, `POST /api/v1/contact`, `POST /api/v1/quote-requests`) lack rate throttling.
3. **Dependency Vulnerabilities**: `nanoid < 3.3.17` (High) in frontend and `league/commonmark < 2.9.0` (High/Medium) in backend require dependency updates.
4. **Simulated Error Handling**: `ContactForm.astro` and `shop.astro` mask API errors and simulate success alerts to users.

### D. WordPress SEO & Domain Migration Gaps
1. **Missing 301 Redirects for Legacy WordPress URLs**: 10+ legacy WordPress `/project/<slug>/` URLs will return 404s after DNS cutover unless 301 redirects are deployed.
2. **Astro Configuration Defaults**: `astro.config.mjs` is configured with `base: '/frontend_for_Nies/'` and `site: 'https://naz365.github.io'`. Must be switched to `/` and `https://niengineeringbd.com`.

---

## 3. Prioritized Remediation Plan

### Priority 0 (P0 — Immediate Blockers for Production Launch)
- [ ] **P0.1**: Update `astro.config.mjs` to production `site: 'https://niengineeringbd.com'`, `base: '/'`, and `outDir: './dist'`.
- [ ] **P0.2**: Refactor `src/pages/shop.astro` to consume `src/lib/api/cart.ts` and `src/lib/api/orders.ts` (eliminate client `localStorage` for cart and orders).
- [ ] **P0.3**: Fix IDOR vulnerability in `OrderController.php` (enforce phone matching or data masking).
- [ ] **P0.4**: Add `booted()` hook in `Product.php` to auto-populate `category_slug` from `category_id` to prevent Filament admin creation SQL errors.
- [ ] **P0.5**: Standardize API response envelopes across `BlogPostController`, `ProjectController`, and `SiteSettingController` to `{ "success": true, "data": ... }`.
- [ ] **P0.6**: Add rate limiting (`throttle:10,1`) to all public mutation API routes in `routes/api.php`.

### Priority 1 (P1 — Core Quality & Architecture Hardening)
- [ ] **P1.1**: Connect `src/pages/blog/index.astro`, `src/components/ProductGrid.astro`, and `src/components/ClientLogos.astro` to live backend API endpoints.
- [ ] **P1.2**: Update all placeholder contact details (`+880 1700-000000` / WhatsApp links) to verified business records (`+880 1711 135 731`).
- [ ] **P1.3**: Deploy 301 permanent redirect map for legacy WordPress URLs in web server / CDN configuration.
- [ ] **P1.4**: Configure explicit CORS middleware with `X-Cart-Session` allowed header for `https://niengineeringbd.com`.

### Priority 2 (P2 — Tooling & CI/CD Clean-up)
- [ ] **P2.1**: Add `phpunit/phpunit` and test runner configuration into `backend/composer.json` dev requirements.
- [ ] **P2.2**: Delete obsolete simulated server scripts (`server.js`, `start_marketing_and_cms.js`, `start_separate_servers.js`, `make_project_copy.js`).
- [ ] **P2.3**: Update `nanoid` and `league/commonmark` dependencies to resolve security advisories.

### Priority 3 (P3 — Future Domain Enhancements)
- [ ] **P3.1**: Implement full Shipment Domain (`Shipment`, `ShipmentItem`, `ShipmentEvent`, `Carrier`) per design specification after core launch.
- [ ] **P3.2**: Implement multi-channel automated SMS & WhatsApp order confirmation notifications.
