# Data Source Authority & Fake Business Data Audit

**Phase**: Phase 0 — Production Reality Check & Integration Execution  
**Governing Rule**: Business data MUST NOT have a browser-local authoritative source. The single authoritative source of truth for all business state is **Laravel / PostgreSQL**.

---

## 1. Inventory & Classification of Frontend Data Storage

Every occurrence of storage and hardcoded fixtures across the Astro frontend has been audited and classified into the 5 standard categories:
- **A. UI preference/state** (Legitimate browser-local state to keep)
- **B. Legitimate offline cache / guest session identifier** (Legitimate token to keep)
- **C. Business data** (Violates architecture; must be migrated to backend API)
- **D. Test fixture / Static fallback** (Permitted only during offline builds)
- **E. Obsolete migration code / Fake simulation** (Must be eliminated)

| # | File Location | Term / Pattern Found | Content / Functionality | Classification | Authoritative Truth | Action Required |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `src/layouts/Layout.astro:145` | `localStorage.getItem('theme')` | Dark / Light theme toggle preference | **A. UI preference/state** | Browser Client | **KEEP** (Legitimate user preference) |
| **2** | `src/components/Header.astro:149` | `localStorage.setItem('theme', ...)` | Header theme mode switcher | **A. UI preference/state** | Browser Client | **KEEP** (Legitimate user preference) |
| **3** | `src/lib/api/cart.ts:34` | `localStorage.getItem('nies_cart_session_token')` | Guest cart UUID token (`nies_guest_...`) | **B. Legitimate session identifier** | Browser Client Identifier | **KEEP** (Required to associate guest user with server cart session) |
| **4** | `src/pages/shop.astro:291` | `localStorage.getItem('nies_shop_products')` | Browser-stored products catalog | **C. Business data** / **E. Obsolete code** | Laravel `Product` DB Table | **DELETE** (Products must be loaded from `GET /api/v1/products`) |
| **5** | `src/pages/shop.astro:309` | `localStorage.getItem('nies_cart')` | Client-authoritative shopping cart | **C. Business data** | Laravel `Cart` & `CartItem` Tables | **REPLACE** with server cart API (`src/lib/api/cart.ts`) |
| **6** | `src/pages/shop.astro:502` | `localStorage.getItem('nies_customer_orders')` | Browser-stored customer orders backup | **C. Business data** / **E. Fake simulation** | Laravel `Order` & `OrderItem` Tables | **DELETE** (Orders must be authoritatively stored in DB) |
| **7** | `src/pages/blog/index.astro:227` | `localStorage.getItem('nies_blog_posts')` | Browser-stored blog post cache | **C. Business data** | Laravel `BlogPost` DB Table | **DELETE** (Articles must be fetched from `GET /api/v1/blog`) |
| **8** | `src/pages/shop.astro:150` | `DEFAULT_CATALOG` array | Hardcoded products with fixed prices & stock | **D. Test fixture** | Laravel Database Seeder | **REPLACE** with live API rendering; retain only in `lib/api/products.ts` for static SSR fallback |
| **9** | `src/components/ProductGrid.astro:16` | `const products = [...]` | Hardcoded product list array | **D. Test fixture** | Laravel Database Seeder | **REFACTOR** to fetch from `/api/v1/products` |
| **10** | `src/components/ClientLogos.astro:4` | `const clientLogos = [...]` | Hardcoded client logos list | **D. Test fixture** | Laravel `ClientLogo` DB Table | **REFACTOR** to fetch from `/api/v1/client-logos` |
| **11** | `src/lib/api.ts:166` & `Layout.astro:34` | `+880 1700-000000` / `8801700000000` | Dummy placeholder phone & WhatsApp numbers | **E. Fake business data** | `SiteSetting` model (`+880 1711 135 731`) | **UPDATE** to match verified business details |
| **12** | `src/components/ContactForm.astro:153` | "Message sent successfully! (Local Submission Received)" | Fake success alert simulation on API network failure | **E. Fake simulation** | Laravel API error response | **REPLACE** with real user error notification |

---

## 2. Legacy Script Classification & Disposition

| Script File | Purpose & Operational Summary | Referenced By | Classification | Action Plan |
| :--- | :--- | :--- | :--- | :--- |
| `setup_sqlite.js` | Creates empty `backend/database/database.sqlite` file | None (manual) | **REFACTOR** | Keep as local dev helper; ensure PostgreSQL remains primary for production. |
| `server.js` | Node HTTP server simulating subdomains (`manage.`, `api.`, `portal.`, `erp.`, `shop.`) to static HTML files | None | **DELETE / OBSOLETE** | Delete. Production uses real DNS and real backend hosts (`api.niengineeringbd.com`, `manage.niengineeringbd.com`). |
| `start_all.js` | Spawns static server on 4321 and `php artisan serve` on 8080 | None | **REFACTOR** | Standardize as local multi-service development runner. |
| `copy_backend_assets.js` | Mirrors `public/wp-content` into `backend/public/wp-content` | `build_production_package.js` | **REFACTOR / MIGRATE** | Integrate into build/asset deployment pipeline. |
| `create_laravel_dirs.js` | Creates Laravel `storage/` and `bootstrap/cache` directories | None | **MIGRATE** | Move into `docker-entrypoint.sh` and post-install composer script. |
| `build_production_package.js` | Runs `astro build` and `copy_backend_assets.js` | None | **REFACTOR** | Retain as optional build bundler after updating build flags. |
| `copy_assets.js` | Mirrors `archive/wp-content` to `public/wp-content` | None | **KEEP** | Essential migration utility for local WordPress asset sync. |
| `download_archive.js` | Scrapes and downloads WordPress media assets | None | **KEEP** | Migration script for legacy asset intake. |
| `make_project_copy.js` | Copies repository to desktop backup folder | None | **DELETE / OBSOLETE** | Delete. Git is the authoritative version control system. |
| `start_marketing_and_cms.js` | Starts fake server on port 8000 serving static HTML for CMS | None | **DELETE / OBSOLETE** | Delete. Filament CMS is served by PHP/Laravel, not static HTML. |
| `start_separate_servers.js` | Starts 6 fake Node servers on ports 4321, 5000, 5173, 8000, 8001, 9000 | None | **DELETE / OBSOLETE** | Delete. Eliminates simulated infrastructure anti-patterns. |
| `backend/setup_cms.js` | Runs `artisan key:generate` and `artisan migrate:fresh --seed` | None | **REFACTOR** | Replace `migrate:fresh` with safe additive `migrate --force` before production use. |
