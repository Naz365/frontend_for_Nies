# N.I. Engineering Services — Production Rollback Procedure

**Document Version:** 1.0.0 (Phase 0 / Phase O Rollback Plan)  
**Governing Standard:** *Phase — WordPress / GreenWeb → Astro Production Cutover Execution Plan*  
**Date:** 2026-08-11  

---

## 1. Emergency Rollback Triggers

A rollback is immediately initiated if any of the following critical conditions occur during or immediately after DNS cutover:
1. Public storefront fails to load or experiences persistent HTTP 5xx errors (> 5 minutes).
2. Checkout or order creation systematically fails against `/api/v1/orders`.
3. Corporate email delivery to `@niengineeringbd.com` is impaired by DNS conflict.
4. Filament administrative portal is inaccessible to store operators.

---

## 2. Step-by-Step Rollback Execution Plan

```
[ Step 1: Trigger Detected & Rollback Declared ]
                      │
                      ▼
[ Step 2: DNS Target Restoration ]
  Point niengineeringbd.com A/CNAME record back to GreenWeb Server IP
                      │
                      ▼
[ Step 3: WordPress Site Reactivation Verification ]
  Verify WordPress is serving public requests at https://niengineeringbd.com/
                      │
                      ▼
[ Step 4: Email Continuity Check ]
  Verify MX/SPF/DKIM resolution and test incoming/outgoing email delivery
                      │
                      ▼
[ Step 5: Incident Investigation & Root-Cause Remediation ]
  Inspect Laravel logs, Astro build artifacts, and edge CDN errors in staging
```

### DNS Restoration Table:

| Hostname | Emergency Action | Target / Value | Propagation Time |
|---|---|---|:---:|
| `niengineeringbd.com` | Revert `A` / `CNAME` Record | GreenWeb Server IP (`server71.greenweb.com.bd`) | < 5 minutes (TTL 300s) |
| `www.niengineeringbd.com` | Verify `CNAME` Record | `niengineeringbd.com` | Immediate |
| `api.niengineeringbd.com` | Keep Active / Debug | `ni-engineering-backend.onrender.com` | Diagnostic Mode |
| `manage.niengineeringbd.com` | Keep Active / Debug | `ni-engineering-backend.onrender.com` | Diagnostic Mode |

---

## 3. Post-Rollback Data Reconciliation

If orders or customer quote requests were received on the new platform prior to rollback:
1. Export order records from PostgreSQL `orders` table.
2. Manually notify fulfillment operators to dispatch pending orders via WhatsApp.
3. Keep PostgreSQL database intact during investigation.
