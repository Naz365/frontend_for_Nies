# N.I. Engineering Services — Disaster Recovery Runbook

**Document Version:** 1.0.0  
**Target Environment:** Production Platform (`niengineeringbd.com` & `api.niengineeringbd.com`)  
**RTO (Recovery Time Objective):** < 30 minutes  
**RPO (Recovery Point Objective):** < 15 minutes  

---

## 1. Backup Topology & Automated Schedules

| Component | Mechanism | Frequency | Retention Policy | Storage Destination |
|---|---|---|---|---|
| **PostgreSQL Database** | Managed DB Snapshot + WAL Archiving | Continuous (PITR) + Daily `pg_dump` snapshot @ 02:00 UTC | 30 Days daily, 12 months monthly | Encrypted Offsite S3 Bucket |
| **Media & Product Assets** | Cloudflare R2 / AWS S3 Object Versioning | Real-time object versioning + Cross-region replication | Infinite version history | Multi-Region Bucket |
| **Application Source Code** | Git Repository (`Naz365/backend_for_Nies` & `frontend_for_Nies`) | Per commit push | Immutable Git History | GitHub Enterprise |
| **Configuration & Secrets** | Production Secret Vault / Encrypted Password Manager | Updated on change | Audited history | Secure Vault |

---

## 2. Step-by-Step Database Restoration Procedure

In the event of database failure, data corruption, or disaster recovery drills:

### Step 1: Provision / Verify Target PostgreSQL Instance
Ensure the target PostgreSQL 16 server is running and accessible:
```bash
psql "sslmode=require host=TARGET_HOST port=5432 user=nies_admin dbname=postgres" -c "CREATE DATABASE nies_production;"
```

### Step 2: Restore from Latest Verified pg_dump Snapshot
```bash
# Decompress and stream SQL dump directly into PostgreSQL
gunzip -c nies_backup_latest.sql.gz | psql "sslmode=require host=TARGET_HOST port=5432 user=nies_admin dbname=nies_production"
```

### Step 3: Run Pending Database Migrations
Run non-destructive migrations to bring the schema up to current application commit state:
```bash
php artisan migrate --force
```

### Step 4: Execute Business Logic Health Verification
```bash
php tests/verify_business_logic.php
```

---

## 3. Media & File Restoration Procedure

1. If primary object storage region is unavailable, update backend `.env`:
   ```dotenv
   AWS_BUCKET=nies-production-media-replica
   AWS_ENDPOINT=https://replica.r2.cloudflarestorage.com
   ```
2. Clear Laravel configuration cache:
   ```bash
   php artisan config:clear
   php artisan config:cache
   ```

---

## 4. Application Server Recovery

1. Deploy latest released version tag from GitHub:
   ```bash
   git clone -b main https://github.com/Naz365/backend_for_Nies.git
   cd backend_for_Nies
   composer install --no-dev --optimize-autoloader
   cp /secure/vault/.env .env
   php artisan optimize
   ```
2. Verify API health:
   ```bash
   curl -s -i https://api.niengineeringbd.com/api/v1/categories
   ```
