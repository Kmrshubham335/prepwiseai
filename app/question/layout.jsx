import Header from '../dashboard/_components/Header.jsx'
import React from 'react'
function QuestionLayout({children}) {
  return (
    <div>
      <Header/>
      <div className='mx-5 md:mx-20 lg:mx-36'>
        {children}
      </div>
    </div>
  )
}

export default QuestionLayout