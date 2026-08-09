import { defaultApiClient } from './client';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  is_active: boolean;
  sort_order: number;
  products_count?: number;
}

export const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Fire Extinguishers',
    slug: 'fire-extinguishers',
    description: 'ABC Dry Chemical Powder, CO2, and AFFF Mechanical Foam Extinguishers',
    image: '/wp-content/uploads/2017/05/fire-extinguishers1.jpg',
    is_active: true,
    sort_order: 1,
    products_count: 3
  },
  {
    id: 2,
    name: 'Suppression System',
    slug: 'suppression-system',
    description: 'FM-200, Novec 1230, and Clean Agent gas flooding systems for server rooms',
    image: '/wp-content/uploads/2017/11/fire-suppression-system.jpg',
    is_active: true,
    sort_order: 2,
    products_count: 1
  },
  {
    id: 3,
    name: 'Alarm Systems',
    slug: 'alarm-systems',
    description: 'Addressable and conventional fire smoke/heat detection systems',
    image: '/wp-content/uploads/2017/05/fire-detection-alarm-system.jpg',
    is_active: true,
    sort_order: 3,
    products_count: 1
  },
  {
    id: 4,
    name: 'Firefighting Equipment',
    slug: 'firefighting-equipment',
    description: 'Fire hose reels, nozzles, branch pipes, and hydrant cabinets',
    image: '/wp-content/uploads/2017/05/DFRS_Generic_Hero_Banner_78_May13.jpg',
    is_active: true,
    sort_order: 4,
    products_count: 1
  },
  {
    id: 5,
    name: 'CCTV Surveillance',
    slug: 'cctv',
    description: 'High-definition 4K IP camera security systems',
    image: '/wp-content/uploads/2017/11/brac-university.jpg',
    is_active: true,
    sort_order: 5,
    products_count: 1
  },
  {
    id: 6,
    name: 'Access Control',
    slug: 'access-control',
    description: 'Biometric fingerprint, RFID, and face recognition door access terminals',
    image: '/wp-content/uploads/2017/11/AccessControlSystems.jpg',
    is_active: true,
    sort_order: 6,
    products_count: 1
  }
];

export async function fetchCategories(): Promise<Category[]> {
  return defaultApiClient.get<Category[]>('/categories', FALLBACK_CATEGORIES);
}
