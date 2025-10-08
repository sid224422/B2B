"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCompareStore } from "@/lib/store/compare"
import { Company } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CompareStickyBarProps {
  className?: string
}

export function CompareStickyBar({ className }: CompareStickyBarProps) {
  const { selectedCompanies, removeCompany, clearAll } = useCompareStore()

  if (selectedCompanies.length === 0) {
    return null
  }

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Selected Companies */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              Comparing:
            </span>
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              {selectedCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2 min-w-0"
                >
                  <div className="h-6 w-6 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                    {company.logoUrl ? (
                      <Image
                        src={company.logoUrl}
                        alt={company.name}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium">
                        {company.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {company.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeCompany(company.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
            <Link href="/compare">
              <Button className="flex items-center space-x-2">
                <span>Compare ({selectedCompanies.length})</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
