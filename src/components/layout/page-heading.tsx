import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  actions?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "text-2xl sm:text-3xl",
  md: "text-3xl sm:text-4xl",
  lg: "text-4xl sm:text-5xl"
}

export function PageHeading({ 
  title,
  description,
  actions,
  size = "md",
  className,
  ...props 
}: PageHeadingProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className={cn("font-bold tracking-tight", sizeClasses[size])}>
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
