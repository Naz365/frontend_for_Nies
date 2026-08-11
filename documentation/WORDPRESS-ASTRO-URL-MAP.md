# N.I. Engineering Services — WordPress to Astro URL Mapping & Redirect Strategy

**Document Version:** 1.0.0 (Phase 0 / Phase D URL Migration)  
**Governing Standard:** *Phase — WordPress / GreenWeb → Astro Production Cutover Execution Plan*  
**Date:** 2026-08-11  

---

## 1. Complete URL Routing & Redirection Matrix

| # | Legacy WordPress URL | New Astro Route | URL Action | Target Status | Technical Rationale & SEO Impact |
|:---:|---|---|:---:|:---:|---|
| **1** | `https://niengineeringbd.com/` | `/` (`src/pages/index.astro`) | `Same URL` | Active | Direct replacement; retains root SEO authority. |
| **2** | `https://niengineeringbd.com/about-us/` | `/about-us/` (`src/pages/about-us.astro`) | `Same URL` | Active | Direct replacement; preserves backlinks to corporate profile. |
| **3** | `https://niengineeringbd.com/products/` | `/products/` (`src/pages/products.astro`) | `Same URL` | Active | Direct replacement; preserves catalog ranking. |
| **4** | `https://niengineeringbd.com/contact/` | `/contact/` (`src/pages/contact.astro`) | `Same URL` | Active | Direct replacement; preserves inbound contact links. |
| **5** | `https://niengineeringbd.com/wp-content/uploads/2017/11/Company_Profile.pdf` | `/wp-content/uploads/2017/11/Company_Profile.pdf` | `Same URL` | Active | Direct replacement; physical PDF preserved at exact path. |
| **6** | `https://niengineeringbd.com/project/suppression-system/` | `/products/` | `301 Redirect` | Mapped | Legacy Divi project post mapped to suppression catalog. |
| **7** | `https://niengineeringbd.com/project/alarm-systems/` | `/products/` | `301 Redirect` | Mapped | Legacy Divi project post mapped to alarm catalog. |
| **8** | `https://niengineeringbd.com/project/alarm-systems-2/` | `/products/` | `301 Redirect` | Mapped | Duplicate Divi post canonicalized to products. |
| **9** | `https://niengineeringbd.com/project/generator/` | `/products/` | `301 Redirect` | Mapped | Legacy Divi project post mapped to industrial catalog. |
| **10**| `https://niengineeringbd.com/project/cctv/` | `/projects/brac-university-cctv/` | `301 Redirect` | Mapped | Mapped to dedicated BRAC University CCTV case study. |
| **11**| `https://niengineeringbd.com/project/access-control/` | `/projects/brac-centre-inn-access-control/` | `301 Redirect` | Mapped | Mapped to dedicated BRAC Centre Inn case study. |
| **12**| `https://niengineeringbd.com/project/fire-extinguishers/`| `/projects/bti-tower-fire-safety/` | `301 Redirect` | Mapped | Mapped to dedicated BTI Landmark Tower case study. |
| **13**| `https://niengineeringbd.com/project/fire-extinguishers-2/`| `/projects/bti-tower-fire-safety/` | `301 Redirect` | Mapped | Duplicate post canonicalized to BTI Tower case study. |
| **14**| `https://niengineeringbd.com/project/*` (Wildcard) | `/products/` | `301 Redirect` | Mapped | Catch-all wildcard for any uncatalogued legacy project slugs. |
| **15**| `https://niengineeringbd.com/xmlrpc.php` | N/A | `404 intentionally`| Closed | Legacy WordPress XML-RPC endpoint blocked for security. |
| **16**| `https://niengineeringbd.com/wp-admin/*` | `https://manage.niengineeringbd.com/` | `301 Redirect` | Mapped | Redirects administrative requests to Filament CMS portal. |
| **17**| `https://niengineeringbd.com/wp-json/*` | `https://api.niengineeringbd.com/api/v1/`| `301 Redirect` | Mapped | Redirects legacy REST API requests to Laravel API gateway. |

---

## 2. Redirect Configuration Implementation

The 301 redirect map is actively implemented and tested in:
1. **Cloudflare / Netlify / Vercel Edge Rule**: [`public/_redirects`](file:///c:/Users/pc/Desktop/project%20nies/public/_redirects)
2. **Nginx / Web Server Configuration**: Documented in [`documentation/WORDPRESS-ASTRO-MIGRATION-MAP.md`](file:///c:/Users/pc/Desktop/project%20nies/documentation/WORDPRESS-ASTRO-MIGRATION-MAP.md)
