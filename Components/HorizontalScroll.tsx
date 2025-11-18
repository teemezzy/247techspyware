// components/HorizontalScroll.tsx
"use client"
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HorizontalScrollProps {
  children: React.ReactNode
  seeMoreLink: string
}

const HorizontalScroll = ({ children, seeMoreLink }: HorizontalScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    
    // Show left arrow if not at start
    setShowLeftArrow(scrollLeft > 10)
    
    // Show right arrow if not at end (with 10px tolerance)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Check initial state
    checkScrollPosition()

    // Add scroll listener
    container.addEventListener('scroll', checkScrollPosition)
    
    // Add resize listener to recalculate on window resize
    window.addEventListener('resize', checkScrollPosition)

    return () => {
      container.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 400 // Adjust scroll distance
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
        
        {/* See More Card */}
        <Link 
          href={seeMoreLink}
          className="min-w-[300px] h-[400px] flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 rounded-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
        >
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-2">See More</h3>
            <p className="text-white/90">Explore all articles →</p>
          </div>
        </Link>
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      )}
    </div>
  )
}

export default HorizontalScroll