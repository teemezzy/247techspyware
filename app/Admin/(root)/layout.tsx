"use client"

import SideBar from '@/Components/SideBar'
import React, { ReactNode, useState } from 'react'
import Dashboard from './[section]/Dashboard'
import Posts from './[section]/Posts'
import Categories from './[section]/Categories'
import Comments from './[section]/Comments'
import Users from './[section]/Users'
import Settings from './[section]/settings'

type AdminProp = {
    children: ReactNode
}

export default function layout({children}: AdminProp) {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="flex">
      <SideBar activeView={activeView} setActiveView={setActiveView} />

      <div className='flex-1 bg-secondary justify-center w-full mx-auto'>
        <div className="flex-1 p-20 items-center">
          {activeView === "dashboard" && <div><Dashboard/></div>} 
          {activeView === "posts" && <div><Posts/></div>} 
          {activeView === "categories" && <div><Categories/></div>} 
          {activeView === "comments" && <div><Comments/></div>} 
          {activeView === "users" && <div><Users/></div>} 
          {activeView === "settings" && <div><Settings/></div>}
        </div>
      </div>

      
    </div>
  );
}
