<div align="center">

# 🚒 N.I. Engineering Services — Modern Web Storefront & Digital Platform
### Ultra-Fast Astro v5 Static Storefront, Server-Authoritative Commerce & Safety Engineering Portal

[![Astro](https://img.shields.io/badge/Astro-v5.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![REST API](https://img.shields.io/badge/REST_API-v1_Standard-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://github.com/Naz365/backend_for_Nies)
[![Hosting](https://img.shields.io/badge/Hosting-GitHub_Pages_/_Cloudflare-2496ED?style=for-the-badge&logo=cloudflare&logoColor=white)](https://naz365.github.io/frontend_for_Nies/)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-success?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)

<p align="center">
  <b>The official modern storefront for N.I. Engineering Services & Fire Safety</b><br>
  Engineered with Astro SSG for zero-runtime overhead, server-authoritative BDT commerce, instant WhatsApp order dispatch, and high-conversion fire protection lead capture in Dhaka, Bangladesh.
</p>

[🌐 Live Storefront Demo](https://naz365.github.io/frontend_for_Nies/) • [🔌 API Contract Guide](documentation/API-CONTRACT.md) • [🗄️ Database Architecture](documentation/DATABASE-MIGRATION.md) • [🚀 Production Deployment Guide](documentation/PRODUCTION-DEPLOYMENT-GUIDE.md)

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

## 🏆 What We Achieved (The 26-Phase Enterprise Migration)

Following the rigorous 26-Phase *Master Migration & Execution Specification*, this repository was transformed from a client-side mockup into an enterprise-grade production architecture:

| Domain | Before Migration | After 26-Phase Migration |
|---|---|---|
| **Data Authority** | 5 `localStorage` keys in browser | Single Source of Truth in **PostgreSQL** via Laravel 12 API |
| **Commerce & Pricing** | Client-side prices & local storage | **Server-Authoritative:** Concurrency locking, frozen historical snapshots |
| **Admin Portal** | Client-side `/admin/` mockup with plaintext key | **Filament 3.x** Session Guard at `manage.niengineeringbd.com` |
| **API Client** | Monolithic unvalidated fetcher | Modular typed suite (`src/lib/api/*`) with standard JSON envelope |
| **SEO & Schemas** | Generic tags | **LocalBusiness** & **EmergencyService** JSON-LD schemas |
| **Build & Performance**| Slow SPA rendering | **1.70s Static SSG:** 29.9KB CSS, 13.2KB JS, Zero-FOUC theme toggle |
| **Order Processing** | Local array | **Atomic Checkout:** Unique IDs (`NIES-YYYYMMDD-XXXXXX`) & WhatsApp sync |

---

## ✨ Core Frontend Features

### 🛒 1. Interactive E-Commerce & Cart Drawer (`/shop/`)
- **Server-Synced Cart:** Connected to `GET /api/v1/cart` via unique `X-Cart-Session` tokens.
- **Real BDT Currency:** Authoritative prices in Bangladeshi Taka (৳ 1,450 to ৳ 185,000 BDT).
- **Atomic COD & Online Checkout:** Places orders against server endpoints with stock reservation.
- **WhatsApp Instant Order Dispatch:** Auto-formats order summary into a direct WhatsApp message for instantaneous merchant fulfillment.

### 🧯 2. Filterable Equipment Catalog (`/products/`)
- Real-time client-side category filtering (`All`, `Fire Extinguishers`, `CCTV & Surveillance`, `Access Control`, `Fire Hydrant & Pumps`, `Suppression Systems`).
- Technical specifications, BSTI compliance tags, and direct RFQ modal triggers.

### 📰 3. Technical Knowledge Base & Safety Blog (`/blog/`)
- In-depth industrial safety guidelines, Bangladesh Civil Defence compliance rules, and maintenance instructions.
- Category filtering and keyword search with direct deep links to staff portal.

### 🏢 4. Project Case Studies & Client Showcase
- High-profile engineering case studies:
  - 🏢 *BTI Landmark Tower* (Integrated Fire Hydrant & Suppression)
  - 🎓 *BRAC University New Campus* (Enterprise CCTV & Surveillance)
  - 🏨 *BRAC Centre Inn* (Biometric Access Control & Time Attendance)
- Dynamic trust carousel featuring 15 verified corporate partner logos.

### 🌓 5. Dynamic Theme Engine (Zero-FOUC Dark/Light Mode)
- Inline theme detection script eliminating Flash of Unstyled Content (FOUC).
- Dynamic SVG Sun/Moon toggle with automatic logo swapping (`ni_logo-1.png` in light mode, `logo-wh.png` in dark mode).

---

## 📁 Project Directory Structure

```text
frontend_for_Nies/
├── docs/                        # Pre-rendered static production build (GitHub Pages)
│   ├── index.html               # Homepage
│   ├── products/index.html      # Product catalog
│   ├── shop/index.html          # E-Commerce storefront & cart drawer
│   ├── blog/index.html          # Safety knowledge base
│   ├── projects/                # Engineering case studies
│   ├── about-us/index.html      # Company background & team
│   ├── contact/index.html       # Interactive contact & lead form
│   └── company-profile/         # Downloadable corporate profile
├── documentation/               # Permanent Architectural Specifications
│   ├── API-CONTRACT.md          # REST API schemas & envelope specifications
│   ├── CURRENT-STATE-AUDIT.md   # Complete system inventory audit
│   ├── DATABASE-MIGRATION.md    # PostgreSQL schema & snapshot rules
│   ├── MIGRATION-LEDGER.md      # 26-Phase component ledger
│   ├── MIGRATION-STATE.md       # Baseline commit freeze
│   ├── PRODUCTION-DEPLOYMENT.md # Cloudflare DNS & Render deployment guide
│   └── SECURITY.md              # Security policies & verification
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
│       └── contact.astro        # Contact & service request page
├── public/                      # Static media, icons, and PDF profiles
├── astro.config.mjs             # Astro SSG configuration
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
  getCart, 
  addToCart, 
  placeOrder, 
  submitQuoteRequest,
  submitServiceRequest 
} from '../lib/api';

// 1. Fetch published products with fallback offline cache
const products = await fetchProducts();

// 2. Add item to server-authoritative cart
const updatedCart = await addToCart(productId, 2);

// 3. Submit atomic checkout
const order = await placeOrder({
  customer_name: "Mahbubur Rahman",
  customer_phone: "+880 1711 000 111",
  shipping_address: "Gulshan-2, Dhaka",
  payment_method: "cod",
  items: [{ product_id: 1, quantity: 2 }]
});
```

---

## ⚡ Performance Scorecard

| Metric / Asset | Measurement | Rating | Notes |
|---|---|---|---|
| **Static Build Speed** | **1.70s** (11 pages) | 🟢 **Ultra-Fast** | Pure pre-rendered HTML |
| **Purged CSS Bundle** | **29.92 KB** | 🟢 **Optimal** | Zero runtime CSS-in-JS |
| **Storefront JS Bundle** | **13.27 KB** | 🟢 **Lightweight** | Pure client interactivity |
| **Homepage Payload** | **~28 KB** | 🟢 **Instant** | Sub-second First Contentful Paint |
| **FOUC Theme Flash** | **0 ms** | 🟢 **Zero Flash** | Synchronous inline head detector |

---

## 🚀 Local Development Setup

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
Open [http://localhost:4321/frontend_for_Nies/](http://localhost:4321/frontend_for_Nies/) in your browser.

### 4. Compile Production Build
```bash
npm run build
```
Compiled static HTML files are generated into `./docs` ready for CDN distribution.

---

## 🌐 Production DNS Deployment Topology

| Subdomain | Target | Hosting Platform |
|---|---|---|
| `niengineeringbd.com` | `naz365.github.io` | **Astro SSG on Cloudflare / GitHub Pages** |
| `www.niengineeringbd.com` | `naz365.github.io` | **Canonical Apex Redirect** |
| `api.niengineeringbd.com` | `ni-engineering-backend.onrender.com` | **Laravel 12 REST API on Render** |
| `manage.niengineeringbd.com` | `ni-engineering-backend.onrender.com` | **Filament 3.x CMS on Render** |

---

## 📚 Complete Project Documentation

1. 📋 [CURRENT-STATE-AUDIT.md](documentation/CURRENT-STATE-AUDIT.md) — System audit & component classifications.
2. 📊 [MIGRATION-LEDGER.md](documentation/MIGRATION-LEDGER.md) — 26-Phase migration progress & records.
3. 🛡️ [SECURITY.md](documentation/SECURITY.md) — Security policies, threat model, and protections.
4. 🗄️ [DATABASE-MIGRATION.md](documentation/DATABASE-MIGRATION.md) — PostgreSQL schema specifications.
5. 🔌 [API-CONTRACT.md](documentation/API-CONTRACT.md) — Standardized REST API endpoints & schemas.
6. 🚀 [PRODUCTION-DEPLOYMENT-GUIDE.md](documentation/PRODUCTION-DEPLOYMENT-GUIDE.md) — Cloudflare DNS & cutover procedures.

---

## 📄 License & Governance

Proprietary software developed for **N.I. Engineering Services & Fire Safety Platform (Dhaka, Bangladesh)**. All rights reserved.
