"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

interface AdvancedPageTransitionProps {
  children: ReactNode
}

// Different transition styles for different navigation patterns
const transitionStyles = {
  // Smooth slide with blur effect (anime-like)
  slideBlur: {
    initial: {
      opacity: 0,
      x: 50,
      scale: 0.95,
      filter: "blur(8px)"
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)"
    },
    out: {
      opacity: 0,
      x: -50,
      scale: 1.05,
      filter: "blur(8px)"
    }
  },
  
  // Fade with scale (gentle)
  fadeScale: {
    initial: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    out: {
      opacity: 0,
      scale: 1.1,
      y: -20
    }
  },
  
  // Slide up with rotation (dynamic)
  slideUp: {
    initial: {
      opacity: 0,
      y: 100,
      rotateX: 15
    },
    in: {
      opacity: 1,
      y: 0,
      rotateX: 0
    },
    out: {
      opacity: 0,
      y: -100,
      rotateX: -15
    }
  }
}

// Anime-like easing curves
const easingCurves = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bouncy: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  snappy: [0.4, 0, 0.2, 1]
}

// Loading spinner component
const LoadingSpinner = () => (
  <motion.div
    className="flex flex-col items-center space-y-4"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.2 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <motion.div
      className="relative w-12 h-12"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute inset-0 border-4 border-primary/20 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
    <motion.p
      className="text-sm text-muted-foreground font-medium"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      Loading...
    </motion.p>
  </motion.div>
)

export function AdvancedPageTransition({ children }: AdvancedPageTransitionProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [transitionStyle, setTransitionStyle] = useState<keyof typeof transitionStyles>('slideBlur')

  // Determine transition style based on navigation pattern
  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    
    // Different transitions for different sections
    if (pathSegments.includes('categories')) {
      setTransitionStyle('slideUp')
    } else if (pathSegments.includes('companies') || pathSegments.includes('compare')) {
      setTransitionStyle('fadeScale')
    } else {
      setTransitionStyle('slideBlur')
    }
  }, [pathname])

  useEffect(() => {
    setIsLoading(true)
    
    // Simulate loading time for smoother transition
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname])

  const currentVariants = transitionStyles[transitionStyle]
  const currentEasing = easingCurves.smooth

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Loading overlay with backdrop blur */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content with advanced transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={currentVariants}
          transition={{
            type: "tween",
            ease: currentEasing,
            duration: 0.7
          }}
          className="w-full"
          style={{
            backgroundColor: 'hsl(var(--background))',
            minHeight: '100vh',
            transformOrigin: 'center center'
          }}
        >
          {/* Content wrapper with additional smooth effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Background gradient overlay for depth */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 70%)'
        }}
      />
    </div>
  )
}
