// app/page.tsx
"use client"

import React, { useEffect, useState } from 'react'
import HorizontalScroll from '@/Components/HorizontalScroll'
import BlogCard from '@/Components/BlogCard'
import { getRecentPosts, getFeaturedPosts, getMissedPosts } from '@/Constants/Stories'
import Link from 'next/link'
import HeroNewsSlider from '@/Components/HeroNewsSlider'

export default function Home() {
  const recentPosts = getRecentPosts(5)
  const featuredPosts = getFeaturedPosts(5)
  const allMissed = getMissedPosts()

  const [missedCount, setMissedCount] = useState(8)

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 768) {
        setMissedCount(14)   // md: and above
      } else {
        setMissedCount(8)    // mobile
      }
    }

    updateCount()
    window.addEventListener("resize", updateCount)
    return () => window.removeEventListener("resize", updateCount)
  }, [])

  const missedPosts = allMissed.slice(0, missedCount)

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroNewsSlider posts={recentPosts} />
      <div className="mx-auto px-10 md:px-20 py-12">
        
        {/* Recent News Section */}
        <section className="mb-16">
          <h2 className="text-black text-3xl font-bold mb-6">Recent News</h2>
          <HorizontalScroll seeMoreLink="/latest-news">
            {recentPosts.map(post => (
              <BlogCard key={post.id} post={post} variant="horizontal" />
            ))}
          </HorizontalScroll>
        </section>

        {/* Editor's Pick Section */}
        <section className="mb-16">
          <h2 className="text-black text-3xl font-bold mb-6">Editor's Pick</h2>
          <HorizontalScroll seeMoreLink="/editors-pick">
            {featuredPosts.map(post => (
              <BlogCard key={post.id} post={post} variant="horizontal" />
            ))}
          </HorizontalScroll>
        </section>

        {/* In Case You Missed It Section */}
        <section className="mb-16">
          <h2 className="text-black text-3xl font-bold mb-8">In Case You Missed It</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {missedPosts.map(post => (
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

      </div>
    </div>
  )
}