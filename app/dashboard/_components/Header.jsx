'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const path = usePathname()
  useEffect(() => {
    console.log(path)
  }, [path])

  return (
    <div className='flex items-center justify-between m-3 p-3 shadow-lg rounded-full bg-blue-900 text-white'>
      <Link href="/" aria-label="Home">
        <Image src='/logo.svg' width={100} height={100} alt='logo' />
      </Link>
      <ul className='flex gap-6'>
        <li className={`hover:text-blue-400 hover:font-bold cursor-pointer 
          ${path == '/dashboard' && 'font-extrabold text-red-500'}
          `}
        >
          <Link href="/dashboard" aria-label="Dashboard">Dashboard</Link>
        </li>
        <li className={`hover:text-blue-400 hover:font-bold cursor-pointer
        ${path == '/question' && 'font-extrabold text-red-500'}
        `}
        >
          <Link href="/question" aria-label="Questions">Resources</Link>
        </li>
        <li className={`hover:text-blue-400 hover:font-bold cursor-pointer
          ${path == '/upgrade' && 'font-extrabold text-red-500'}
          `}
        >
          {/* <Link href="/upgrade" aria-label="Upgrade">Upgrade</Link>
        </li>
        <li className={`hover:text-blue-400 hover:font-bold cursor-pointer
          ${path == '/howitworks' && 'font-extrabold text-red-500'}
          `}
        > */}
          <Link href="/howitworks" aria-label="How it works">Frequently Ask Question</Link>
        </li>
      </ul>
      <UserButton />
    </div>
  )
}
