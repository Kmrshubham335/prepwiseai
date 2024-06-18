import Header from './_components/Header'
import React from 'react'
function DashBoardLayout({children}) {
  return (
    <div>
      <Header/>
        {children}
    </div>
  )
}

export default DashBoardLayout