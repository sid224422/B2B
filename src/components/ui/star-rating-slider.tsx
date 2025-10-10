'use client'

import * as React from "react"
import { Star } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface StarRatingSliderProps {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
  showValue?: boolean
  showLabel?: boolean
  disabled?: boolean
  label?: string
}

export function StarRatingSlider({
  value,
  onValueChange,
  min = 1,
  max = 5,
  step = 0.5,
  className,
  showValue = true,
  showLabel = true,
  disabled = false,
  label = "Rating"
}: StarRatingSliderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  const handleValueChange = (newValue: number[]) => {
    onValueChange(newValue[0])
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 3.5) return "text-yellow-600"
    if (rating >= 2.5) return "text-orange-600"
    return "text-red-600"
  }

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return "Excellent"
    if (rating >= 3.5) return "Good"
    if (rating >= 2.5) return "Average"
    if (rating >= 1.5) return "Poor"
    return "Very Poor"
  }

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5"
    }

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }, (_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              "fill-current text-yellow-400"
            )}
          />
        ))}
        {hasHalfStar && (
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
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star
            key={i + fullStars + (hasHalfStar ? 1 : 0)}
            className={cn(
              sizeClasses[size],
              "text-gray-300"
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Label and Value Display */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {showLabel && (
          <Label className="text-sm font-medium truncate">{label}</Label>
        )}
        {showValue && (
          <div className="flex items-center gap-2 min-w-0">
            <span className={cn("text-sm font-semibold whitespace-nowrap", getRatingColor(value))}>
              {value.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {getRatingLabel(value)}
            </span>
          </div>
        )}
      </div>

      {/* Stars Display */}
      <div className="flex items-center justify-center">
        {renderStars(value, "lg")}
      </div>

      {/* Enhanced Slider */}
      <div className="px-2">
        <Slider
          value={[value]}
          onValueChange={handleValueChange}
          onPointerDown={handleDragStart}
          onPointerUp={handleDragEnd}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            "w-full",
            isDragging && "cursor-grabbing"
          )}
        />
      </div>

      {/* Quick Rating Buttons */}
      <div className="flex justify-center gap-1 flex-wrap">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onValueChange(rating)}
            disabled={disabled}
            className={cn(
              "px-2 py-1 text-xs rounded-full transition-all duration-200 min-w-[2rem]",
              "hover:scale-105 active:scale-95",
              value >= rating
                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                : "bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {rating}
          </button>
        ))}
      </div>

      {/* Slider Labels */}
      <div className="flex justify-between text-xs text-muted-foreground px-2">
        <div className="flex flex-col items-center gap-1">
          <span>{min}</span>
          {renderStars(min, "sm")}
        </div>
        <div className="flex flex-col items-center gap-1">
          <span>{max}</span>
          {renderStars(max, "sm")}
        </div>
      </div>
    </div>
  )
}
