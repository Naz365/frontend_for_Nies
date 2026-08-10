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
  category_id?: number;
  sku?: string;
  title: string;
  slug: string;
  category_slug: string;
  category_name: string;
  price: number;
  original_price?: number;
  compare_at_price?: number;
  stock_quantity?: number;
  track_inventory?: boolean;
  is_featured?: boolean;
  in_stock?: boolean;
  image: string;
  description: string;
  specifications?: string;
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
    summary: "Discover official fire extinguisher refilling rates in Dhaka: ABC Dry Powder at ৳80/kg, CO2 at ৳100/kg, and Foam at ৳70/liter. Pickup charges, spare parts & turnaround times.",
    content: "<p class=\"lead text-base font-medium text-navy mb-4\">Maintaining operational readiness of your fire protection equipment is a strict requirement under the <strong>Bangladesh Fire Service & Civil Defence (BFSCD)</strong> regulations. If a fire breaks out in an office, factory, or residential building in Dhaka, an expired or depressurized extinguisher can lead to tragic consequences.</p><p class=\"mb-4\">Below is the official price breakdown for <strong>fire extinguisher refilling cost in Dhaka</strong> per kilogram (kg) and liter (Ltr), including pickup charges, spare part costs, and turnaround times provided by <strong>N.I. Engineering Services</strong>.</p><h3 class=\"text-lg font-extrabold text-navy uppercase mb-3\">💰 Official Fire Extinguisher Refilling Rates in Dhaka (Per KG / Per Liter)</h3><ul class=\"list-disc pl-5 mb-4 space-y-2 text-sm text-navy\"><li><strong>ABC Dry Powder / DCP:</strong> <strong>80 BDT / kg</strong> (e.g., 2kg = ৳160, 5kg = ৳400, 6kg = ৳480, 9kg = ৳720).</li><li><strong>Carbon Dioxide (CO2):</strong> <strong>100 BDT / kg</strong> (e.g., 2kg = ৳200, 3kg = ৳300, 5kg = ৳500).</li><li><strong>AFFF Mechanical Foam Type:</strong> <strong>70 BDT / Liter</strong> (e.g., 6L = ৳420, 9L = ৳630, 50L Trolley = ৳3,500).</li><li><strong>Clean Agent (HFC-227ea / FK-5-1-12):</strong> <strong>2,500 BDT – 6,000 BDT</strong> per unit (5-year servicing cycle).</li></ul><h3 class=\"text-lg font-extrabold text-navy uppercase mb-3\">🚚 Service Rules, Pickup & Spare Parts Charges inside Dhaka</h3><ul class=\"list-disc pl-5 mb-4 space-y-2 text-sm text-navy\"><li><strong>Minimum Order Quantity:</strong> Flexible pickup from 1 to 5+ cylinders for factories and commercial towers.</li><li><strong>Pickup & Delivery Charge:</strong> Free pickup for orders over 5 cylinders, or <strong>৳75 to ৳110 per piece</strong> (flat ৳800 for bulk industrial transport inside Dhaka).</li><li><strong>Turnaround Time:</strong> Standard certified factory refilling takes <strong>1 to 3 working days</strong>.</li><li><strong>Spare Parts & Gauge Meter:</strong> Pressure gauge meters cost <strong>৳100</strong>, and replacement hose pipes range from <strong>৳250 to ৳550</strong> if required during inspection.</li></ul><h3 class=\"text-lg font-extrabold text-navy uppercase mb-3\">⚙️ What Is Included in Certified Factory Refilling?</h3><p class=\"mb-4\">Every certified refilling order by <strong>N.I. Engineering Services</strong> includes Hydrostatic Pressure Testing, Chemical Purging, Dry Nitrogen Pressurization to 14–15 bar, and an official BFSCD-compliant service tag displaying test date and next expiry date.</p>",
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
    phone_primary: "+880 1711 135 731",
    phone_secondary: "+880 1670 236 785",
    telephone: "+88-02-9882326",
    fax: "+88-02-9882326",
    emails: ["info@niengineeringbd.com", "support@niengineeringbd.com"],
    company_profile_pdf: "/wp-content/uploads/2017/11/Company_Profile.pdf"
  };
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "ABC Dry Chemical Powder Extinguisher (6kg)",
    slug: "abc-dry-powder-extinguisher-6kg",
    category_slug: "fire-extinguishers",
    category_name: "Fire Extinguishers",
    price: 1450,
    original_price: 1800,
    in_stock: true,
    image: "/wp-content/uploads/2017/05/fire-extinguishers1.jpg",
    description: "Multipurpose Class A, B, C fire extinguisher filled with 90% MAP powder. Dry nitrogen pressurized at 14 bar."
  },
  {
    id: 2,
    title: "Carbon Dioxide CO2 Extinguisher (3kg)",
    slug: "co2-fire-extinguisher-3kg",
    category_slug: "fire-extinguishers",
    category_name: "Fire Extinguishers",
    price: 2800,
    original_price: 3200,
    in_stock: true,
    image: "/wp-content/uploads/2017/11/co2.png",
    description: "Residue-free CO2 gas cylinder designed specifically for electrical server rooms and sensitive electronic equipment."
  },
  {
    id: 3,
    title: "AFFF Mechanical Foam Extinguisher (9L)",
    slug: "afff-foam-fire-extinguisher-9l",
    category_slug: "fire-extinguishers",
    category_name: "Fire Extinguishers",
    price: 2200,
    original_price: 2600,
    in_stock: true,
    image: "/wp-content/uploads/2017/05/fire-extinguishers1.jpg",
    description: "Aqueous Film Forming Foam ideal for flammable fuel and oil hazards in industrial factories and gas stations."
  },
  {
    id: 4,
    title: "Clean Agent HFC-227ea Extinguisher (3kg)",
    slug: "clean-agent-hfc227ea-3kg",
    category_slug: "suppression-system",
    category_name: "Suppression System",
    price: 4500,
    original_price: 5200,
    in_stock: true,
    image: "/wp-content/uploads/2017/11/fire-suppression-system.jpg",
    description: "Zero ozone depletion clean agent for computer rooms, telecommunication hubs, and medical laboratory rooms."
  },
  {
    id: 5,
    title: "Automatic Optical Smoke & Heat Detector",
    slug: "automatic-optical-smoke-detector",
    category_slug: "alarm-systems",
    category_name: "Alarm Systems",
    price: 850,
    original_price: 1100,
    in_stock: true,
    image: "/wp-content/uploads/2017/05/fire-detection-alarm-system.jpg",
    description: "High-sensitivity photoelectric smoke detector unit compatible with central addressable fire alarm control panels."
  },
  {
    id: 6,
    title: "Commercial Heavy Duty Fire Hose Reel (30m)",
    slug: "commercial-fire-hose-reel-30m",
    category_slug: "firefighting-equipment",
    category_name: "Firefighting Equipment",
    price: 8500,
    original_price: 9800,
    in_stock: true,
    image: "/wp-content/uploads/2017/05/DFRS_Generic_Hero_Banner_78_May13.jpg",
    description: "High-pressure swinging wall mounted hose reel with solid brass jet/spray nozzle for commercial towers."
  },
  {
    id: 7,
    title: "4K HD Outdoor IR Surveillance CCTV Camera",
    slug: "4k-hd-surveillance-cctv-camera",
    category_slug: "cctv",
    category_name: "CCTV",
    price: 3200,
    original_price: 3900,
    in_stock: true,
    image: "/wp-content/uploads/2017/11/brac-university.jpg",
    description: "Weatherproof IP67 dome camera with night vision infrared LED up to 30m distance."
  },
  {
    id: 8,
    title: "Biometric Fingerprint & RFID Access Control",
    slug: "biometric-fingerprint-rfid-access-control",
    category_slug: "access-control",
    category_name: "Access Control",
    price: 6500,
    original_price: 7800,
    in_stock: true,
    image: "/wp-content/uploads/2017/11/AccessControlSystems.jpg",
    description: "Time attendance and door lock access control terminal supporting fingerprint, passcode, and IC card authentication."
  }
];

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (res.ok) {
      const data = await res.json();
      return data.data || data;
    }
  } catch (err) {
    console.warn("API fetch failed for products, using fallback manifest data.");
  }
  return FALLBACK_PRODUCTS;
}
