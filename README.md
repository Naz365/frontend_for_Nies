<div align="center">

# 🚒 N.I. Engineering Services — Modern Web Storefront & Digital Platform
### Ultra-Fast Astro v5 Static Storefront, Server-Authoritative Commerce & Safety Engineering Portal

[![Astro](https://img.shields.io/badge/Astro-v5.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![REST API](https://img.shields.io/badge/REST_API-v1_Standard-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://github.com/Naz365/backend_for_Nies)
[![Execution Status](https://img.shields.io/badge/Phases_0--28-ALL_PASSED-success?style=for-the-badge&logo=checkmarx&logoColor=white)](documentation/EXECUTION-LOG.md)
[![Production Domain](https://img.shields.io/badge/Production_Domain-niengineeringbd.com-2496ED?style=for-the-badge&logo=cloudflare&logoColor=white)](https://niengineeringbd.com/)

<p align="center">
  <b>The official modern storefront for N.I. Engineering Services & Fire Safety</b><br>
  Engineered with Astro SSG for zero-runtime overhead, server-authoritative BDT commerce, instant WhatsApp order dispatch, and high-conversion fire protection lead capture in Dhaka, Bangladesh.
</p>

[🌐 Live Production Website](https://niengineeringbd.com/) • [📋 28-Phase Execution Log](documentation/EXECUTION-LOG.md) • [🚒 Disaster Recovery Runbook](documentation/DISASTER-RECOVERY-RUNBOOK.md) • [📦 Shipment Domain Design](documentation/SHIPMENT-DOMAIN-DESIGN.md)

</div>

---

## 🏛️ System Architecture & Subdomain Topology

```
                                  [ Cloudflare DNS (Full Strict SSL) ]
                                                   │
                 ┌─────────────────────────────────┼─────────────────────────────────┐
                 │                                 │                                 │
                 ▼                                 ▼                                 ▼
        [ Public Storefront ]            [ API Gateway Tier ]              [ Administration Tier ]
        niengineeringbd.com              api.niengineeringbd.com           manage.niengineeringbd.com
        (Astro v5 SSG on CDN)            (Laravel 12 REST API)             (Filament 3.x CMS)
                 │                                 │                                 │
                 │                                 └────────────────┬────────────────┘
                 │                                                  │
                 ▼                                                  ▼
        [ Browser Client ]                               [ PostgreSQL Database ]
                 │                                                  │
                 └──────────────── Stateless REST API ──────────────┘
```

---

## 🏆 Current Platform Status: All 28 Phases Completed & Verified

Following the comprehensive *N.I. Engineering Services — Production Application Execution Plan (Astro + Laravel + PostgreSQL + Filament)*, both frontend and backend repositories have executed, verified, and signed off on all 28 sequential phases:

| Phase Range | Phase Titles | Verification & Implementation Status |
|---|---|---|
| **Phases 0 – 2** | Safe Working Environment, Repository Builds, Legacy Isolation | Isolated working branch `migration/production-platform`; 12 static HTML routes compiled; legacy standalone JS files isolated; zero business authority in browser client. |
| **Phases 3 – 5** | Database Architecture, API Contract, Live API Connection | 19 database tables & 20 Eloquent models verified; 11 client API function suites mapped to standardized `{ success: true, data: [...] }` envelopes; resilient UI empty states and error boundaries. |
| **Phases 6 – 10** | Admin Products, Server Cart, Atomic Checkout, COD, Inventory Concurrency | Filament `ProductResource` with BDT pricing; `X-Cart-Session` server cart; atomic checkout in `DB::transaction()`; `Product::lockForUpdate()` anti-overselling; frozen price snapshots in `order_items`. |
| **Phases 11 – 15** | Order Lifecycle, Payments, B2B Quotations, Service Requests, Logistics Domain | Filament order state machine (`pending` ➔ `confirmed` ➔ `processing` ➔ `shipped` ➔ `delivered`); lead numbers (`QR-YYYYMM-XXXX`, `SRV-YYYYMM-XXXX`); multi-carrier shipment domain design. |
| **Phases 16 – 20** | Customer Tracking, Website Migration, Media Storage, Auth & Security | IDOR phone verification for order tracking; relative media storage (S3/R2 ready, zero ImgBB); Filament Bcrypt auth & session encryption; rate limiting (60/min and 15/min); multi-vector security audit passed. |
| **Phases 21 – 25** | Infrastructure, CI/CD, Disaster Recovery, Real-World QA, WordPress Cutover | Production topology defined (`.env.production.example`); GitHub Actions CI/CD workflows; `DISASTER-RECOVERY-RUNBOOK.md` (RTO < 30min); cross-browser & phone input QA; 301 redirect map & canonical sitemap. |
| **Phases 26 – 28** | Production Cutover, Smoke Testing, Final Release Signoff | Non-destructive database migrations (`migrate --force`); 9-point end-to-end operational smoke test passed; 100% test pass rate across all domains. |

---

## ✨ Core Frontend Features

### 🛒 1. Interactive E-Commerce & Cart Drawer (`/shop/`)
- **Server-Synced Cart:** Synchronized with `GET /api/v1/cart` using persistent `X-Cart-Session` tokens.
- **Authoritative BDT Pricing:** Real-time pricing in Bangladeshi Taka (৳ 1,450 to ৳ 185,000 BDT) backed by PostgreSQL.
- **Atomic Order Placement:** Dispatches orders to `/api/v1/orders` with snapshot creation and server stock reservation.
- **WhatsApp Merchant Dispatch:** Pre-formats the complete order breakdown into a direct WhatsApp message to `+880 1711 135 731` for immediate fulfillment.

### 🧯 2. Filterable Equipment Catalog (`/products/`)
- Real-time category filtering (`All`, `Fire Extinguishers`, `CCTV & Surveillance`, `Access Control`, `Fire Hydrant & Pumps`, `Suppression Systems`).
- Technical specifications, BSTI compliance badges, and instant RFQ modal triggers.

### 📰 3. Technical Knowledge Base & Safety Blog (`/blog/`)
- Industrial safety guidelines, Bangladesh Fire Service compliance standards, and maintenance instructions.
- Category filtering and keyword search with deep links to product recommendations.

### 🏢 4. Project Case Studies & Client Showcase
- Verified high-profile engineering case studies:
  - 🏢 *BTI Landmark Tower* (Integrated Fire Hydrant & Automatic Suppression)
  - 🎓 *BRAC University New Campus* (Enterprise IP-CCTV & Video Surveillance)
  - 🏨 *BRAC Centre Inn* (Biometric Access Control & Time Attendance)
- Dynamic trust carousel featuring 15 verified corporate partner logos.

### 🌓 5. Dynamic Theme Engine (Zero-FOUC Dark/Light Mode)
- Inline theme detection script eliminating Flash of Unstyled Content (FOUC).
- Dynamic SVG Sun/Moon toggle with automatic logo swapping (`ni_logo-1.png` in light mode, `logo-wh.png` in dark mode).

---

## 📁 Project Directory Structure

```text
frontend_for_Nies/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions automated Astro build & deployment
├── dist/                        # Production static build output (12 routes)
│   ├── index.html               # Homepage
│   ├── products/index.html      # Product catalog
│   ├── shop/index.html          # E-Commerce storefront & cart drawer
│   ├── blog/index.html          # Safety knowledge base
│   ├── projects/                # Engineering case studies
│   ├── about-us/index.html      # Company background & team
│   ├── contact/index.html       # Interactive contact & lead form
│   ├── company-profile/         # Downloadable corporate profile
│   ├── 404.html                 # Branded 404 error page
│   ├── _redirects               # Cloudflare / Netlify 301 permanent redirects
│   ├── sitemap.xml              # Search engine XML sitemap (canonical domain)
│   └── robots.txt               # Crawler indexing directives
├── documentation/               # Enterprise Specifications & Audit Logs
│   ├── EXECUTION-LOG.md         # Permanent 28-Phase Execution & Signoff Log
│   ├── DISASTER-RECOVERY-RUNBOOK.md # Database & media disaster recovery steps
│   ├── SHIPMENT-DOMAIN-DESIGN.md# Courier, shipping & fulfillment design
│   ├── PHASE-0-BASELINE.md      # Ground-truth inventory & topology baseline
│   ├── ACTUAL-API-INTEGRATION-MATRIX.md # Complete API integration matrix
│   ├── DATA-SOURCE-AUTHORITY.md # Master data source classification
│   ├── WORDPRESS-ASTRO-MIGRATION-MAP.md # WordPress URL & content migration map
│   ├── PRODUCTION-READINESS.md  # Production readiness & quality gate scorecard
│   └── SECURITY-VERIFICATION.md # Security audit & IDOR hardening report
├── src/
│   ├── components/              # Reusable semantic Astro components
│   │   ├── Header.astro         # Wide navbar, brand logo, mobile drawer & theme toggle
│   │   ├── Footer.astro         # Corporate footer with emergency hotline
│   │   ├── HeroSlider.astro     # Auto-sliding banner carousel
│   │   ├── ProductGrid.astro    # Filterable product grid
│   │   ├── ClientLogos.astro    # Partner brand logos carousel
│   │   └── ContactForm.astro    # Lead capture & service request form
│   ├── layouts/
│   │   └── Layout.astro         # Base layout, SEO meta tags, LocalBusiness JSON-LD
│   ├── lib/
│   │   └── api/                 # Modular, typed REST API client suite
│   │       ├── client.ts        # Base Axios-like fetcher with standard envelope
│   │       ├── categories.ts    # Category taxonomy queries
│   │       ├── products.ts      # Product catalog & search
│   │       ├── cart.ts          # Server-authoritative cart operations
│   │       ├── orders.ts        # Atomic checkout & order tracking
│   │       ├── quotes.ts        # B2B quotation submission
│   │       ├── services.ts      # Field maintenance request submission
│   │       ├── projects.ts      # Portfolio case studies
│   │       ├── blog.ts          # Safety articles & reader
│   │       ├── settings.ts      # Corporate settings & hotline
│   │       └── index.ts         # Barrel export
│   └── pages/                   # Astro SSG static routes
│       ├── index.astro          # Home page
│       ├── about-us.astro       # About us page
│       ├── products.astro       # Equipment catalog
│       ├── shop.astro           # E-Commerce shop & checkout drawer
│       ├── blog/                # Blog index & dynamic article views
│       ├── projects/            # Case study pages
│       ├── company-profile.astro# Corporate PDF profile viewer
│       ├── contact.astro        # Contact & service request page
│       └── 404.astro            # Branded 404 error page
├── public/                      # Static media, icons, and 301 _redirects
├── .env.production.example      # Production environment configuration template
├── astro.config.mjs             # Astro SSG configuration (outDir: './dist')
├── tailwind.config.mjs          # Tailwind CSS design tokens (Navy, Flame, Clean)
├── tsconfig.json                # Strict TypeScript configuration
└── package.json                 # Project scripts & dependencies
```

---

## 🔌 API Client Integration (`src/lib/api/*`)

All frontend components communicate with the backend via the type-safe modular API client suite:

```typescript
import { 
  fetchProducts, 
  fetchCategories, 
  fetchServerCart, 
  addServerCartItem, 
  placeServerOrder, 
  submitQuoteRequest,
  submitServiceRequest 
} from '../lib/api';

// 1. Fetch published products with fallback offline cache
const products = await fetchProducts();

// 2. Add item to server-authoritative cart via X-Cart-Session
const updatedCart = await addServerCartItem(productId, 2);

// 3. Submit atomic checkout with server-side price recalculation
const order = await placeServerOrder({
  customer_name: "Mahbubur Rahman",
  customer_phone: "+880 1711 135 731",
  shipping_address: "Gulshan-2, Dhaka",
  payment_method: "cod",
  items: [{ product_id: 1, quantity: 2 }]
});
```

---

## ⚡ Performance & Build Metrics

| Metric / Asset | Measurement | Rating | Notes |
|---|---|---|---|
| **Static Build Routes** | **12 pages** | 🟢 **100% Generated** | Complete route coverage including 404 |
| **Purged CSS Bundle** | **29.92 KB** | 🟢 **Optimal** | Zero runtime CSS-in-JS |
| **Storefront JS Bundle** | **13.27 KB** | 🟢 **Lightweight** | Pure client interactivity |
| **Homepage Payload** | **~28 KB** | 🟢 **Instant** | Sub-second First Contentful Paint |
| **FOUC Theme Flash** | **0 ms** | 🟢 **Zero Flash** | Synchronous inline head detector |

---

## 🚀 Local Development & Build Commands

### 1. Clone the Repository
```bash
git clone https://github.com/Naz365/frontend_for_Nies.git
cd frontend_for_Nies
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:4321/](http://localhost:4321/) in your browser.

### 4. Compile Production Build
```bash
npm run build
```
Compiled static HTML files are generated into `./dist` ready for Cloudflare / CDN distribution.

---

## 🌐 Production DNS Deployment Topology

| Subdomain | Target | Hosting Platform |
|---|---|---|
| `niengineeringbd.com` | `naz365.github.io` / Cloudflare Pages | **Astro SSG on Cloudflare Edge** |
| `www.niengineeringbd.com` | `niengineeringbd.com` | **Canonical Apex 301 Redirect** |
| `api.niengineeringbd.com` | `ni-engineering-backend.onrender.com` | **Laravel 12 REST API on Render** |
| `manage.niengineeringbd.com` | `ni-engineering-backend.onrender.com` | **Filament 3.x CMS on Render** |

---

## 📚 Complete Project Documentation

1. 📋 [EXECUTION-LOG.md](documentation/EXECUTION-LOG.md) — Permanent log for all 28 execution phases.
2. 🚒 [DISASTER-RECOVERY-RUNBOOK.md](documentation/DISASTER-RECOVERY-RUNBOOK.md) — Disaster recovery & snapshot restoration runbook.
3. 📦 [SHIPMENT-DOMAIN-DESIGN.md](documentation/SHIPMENT-DOMAIN-DESIGN.md) — Pathao / Steadfast courier and fulfillment architecture.
4. 📋 [PHASE-0-BASELINE.md](documentation/PHASE-0-BASELINE.md) — Ground-truth inventory, routes, and topology.
5. 🔌 [ACTUAL-API-INTEGRATION-MATRIX.md](documentation/ACTUAL-API-INTEGRATION-MATRIX.md) — Complete REST API contract & client mapping.
6. 🗄️ [DATA-SOURCE-AUTHORITY.md](documentation/DATA-SOURCE-AUTHORITY.md) — Single source of truth classifications.
7. 🗺️ [WORDPRESS-ASTRO-MIGRATION-MAP.md](documentation/WORDPRESS-ASTRO-MIGRATION-MAP.md) — Legacy URL 301 mapping and media inventory.
8. 🚀 [PRODUCTION-READINESS.md](documentation/PRODUCTION-READINESS.md) — Production readiness & quality gate scorecard.
9. 🛡️ [SECURITY-VERIFICATION.md](documentation/SECURITY-VERIFICATION.md) — IDOR protection, CORS, and rate limiting verification.

---

## 📄 License & Governance

Proprietary software developed for **N.I. Engineering Services & Fire Safety Platform (Dhaka, Bangladesh)**. All rights reserved.
