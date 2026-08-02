# 🛡️ N.I. Engineering Services & Fire Safety — Official Web Application

[![Live Site](https://img.shields.io/badge/Live_Site-GitHub_Pages-brightgreen?style=for-the-badge&logo=github)](https://naz365.github.io/frontend_for_Nies/)
[![Admin CMS](https://img.shields.io/badge/Admin_CMS-Panel-flame?style=for-the-badge&logo=astro&color=FF4500)](https://naz365.github.io/frontend_for_Nies/admin/)
[![Framework](https://img.shields.io/badge/Framework-Astro_v5-navy?style=for-the-badge&logo=astro)](https://astro.build/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

Welcome to the official source code repository for **N.I. Engineering Services** — Bangladesh's premier provider of **Fire Protection Equipment**, **Fire Extinguisher Refilling Services**, **CCTV Surveillance**, and **Biometric Access Control Systems** based in Dhaka, Bangladesh.

---

## 📌 Quick Links

- 🌐 **Live Website**: [https://naz365.github.io/frontend_for_Nies/](https://naz365.github.io/frontend_for_Nies/)
- 🔐 **Admin Management CMS**: [https://naz365.github.io/frontend_for_Nies/admin/](https://naz365.github.io/frontend_for_Nies/admin/)
- 📂 **GitHub Repository**: [https://github.com/Naz365/frontend_for_Nies.git](https://github.com/Naz365/frontend_for_Nies.git)

---

## 📖 Table of Contents
1. [Project Overview](#-project-overview)
2. [Tech Stack & Architecture](#-tech-stack--architecture)
3. [Key Features & Capabilities](#-key-features--capabilities)
4. [Project Directory Structure](#-project-directory-structure)
5. [Level 0: Beginners Setup Guide](#-level-0-beginners-setup-guide)
6. [Admin Panel & Drag & Drop Uploader](#-admin-panel--drag--drop-uploader)
7. [SEO & OpenSEO Keyword Strategy](#-seo--openseo-keyword-strategy)
8. [Deployment Instructions](#-deployment-instructions)
9. [License & Credits](#-license--credits)

---

## 🏢 Project Overview

**N.I. Engineering Services** is an engineering contractor and supplier of certified safety systems located in Middle Badda, Gulshan, Dhaka, Bangladesh. This web platform serves as:

- **E-Commerce / Product Showcase**: Displays full catalogs of ABC Dry Powder, CO2, Foam fire extinguishers, hydrants, smoke detectors, CCTV cameras, and biometric access control.
- **Service Request & Quote Engine**: Allows industrial facilities, commercial buildings, and homeowners to request certified extinguisher refilling and safety inspections.
- **Knowledge Base & Blog**: Provides safety guides, training drills, and compliance requirements under categories like `Fire Safety`, `CCTV & Access Control`, and `Safety Awareness`.
- **Embedded Client CMS**: Admin management interface allowing staff to publish blog articles and manage products without complex server infrastructure.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | **Astro v5** | Ultra-fast static site generator outputting pure HTML/JS to `./docs`. |
| **Styling** | **Tailwind CSS v3** | Modern utility-first design system with HSL tailored color palettes. |
| **Language** | **TypeScript & ES6+** | Type-safe client logic and component properties. |
| **Data & Storage** | **Client LocalStorage** | Zero-database browser storage for CMS articles and security states. |
| **Media Hosting** | **FileReader DataURL / ImgBB** | Instant Drag & Drop image file processing and hosting. |
| **Hosting & CDN** | **GitHub Pages** | Deployed directly from `/docs` directory on GitHub. |
| **SEO & Standards** | **OpenSEO & Addy Osmani Skills** | Structured schema, WCAG 2.1 AA accessibility, and speed optimizations. |

---

## ✨ Key Features & Capabilities

### 1. 🏠 Dynamic Hero Slider & Homepage
- Auto-sliding high-definition banner carousel highlighting safety slogans and CTA buttons.
- Service grid detailing Fire Extinguisher Refilling, Maintenance, CCTV, and After-Sales Support.
- **FAQ Section**: Embedded Google `FAQPage` JSON-LD schema for rich search snippet indexing.

### 2. 🧯 Filterable Product Catalog (`/products/`)
- Real-time JavaScript category filter (`ALL`, `FIRE EXTINGUISHERS`, `CCTV`, `ACCESS CONTROL`, `ALARM SYSTEMS`, `GENERATOR`, `FIRE HYDRANT`).
- Modal/direct inquiry buttons linking to the quote engine.

### 3. 📰 Safety Awareness Blog & Reader (`/blog/`)
- Filter articles by `Fire Safety`, `CCTV & Access Control`, or `Safety Awareness`.
- Embedded modal reader for viewing articles seamlessly without page reloads.
- Includes pre-loaded SEO guides like *"The 6 Classes of Fire & Extinguisher Selection Guide"*.

### 4. 🔐 Admin Management Panel (`/admin/`)
- **Security Gateway**: Password-protected overlay requiring authentication.
- **Drag & Drop Image Uploader**: Drag image files (`PNG`, `JPG`, `WEBP`) directly to auto-host and preview live thumbnails.
- **Article Publisher**: Publish new safety guidelines directly into client storage.
- **Posts Manager**: Delete or manage published articles.

### 5. 📞 Contact & Lead Capture (`/contact/`)
- Lead inquiry form for custom quotes.
- Interactive Google Maps location embed pointing to Middle Badda, Gulshan, Dhaka.
- Generic company hotline placeholders (`+880 1700-000000`).

---

## 📁 Project Directory Structure

```text
frontend_for_Nies/
├── docs/                        # Compiled production build served by GitHub Pages
│   ├── index.html               # Main homepage output
│   ├── admin/index.html         # Admin CMS output
│   ├── products/index.html      # Products catalog output
│   ├── blog/index.html          # Safety blog output
│   ├── sitemap.xml              # XML Sitemap for search engines
│   └── robots.txt               # Search crawler instructions
├── public/                      # Static assets copied directly to docs/ during build
│   ├── sitemap.xml
│   ├── robots.txt
│   └── wp-content/uploads/      # Product & banner images
├── src/
│   ├── components/              # Reusable Astro UI components
│   │   ├── Header.astro         # Sticky header navigation & mobile drawer
│   │   ├── Footer.astro         # Site footer & contact info
│   │   ├── HeroSlider.astro     # Homepage banner carousel
│   │   ├── ProductGrid.astro    # Product filter grid
│   │   ├── ContactForm.astro    # Lead form
│   │   └── ClientLogos.astro    # Client showcase
│   ├── layouts/
│   │   └── Layout.astro         # Global HTML layout, SEO meta tags, skip-links
│   ├── lib/
│   │   └── api.ts               # Data fetchers & fallback content manifests
│   └── pages/                   # Astro routing pages
│       ├── index.astro          # Home Page
│       ├── about-us.astro       # About Us
│       ├── products.astro       # Products Page
│       ├── blog/                # Blog list & [slug] dynamic page
│       ├── contact.astro        # Contact Us Page
│       ├── company-profile.astro# Downloadable PDF profile page
│       └── admin.astro          # Admin CMS & Drag & Drop Uploader
├── seo-workspace/               # OpenSEO strategy files & keyword research reports
│   └── reports/
│       └── openseo_growth_strategy.md
├── astro.config.mjs             # Astro configuration (base path & docs outDir)
├── package.json                 # Project dependencies & npm scripts
├── README.md                    # Project documentation (You are here!)
└── .gitignore                   # Excluded files (node_modules, dev logs, etc.)
```

---

## 🚀 Level 0: Beginners Setup Guide

Follow these simple step-by-step instructions to run and develop this website on your computer from scratch:

### Step 1: Install Prerequisites
Ensure you have the following installed on your computer:
- **Node.js** (v18.0.0 or higher): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)

Verify installation in your terminal:
```bash
node -v
npm -v
git --version
```

### Step 2: Clone the Repository
Open your terminal or command prompt and run:
```bash
git clone https://github.com/Naz365/frontend_for_Nies.git
cd frontend_for_Nies
```

### Step 3: Install Dependencies
Install all required Node modules:
```bash
npm install
```

### Step 4: Start Local Development Server
Launch the local development server:
```bash
npm run dev
```
Open your web browser and navigate to:
👉 `http://localhost:4321/frontend_for_Nies/`

---

## 🔑 Admin Panel & Drag & Drop Uploader

### Accessing Admin CMS:
1. Navigate to: `/frontend_for_Nies/admin/`
2. Enter your admin security password when prompted.

### Uploading Images via Drag & Drop:
1. Open the **Blog Publisher** tab in the Admin Panel.
2. Drag any image file (`PNG`, `JPG`, `WEBP`, `GIF`) from your computer directly into the **Thumbnail Image** dropzone box.
3. The image will be processed via `FileReader` and displayed in a live thumbnail preview.
4. Click **Publish Article** to make it instantly visible on the live Blog page.

---

## 🎯 SEO & OpenSEO Keyword Strategy

The website is optimized for high-intent search queries in Dhaka, Bangladesh:

| Target Keyword | Target Page | OpenSEO Purpose |
| :--- | :--- | :--- |
| `fire extinguisher supplier dhaka` | `/products/` | Commercial Buying Intent |
| `fire extinguisher refilling service dhaka` | `/products/` & `/contact/` | Service Booking |
| `abc dry powder fire extinguisher price bangladesh` | `/products/` | Price Comparison |
| `the 6 classes of fire extinguisher guide` | `/blog/` | Informational / Organic Traffic |

---

## 📦 Deployment Instructions

This project is configured to automatically build static production files into the `./docs` directory for **GitHub Pages**.

### To compile a new production build:
```bash
npm run build
```

### To push updates to GitHub:
```bash
git add .
git commit -m "Updated site content and build"
git push origin master
```

### GitHub Pages Settings Configuration:
1. Go to your repository settings on GitHub:  
   `https://github.com/Naz365/frontend_for_Nies/settings/pages`
2. Under **Build and deployment** -> **Source**: Select `Deploy from a branch`.
3. Under **Branch**: Select `master` and set the directory to `/docs`.
4. Click **Save**.

---

## 📜 License & Credits

- **Owner**: N.I. Engineering Services (Dhaka, Bangladesh)
- **Developer & AI Pair Programmer**: Antigravity AI Assistant & Naz365
- **Design System**: Custom Vanilla CSS & Tailwind CSS HSL Tokens

---
*For inquiries, service refilling, or custom installations in Dhaka, contact N.I. Engineering Services at info@example.com.*
