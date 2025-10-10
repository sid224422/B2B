'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  fallbackUrl?: string
  className?: string
  children?: React.ReactNode
}

export function BackButton({ 
  fallbackUrl = '/', 
  className = '',
  children = 'Back'
}: BackButtonProps) {
  const router = useRouter()

  const handleBackClick = () => {
    // Try to go back in browser history
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to specified URL or home
      router.push(fallbackUrl)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBackClick}
      className={`group hover:bg-primary/10 hover:text-primary transition-all duration-300 ${className}`}
    >
      <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
      {children}
    </Button>
  )
}
