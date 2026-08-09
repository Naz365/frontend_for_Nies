/**
 * Centralized HTTP client wrapper for N.I. Engineering Platform API
 */

const DEFAULT_API_BASE = 'https://ni-engineering-backend.onrender.com/api/v1';

export interface ApiClientConfig {
  baseUrl?: string;
  timeoutMs?: number;
}

export class ApiClient {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || 
      (typeof process !== 'undefined' && process.env?.PUBLIC_API_URL) || 
      DEFAULT_API_BASE;
    this.timeoutMs = config.timeoutMs || 8000;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public async get<T>(endpoint: string, fallbackData: T): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        return json.data !== undefined ? json.data : json;
      }
      console.warn(`[ApiClient] GET ${url} returned HTTP ${res.status}. Falling back to default records.`);
    } catch (err) {
      console.warn(`[ApiClient] Network request failed for ${url}:`, err instanceof Error ? err.message : err);
    }

    return fallbackData;
  }

  public async post<T>(endpoint: string, payload: unknown): Promise<{ success: boolean; data?: T; error?: string }> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const json = await res.json();

      if (res.ok && json.success !== false) {
        return { success: true, data: json.data || json };
      }

      return { 
        success: false, 
        error: json.message || json.error || `HTTP ${res.status}` 
      };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Network request failed' 
      };
    }
  }
}

export const defaultApiClient = new ApiClient();
