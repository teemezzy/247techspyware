import React, { ReactNode } from 'react'

type AdminProp = {
    children: ReactNode
}

export default function layout({children}: AdminProp) {
  return (
    <div>
        <main>
            <div>
                {children}
            </div>
        </main>
    </div>
  )
}
