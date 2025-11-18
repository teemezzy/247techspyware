// app/blog/page.tsx
"use client"
import React, { useState } from 'react'
import BlogCard from '@/Components/BlogCard'
import { getAllPostsSorted } from '@/Constants/Stories'

export default function BlogPage() {
  const { latest, earliest } = getAllPostsSorted()
  const [latestPage, setLatestPage] = useState(1)
  const [earliestPage, setEarliestPage] = useState(1)
  const postsPerPage = 5

  const latestPaginated = latest.slice(0, latestPage * postsPerPage)
  const earliestPaginated = earliest.slice(0, earliestPage * postsPerPage)
  
  const hasMoreLatest = latestPaginated.length < latest.length
  const hasMoreEarliest = earliestPaginated.length < earliest.length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-12">
        
        {/* Latest Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestPaginated.map(post => (
              <BlogCard key={post.id} post={post} variant="grid" />
            ))}
          </div>
          
          {hasMoreLatest && (
            <div className="text-center">
              <button
                onClick={() => setLatestPage(prev => prev + 1)}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Load More Latest
              </button>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="border-t border-gray-300 my-12"></div>

        {/* Earliest Section */}
        <section>
          <h2 className="text-4xl font-bold mb-8">From The Archives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {earliestPaginated.map(post => (
              <BlogCard key={post.id} post={post} variant="grid" />
            ))}
          </div>
          
          {hasMoreEarliest && (
            <div className="text-center">
              <button
                onClick={() => setEarliestPage(prev => prev + 1)}
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Load More From Archives
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}