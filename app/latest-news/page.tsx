// app/latest-news/page.tsx
"use client"
import React, { useState } from 'react'
import BlogCard from '@/Components/BlogCard'
import { getRecentPosts } from '@/Constants/Stories'
import BackButton from '@/Components/BackButton'

export default function LatestNewsPage() {
  const allLatestPosts = getRecentPosts(100) // Get all posts sorted by date
  const [page, setPage] = useState(1)
  const postsPerPage = 9

  const paginatedPosts = allLatestPosts.slice(0, page * postsPerPage)
  const hasMore = paginatedPosts.length < allLatestPosts.length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-12">
        
        {/* Back Button */}
        <BackButton />

        {/* Latest News Section */}
        <section className="mb-16">
          <h2 className="text-black text-4xl font-bold mb-8">Latest News</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedPosts.map(post => (
              <BlogCard key={post.id} post={post} variant="grid" />
            ))}
          </div>
          
          {hasMore && (
            <div className="text-center">
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="bg-primary hover:text-secondary cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}