"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Users, Calendar, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Stars } from "@/components/ui/stars"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Company } from "@/lib/types"
import { useCompareStore } from "@/lib/store/compare"
import { cn } from "@/lib/utils"

interface CompareTableProps {
  className?: string
}

export function CompareTable({ className }: CompareTableProps) {
  const { selectedCompanies, removeCompany } = useCompareStore()

  if (selectedCompanies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No companies selected for comparison
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add companies to compare their features, pricing, and reviews.
        </p>
        <Link href="/companies">
          <Button>Browse Companies</Button>
        </Link>
      </div>
    )
  }

  const comparisonSections = [
    {
      title: "Overview",
      content: (company: Company) => (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-muted flex items-center justify-center overflow-hidden">
              {company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-cover"
                />
              ) : (
                <span className="text-sm font-medium">
                  {company.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <Link 
                href={`/companies/${company.slug}`}
                className="font-semibold hover:text-brand transition-colors cursor-pointer"
              >
                {company.name}
              </Link>
              {company.verified && (
                <Badge variant="secondary" className="text-xs">
                  <Check className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
          {company.description && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {company.description}
            </p>
          )}
        </div>
      )
    },
    {
      title: "Rating & Reviews",
      content: (company: Company) => (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Stars rating={company.rating} size="md" showValue />
            <span className="text-sm text-muted-foreground">
              ({company.reviewCount} reviews)
            </span>
          </div>
        </div>
      )
    },
    {
      title: "Services",
      content: (company: Company) => (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {company.services.map((service) => (
              <Badge key={service} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Industries",
      content: (company: Company) => (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {company.industries.map((industry) => (
              <Badge key={industry} variant="secondary" className="text-xs">
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Location & Size",
      content: (company: Company) => (
        <div className="space-y-2">
          {company.location && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{company.location}</span>
            </div>
          )}
          {company.employeeCount && (
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{company.employeeCount} employees</span>
            </div>
          )}
          {company.foundedYear && (
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Founded {company.foundedYear}</span>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Pricing",
      content: (company: Company) => (
        <div className="space-y-2">
          {company.hourlyRate && (
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{company.hourlyRate}/hour</span>
            </div>
          )}
        </div>
      )
    }
  ]

  return (
    <div className={cn("space-y-6", className)}>
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold w-48">Features</th>
                {selectedCompanies.map((company) => (
                  <th key={company.id} className="text-center p-4 min-w-[200px]">
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/companies/${company.slug}`}
                        className="font-semibold truncate hover:text-brand transition-colors cursor-pointer"
                      >
                        {company.name}
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeCompany(company.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonSections.map((section, index) => (
                <tr key={section.title} className="border-b">
                  <td className="p-4 font-medium bg-muted/50">
                    {section.title}
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="p-4">
                      {section.content(company)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Accordion View */}
      <div className="lg:hidden space-y-4">
        {comparisonSections.map((section) => (
          <Card key={section.title}>
            <Accordion type="single" collapsible>
              <AccordionItem value={section.title}>
                <AccordionTrigger className="px-6 py-4">
                  <CardTitle className="text-base">{section.title}</CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-4">
                    {selectedCompanies.map((company) => (
                      <div key={company.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Link 
                            href={`/companies/${company.slug}`}
                            className="font-semibold hover:text-brand transition-colors cursor-pointer"
                          >
                            {company.name}
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => removeCompany(company.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        {section.content(company)}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  )
}
