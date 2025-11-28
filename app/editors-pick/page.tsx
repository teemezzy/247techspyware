// app/editors-pick/page.tsx
"use client"
import React, { useState } from 'react'
import BlogCard from '@/Components/BlogCard'
import { getFeaturedPosts } from '@/Constants/Stories'
import BackButton from '@/Components/BackButton'

export default function EditorsPickPage() {
  const allFeaturedPosts = getFeaturedPosts(100) // Get all featured posts
  const [page, setPage] = useState(1)
  const postsPerPage = 9

  const paginatedPosts = allFeaturedPosts.slice(0, page * postsPerPage)
  const hasMore = paginatedPosts.length < allFeaturedPosts.length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-12">
        
        {/* Back Button */}
        <BackButton />

        {/* Editor's Pick Section */}
        <section className="mb-16">
          <h2 className="text-black text-4xl font-bold mb-8">Editor's Pick</h2>
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