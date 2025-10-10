'use client'

import * as React from "react"
import { Star } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface RatingSliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
  showStars?: boolean
  showLabels?: boolean
  disabled?: boolean
}

export function RatingSlider({
  value,
  onValueChange,
  min = 1,
  max = 5,
  step = 0.1,
  className,
  showStars = true,
  showLabels = true,
  disabled = false
}: RatingSliderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  const handleValueChange = (newValue: number[]) => {
    onValueChange(newValue)
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

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }, (_, i) => (
          <Star
            key={i}
            className={cn(
              size === "sm" ? "h-3 w-3" : "h-4 w-4",
              "fill-current text-yellow-400"
            )}
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star
              className={cn(
                size === "sm" ? "h-3 w-3" : "h-4 w-4",
                "text-gray-300"
              )}
            />
            <Star
              className={cn(
                size === "sm" ? "h-3 w-3" : "h-4 w-4",
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
              size === "sm" ? "h-3 w-3" : "h-4 w-4",
              "text-gray-300"
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Rating Display */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {showStars && (
            <div className="flex items-center gap-2">
              {renderStars(value[0], "md")}
              <span className="text-muted-foreground">-</span>
              {renderStars(value[1], "md")}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <Label className="text-sm font-medium truncate">
              {value[0].toFixed(1)} - {value[1].toFixed(1)} stars
            </Label>
            {showLabels && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={cn("truncate", getRatingColor(value[0]))}>
                  {getRatingLabel(value[0])}
                </span>
                <span>-</span>
                <span className={cn("truncate", getRatingColor(value[1]))}>
                  {getRatingLabel(value[1])}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Quick Preset Buttons */}
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => onValueChange([4, 5])}
            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors whitespace-nowrap"
            disabled={disabled}
          >
            4+ Stars
          </button>
          <button
            type="button"
            onClick={() => onValueChange([3, 5])}
            className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors whitespace-nowrap"
            disabled={disabled}
          >
            3+ Stars
          </button>
          <button
            type="button"
            onClick={() => onValueChange([1, 5])}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors whitespace-nowrap"
            disabled={disabled}
          >
            All
          </button>
        </div>
      </div>

      {/* Enhanced Slider */}
      <div className="px-2">
        <Slider
          value={value}
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

      {/* Slider Labels */}
      <div className="flex justify-between text-xs text-muted-foreground px-2">
        <div className="flex flex-col items-center gap-1">
          <span>{min} star</span>
          {showStars && renderStars(min, "sm")}
        </div>
        <div className="flex flex-col items-center gap-1">
          <span>{max} stars</span>
          {showStars && renderStars(max, "sm")}
        </div>
      </div>

      {/* Value Indicators */}
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-muted-foreground">Min: {value[0].toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary/70"></div>
          <span className="text-muted-foreground">Max: {value[1].toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}
