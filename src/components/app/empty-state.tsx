import * as React from "react"
import { Search, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 text-center",
      className
    )}>
      <div className="mb-4">
        {icon || (
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
        {secondaryAction && (
          <Button variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  )
}

// Predefined empty states
export function EmptySearchState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <EmptyState
      icon={<Search className="h-12 w-12 text-muted-foreground" />}
      title="No companies found"
      description="Try adjusting your search criteria or filters to find more companies."
      action={{
        label: "Clear Filters",
        onClick: onClearFilters
      }}
    />
  )
}

export function EmptyCompareState() {
  return (
    <EmptyState
      icon={<Filter className="h-12 w-12 text-muted-foreground" />}
      title="No companies selected"
      description="Add companies to compare their features, pricing, and reviews."
      action={{
        label: "Browse Companies",
        onClick: () => window.location.href = "/companies"
      }}
    />
  )
}

export function EmptyReviewsState() {
  return (
    <EmptyState
      icon={<Plus className="h-12 w-12 text-muted-foreground" />}
      title="No reviews yet"
      description="Be the first to share your experience with this company."
      action={{
        label: "Write a Review",
        onClick: () => window.location.href = "/write-review"
      }}
    />
  )
}
