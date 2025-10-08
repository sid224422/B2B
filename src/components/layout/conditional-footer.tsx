"use client"

import { usePathname } from 'next/navigation'
import { AppFooter } from './app-footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  
  // Don't show footer on dashboard and organization pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/organization')) {
    return null
  }
  
  // Show footer for other pages
  return <AppFooter />
}
