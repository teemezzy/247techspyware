import React, { ReactNode } from 'react'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'

type HomeProps = {
    children: ReactNode
}

export default function layout({ children }: HomeProps) {
  return (
    <div>
        <Header />
        <main className='pt-22 md:pt-26'>
          {children}
        </main>
        <Footer />
    </div>
  )
}
