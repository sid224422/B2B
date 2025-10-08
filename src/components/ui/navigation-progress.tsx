"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function NavigationProgress() {
  const pathname = usePathname()
  const progress = useMotionValue(0)
  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const opacity = useTransform(scaleX, [0, 0.1, 1], [0, 1, 1])

  useEffect(() => {
    // Start progress animation
    progress.set(0)
    const timer = setTimeout(() => {
      progress.set(1)
    }, 100)

    return () => {
      clearTimeout(timer)
      progress.set(0)
    }
  }, [pathname, progress])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary"
      style={{
        scaleX,
        opacity,
        transformOrigin: "0%"
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={{ scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  )
}
