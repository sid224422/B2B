"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Stars } from "@/components/ui/stars"
import { Review } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ReviewCardProps {
  review: Review
  onHelpful?: (reviewId: string) => void
  isHelpful?: boolean
  showFullContent?: boolean
  className?: string
}

export function ReviewCard({
  review,
  onHelpful,
  isHelpful = false,
  showFullContent = false,
  className
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(showFullContent)
  const [helpfulCount, setHelpfulCount] = React.useState(review.helpfulCount)

  const handleHelpful = () => {
    if (onHelpful) {
      onHelpful(review.id)
      setHelpfulCount(prev => isHelpful ? prev - 1 : prev + 1)
    }
  }

  const shouldTruncate = review.content.length > 200 && !isExpanded

  return (
    <Card className={cn("group hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt={review.reviewerName || "Anonymous"} />
              <AvatarFallback>
                {review.reviewerName ? review.reviewerName.charAt(0).toUpperCase() : "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-sm">
                  {review.reviewerName || "Anonymous"}
                </h4>
                {review.isVerified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              {review.reviewerTitle && review.reviewerCompany && (
                <p className="text-xs text-muted-foreground">
                  {review.reviewerTitle} at {review.reviewerCompany}
                </p>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Rating */}
        <div className="flex items-center space-x-4">
          <Stars rating={review.rating} size="sm" showValue />
          <div className="text-sm text-muted-foreground">
            Overall Rating
          </div>
        </div>

        {/* Detailed Ratings */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Communication</span>
            <Stars rating={review.comms} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Quality</span>
            <Stars rating={review.quality} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Timeline</span>
            <Stars rating={review.timeline} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Value</span>
            <Stars rating={review.value} size="sm" />
          </div>
        </div>

        {/* Project Details */}
        {(review.budget || review.duration || review.projectType) && (
          <div className="flex flex-wrap gap-2">
            {review.projectType && (
              <Badge variant="outline" className="text-xs">
                {review.projectType}
              </Badge>
            )}
            {review.budget && (
              <Badge variant="outline" className="text-xs">
                {review.budget}
              </Badge>
            )}
            {review.duration && (
              <Badge variant="outline" className="text-xs">
                {review.duration}
              </Badge>
            )}
          </div>
        )}

        {/* Review Title */}
        <h5 className="font-semibold text-base">
          {review.title}
        </h5>

        {/* Review Content */}
        <div className="space-y-2">
          <p className={cn(
            "text-sm text-muted-foreground leading-relaxed",
            shouldTruncate && "line-clamp-3"
          )}>
            {review.content}
          </p>
          
          {shouldTruncate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 px-0 text-xs"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Read More
                </>
              )}
            </Button>
          )}
        </div>

        {/* Helpful Button */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHelpful}
            className={cn(
              "h-8 px-3 text-xs",
              isHelpful && "text-brand"
            )}
          >
            <ThumbsUp className="h-3 w-3 mr-1" />
            Helpful ({helpfulCount})
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
