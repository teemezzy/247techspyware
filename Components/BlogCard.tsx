// components/BlogCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Stories } from '@/Constants/Stories'

interface StoriesProps {
  post: Stories
  variant?: 'horizontal' | 'grid'
}

// Explicit colour overrides for known categories. Anything not listed falls
// through to a deterministic hash-based colour so every category renders with
// the same shade every time.
const categoryColors: Record<string, string> = {
  TECHNOLOGY: 'bg-blue-500',
  SOFTWARE: 'bg-purple-500',
  HARDWARE: 'bg-orange-500',
  MOBILE: 'bg-pink-500',
  AI: 'bg-green-500',
  AUTOMOTIVE: 'bg-red-500',
  SPACE: 'bg-indigo-500',
  GAMING: 'bg-yellow-500',
  ENTERTAINMENT: 'bg-rose-500',
  'SOCIAL MEDIA': 'bg-cyan-500',
  AVIATION: 'bg-teal-500',
  ECOMMERCE: 'bg-amber-500',
  BUSINESS: 'bg-emerald-500',
  LIFESTYLE: 'bg-fuchsia-500',
  SPORTS: 'bg-sky-500',
  HEALTH: 'bg-lime-500',
  SCIENCE: 'bg-violet-500',
}

const fallbackPalette = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-green-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-teal-500',
  'bg-amber-500',
  'bg-emerald-500',
]

function colorForCategory(category: string): string {
  const upper = (category ?? '').toUpperCase().trim()
  if (categoryColors[upper]) return categoryColors[upper]
  // Stable hash so the same category always picks the same color.
  let hash = 0
  for (let i = 0; i < upper.length; i++) {
    hash = (hash * 31 + upper.charCodeAt(i)) >>> 0
  }
  return fallbackPalette[hash % fallbackPalette.length]
}

const BlogCard = ({ post, variant = 'horizontal' }: StoriesProps) => {
  const badgeBg = colorForCategory(post.category)

  if (variant === 'horizontal') {
    return (
      // The Link is just a hit target. Visual hover effects live on the inner
      // card so they only fire when the cursor is on the white card itself.
      <Link
        href={`/blog/${post.slug}`}
        className="block min-w-[280px] lg:shrink-0"
      >
        <div className="group/card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
          <div className="relative h-[120px] md:h-[220px] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover/card:scale-105 transition-transform duration-300"
            />
            <span className={`absolute top-4 left-4 ${badgeBg} flex items-center justify-center text-white text-[8px] md:text-xs font-semibold px-1 md:px-3 py-1 rounded-full`}>
              {post.category}
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-semibold md:font-bold text-base md:text-lg text-black mb-2 line-clamp-2 group-hover/card:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 hidden md:block">
              {post.excerpt}
            </p>
            <div className="items-center justify-between text-xs text-gray-500 hidden md:flex">
              <span>By {post.author}</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid variant
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <div className="group/card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
        <div className="relative h-[100px] md:h-[200px] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover/card:scale-105 transition-transform duration-300"
          />
          <span className={`absolute top-4 left-4 ${badgeBg} text-white text-[8px] md:text-xs font-semibold px-1 md:px-3 py-1 rounded-full`}>
            {post.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-semibold md:font-bold text-base md:text-lg text-black mb-2 line-clamp-2 group-hover/card:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 hidden md:block">
            {post.excerpt}
          </p>
          <div className="items-center justify-between text-xs text-gray-500 hidden md:flex">
            <span>By {post.author}</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
