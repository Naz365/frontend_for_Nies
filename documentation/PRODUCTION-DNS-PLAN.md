# N.I. Engineering Services — Production DNS Architecture & Cutover Plan

**Document Version:** 1.0.0 (Phase 0 / Phase J/K Production DNS Plan)  
**Governing Standard:** *Phase — WordPress / GreenWeb → Astro Production Cutover Execution Plan*  
**Date:** 2026-08-11  

---

## 1. Production DNS Mapping & Routing Matrix

| HOST | TYPE | CURRENT TARGET | NEW TARGET | PURPOSE | CHANGE REQUIRED? | ROLLBACK VALUE |
|---|:---:|---|---|---|:---:|---|
| `niengineeringbd.com` | `A` / `CNAME` | GreenWeb Shared IP (`server71.greenweb.com.bd`) | `naz365.github.io` / Cloudflare Pages / Vercel Edge | Public Astro Storefront | **YES** (At Cutover) | GreenWeb Server IP |
| `www.niengineeringbd.com` | `CNAME` | `niengineeringbd.com` | `niengineeringbd.com` | Canonical Apex 301 Redirect | **NO** | `niengineeringbd.com` |
| `api.niengineeringbd.com` | `CNAME` / `A` | Not Configured | `ni-engineering-backend.onrender.com` / VM App IP | Laravel 12 REST API Gateway | **YES** | Delete Record |
| `manage.niengineeringbd.com`| `CNAME` / `A`| Not Configured | `ni-engineering-backend.onrender.com` / VM App IP | Filament 3.x Admin CMS Portal | **YES** | Delete Record |
| `niengineeringbd.com` | `MX` | `mail.niengineeringbd.com` (Priority 10) | `mail.niengineeringbd.com` (Priority 10) | Corporate Email Delivery | **NO (STRICT)** | `mail.niengineeringbd.com` |
| `mail.niengineeringbd.com` | `A` | GreenWeb Server IP | GreenWeb Server IP | GreenWeb Mail Host | **NO (STRICT)** | GreenWeb Server IP |
| `niengineeringbd.com` | `TXT` | `v=spf1 +a +mx include:greenweb.com.bd ~all` | `v=spf1 +a +mx include:greenweb.com.bd ~all` | Email SPF Validation | **NO (STRICT)** | SPF Record |
| `default._domainkey` | `TXT` | `v=DKIM1; k=rsa; p=...` | `v=DKIM1; k=rsa; p=...` | Email DKIM Signature | **NO (STRICT)** | DKIM Record |
| `_dmarc.niengineeringbd.com`| `TXT` | `v=DMARC1; p=quarantine;` | `v=DMARC1; p=quarantine;` | Email DMARC Policy | **NO (STRICT)** | DMARC Record |

---

## 2. Reversible Cutover Sequence

```
1. PREPARE:
   - Astro Production Build verified (12 static pages)
   - Laravel API verified (52/52 passing tests)
   - Filament Admin CMS verified
   - Media assets mirrored & verified
   - WordPress database snapshot preserved

2. CUTOVER (Zero Downtime):
   - Update DNS record for niengineeringbd.com to point to Astro Edge
   - Add CNAME for api.niengineeringbd.com -> Laravel API
   - Add CNAME for manage.niengineeringbd.com -> Filament Admin CMS
   - SSL certificates auto-issued via Cloudflare / Let's Encrypt

3. POST-CUTOVER:
   - Keep GreenWeb WordPress hosting active as rollback reference
   - Validate HTTP->HTTPS, canonical www, live API communication, and cart/checkout flows
```
