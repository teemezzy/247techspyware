// Shared types matching the Go backend models

export type UserRole = "admin" | "author";
export type PostStatus = "draft" | "published" | "scheduled" | "offline";

export interface User {
  id: number;
  email: string;
  display_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  banner_image: string;
  status: PostStatus;
  view_count: number;
  author_id: number;
  author?: User;
  category_id: number | null;
  category?: Category | null;
  published_at: string | null;
  scheduled_for: string | null;
  is_latest_news: boolean;
  latest_news_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EditorPick {
  id: number;
  post_id: number;
  post?: Post;
  picked_at: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Subscriber {
  id: number;
  email: string;
  is_active: boolean;
  subscribed_at: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  scheduled_posts: number;
  total_views: number;
  total_subscribers: number;
  total_authors: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Request DTOs

export interface CreatePostRequest {
  title: string;
  content?: string;
  excerpt?: string;
  category_id?: number | null;
  status?: PostStatus;
  scheduled_for?: string | null;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  category_id?: number | null;
  status?: PostStatus;
  scheduled_for?: string | null;
  banner_image?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  display_name: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  email?: string;
  password?: string;
  display_name?: string;
  role?: UserRole;
  is_active?: boolean;
}
