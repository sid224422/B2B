"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUrlState } from "@/lib/filters/urlState"
import { mockSortOptions } from "@/lib/data/mock"

interface SortDropdownProps {
  className?: string
}

export function SortDropdown({ className }: SortDropdownProps) {
  const { filters, setFilter } = useUrlState()

  const handleSortChange = React.useCallback((value: string) => {
    setFilter('sort', value)
  }, [setFilter])

  const currentSort = React.useMemo(() => 
    mockSortOptions.find(option => option.value === filters.sort) || mockSortOptions[0],
    [filters.sort]
  )

  return (
    <div className={className}>
      <Select value={filters.sort || 'rating_desc'} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[200px]">
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4" />
            <SelectValue placeholder="Sort by">
              {currentSort.label}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent>
          {mockSortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
