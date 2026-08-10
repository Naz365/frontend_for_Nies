# Build Baseline & Local Verification Report

**Date**: 2026-08-10  
**Phase**: Phase 0 — Production Reality Check  
**Verification Scope**: Frontend Static Build & Backend Test/Optimization Pipelines  

---

## 1. Summary of Build Executions

| Target | Command Executed | Result | Exit Code | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | `npm.cmd run build` | **SUCCESS** | `0` | Built 11 static HTML routes + CSS/JS chunks in 1m 19s |
| **Backend** | `php composer.phar install` | **SUCCESS** | `0` | Lockfile dependencies validated in `vendor/` |
| **Backend** | `php artisan optimize:clear` | **SUCCESS** | `0` | Cleared config, cache, compiled, events, routes, views, blade-icons, filament |
| **Backend** | `php artisan test` | **FAILED** | `1` | Command `test` not defined (PHPUnit not installed in `composer.json`) |
| **Backend** | `php tests/verify_business_logic.php` | **SUCCESS** | `0` | 40/40 Automated Business Logic tests passed |

---

## 2. Command Execution Deep Dive

### Frontend: `npm.cmd run build`
- **Output Directory**: `docs/` (as configured in `astro.config.mjs` for GitHub Pages)
- **Generated Routes**:
  - `dist/index.html` (Homepage)
  - `dist/about-us/index.html` (About Us)
  - `dist/company-profile/index.html` (Company Profile)
  - `dist/contact/index.html` (Contact Us)
  - `dist/products/index.html` (Product Catalog)
  - `dist/shop/index.html` (E-Commerce Storefront)
  - `dist/blog/index.html` (Blog Index)
  - `dist/blog/essential-fire-safety-maintenance/index.html` (Article)
  - `dist/projects/bti-tower-fire-safety/index.html` (Project Detail)
  - `dist/projects/brac-university-cctv/index.html` (Project Detail)
  - `dist/projects/brac-centre-inn-access-control/index.html` (Project Detail)
- **Observations & Necessary Adjustments**:
  - The build currently outputs to `./docs` with `base: '/frontend_for_Nies/'` and `site: 'https://naz365.github.io'`.
  - For target production (`https://niengineeringbd.com`), `astro.config.mjs` must use root base `/`, standard `outDir: './dist'`, and `site: 'https://niengineeringbd.com'`.

### Backend: `php artisan optimize:clear`
- Cleared config, application cache, compiled classes, event caches, route caches, view caches, blade-icons cache, and Filament component caches cleanly without runtime exceptions.

### Backend: `php artisan test`
- **Root Cause**: `composer.json` in `backend` was initialized with only runtime dependencies (`laravel/framework`, `laravel/tinker`, `filament/filament`, `guzzlehttp/guzzle`). Dev packages such as `phpunit/phpunit`, `pestphp/pest`, and `nunomaduro/collision` were absent from `require-dev`.
- **Fix Required**: Configure standard test harness in `composer.json` pinned to versions compatible with PHP 8.3/8.4 and Laravel 12.

### Backend: `php tests/verify_business_logic.php`
- **Executed Suite**: Custom end-to-end Laravel kernel test runner verifying 40 assertions covering Products, Cart, Checkout, Stock Locking, Snapshots, State Transitions, and Quote Workflows.
- **Result**: All 40 assertions passed with 0 failures.

---

## 3. Command Failure Root Cause & Remediation Table

| Command | Result | Error Details | Root Cause | Fix Required |
| :--- | :--- | :--- | :--- | :--- |
| `php artisan test` | `FAILED` | `Command "test" is not defined.` | Missing `phpunit/phpunit` and `nunomaduro/collision` in `composer.json` `require-dev`. | Add `phpunit/phpunit: ^11.0` and test runner configuration to `composer.json`. |
| `npm.cmd audit` | `WARNING` | `1 high severity vulnerability (nanoid < 3.3.17)` | Dependency constraint in transitive build dependency. | Run `npm update nanoid` / `npm audit fix`. |
| `composer audit` | `WARNING` | `6 vulnerabilities in league/commonmark (<2.9.0)` | Pinned `league/commonmark` in locked vendor tree. | Update `league/commonmark` to `>= 2.9.0` via `composer update league/commonmark`. |
