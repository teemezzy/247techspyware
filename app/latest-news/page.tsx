// app/latest-news/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import BlogCard from "@/Components/BlogCard";
import BackButton from "@/Components/BackButton";
import { api, ApiError } from "@/lib/api";
import { type Stories, mapPostToStory } from "@/Constants/Stories";

export default function LatestNewsPage() {
  const [posts, setPosts] = useState<Stories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getLatestNews(100);
        if (!cancelled) setPosts(data.map((p) => mapPostToStory(p)));
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Could not load posts"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const paginatedPosts = posts.slice(0, page * postsPerPage);
  const hasMore = paginatedPosts.length < posts.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-12">
        <BackButton />

        <section className="mb-16">
          <h2 className="text-black text-4xl font-bold mb-8">Latest News</h2>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg p-4">
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              No posts published yet.
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} variant="grid" />
                ))}
              </div>

              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="bg-primary hover:text-secondary cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
