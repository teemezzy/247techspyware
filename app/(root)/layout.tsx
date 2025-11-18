import React, { ReactNode } from 'react'
import Home from './page'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'

type HomeProps = {
    children: ReactNode
}

export default function layout({children}: HomeProps) {
  return (
    <div>
        <Header/>

        {children}

        <Footer/>
    </div>
    
  )
}
