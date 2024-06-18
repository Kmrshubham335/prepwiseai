'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Header() {
  const path = usePathname()
  useEffect(()=>{
    console.log(path)
  },[])
  return (
    <div className='flex items-center justify-between m-3 p-3 shadow-lg rounded-full ' style={{ backgroundColor: '#001F3F', color: '#FFFFFF' }}>
      <Image  src={'/logo.svg'} width={100} height={100} alt='logo' />
      <ul className='flex gap-6'>
        <li className={`hover:text-blue-400 hover:font-bold  cursor-pointer 
          ${path=='/dashboard' && ' font-extrabold text-red-500'}
          `}
          >
          DashBoard
          </li>
        <li className={`hover:text-blue-400 hover:font-bold cursor-pointer
        ${path=='/question' && 'font-extrabold text-red-500'}
        `}
        
        >Questions</li>
        <li className={`hover:text-blue-400 hover:font-bold cursor-pointer
          ${path == '/upgrade' && 'font-extrabold text-red-500'}
          `}>Upgrade</li>
        <li className={`hover:text-blue-400 cursor-pointer hover:font-bold 
          ${path == '/howitworks'&& 'font-extrabold text-red-500'}
          `}>How it works</li>
      </ul>
      <UserButton/>
    </div>
  )
}