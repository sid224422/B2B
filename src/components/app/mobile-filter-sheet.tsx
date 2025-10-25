"use client"

import * as React from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FilterSidebar } from "@/components/app/filter-sidebar"
import { useUrlState } from "@/lib/filters/urlState"

interface MobileFilterSheetProps {
  children?: React.ReactNode
}

export function MobileFilterSheet({ children }: MobileFilterSheetProps) {
  const { filters } = useUrlState()
  const [open, setOpen] = React.useState(false)

  // Count active filters
  const activeFiltersCount = React.useMemo(() => {
    let count = 0
    
    // Count array filters
    count += filters.services?.length || 0
    count += filters.industries?.length || 0
    count += filters.countries?.length || 0
    count += filters.employeeCount?.length || 0
    
    // Count boolean filters
    if (filters.verified) count += 1
    
    // Count range filters only if they're different from defaults
    if (filters.ratingMin !== undefined && filters.ratingMax !== undefined) {
      if (filters.ratingMin !== 1 || filters.ratingMax !== 5) {
        count += 1
      }
    }
    
    if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
      if (filters.priceMin !== 50 || filters.priceMax !== 500) {
        count += 1
      }
    }
    
    return count
  }, [filters])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button 
            variant="outline" 
            className="w-full justify-between lg:hidden"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">Tap to filter</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {activeFiltersCount} active
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // Clear all filters logic would go here
                    setOpen(false)
                  }}
                  className="h-8 px-2"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </SheetHeader>
        <div className="mt-4 pb-6">
          <FilterSidebar />
        </div>
      </SheetContent>
    </Sheet>
  )
}
