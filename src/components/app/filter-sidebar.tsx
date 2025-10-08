"use client"

import * as React from "react"
import { Check, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useUrlState } from "@/lib/filters/urlState"
import { mockFilterOptions } from "@/lib/data/mock"
import { cn } from "@/lib/utils"

interface FilterSidebarProps {
  className?: string
}

export function FilterSidebar({ className }: FilterSidebarProps) {
  const { 
    filters, 
    updateFilters, 
    addArrayFilter, 
    removeArrayFilter, 
    toggleArrayFilter,
    clearAllFilters 
  } = useUrlState()

  // Use completely isolated local state for sliders
  const [ratingRange, setRatingRange] = React.useState([1, 5])
  const [priceRange, setPriceRange] = React.useState([50, 500])
  
  // Initialize sliders from URL when filters change
  React.useEffect(() => {
    if (filters.ratingMin !== undefined && filters.ratingMax !== undefined) {
      setRatingRange([filters.ratingMin, filters.ratingMax])
    } else {
      setRatingRange([1, 5])
    }
    if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
      setPriceRange([filters.priceMin, filters.priceMax])
    } else {
      setPriceRange([50, 500])
    }
  }, [filters.ratingMin, filters.ratingMax, filters.priceMin, filters.priceMax])

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (debouncedRatingUpdate.current) {
        clearTimeout(debouncedRatingUpdate.current)
      }
      if (debouncedPriceUpdate.current) {
        clearTimeout(debouncedPriceUpdate.current)
      }
    }
  }, [])

  // Store update function in ref to avoid dependency issues
  const updateFiltersRef = React.useRef(updateFilters)
  updateFiltersRef.current = updateFilters

  // Debounced update functions
  const debouncedRatingUpdate = React.useRef<NodeJS.Timeout | null>(null)
  const debouncedPriceUpdate = React.useRef<NodeJS.Timeout | null>(null)

  const handleRatingChange = React.useCallback((value: number[]) => {
    setRatingRange(value)
    
    // Clear previous timeout
    if (debouncedRatingUpdate.current) {
      clearTimeout(debouncedRatingUpdate.current)
    }
    
    // Set new timeout
    debouncedRatingUpdate.current = setTimeout(() => {
      updateFiltersRef.current({
        ratingMin: value[0],
        ratingMax: value[1]
      })
    }, 300)
  }, [])

  const handlePriceChange = React.useCallback((value: number[]) => {
    setPriceRange(value)
    
    // Clear previous timeout
    if (debouncedPriceUpdate.current) {
      clearTimeout(debouncedPriceUpdate.current)
    }
    
    // Set new timeout
    debouncedPriceUpdate.current = setTimeout(() => {
      updateFiltersRef.current({
        priceMin: value[0],
        priceMax: value[1]
      })
    }, 300)
  }, [])

  const handleServiceToggle = React.useCallback((service: string) => {
    toggleArrayFilter('services', service)
  }, [toggleArrayFilter])

  const handleIndustryToggle = React.useCallback((industry: string) => {
    toggleArrayFilter('industries', industry)
  }, [toggleArrayFilter])

  const handleCountryToggle = React.useCallback((country: string) => {
    toggleArrayFilter('countries', country)
  }, [toggleArrayFilter])

  const handleEmployeeCountToggle = React.useCallback((count: string) => {
    toggleArrayFilter('employeeCount', count)
  }, [toggleArrayFilter])

  const handleVerifiedToggle = React.useCallback((checked: boolean) => {
    updateFilters({ verified: checked })
  }, [updateFilters])

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
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{activeFiltersCount}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // Reset local slider state immediately
                setRatingRange([1, 5])
                setPriceRange([50, 500])
                // Clear URL filters
                clearAllFilters()
              }}
              className="h-8 px-2"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["rating", "services", "industries"]} className="space-y-4">
        {/* Rating Filter */}
        <AccordionItem value="rating" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">Rating</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Rating Range: {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)} stars
              </Label>
              <div className="px-2">
                <Slider
                  value={ratingRange}
                  onValueChange={(value) => {
                    setRatingRange(value)
                    handleRatingChange(value)
                  }}
                  min={1}
                  max={5}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 star</span>
                <span>5 stars</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Services Filter */}
        <AccordionItem value="services" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">Services</AccordionTrigger>
          <AccordionContent className="space-y-2 max-h-48 overflow-y-auto">
            {mockFilterOptions.services.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${service}`}
                  checked={filters.services?.includes(service) || false}
                  onCheckedChange={() => handleServiceToggle(service)}
                />
                <Label
                  htmlFor={`service-${service}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {service}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Industries Filter */}
        <AccordionItem value="industries" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">Industries</AccordionTrigger>
          <AccordionContent className="space-y-2 max-h-48 overflow-y-auto">
            {mockFilterOptions.industries.map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={`industry-${industry}`}
                  checked={filters.industries?.includes(industry) || false}
                  onCheckedChange={() => handleIndustryToggle(industry)}
                />
                <Label
                  htmlFor={`industry-${industry}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {industry}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Countries Filter */}
        <AccordionItem value="countries" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">Countries</AccordionTrigger>
          <AccordionContent className="space-y-2 max-h-48 overflow-y-auto">
            {mockFilterOptions.countries.map((country) => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox
                  id={`country-${country}`}
                  checked={filters.countries?.includes(country) || false}
                  onCheckedChange={() => handleCountryToggle(country)}
                />
                <Label
                  htmlFor={`country-${country}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {country}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">Price Range</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Hourly Rate: ${priceRange[0]} - ${priceRange[1]}
              </Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value)
                    handlePriceChange(value)
                  }}
                  min={50}
                  max={500}
                  step={10}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$50/hr</span>
                <span>$500/hr</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Employee Count Filter */}
        <AccordionItem value="employees" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">Company Size</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {mockFilterOptions.employeeCount.map((count) => (
              <div key={count} className="flex items-center space-x-2">
                <Checkbox
                  id={`employee-${count}`}
                  checked={filters.employeeCount?.includes(count) || false}
                  onCheckedChange={() => handleEmployeeCountToggle(count)}
                />
                <Label
                  htmlFor={`employee-${count}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {count} employees
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Verified Filter */}
        <AccordionItem value="verified" className="border rounded-lg px-4">
          <AccordionTrigger className="py-4">Verification</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="verified"
                checked={filters.verified || false}
                onCheckedChange={handleVerifiedToggle}
              />
              <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">
                Verified companies only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
