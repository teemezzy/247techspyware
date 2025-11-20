// app/blog/[id]/page.tsx
import React from 'react'
import Image from 'next/image'
import { stories } from '@/Constants/Stories'
import { notFound } from 'next/navigation'
import BackButton from '@/Components/BackButton'

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = stories.find(p => p.id === parseInt(id))

  if (!post) {
    notFound()
  }

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section with Overlay Banner */}
      <div className="relative w-full h-[500px] bg-gray-900 mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-90"
          priority
        />
        
        {/* Join Our Club - Overlapping Banner */}
        <div className="absolute -bottom-12 right-8 lg:right-20 xl:right-40 w-80 bg-primary rounded-lg shadow-xl p-6 text-white z-10">
          <h3 className="text-2xl font-bold mb-4 uppercase">Join Our Club</h3>
          <p className="mb-6 text-white/90">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, iciendis.
          </p>
          <button className="w-full bg-[#2a2a2a] hover:bg-black text-white font-semibold py-3 rounded transition-colors">
            Join Now
          </button>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        
        {/* Back Button */}
        <BackButton />

        <article className="bg-white rounded-lg shadow-md p-8 lg:p-12">
          {/* Title */}
          <h1 className="text-4xl text-black font-bold mb-6 leading-tight uppercase">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold">Written by {post.author}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <span className={`${categoryColors[post.category] || 'bg-gray-500'} text-white text-xs font-semibold px-4 py-2 rounded-full uppercase`}>
              {post.category}
            </span>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return stories.map((post) => ({
    id: post.id.toString(),
  }))
}