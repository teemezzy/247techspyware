// components/BlogCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Stories } from '@/Constants/Stories'

interface StoriesProps {
  post: Stories
  variant?: 'horizontal' | 'grid'
}

const BlogCard = ({ post, variant = 'horizontal' }: StoriesProps) => {
  const categoryColors: Record<string, string> = {
    TECHNOLOGY: 'bg-blue-500',
    SOFTWARE: 'bg-purple-500',
    HARDWARE: 'bg-orange-500',
    MOBILE: 'bg-pink-500',
    AI: 'bg-green-500',
    AUTOMOTIVE: 'bg-red-500', 
    SPACE: 'bg-indigo-500',
    GAMING: 'bg-yellow-500'
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/blog/${post.id}`} className="min-w-[350px] lg:shrink-0 group hover:text-primary hover:shadow-xl">
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
          <div className="relative h-[220px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className={`absolute top-4 left-4 ${categoryColors[post.category] || 'bg-gray-500'} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
              {post.category}
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-lg text-black mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
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
    <Link href={`/blog/${post.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
        <div className="relative h-[200px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className={`absolute top-4 left-4 ${categoryColors[post.category] || 'bg-gray-500'} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {post.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg text-black mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>By {post.author}</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard