"use client"

import { usePathname } from 'next/navigation'
import { AppHeader } from './app-header'

export function ConditionalHeader() {
  const pathname = usePathname()
  
  // Pages where we want to show the header
  const showHeaderPages = [
    '/',
    '/companies',
    '/compare',
    '/auth/signin',
    '/auth/register'
  ]
  
  // Don't show conditional header on review pages (they have their own minimal headers)
  if (pathname.startsWith('/write-review')) {
    return null
  }
  
  // Check if current path should show header
  const shouldShowHeader = showHeaderPages.some(page => {
    if (page === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(page)
  })
  
  // Don't show header on dashboard and organization pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/organization')) {
    return null
  }
  
  // Show header for other pages
  if (shouldShowHeader) {
    return <AppHeader />
  }
  
  // Default: don't show header
  return null
}
