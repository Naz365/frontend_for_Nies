# Phase 0 Baseline Specification & Environment Record

**Project**: N.I. Engineering Services Digital Platform  
**Phase**: Phase 0 — Production Reality Check & Integration Execution  
**Execution Timestamp**: 2026-08-10T18:15:00+06:00  
**Migration Branch**: `migration/production-integration`

---

## 1. Repository & Version Control Baseline

| Repository | Current Working Branch | Base Commit SHA | Upstream Remote URL | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend (Astro)** | `migration/production-integration` | `c038ef11f4944fa54297cc8cdfb5133ad34697ae` | `https://github.com/Naz365/frontend_for_Nies` | Clean working tree |
| **Backend (Laravel)** | `migration/production-integration` | `9d3af4469db58b1e04efc045071004abf180c931` | `https://github.com/Naz365/backend_for_Nies` | Clean working tree |

> [!NOTE]
> Local branch `migration` was safely renamed to `migration-old` in both repositories to resolve Git ref-locking constraints and establish the standard `migration/production-integration` branch without modifying `main`/`master` or rewriting commit history.

---

## 2. Execution Environment & Runtime Versions

| Component | Installed / Verified Version | Path / Executable Location | Notes |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v22.19.0` | `C:\Program Files\nodejs\node.exe` | 64-bit Windows Node runtime |
| **npm** | `10.9.3` | `C:\Program Files\nodejs\npm.cmd` | Invoked via `npm.cmd` |
| **PHP** | `PHP 8.3.31 (cli) (ZTS VC19 x64)` | `C:\Users\pc\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe\php.exe` | Standard CLI PHP |
| **Composer** | `Composer 2.10-dev+fef1d34` | `C:\Users\pc\Desktop\HFST Epr\composer.phar` & `backend/composer.phar` | PHP Archive executable |
| **Laravel Framework** | `12.64.0` | `backend/vendor/laravel/framework` | Laravel 12 on PHP 8.3 |
| **Astro Framework** | `7.1.6` | `node_modules/astro` | Astro 7 with `@astrojs/tailwind` |
| **Filament Admin** | `3.2.148` | `backend/vendor/filament/filament` | Filament v3 Admin Panel |

---

## 3. Database Configurations

### Local Development Database
- **Driver**: `sqlite`
- **Database File**: `backend/database/database.sqlite`
- **Current Migration Status**: All 19 migration batches applied and verified.

### Target Production Database
- **Driver**: `pgsql` (PostgreSQL)
- **Target Host**: Managed PostgreSQL Server (Cloud / Render / Supabase / AWS RDS)
- **Database Name**: `nies_production`
- **User**: `nies_admin`
- **Port**: `5432`
- **SSL Mode**: `require` / `prefer`

---

## 4. Required Environment Variables Matrix

### Frontend (`frontend_for_Nies`)

| Variable | Type | Target Production Value | Local Development Value | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `PUBLIC_API_URL` | String (URL) | `https://api.niengineeringbd.com/api/v1` | `http://localhost:8080/api/v1` | Central API base URL for client & SSR fetch calls |
| `PUBLIC_SITE_URL` | String (URL) | `https://niengineeringbd.com` | `http://localhost:4321` | Canonical URL prefix for SEO and OpenGraph tags |
| `PUBLIC_ADMIN_URL`| String (URL) | `https://manage.niengineeringbd.com` | `http://localhost:8080/portal` | Link destination for administrative login |

### Backend (`backend_for_Nies`)

| Variable | Type | Target Production Value | Local Development Value | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `APP_NAME` | String | `"N.I. Engineering Digital Platform"` | `"N.I. Engineering Services CMS"` | Application display name |
| `APP_ENV` | String | `production` | `local` | Environment mode |
| `APP_KEY` | String (Base64) | *Secret generated key* | `base64:6DSIF1KuIYWMAL0...` | Encryption key |
| `APP_DEBUG` | Boolean | `false` | `true` | Debug error output visibility |
| `APP_URL` | String (URL) | `https://api.niengineeringbd.com` | `http://localhost:8080` | Public API host |
| `SANCTUM_STATEFUL_DOMAINS` | String | `manage.niengineeringbd.com` | `localhost:8080` | Filament admin session domain |
| `CORS_ALLOWED_ORIGINS` | String | `https://niengineeringbd.com,https://manage.niengineeringbd.com` | `http://localhost:4321,http://localhost:8080` | Allowed Cross-Origin Origins |
| `DB_CONNECTION` | String | `pgsql` | `sqlite` | Primary database driver |
| `DB_HOST` | String | `[Managed Postgres Host]` | `127.0.0.1` | Postgres host |
| `DB_PORT` | Integer | `5432` | `5432` | Postgres port |
| `DB_DATABASE` | String | `nies_production` | `database/database.sqlite` | Database name |
| `DB_USERNAME` | String | `nies_admin` | `postgres` | Database user |
| `DB_PASSWORD` | String | *Managed Postgres Password* | `""` | Database password |
| `DB_SSLMODE` | String | `require` | `prefer` | SSL security level |
| `FILESYSTEM_DISK` | String | `public` / `s3` | `public` | Media asset storage disk |
| `QUEUE_CONNECTION`| String | `database` / `redis` | `sync` | Queue worker driver |
| `SESSION_DRIVER` | String | `database` / `file` | `file` | Session storage driver |
| `ADMIN_EMAIL` | String | `admin@niengineeringbd.com` | `admin@niengineeringbd.com` | Default super-admin email |

---

## 5. Build & Test Commands

### Frontend
- **Install Dependencies**: `npm.cmd ci` (or `npm.cmd install`)
- **Production Build**: `npm.cmd run build` (outputs static bundle to `./docs` or `./dist`)
- **Development Server**: `npm.cmd run dev` (starts on port `4321`)

### Backend
- **Install Dependencies**: `php composer.phar install --no-dev --optimize-autoloader`
- **Clear Application Caches**: `php artisan optimize:clear`
- **Cache for Production**: `php artisan config:cache && php artisan route:cache && php artisan view:cache`
- **Database Migrations**: `php artisan migrate --force`
- **Automated Verification Test Suite**: `php tests/verify_business_logic.php`
