// app/all-news/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import BlogCard from "@/Components/BlogCard";
import BackButton from "@/Components/BackButton";
import { api, ApiError } from "@/lib/api";
import {
  type Stories,
  mapPostToStory,
  sortByDateAsc,
  sortByDateDesc,
} from "@/Constants/Stories";

export default function AllNewsPage() {
  const [posts, setPosts] = useState<Stories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [latestPage, setLatestPage] = useState(1);
  const [earliestPage, setEarliestPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.listPublishedPosts({ per_page: 100 });
        if (!cancelled) setPosts(res.data.map((p) => mapPostToStory(p)));
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

  const latest = useMemo(() => sortByDateDesc(posts), [posts]);
  const earliest = useMemo(() => sortByDateAsc(posts), [posts]);

  const latestPaginated = latest.slice(0, latestPage * postsPerPage);
  const earliestPaginated = earliest.slice(0, earliestPage * postsPerPage);

  const hasMoreLatest = latestPaginated.length < latest.length;
  const hasMoreEarliest = earliestPaginated.length < earliest.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-10 md:px-20 py-12">
        <BackButton />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-24">
            No posts published yet.
          </div>
        ) : (
          <>
            {/* Latest Section */}
            <section className="mb-16">
              <h2 className="text-black text-4xl font-bold mb-8">
                Latest News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {latestPaginated.map((post) => (
                  <BlogCard key={post.id} post={post} variant="grid" />
                ))}
              </div>

              {hasMoreLatest && (
                <div className="text-center">
                  <button
                    onClick={() => setLatestPage((prev) => prev + 1)}
                    className="bg-primary hover:text-secondary cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Load More Latest
                  </button>
                </div>
              )}
            </section>

            <div className="border-t border-gray-300 my-12"></div>

            {/* Earliest Section */}
            <section>
              <h2 className="text-black text-4xl font-bold mb-8">
                From The Archives
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {earliestPaginated.map((post) => (
                  <BlogCard
                    key={`archive-${post.id}`}
                    post={post}
                    variant="grid"
                  />
                ))}
              </div>

              {hasMoreEarliest && (
                <div className="text-center">
                  <button
                    onClick={() => setEarliestPage((prev) => prev + 1)}
                    className="bg-primary hover:text-secondary cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    See More
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
