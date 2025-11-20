import React, { ReactNode } from 'react'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import { getRecentPosts } from '@/Constants/Stories'
import HeroNewsSlider from '@/Components/HeroNewsSlider'

type HomeProps = {
    children: ReactNode
}

export default function layout({children}: HomeProps) {
  const recentPosts = getRecentPosts(5)
  return (
    <div>
        <Header/>

        <main className='pt-32'>
          <HeroNewsSlider posts={recentPosts} />
          {children}
        </main>

        <Footer/>
    </div>
    
  )
}
