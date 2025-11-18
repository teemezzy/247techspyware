"use client"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Header = () => {
    const pathname = usePathname()
    
  return (
    <div>
        <header className='bg-white sticky'>
            <div className='flex items-center justify-center py-4 px-40'>
                <div className='py-4'>
                    <Image
                        src="/247techspywarelandscape.png"
                        alt='headerlogo'
                        width={250}
                        height={250}
                    />
                </div>

                <div className='ml-auto space-x-2'>
                    <Link
                        href="/"
                        className={`px-5 py-3
                            ${pathname === "/" ? "bg-primary text-white" : "text-secondary"}
                        `}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`px-4 py-2 
                            ${pathname === "/about" ? "bg-primary text-white" : "text-secondary"}
                        `}
                    >
                        About
                    </Link>
                    
                </div>
                
            </div>

        </header>
    </div>
  )
}

export default Header