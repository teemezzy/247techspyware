// API client. Talks to the Go backend defined in 247techspywareAPI.
// Configure NEXT_PUBLIC_API_URL in .env.local (e.g. http://localhost:8080).

import type {
  Category,
  CreatePostRequest,
  CreateUserRequest,
  DashboardStats,
  EditorPick,
  LoginResponse,
  PaginatedResponse,
  Post,
  Subscriber,
  UpdatePostRequest,
  UpdateUserRequest,
  User,
} from "./types";

const TOKEN_STORAGE_KEY = "247ts_token";
const USER_STORAGE_KEY = "247ts_user";

export const API_BASE: string =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

if (typeof window !== "undefined" && !API_BASE) {
  // eslint-disable-next-line no-console
  console.warn(
    "[247ts] NEXT_PUBLIC_API_URL is not set. Add it to .env.local — e.g. NEXT_PUBLIC_API_URL=http://localhost:8080"
  );
}

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

// ---- token storage ---------------------------------------------------------

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(USER_STORAGE_KEY);
  }
}

// ---- core fetch ------------------------------------------------------------

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  auth?: boolean;
  query?: Record<string, string | number | boolean | undefined | null>;
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { body, auth = true, query, headers, ...rest } = opts;

  let url = `${API_BASE}${path}`;
  if (query) {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      params.set(k, String(v));
    }
    const qs = params.toString();
    if (qs) url += (url.includes("?") ? "&" : "?") + qs;
  }

  const finalHeaders = new Headers(headers);
  if (body !== undefined && !(body instanceof FormData)) {
    finalHeaders.set("Content-Type", "application/json");
  }
  if (auth) {
    const token = getStoredToken();
    if (token) finalHeaders.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...rest,
    headers: finalHeaders,
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  });

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : null) ?? `Request failed: ${res.status}`;
    throw new ApiError(res.status, message, data);
  }

  return data as T;
}

// ---- API surface -----------------------------------------------------------

export const api = {
  // Auth ------------------------------------------------------------
  login: (email: string, password: string) =>
    request<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    }),
  forgotPassword: (email: string) =>
    request<{ message: string }>("/api/auth/forgot-password", {
      method: "POST",
      body: { email },
      auth: false,
    }),
  resetPassword: (token: string, email: string, new_password: string) =>
    request<{ message: string }>("/api/auth/reset-password", {
      method: "POST",
      body: { token, email, new_password },
      auth: false,
    }),

  // Users (admin) ---------------------------------------------------
  listUsers: () => request<User[]>("/api/admin/users", { method: "GET" }),
  createUser: (req: CreateUserRequest) =>
    request<User>("/api/admin/users", { method: "POST", body: req }),
  updateUser: (id: number, req: UpdateUserRequest) =>
    request<User>(`/api/admin/users/${id}`, { method: "PUT", body: req }),
  deleteUser: (id: number) =>
    request<{ message: string }>(`/api/admin/users/${id}`, {
      method: "DELETE",
    }),
  toggleUserActive: (id: number) =>
    request<User>(`/api/admin/users/${id}/toggle-active`, { method: "PUT" }),

  // Categories ------------------------------------------------------
  listCategories: () =>
    request<Category[]>("/api/categories", { method: "GET", auth: false }),
  createCategory: (name: string) =>
    request<Category>("/api/admin/categories", {
      method: "POST",
      body: { name },
    }),
  updateCategory: (id: number, name: string) =>
    request<Category>(`/api/admin/categories/${id}`, {
      method: "PUT",
      body: { name },
    }),
  deleteCategory: (id: number) =>
    request<{ message: string }>(`/api/admin/categories/${id}`, {
      method: "DELETE",
    }),

  // Posts (public) --------------------------------------------------
  listPublishedPosts: (params?: { page?: number; per_page?: number; q?: string }) =>
    request<PaginatedResponse<Post>>("/api/posts", {
      method: "GET",
      auth: false,
      query: params,
    }),
  getPostBySlug: (slug: string) =>
    request<Post>(`/api/posts/${slug}`, { method: "GET", auth: false }),
  getLatestNews: (limit = 10) =>
    request<Post[]>("/api/posts/latest", {
      method: "GET",
      auth: false,
      query: { limit },
    }),
  getPostsByCategory: (
    slug: string,
    params?: { page?: number; per_page?: number }
  ) =>
    request<PaginatedResponse<Post>>(`/api/posts/category/${slug}`, {
      method: "GET",
      auth: false,
      query: params,
    }),

  // Posts (admin) ---------------------------------------------------
  listAllPosts: (params?: { page?: number; per_page?: number }) =>
    request<PaginatedResponse<Post>>("/api/admin/posts", {
      method: "GET",
      query: params,
    }),
  getPostById: (id: number) =>
    request<Post>(`/api/admin/posts/${id}`, { method: "GET" }),
  createPost: (req: CreatePostRequest) =>
    request<Post>("/api/admin/posts", { method: "POST", body: req }),
  updatePost: (id: number, req: UpdatePostRequest) =>
    request<Post>(`/api/admin/posts/${id}`, { method: "PUT", body: req }),
  deletePost: (id: number) =>
    request<{ message: string }>(`/api/admin/posts/${id}`, {
      method: "DELETE",
    }),
  updatePostStatus: (id: number, status: string) =>
    request<Post>(`/api/admin/posts/${id}/status`, {
      method: "PUT",
      body: { status },
    }),
  autoSavePost: (id: number, payload: { title?: string; content?: string }) =>
    request<Post>(`/api/admin/posts/${id}/auto-save`, {
      method: "PUT",
      body: payload,
    }),
  uploadPostImage: (id: number, file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return request<Post>(`/api/admin/posts/${id}/upload-image`, {
      method: "POST",
      body: fd,
    });
  },

  // Editor's picks --------------------------------------------------
  listEditorPicks: () =>
    request<EditorPick[]>("/api/editor-picks", { method: "GET", auth: false }),
  addEditorPick: (post_id: number) =>
    request<EditorPick>("/api/admin/editor-picks", {
      method: "POST",
      body: { post_id },
    }),
  removeEditorPick: (id: number) =>
    request<{ message: string }>(`/api/admin/editor-picks/${id}`, {
      method: "DELETE",
    }),
  reorderEditorPicks: (picks: { id: number; order: number }[]) =>
    request<{ message: string }>("/api/admin/editor-picks/reorder", {
      method: "PUT",
      body: { picks },
    }),

  // Newsletter (public) ---------------------------------------------
  subscribe: (email: string) =>
    request<{ message: string; email: string }>("/api/subscribe", {
      method: "POST",
      body: { email },
      auth: false,
    }),

  // Subscribers (admin) ---------------------------------------------
  listSubscribers: () =>
    request<Subscriber[]>("/api/admin/subscribers", { method: "GET" }),
  deleteSubscriber: (id: number) =>
    request<{ message: string }>(`/api/admin/subscribers/${id}`, {
      method: "DELETE",
    }),

  // Dashboard -------------------------------------------------------
  getStats: () =>
    request<DashboardStats>("/api/admin/stats", { method: "GET" }),
};

export function buildImageUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/")) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
}
