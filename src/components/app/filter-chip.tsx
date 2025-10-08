import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FilterChipProps {
  label: string
  value: string
  onRemove: (value: string) => void
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}

export function FilterChip({
  label,
  value,
  onRemove,
  variant = "secondary",
  className
}: FilterChipProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 text-sm font-medium cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors",
        className
      )}
      onClick={() => onRemove(value)}
    >
      <span>{label}</span>
      <X className="h-3 w-3" />
    </Badge>
  )
}
