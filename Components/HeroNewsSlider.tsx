// components/HeroNewsSlider.tsx
"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Stories } from '@/Constants/Stories'

interface HeroNewsSliderProps {
  posts: Stories[]
}

const HeroNewsSlider = ({ posts }: HeroNewsSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || posts.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused, posts.length])

  if (posts.length === 0) return null

  const currentPost = posts[currentIndex]

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
    ECOMMERCE: 'bg-amber-500'
  }

  return (
    <div 
      className="relative w-full h-[450px] md:h-[650px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentPost.image}
          alt={currentPost.title}
          fill
          className="object-cover transition-opacity duration-1000"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative h-full mx-auto px-10 md:px-20 flex items-center">
        <div className="max-w-3xl text-white">
          {/* Category Badge */}
          <span 
            className={`${categoryColors[currentPost.category] || 'bg-gray-500'} inline-block text-white text-sm font-bold px-4 py-2 rounded-full uppercase mb-4`}
          >
            {currentPost.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight uppercase">
            {currentPost.title}
          </h1>

          {/* Excerpt */}
          <p className="text-md md:text-md mb-6 text-gray-200 leading-relaxed">
            {currentPost.excerpt}
          </p>

          {/* Read More Button */}
          <Link
            href={`/blog/${currentPost.id}`}
            className="inline-block bg-primary hover:text-secondary text-white font-bold px-8 py-3 rounded transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroNewsSlider