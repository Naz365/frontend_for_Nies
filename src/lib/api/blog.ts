import { apiClient } from './client';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  published_at?: string;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await apiClient.get<BlogPost[]>('/blog');
    return res.data || [];
  } catch (err) {
    console.warn('[API:Blog] Backend unavailable, returning empty list:', err);
    return [];
  }
}
