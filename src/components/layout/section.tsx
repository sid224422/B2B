"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg" | "xl"
  background?: "default" | "muted" | "accent"
}

const sizeClasses = {
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16", 
  lg: "py-16 sm:py-20",
  xl: "py-20 sm:py-24"
}

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
  accent: "bg-accent/5"
}

export function Section({ 
  className, 
  size = "md",
  background = "default",
  ...props 
}: SectionProps) {
  return (
    <section
      className={cn(
        sizeClasses[size],
        backgroundClasses[background],
        className
      )}
      {...props}
    />
  )
}
