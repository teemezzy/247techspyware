// app/(root)/blog/[id]/page.tsx
// The dynamic segment is named [id] for legacy reasons but we resolve posts by
// slug now. BlogCard / HeroNewsSlider link with the slug.
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { mapPostToStory } from "@/Constants/Stories";
import BackButton from "@/Components/BackButton";
import NewsletterJoin from "@/Components/NewsletterJoin";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slug = decodeURIComponent(id);

  let post;
  try {
    const apiPost = await api.getPostBySlug(slug);
    post = mapPostToStory(apiPost);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  const categoryColors: Record<string, string> = {
    TECHNOLOGY: "bg-blue-500",
    SOFTWARE: "bg-purple-500",
    HARDWARE: "bg-orange-500",
    MOBILE: "bg-pink-500",
    AI: "bg-green-500",
    AUTOMOTIVE: "bg-red-500",
    SPACE: "bg-indigo-500",
    GAMING: "bg-yellow-500",
    ENTERTAINMENT: "bg-rose-500",
    "SOCIAL MEDIA": "bg-cyan-500",
    AVIATION: "bg-teal-500",
    ECOMMERCE: "bg-amber-500",
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Image Section with Overlay Banner */}
      <div className="relative w-full h-[500px] bg-gray-900 mb-12">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-90"
            priority
          />
        )}

        {/* Join Our Club — opens a modal where readers can subscribe */}
        <NewsletterJoin />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackButton />

        <article className="bg-white rounded-lg shadow-md p-8 lg:p-12">
          <h1 className="text-4xl text-black font-bold mb-6 leading-tight uppercase">
            {post.title}
          </h1>

          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold">Written by {post.author}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <span
              className={`${
                categoryColors[post.category] || "bg-gray-500"
              } text-white text-xs font-semibold px-4 py-2 rounded-full uppercase`}
            >
              {post.category}
            </span>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
