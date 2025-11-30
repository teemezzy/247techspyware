"use client"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Header = () => {
    const pathname = usePathname()
    
  return (
    <div>
        <header className='fixed top-0 left-0 w-full z-50 bg-white'>
            <div className='flex items-center justify-center py-4 px-10 md:px-20'>
                <div className='py-4'>
                    <Link
                        href="/"
                    >
                        <Image
                            src="/247techspywarelandscape.png"
                            alt='headerlogo'
                            width={250}
                            height={250}
                            className='hidden md:block'
                        />

                        <Image
                            src="/247techspywarelandscape.png"
                            alt='headerlogo'
                            width={150}
                            height={150}
                            className='md:hidden sm:block'
                        />

                    </Link>
                </div>

                <div className='ml-auto space-x-2'>
                    <Link
                        href="/"
                        className={`px-5 py-3
                            ${pathname === "/" ? "bg-primary text-white hover:text-secondary" : "text-secondary hover:bg-secondary hover:text-primary"}
                        `}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`px-5 py-3 
                            ${pathname === "/about" ? "bg-primary text-white hover:text-secondary" : "text-secondary hover:bg-secondary hover:text-primary"}
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