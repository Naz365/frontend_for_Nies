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
    phone_primary: "+880 1711 135 731",
    phone_secondary: "+880 1670 236 785",
    telephone: "+88-02-9882326",
    fax: "+88-02-9882326",
    emails: ["info@niengineering.com", "sales@niengineering.com"],
    company_profile_pdf: "/wp-content/uploads/2017/11/Company_Profile.pdf"
  };
}
