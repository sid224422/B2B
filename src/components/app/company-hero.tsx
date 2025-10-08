"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Users, Calendar, Check, ExternalLink, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Stars } from "@/components/ui/stars"
import { Company } from "@/lib/types"
import { useCompareStore } from "@/lib/store/compare"
import { cn } from "@/lib/utils"

interface CompanyHeroProps {
  company: Company
  className?: string
}

export function CompanyHero({ company, className }: CompanyHeroProps) {
  const { addCompany, removeCompany, isInCompare, canAddMore } = useCompareStore()
  
  const inCompare = isInCompare(company.id)
  const canAdd = canAddMore() || inCompare

  const handleCompareToggle = () => {
    if (inCompare) {
      removeCompany(company.id)
    } else {
      addCompany(company)
    }
  }

  return (
    <div className={cn("bg-gradient-to-r from-background to-muted/20 border-b", className)}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Company Info */}
          <div className="flex-1">
            <div className="flex items-start space-x-4 mb-6">
              {/* Logo */}
              <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                {company.logoUrl ? (
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground">
                    {company.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Company Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{company.name}</h1>
                  {company.verified && (
                    <Badge variant="secondary" className="text-sm">
                      <Check className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Stars rating={company.rating} size="lg" showValue />
                    <span className="text-sm text-muted-foreground">
                      ({company.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Company Stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  {company.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{company.location}</span>
                    </div>
                  )}
                  {company.employeeCount && (
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{company.employeeCount} employees</span>
                    </div>
                  )}
                  {company.foundedYear && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Founded {company.foundedYear}</span>
                    </div>
                  )}
                  {company.hourlyRate && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{company.hourlyRate}/hour</span>
                    </div>
                  )}
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.services.slice(0, 6).map((service) => (
                    <Badge key={service} variant="outline">
                      {service}
                    </Badge>
                  ))}
                  {company.services.length > 6 && (
                    <Badge variant="outline">
                      +{company.services.length - 6} more
                    </Badge>
                  )}
                </div>

                {/* Description */}
                {company.description && (
                  <p className="text-muted-foreground max-w-2xl">
                    {company.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
            <Button
              variant={inCompare ? "default" : "outline"}
              className="flex items-center space-x-2"
              onClick={handleCompareToggle}
              disabled={!canAdd && !inCompare}
            >
              {inCompare ? (
                <>
                  <Minus className="h-4 w-4" />
                  <span>Remove from Compare</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Add to Compare</span>
                </>
              )}
            </Button>

            {company.website && (
              <Button variant="outline" asChild>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Visit Website</span>
                </a>
              </Button>
            )}

            <Button asChild>
              <Link href={`/write-review/${company.id}`}>
                Write a Review
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
