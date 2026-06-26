// Adapter for the legacy "Stories" display shape used by BlogCard and
// HeroNewsSlider. The public site used to consume a hard-coded array; now we
// fetch live posts from the Go API and map them into this shape so the
// existing presentational components keep working unchanged.

import type { EditorPick, Post } from "@/lib/types";
import { buildImageUrl } from "@/lib/api";

export interface Stories {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  featured: boolean;
  excerpt: string;
  content: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop";

export function mapPostToStory(
  post: Post,
  opts: { featured?: boolean } = {}
): Stories {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    author: post.author?.display_name ?? "247TechSpyware",
    date: post.published_at ?? post.scheduled_for ?? post.created_at,
    image: buildImageUrl(post.banner_image) || FALLBACK_IMAGE,
    category: (post.category?.name ?? "Tech").toUpperCase(),
    featured: opts.featured ?? false,
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
  };
}

export function mapPostsToStories(
  posts: Post[],
  opts: { featuredIds?: Set<number> } = {}
): Stories[] {
  return posts.map((p) =>
    mapPostToStory(p, { featured: opts.featuredIds?.has(p.id) ?? false })
  );
}

export function mapEditorPicksToStories(picks: EditorPick[]): Stories[] {
  return picks
    .filter((p): p is EditorPick & { post: Post } => Boolean(p.post))
    .map((p) => mapPostToStory(p.post, { featured: true }));
}

// Sort helpers (operate on already-mapped stories).
export function sortByDateDesc(items: Stories[]): Stories[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function sortByDateAsc(items: Stories[]): Stories[] {
  return [...items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}
