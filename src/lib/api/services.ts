import { apiClient } from './client';

export interface ServiceRequestPayload {
  customer_name: string;
  company_name?: string;
  phone: string;
  email?: string;
  service_category: string;
  location_address: string;
  equipment_details?: string;
  urgency?: 'low' | 'normal' | 'high' | 'emergency';
}

export interface ServiceRequestResponse {
  request_number: string;
  customer_name: string;
  service_category: string;
  urgency: string;
  status: string;
  created_at: string;
}

export async function submitServiceRequest(payload: ServiceRequestPayload): Promise<ServiceRequestResponse> {
  const res = await apiClient.post<ServiceRequestResponse>('/service-requests', payload);
  if (!res.data) {
    throw new Error(res.message || 'Failed to submit service request');
  }
  return res.data;
}
