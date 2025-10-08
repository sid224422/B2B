"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { getStarRating, getRatingColor } from "@/lib/utils/rating"

interface StarsProps {
  rating: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4", 
  lg: "h-5 w-5"
}

export function Stars({ 
  rating, 
  size = "md", 
  showValue = false, 
  interactive = false,
  onRatingChange,
  className 
}: StarsProps) {
  const { fullStars, halfStar, emptyStars } = getStarRating(rating)
  const [hoverRating, setHoverRating] = React.useState<number | null>(null)
  
  const displayRating = hoverRating ?? rating
  const { fullStars: displayFullStars, halfStar: displayHalfStar, emptyStars: displayEmptyStars } = getStarRating(displayRating)

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  const handleMouseEnter = (starRating: number) => {
    if (interactive) {
      setHoverRating(starRating)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null)
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: displayFullStars }, (_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              "fill-current text-yellow-400",
              interactive && "cursor-pointer hover:scale-110 transition-transform"
            )}
            onClick={() => handleStarClick(i + 1)}
            onMouseEnter={() => handleMouseEnter(i + 1)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
        {displayHalfStar && (
          <div className="relative">
            <Star
              className={cn(
                sizeClasses[size],
                "text-gray-300"
              )}
            />
            <Star
              className={cn(
                sizeClasses[size],
                "absolute top-0 left-0 fill-current text-yellow-400",
                "clip-path-[polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)]"
              )}
            />
          </div>
        )}
        {Array.from({ length: displayEmptyStars }, (_, i) => (
          <Star
            key={i + displayFullStars + (displayHalfStar ? 1 : 0)}
            className={cn(
              sizeClasses[size],
              "text-gray-300",
              interactive && "cursor-pointer hover:scale-110 transition-transform"
            )}
            onClick={() => handleStarClick(displayFullStars + (displayHalfStar ? 1 : 0) + i + 1)}
            onMouseEnter={() => handleMouseEnter(displayFullStars + (displayHalfStar ? 1 : 0) + i + 1)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      {showValue && (
        <span className={cn("text-sm font-medium", getRatingColor(rating))}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
