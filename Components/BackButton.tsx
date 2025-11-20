// Components/BackButton.tsx
"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-primary hover:text-secondary font-semibold mb-6 transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
  )
}

export default BackButton