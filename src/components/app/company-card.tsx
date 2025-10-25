"use client"

import * as React from "react"
import Image from "next/image"
import { MapPin, Clock, Star, Plus, Check } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Stars } from "@/components/ui/stars"
import { Company } from "@/lib/types"
import { useCompareStore } from "@/lib/store/compare"
import { useHydration } from "@/hooks/use-hydration"
import { cn } from "@/lib/utils"

interface CompanyCardProps {
  company: Company
  onAddToCompare?: (company: Company) => void
  onRemoveFromCompare?: (company: Company) => void
  isInCompare?: boolean
  showCompareButton?: boolean
  className?: string
}

export function CompanyCard({
  company,
  onAddToCompare,
  onRemoveFromCompare,
  isInCompare = false,
  showCompareButton = true,
  className
}: CompanyCardProps) {
  const isHydrated = useHydration()
  const { addCompany, removeCompany, isInCompare: storeIsInCompare, canAddMore } = useCompareStore()
  
  const inCompare = isHydrated ? (isInCompare || storeIsInCompare(company.id)) : isInCompare
  const canAdd = isHydrated ? (canAddMore() || inCompare) : true

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (inCompare) {
      removeCompany(company.id)
      onRemoveFromCompare?.(company)
    } else {
      addCompany(company)
      onAddToCompare?.(company)
    }
  }

  const handleCardClick = () => {
    window.location.href = `/companies/${company.slug}`
  }

  return (
    <Card 
      className={cn(
        "group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col",
        className
      )}
      data-testid="company-card"
      onClick={handleCardClick}
    >
      <div className="block flex-1 flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start space-x-3 mb-4 flex-shrink-0">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
              {company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  width={48}
                  height={48}
                  className="h-10 w-10 sm:h-12 sm:w-12 object-cover"
                />
              ) : (
                <span className="text-sm sm:text-lg font-bold text-muted-foreground">
                  {company.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start space-x-2 mb-1">
                <h3 className="font-semibold text-base sm:text-lg truncate flex-1 min-w-0" data-testid="company-name">
                  {company.name}
                </h3>
                {company.verified && (
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    <Check className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Stars rating={company.rating} size="sm" showValue data-testid="company-rating" />
                  <span>({company.reviewCount})</span>
                </div>
                {company.location && (
                  <div className="flex items-center space-x-1 min-w-0 flex-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{company.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-4 flex-shrink-0">
            <div className="flex flex-wrap gap-1">
              {company.services.slice(0, 2).map((service) => (
                <Badge key={service} variant="outline" className="text-xs max-w-[calc(50%-4px)]">
                  <span className="truncate block">{service}</span>
                </Badge>
              ))}
              {company.services.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{company.services.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          {company.description && (
            <p className="text-sm text-muted-foreground mb-4 truncate-2 flex-1 min-h-0">
              {company.description}
            </p>
          )}

          {/* Footer Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground flex-shrink-0 mt-auto">
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              {company.hourlyRate && (
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Clock className="h-3 w-3" />
                  <span className="truncate">{company.hourlyRate}/hr</span>
                </div>
              )}
              {company.employeeCount && (
                <span className="truncate">{company.employeeCount} employees</span>
              )}
            </div>
          </div>
        </CardContent>
      </div>

      {/* Compare Button */}
      {showCompareButton && (
        <CardFooter className="p-6 pt-0 flex-shrink-0">
          <Button
            variant={inCompare ? "default" : "outline"}
            size="sm"
            className="w-full"
            onClick={handleCompareToggle}
            disabled={isHydrated ? (!canAdd && !inCompare) : false}
            data-testid="add-to-compare"
          >
            {inCompare ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                In Compare
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add to Compare
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
