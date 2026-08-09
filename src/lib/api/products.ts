import { defaultApiClient } from './client';

export interface Product {
  id: number;
  category_id?: number;
  sku?: string;
  title: string;
  slug: string;
  category_slug: string;
  category_name: string;
  price: number;
  compare_at_price?: number;
  stock_quantity: number;
  track_inventory: boolean;
  is_featured: boolean;
  image: string;
  description: string;
  specifications?: string;
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    category_id: 1,
    sku: "EXT-ABC-6KG",
    title: "ABC Dry Chemical Powder Extinguisher (6kg)",
    slug: "abc-dry-powder-extinguisher-6kg",
    category_slug: "fire-extinguishers",
    category_name: "Fire Extinguishers",
    price: 1450,
    compare_at_price: 1800,
    stock_quantity: 120,
    track_inventory: true,
    is_featured: true,
    image: "/wp-content/uploads/2017/05/fire-extinguishers1.jpg",
    description: "Multipurpose Class A, B, C fire extinguisher filled with 90% MAP powder. Dry nitrogen pressurized at 14 bar."
  },
  {
    id: 2,
    category_id: 1,
    sku: "EXT-CO2-3KG",
    title: "Carbon Dioxide CO2 Extinguisher (3kg)",
    slug: "co2-fire-extinguisher-3kg",
    category_slug: "fire-extinguishers",
    category_name: "Fire Extinguishers",
    price: 2800,
    compare_at_price: 3200,
    stock_quantity: 80,
    track_inventory: true,
    is_featured: true,
    image: "/wp-content/uploads/2017/11/co2.png",
    description: "Residue-free CO2 gas cylinder designed specifically for electrical server rooms and sensitive electronic equipment."
  },
  {
    id: 3,
    category_id: 1,
    sku: "EXT-FOAM-9L",
    title: "AFFF Mechanical Foam Extinguisher (9L)",
    slug: "afff-foam-fire-extinguisher-9l",
    category_slug: "fire-extinguishers",
    category_name: "Fire Extinguishers",
    price: 2200,
    compare_at_price: 2600,
    stock_quantity: 65,
    track_inventory: true,
    is_featured: false,
    image: "/wp-content/uploads/2017/05/fire-extinguishers1.jpg",
    description: "Aqueous Film Forming Foam ideal for flammable fuel and oil hazards in industrial factories and gas stations."
  },
  {
    id: 4,
    category_id: 2,
    sku: "SUP-HFC227-3K",
    title: "Clean Agent HFC-227ea Extinguisher (3kg)",
    slug: "clean-agent-hfc227ea-3kg",
    category_slug: "suppression-system",
    category_name: "Suppression System",
    price: 4500,
    compare_at_price: 5200,
    stock_quantity: 40,
    track_inventory: true,
    is_featured: true,
    image: "/wp-content/uploads/2017/11/fire-suppression-system.jpg",
    description: "Zero ozone depletion clean agent for computer rooms, telecommunication hubs, and medical laboratory rooms."
  },
  {
    id: 5,
    category_id: 3,
    sku: "ALM-OPT-SMK",
    title: "Automatic Optical Smoke & Heat Detector",
    slug: "automatic-optical-smoke-detector",
    category_slug: "alarm-systems",
    category_name: "Alarm Systems",
    price: 850,
    compare_at_price: 1100,
    stock_quantity: 250,
    track_inventory: true,
    is_featured: false,
    image: "/wp-content/uploads/2017/05/fire-detection-alarm-system.jpg",
    description: "High-sensitivity photoelectric smoke detector unit compatible with central addressable fire alarm control panels."
  },
  {
    id: 6,
    category_id: 4,
    sku: "FF-HOSE-30M",
    title: "Commercial Heavy Duty Fire Hose Reel (30m)",
    slug: "commercial-fire-hose-reel-30m",
    category_slug: "firefighting-equipment",
    category_name: "Firefighting Equipment",
    price: 8500,
    compare_at_price: 9800,
    stock_quantity: 30,
    track_inventory: true,
    is_featured: true,
    image: "/wp-content/uploads/2017/05/DFRS_Generic_Hero_Banner_78_May13.jpg",
    description: "High-pressure swinging wall mounted hose reel with solid brass jet/spray nozzle for commercial towers."
  },
  {
    id: 7,
    category_id: 5,
    sku: "SEC-CCTV-4K",
    title: "4K HD Outdoor IR Surveillance CCTV Camera",
    slug: "4k-hd-surveillance-cctv-camera",
    category_slug: "cctv",
    category_name: "CCTV",
    price: 3200,
    compare_at_price: 3900,
    stock_quantity: 75,
    track_inventory: true,
    is_featured: false,
    image: "/wp-content/uploads/2017/11/brac-university.jpg",
    description: "Weatherproof IP67 dome camera with night vision infrared LED up to 30m distance."
  },
  {
    id: 8,
    category_id: 6,
    sku: "ACC-BIO-RFID",
    title: "Biometric Fingerprint & RFID Access Control",
    slug: "biometric-fingerprint-rfid-access-control",
    category_slug: "access-control",
    category_name: "Access Control",
    price: 6500,
    compare_at_price: 7800,
    stock_quantity: 50,
    track_inventory: true,
    is_featured: false,
    image: "/wp-content/uploads/2017/11/AccessControlSystems.jpg",
    description: "Time attendance and door lock access control terminal supporting fingerprint, passcode, and IC card authentication."
  }
];

export async function fetchProducts(params: { category?: string; search?: string; featured?: boolean } = {}): Promise<Product[]> {
  const queryParams = new URLSearchParams();
  if (params.category) queryParams.set('category', params.category);
  if (params.search) queryParams.set('q', params.search);
  if (params.featured) queryParams.set('featured', '1');

  const endpoint = `/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
  return defaultApiClient.get<Product[]>(endpoint, FALLBACK_PRODUCTS);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const fallback = FALLBACK_PRODUCTS.find(p => p.slug === slug) || null;
  return defaultApiClient.get<Product | null>(`/products/${slug}`, fallback);
}
