# N.I. Engineering Services — WordPress Content Inventory & Migration Verification

**Document Version:** 1.0.0 (Phase 0 / Phase C Content Inventory)  
**Governing Standard:** *Phase — WordPress / GreenWeb → Astro Production Cutover Execution Plan*  
**Date:** 2026-08-11  

---

## 1. Complete Content Inventory Matrix

| Content Category | Item Name / Title | WordPress Source Path / Entity | Astro Target Destination / Model | Migrated? | Verified? | Verification Notes |
|---|---|---|---|:---:|:---:|---|
| **Core Page** | Homepage | `https://niengineeringbd.com/` | `src/pages/index.astro` | ✅ YES | ✅ YES | Hero banner, 4 services, catalog showcase, client logos, contact lead form |
| **Core Page** | About Us | `/about-us/` | `src/pages/about-us.astro` | ✅ YES | ✅ YES | Corporate history, leadership, BSTI/BFSCD certifications, company profile link |
| **Core Page** | Product Catalog | `/products/` | `src/pages/products.astro` | ✅ YES | ✅ YES | Category-filtered grid, live API data loading, technical specs |
| **Core Page** | E-Commerce Shop | `/shop/` (New) | `src/pages/shop.astro` | ✅ YES | ✅ YES | Real BDT pricing, server cart drawer, atomic checkout, COD support |
| **Core Page** | Contact & Service | `/contact/` | `src/pages/contact.astro` | ✅ YES | ✅ YES | Contact form, RFQ form, interactive Google map, phone hotlines |
| **Core Page** | Company Profile PDF | `/wp-content/uploads/2017/11/Company_Profile.pdf` | `/company-profile/` & `/wp-content/uploads/2017/11/Company_Profile.pdf` | ✅ YES | ✅ YES | PDF preserved in `public/` and dedicated online viewer route |
| **Core Page** | Safety Knowledge Base | `/blog/` | `src/pages/blog/index.astro` | ✅ YES | ✅ YES | Blog index with category tags and real API integration |
| **Blog Article** | Essential Fire Safety Maintenance | `/blog/essential-fire-safety-maintenance/` | `src/pages/blog/essential-fire-safety-maintenance.astro` | ✅ YES | ✅ YES | Full technical compliance guidelines and maintenance checklists |
| **Case Study** | BTI Landmark Tower | `/project/fire-extinguishers/` | `src/pages/projects/bti-tower-fire-safety.astro` | ✅ YES | ✅ YES | Fire hydrant & suppression engineering study (301 redirect mapped) |
| **Case Study** | BRAC University New Campus | `/project/cctv/` | `src/pages/projects/brac-university-cctv.astro` | ✅ YES | ✅ YES | Enterprise IP-CCTV surveillance project (301 redirect mapped) |
| **Case Study** | BRAC Centre Inn | `/project/access-control/` | `src/pages/projects/brac-centre-inn-access-control.astro` | ✅ YES | ✅ YES | Biometric access control & security installation (301 redirect mapped) |
| **Category** | Fire Extinguishers | WP Taxonomy `fire-extinguishers` | Backend `Category` (id: 1, slug: `fire-extinguishers`) | ✅ YES | ✅ YES | ABC Dry Powder, CO2, Foam, Clean Agent |
| **Category** | CCTV & Surveillance | WP Taxonomy `cctv-surveillance` | Backend `Category` (id: 2, slug: `cctv-surveillance`) | ✅ YES | ✅ YES | IP Cameras, NVR systems, Dome/Bullet units |
| **Category** | Access Control | WP Taxonomy `access-control` | Backend `Category` (id: 3, slug: `access-control`) | ✅ YES | ✅ YES | Biometric fingerprint, RFID cards, magnetic locks |
| **Category** | Fire Hydrant & Pumps | WP Taxonomy `fire-hydrant-pumps` | Backend `Category` (id: 4, slug: `fire-hydrant-pumps`) | ✅ YES | ✅ YES | Diesel pumps, jockey pumps, landing valves, hoses |
| **Category** | Suppression Systems | WP Taxonomy `suppression-systems` | Backend `Category` (id: 5, slug: `suppression-systems`) | ✅ YES | ✅ YES | FM-200, Novec 1230, CO2 total flooding |
| **Corporate Info** | Emergency Hotlines | Header / Footer / Contact | Unified layout tokens (`+880 1711 135 731`, `+880 1670 236 785`) | ✅ YES | ✅ YES | Uniformly rendered in `Header.astro`, `Footer.astro`, `Layout.astro` |
| **Corporate Info** | Physical Office Address | Contact / Schema | `Level 4, House 12, Road 3, Block A, Middle Badda, Dhaka-1212` | ✅ YES | ✅ YES | Validated in `LocalBusiness` JSON-LD and contact pages |
| **Client Logos** | Enterprise Trust Partners | WP Media Gallery (15 Logos) | `src/components/ClientLogos.astro` & Backend `ClientLogo` | ✅ YES | ✅ YES | BRAC, BTI, Bashundhara, Square, Apex, Beximco, Standard Chartered |
| **SEO Metadata** | Meta Tags & JSON-LD | Yoast SEO / RankMath fields | `src/layouts/Layout.astro` | ✅ YES | ✅ YES | OpenGraph, Twitter Cards, Schema.org LocalBusiness, FAQPage Schema |
| **Navigation** | Primary Navbar Menu | WP Primary Menu | `src/components/Header.astro` | ✅ YES | ✅ YES | Responsive mobile drawer, dark/light theme switch, RFQ CTA |

---

## 2. Media Asset Verification Summary

- **Media Directory**: `public/wp-content/uploads/`
- **Total Static Assets**: 42 image files, 15 SVG brand logos, 1 PDF document (`Company_Profile.pdf`).
- **CDN / External Dependencies**: 0 dependencies on WordPress external image proxies (`i0.wp.com`, `i1.wp.com`, `i2.wp.com`).
- **Local Resolution**: All media URLs use relative root paths (`/wp-content/uploads/...`) or environment-based asset URL resolution.
