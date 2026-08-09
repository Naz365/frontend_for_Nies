import { apiClient } from './client';

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  client_name?: string;
  location?: string;
  description?: string;
  image?: string;
  is_featured?: boolean;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await apiClient.get<Project[]>('/projects');
    return res.data || [];
  } catch (err) {
    console.warn('[API:Projects] Backend unavailable, returning empty list:', err);
    return [];
  }
}
