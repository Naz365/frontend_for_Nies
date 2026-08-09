import { apiClient } from './client';

export interface SiteSettings {
  company_name?: string;
  phone_primary?: string;
  phone_secondary?: string;
  email_primary?: string;
  office_address?: string;
  whatsapp_number?: string;
  company_profile_pdf_url?: string;
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await apiClient.get<SiteSettings>('/settings');
    return res.data || {};
  } catch (err) {
    console.warn('[API:Settings] Backend unavailable, returning default settings:', err);
    return {
      company_name: 'N.I. Engineering Services',
      phone_primary: '+880 1711-000000',
      email_primary: 'info@niengineeringbd.com',
      office_address: 'Dhaka, Bangladesh',
    };
  }
}
