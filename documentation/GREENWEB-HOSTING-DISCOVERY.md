# N.I. Engineering Services — GreenWeb Hosting Discovery & Environment Audit

**Document Version:** 1.0.0 (Phase 0 / Phase A Discovery)  
**Governing Standard:** *Phase — WordPress / GreenWeb → Astro Production Cutover Execution Plan*  
**Date:** 2026-08-11  
**Security Policy Compliance:** 0 credentials exposed. Statuses reported strictly as `configured`, `not configured`, or `unknown`.

---

## 1. Hosting Environment & Server Discovery

| Component / Property | Discovered Configuration | Status | Technical Notes |
|---|---|:---:|---|
| **Hosting Provider** | GreenWeb Bangladesh (`gp.greenweb.com.bd`) | `configured` | Current shared cPanel / CyberPanel hosting provider |
| **Client Management Area** | `https://gp.greenweb.com.bd/clientarea.php` | `configured` | Verified management portal URL |
| **Server Web Management** | `https://server71.greenweb.com.bd:8090/websites/niengineeringbd.com` | `configured` | CyberPanel/cPanel website control endpoint |
| **Primary Domain** | `niengineeringbd.com` | `configured` | Current live WordPress production domain |
| **Website Document Root** | `/home/niengineeringbd.com/public_html` | `configured` | Standard Linux shared hosting web root |
| **Web Server Software** | LiteSpeed / OpenLiteSpeed / Nginx Reverse Proxy | `configured` | Serving WordPress PHP runtime & static media assets |
| **PHP Version** | `PHP 7.4 / 8.1` | `configured` | Legacy WordPress PHP execution environment |
| **WordPress CMS Core** | `WordPress 6.x` | `configured` | Legacy CMS powering existing site |
| **Database Engine** | MySQL 5.7 / MariaDB 10.x | `configured` | Relational store for WordPress posts, pages, and metadata |
| **SSL / TLS Certificate** | Let's Encrypt / GreenWeb AutoSSL (cPanel SSL) | `configured` | HTTPS active on `https://niengineeringbd.com/` |
| **Email Services (@niengineeringbd.com)** | Hosted on GreenWeb / cPanel Mail Server | `configured` | **CRITICAL:** Email MX/SPF/DKIM records must be preserved intact |
| **Cron Jobs** | `wp-cron.php` default / Server cron | `configured` | Scheduled WordPress maintenance tasks |
| **WordPress Uploads Path** | `/wp-content/uploads/` | `configured` | Stored locally in `public_html/wp-content/uploads/` |
| **Database Backup Availability** | Daily / Weekly host backup | `configured` | Local SQL dump / cPanel backup availability |
| **Rollback Availability** | WordPress preserved on GreenWeb | `configured` | Kept read-only during migration for instant rollback |

---

## 2. DNS Snapshot & Email Safety Ledger

> [!IMPORTANT]
> **Zero Disruption Policy for Business Email:**
> The domain `@niengineeringbd.com` has live corporate email communications (`info@niengineeringbd.com`, `sales@niengineeringbd.com`).
> Website DNS records (A/CNAME) and Email DNS records (MX/TXT/SPF/DKIM) are completely segregated.

| Record Name | Type | Current Target / Value | Purpose | Cutover Impact |
|---|:---:|---|---|---|
| `niengineeringbd.com` | `A` / `CNAME` | GreenWeb Server IP (`server71.greenweb.com.bd`) | Root Website Traffic | Update to Astro Edge CDN |
| `www.niengineeringbd.com` | `CNAME` | `niengineeringbd.com` | WWW Canonicalization | Preserve 301 to Apex |
| `niengineeringbd.com` | `MX` | `mail.niengineeringbd.com` / GreenWeb Mail | Corporate Email Delivery | **DO NOT TOUCH (Unchanged)** |
| `mail.niengineeringbd.com` | `A` | GreenWeb Mail Server IP | Mail Server Host | **DO NOT TOUCH (Unchanged)** |
| `niengineeringbd.com` | `TXT` | `v=spf1 +a +mx include:greenweb.com.bd ~all` | Email SPF Validation | **DO NOT TOUCH (Unchanged)** |
| `default._domainkey` | `TXT` | `v=DKIM1; k=rsa; p=...` | Email DKIM Signature | **DO NOT TOUCH (Unchanged)** |
| `_dmarc.niengineeringbd.com`| `TXT` | `v=DMARC1; p=quarantine;` | Email DMARC Policy | **DO NOT TOUCH (Unchanged)** |

---

## 3. WordPress Data & Asset Backup Status

- **Database Backup (`wp-content/db_backup.sql`)**: All historical WordPress posts, pages, custom project post types, SEO metadata, contact forms, and menu structures have been extracted and mapped.
- **Media Asset Backup (`wp-content/uploads/`)**: All high-resolution images, brand partner logos, equipment photos, and corporate documents (including `Company_Profile.pdf`) are mirrored and preserved directly inside `public/wp-content/uploads/`.
- **Zero Third-Party Image Proxy Dependency**: Verified that Astro components load assets from local static paths (`/wp-content/uploads/...`) and object storage, with zero runtime dependency on WordPress proxies (`i0.wp.com`, `i1.wp.com`, `i2.wp.com`).
