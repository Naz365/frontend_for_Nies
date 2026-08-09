/**
 * Shopping Cart API client for N.I. Engineering storefront
 */

import { defaultApiClient } from './client';

export interface CartItemData {
  id: number;
  product_id: number;
  title: string;
  slug: string;
  image: string;
  unit_price: number;
  quantity: number;
  line_total: number;
  stock_quantity: number;
  in_stock: boolean;
}

export interface CartData {
  cart_id: number;
  session_token: string;
  items: CartItemData[];
  item_count: number;
  subtotal: number;
  currency: string;
}

export function getCartSessionToken(): string {
  if (typeof window === 'undefined') {
    return 'server-session';
  }

  let token = localStorage.getItem('nies_cart_session_token');
  if (!token) {
    token = 'nies_guest_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('nies_cart_session_token', token);
  }
  return token;
}

export async function fetchServerCart(): Promise<CartData> {
  const token = getCartSessionToken();
  const fallback: CartData = {
    cart_id: 0,
    session_token: token,
    items: [],
    item_count: 0,
    subtotal: 0,
    currency: 'BDT',
  };

  try {
    const res = await fetch(`${defaultApiClient.getBaseUrl()}/cart`, {
      headers: {
        'Accept': 'application/json',
        'X-Cart-Session': token,
      },
    });

    if (res.ok) {
      const json = await res.json();
      return json.data || fallback;
    }
  } catch (err) {
    console.warn('[CartApi] Failed to fetch cart from server:', err);
  }

  return fallback;
}

export async function addServerCartItem(productId: number, quantity: number = 1): Promise<{ success: boolean; data?: CartData; message?: string }> {
  const token = getCartSessionToken();

  try {
    const res = await fetch(`${defaultApiClient.getBaseUrl()}/cart/items`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Cart-Session': token,
      },
      body: JSON.stringify({ product_id: productId, quantity }),
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, data: json.data, message: json.message };
    }
    return { success: false, message: json.message || 'Failed to add item' };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : 'Network error' };
  }
}

export async function updateServerCartItem(itemId: number, quantity: number): Promise<{ success: boolean; data?: CartData; message?: string }> {
  const token = getCartSessionToken();

  try {
    const res = await fetch(`${defaultApiClient.getBaseUrl()}/cart/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Cart-Session': token,
      },
      body: JSON.stringify({ quantity }),
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, data: json.data, message: json.message };
    }
    return { success: false, message: json.message || 'Failed to update item' };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : 'Network error' };
  }
}

export async function removeServerCartItem(itemId: number): Promise<{ success: boolean; data?: CartData }> {
  const token = getCartSessionToken();

  try {
    const res = await fetch(`${defaultApiClient.getBaseUrl()}/cart/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-Cart-Session': token,
      },
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, data: json.data };
    }
  } catch (err) {
    console.warn('[CartApi] Failed to remove item:', err);
  }

  return { success: false };
}

export async function clearServerCart(): Promise<{ success: boolean; data?: CartData }> {
  const token = getCartSessionToken();

  try {
    const res = await fetch(`${defaultApiClient.getBaseUrl()}/cart`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-Cart-Session': token,
      },
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, data: json.data };
    }
  } catch (err) {
    console.warn('[CartApi] Failed to clear cart:', err);
  }

  return { success: false };
}
