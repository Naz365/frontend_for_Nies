/**
 * Orders & Checkout API client for N.I. Engineering storefront
 */

import { defaultApiClient } from './client';
import { getCartSessionToken } from './cart';

export interface CreateOrderPayload {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  shipping_address: string;
  payment_method?: 'cod' | 'sslcommerz' | 'bkash' | 'nagad';
  notes?: string;
  items?: Array<{
    product_id: number;
    quantity: number;
  }>;
}

export interface OrderConfirmation {
  order_number: string;
  total_amount: number;
  currency: string;
  payment_method: string;
  payment_status: string;
  status: string;
  items_count: number;
  created_at: string;
}

export interface QuoteRequestPayload {
  customer_name: string;
  company_name?: string;
  phone: string;
  email?: string;
  service_type: string;
  project_description: string;
  notes?: string;
}

export async function placeServerOrder(payload: CreateOrderPayload): Promise<{ success: boolean; data?: OrderConfirmation; message?: string }> {
  const token = getCartSessionToken();

  try {
    const res = await fetch(`${defaultApiClient.getBaseUrl()}/orders`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Cart-Session': token,
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, data: json.data, message: json.message };
    }
    return { success: false, message: json.message || 'Failed to place order' };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : 'Network error' };
  }
}

export async function trackServerOrder(orderNumber: string, phone?: string): Promise<{ success: boolean; data?: any; message?: string }> {
  const query = phone ? `?phone=${encodeURIComponent(phone)}` : '';

  try {
    const res = await fetch(`${defaultApiClient.getBaseUrl()}/orders/${orderNumber}${query}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, data: json.data };
    }
    return { success: false, message: json.message || 'Order not found' };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : 'Network error' };
  }
}

export async function submitServerQuoteRequest(payload: QuoteRequestPayload): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const res = await fetch(`${defaultApiClient.getBaseUrl()}/quote-requests`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, data: json.data, message: json.message };
    }
    return { success: false, message: json.message || 'Failed to submit quote request' };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : 'Network error' };
  }
}
