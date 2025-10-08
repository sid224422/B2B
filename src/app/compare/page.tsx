"use client"

import * as React from "react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageHeading } from "@/components/layout/page-heading"
import { CompareTable } from "@/components/app/compare-table"
import { EmptyCompareState } from "@/components/app/empty-state"
import { useCompareStore } from "@/lib/store/compare"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComparePage() {
  const { selectedCompanies, clearAll } = useCompareStore()

  return (
    <div className="min-h-screen">
      <Section className="border-b">
        <Container>
          <div className="flex items-center justify-between">
            <PageHeading
              title="Compare Companies"
              description="Compare features, pricing, and reviews of selected companies side by side."
            />
            <div className="flex items-center space-x-4">
              {selectedCompanies.length > 0 && (
                <Button variant="outline" onClick={clearAll}>
                  Clear All
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/companies">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Companies
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {selectedCompanies.length === 0 ? (
            <EmptyCompareState />
          ) : (
            <CompareTable />
          )}
        </Container>
      </Section>
    </div>
  )
}