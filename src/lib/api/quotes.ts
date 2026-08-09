import { apiClient } from './client';

export interface QuoteRequestPayload {
  customer_name: string;
  company_name?: string;
  email?: string;
  phone: string;
  service_type: string;
  project_description: string;
  notes?: string;
}

export interface QuoteRequestResponse {
  request_number: string;
  customer_name: string;
  service_type: string;
  status: string;
  created_at: string;
}

export async function submitQuoteRequest(payload: QuoteRequestPayload): Promise<QuoteRequestResponse> {
  const res = await apiClient.post<QuoteRequestResponse>('/quote-requests', payload);
  if (!res.data) {
    throw new Error(res.message || 'Failed to submit quote request');
  }
  return res.data;
}
