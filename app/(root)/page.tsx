// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import HorizontalScroll from "@/Components/HorizontalScroll";
import BlogCard from "@/Components/BlogCard";
import HeroNewsSlider from "@/Components/HeroNewsSlider";
import { api, ApiError } from "@/lib/api";
import {
  type Stories,
  mapPostToStory,
  mapEditorPicksToStories,
} from "@/Constants/Stories";

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Stories[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Stories[]>([]);
  const [missedPostsAll, setMissedPostsAll] = useState<Stories[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [missedCount, setMissedCount] = useState(8);

  useEffect(() => {
    const updateCount = () => {
      setMissedCount(window.innerWidth >= 768 ? 14 : 8);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [latest, picks, all] = await Promise.all([
          api.getLatestNews(10),
          api.listEditorPicks(),
          api.listPublishedPosts({ per_page: 30 }),
        ]);
        if (cancelled) return;

        const latestStories = latest.map((p) => mapPostToStory(p));
        const featuredStories = mapEditorPicksToStories(picks);

        // "In case you missed it" — exclude anything already shown above.
        const exclude = new Set<number>([
          ...latestStories.slice(0, 5).map((p) => p.id),
          ...featuredStories.slice(0, 5).map((p) => p.id),
        ]);
        const missed = all.data
          .filter((p) => !exclude.has(p.id))
          .map((p) => mapPostToStory(p));

        setRecentPosts(latestStories.slice(0, 5));
        setFeaturedPosts(featuredStories.slice(0, 5));
        setMissedPostsAll(missed);
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

  const missedPosts = missedPostsAll.slice(0, missedCount);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-32 px-6">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 max-w-lg text-center">
          <p className="font-semibold mb-1">Could not load posts</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroNewsSlider posts={recentPosts} />
      <div className="mx-auto px-5 sm:px-10 md:px-20 py-12">
        {/* Recent News */}
        {recentPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-black text-xl md:text-3xl font-bold mb-6">
              Recent News
            </h2>
            <HorizontalScroll seeMoreLink="/latest-news">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} variant="horizontal" />
              ))}
            </HorizontalScroll>
          </section>
        )}

        {/* Editor's Pick */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-black text-xl md:text-3xl font-bold mb-6">
              Editor&apos;s Pick
            </h2>
            <HorizontalScroll seeMoreLink="/editors-pick">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} variant="horizontal" />
              ))}
            </HorizontalScroll>
          </section>
        )}

        {/* In Case You Missed It */}
        {missedPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-black text-xl md:text-3xl font-bold mb-8">
              In Case You Missed It
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {missedPosts.map((post) => (
                <BlogCard key={post.id} post={post} variant="grid" />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/all-news"
                className="inline-block bg-primary hover:text-secondary cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </section>
        )}

        {recentPosts.length === 0 &&
          featuredPosts.length === 0 &&
          missedPosts.length === 0 && (
            <div className="text-center text-gray-500 py-24">
              No posts published yet. Check back soon.
            </div>
          )}
      </div>
    </div>
  );
}
