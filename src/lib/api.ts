export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  client: string;
  image: string;
  description: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  category_slug: string;
  category_name: string;
  image: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail: string;
  published_at: string;
  author: string;
}

export interface SiteSettings {
  address: string;
  phone_primary: string;
  phone_secondary: string;
  telephone: string;
  fax: string;
  emails: string[];
  company_profile_pdf: string;
}

const API_BASE_URL = process.env.PUBLIC_API_URL || 'https://ni-engineering-backend.onrender.com/api/v1';

// Default mock/fallback data extracted from archived WordPress migration manifest
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "BTI Tower Fire Safety Installation",
    slug: "bti-tower-fire-safety",
    category: "FIRE EXTINGUISHERS",
    client: "BTI",
    image: "/wp-content/uploads/2017/11/BIT-Building-copy.jpg",
    description: "Complete fire protection system design, extinguisher installation, and safety compliance certification for BTI tower."
  },
  {
    id: 2,
    title: "BRAC University Surveillance & CCTV",
    slug: "brac-university-cctv",
    category: "CCTV",
    client: "BRAC University",
    image: "/wp-content/uploads/2017/11/brac-university.jpg",
    description: "High-definition CCTV and central monitoring security system deployment across multi-building campus."
  },
  {
    id: 3,
    title: "BRAC Centre Inn Access Control System",
    slug: "brac-centre-inn-access-control",
    category: "ACCESS CONTROL",
    client: "BRAC Centre Inn",
    image: "/wp-content/uploads/2017/11/brac-centre-inn-copy.jpg",
    description: "Convenient RFID and biometric access control integration for hospitality entry points."
  }
];

const FALLBACK_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "Essential Fire Safety Maintenance Rules for Industrial Facilities",
    slug: "essential-fire-safety-maintenance",
    summary: "Regular maintenance and annual refilling of fire extinguishers are critical line-of-defense measures.",
    content: "<p>Fire is a serious threat to the physical safety and security of any workplace. Regular inspection and servicing using well-equipped workshops guarantee optimal operational readiness in emergency scenarios.</p>",
    thumbnail: "/wp-content/uploads/2017/05/fire-detection-alarm-system.jpg",
    published_at: "2026-07-01",
    author: "N.I. Safety Team"
  },
  {
    id: 2,
    title: "Why Modern Facilities Need Integrated CCTV & Access Control",
    slug: "integrated-cctv-and-access-control",
    summary: "Learn how combining surveillance cameras with smart door access boosts facility protection.",
    content: "<p>INTEGRATED SOLUTIONS FOR SECURITY & SURVEILLANCE bring together real-time tracking, intruder detection, and central control room management.</p>",
    thumbnail: "/wp-content/uploads/2017/11/AccessControlSystems.jpg",
    published_at: "2026-07-15",
    author: "N.I. Safety Team"
  },
  {
    id: 3,
    title: "The 6 Classes of Fire & Extinguisher Selection Guide",
    slug: "classes-of-fire-extinguisher-guide",
    summary: "Master the 6 classes of fire (A, B, C, D, Electrical, K) and learn which extinguisher to use to protect your home or business.",
    content: "<p class=\"lead text-base font-medium text-navy mb-4\">Understanding the different <strong>classes of fire</strong> is a fundamental safety requirement for every homeowner, business owner, and facility manager. When a fire breaks out, human instinct often tells us to grab water—but in many common scenarios, water will actually cause a fire to explode.</p><p class=\"mb-4\">Fire isn't one-size-fits-all; its behavior depends entirely on the fuel source. Using the wrong <strong>fire extinguisher type</strong> can transform a minor flare-up into a catastrophic disaster.</p><h3 class=\"text-lg font-extrabold text-navy uppercase mb-3\">🧯 The 6 Classes of Fire Quick Guide</h3><ul class=\"list-disc pl-5 mb-4 space-y-2 text-sm text-navy\"><li><strong>Class A (Ash):</strong> Ordinary Combustibles (Wood, paper, trash) — <em>Use Water, Foam, or ABC Dry Powder</em></li><li><strong>Class B (Barrel):</strong> Flammable Liquids (Petrol, oil, paint) — <em>Use Foam, CO2, or Dry Powder. 🛑 NEVER WATER!</em></li><li><strong>Class C (Cylinder):</strong> Flammable Gases (LPG, Methane) — <em>Use Dry Powder (Turn off gas first!)</em></li><li><strong>Class D (Dense Metals):</strong> Combustible Metals (Magnesium, Titanium) — <em>Use Class D Powder. 🛑 NEVER WATER!</em></li><li><strong>Electrical:</strong> Energized Equipment (Short circuits, motors) — <em>Use CO2 or ABC Powder. 🛑 NEVER WATER!</em></li><li><strong>Class K (Kitchen):</strong> Cooking Oils & Grease — <em>Use Wet Chemical, Fire Blanket, or Lid. 🛑 NEVER WATER!</em></li></ul><h3 class=\"text-lg font-extrabold text-navy uppercase mb-3\">🧠 Master Fire Preparedness: The \"See, Do, Teach\" Drill</h3><p class=\"mb-4\">Reading safety guidelines is a great first step, but under high-stress conditions, quick muscle memory is required. Conduct hazard assessments in your office and kitchen, and ensure your team knows why throwing water on grease or electrical fires is extremely dangerous.</p>",
    thumbnail: "/wp-content/uploads/2017/11/mr-fire-safety-limited-fire-safety-training-shrewsbury-banner.jpg",
    published_at: "2026-08-01",
    author: "N.I. Safety Team"
  },
  {
    id: 4,
    title: "Fire Extinguisher Refilling Cost in Dhaka: Complete Price & Service Guide",
    slug: "fire-extinguisher-refilling-cost-dhaka",
    summary: "Discover the latest fire extinguisher refilling costs in Dhaka for ABC Dry Powder, CO2, and Foam cylinders (2kg, 5kg, 6kg, 9kg). Learn about chemical testing and nitrogen purging requirements.",
    content: "<p class=\"lead text-base font-medium text-navy mb-4\">Maintaining operational readiness of your fire protection equipment is a strict requirement under the <strong>Bangladesh Fire Service & Civil Defence (BFSCD)</strong> regulations. If a fire breaks out in an office, factory, or residential building in Dhaka, an expired or depressurized extinguisher can lead to tragic consequences.</p><p class=\"mb-4\">In this comprehensive guide, we break down the exact <strong>fire extinguisher refilling cost in Dhaka</strong>, chemical replacement norms, hydrostatic testing cycles, and why annual refilling is essential for building compliance.</p><h3 class=\"text-lg font-extrabold text-navy uppercase mb-3\">💰 Fire Extinguisher Refilling Price Matrix in Dhaka</h3><ul class=\"list-disc pl-5 mb-4 space-y-2 text-sm text-navy\"><li><strong>ABC Dry Chemical Powder (2kg - 9kg):</strong> ৳ 350 – ৳ 1,200 per cylinder (Annual service)</li><li><strong>Carbon Dioxide CO2 (2kg - 5kg):</strong> ৳ 500 – ৳ 1,500 per cylinder (Post-discharge / Annual)</li><li><strong>AFFF Mechanical Foam (6L - 9L):</strong> ৳ 800 – ৳ 2,200 per cylinder (Annual liquid replacement)</li><li><strong>Clean Agent (HFC-227ea / FK-5-1-12):</strong> ৳ 2,500 – ৳ 6,000 per cylinder (5-year cycle)</li></ul><h3 class=\"text-lg font-extrabold text-navy uppercase mb-3\">⚙️ What Is Included in Certified Factory Refilling?</h3><p class=\"mb-4\">A complete professional refilling service by <strong>N.I. Engineering Services</strong> includes Hydrostatic Pressure Testing, Chemical Purging, Dry Nitrogen Pressurization to 14 bar, and a BFSCD-compliant service compliance tag.</p>",
    thumbnail: "/wp-content/uploads/2017/05/fire-extinguishers1.jpg",
    published_at: "2026-08-02",
    author: "N.I. Safety Team"
  }
];

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (res.ok) {
      const data = await res.json();
      return data.data || data;
    }
  } catch (err) {
    console.warn("API fetch failed for projects, using fallback manifest data.");
  }
  return FALLBACK_PROJECTS;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/blog`);
    if (res.ok) {
      const data = await res.json();
      return data.data || data;
    }
  } catch (err) {
    console.warn("API fetch failed for blog posts, using fallback manifest data.");
  }
  return FALLBACK_BLOGS;
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`);
    if (res.ok) {
      const data = await res.json();
      return data.data || data;
    }
  } catch (err) {
    console.warn("API fetch failed for settings, using fallback manifest data.");
  }
  return {
    address: "GA-85(Gr Floor), Middle Badda, Gulshan, Dhaka",
    phone_primary: "+880 1700-000000",
    phone_secondary: "+880 1800-000000",
    telephone: "+88-02-9882326",
    fax: "+88-02-9882326",
    emails: ["info@example.com", "sales@example.com"],
    company_profile_pdf: "/wp-content/uploads/2017/11/Company_Profile.pdf"
  };
}
