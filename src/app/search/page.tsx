"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageHeading } from "@/components/layout/page-heading"
import { CompanyCard } from "@/components/app/company-card"
import { CompanyCardSkeleton } from "@/components/app/company-card.skeleton"
import { EmptySearchState } from "@/components/app/empty-state"
import { useSearch } from "@/hooks/useSearch"
import { Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/ui/back-button"

function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const { search, loading, results, error, totalResults } = useSearch()

  // Force search on mount and when query changes
  React.useEffect(() => {
    if (query) {
      search(query, 'hybrid')
    }
  }, [query]) // Remove search from dependencies to avoid infinite loop

  const exactResults = results.filter(r => r.type === 'exact')
  const aiResults = results.filter(r => r.type === 'ai')
  const fuzzyResults = results.filter(r => r.type === 'fuzzy')
  const semanticResults = results.filter(r => r.type === 'semantic')


  return (
    <div className="min-h-screen">
      <Section className="border-b">
        <Container>
          {/* Back Button */}
          <div className="mb-4">
            <BackButton fallbackUrl="/" />
          </div>

          <PageHeading
            title={`Search Results for "${query}"`}
            description={`Found ${totalResults} companies`}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CompanyCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">Search Error: {error}</div>
              <button
                onClick={() => search(query, 'hybrid')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          ) : results.length === 0 ? (
            <EmptySearchState onClearFilters={() => window.location.href = '/companies'} />
          ) : (
            <div className="space-y-8">
              {/* AI Results */}
              {aiResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold">AI-Powered Matches</h2>
                    <Badge variant="secondary">{aiResults.length} results</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aiResults.map((result) => (
                      <div key={result.company.id} className="relative">
                        <CompanyCard company={result.company} />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            AI {Math.round((result.relevanceScore || 0) * 100)}%
                          </Badge>
                        </div>
                        {result.aiContext && (
                          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                            <strong>AI Context:</strong> {result.aiContext.substring(0, 100)}...
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exact Results */}
              {exactResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-green-600" />
                    <h2 className="text-xl font-semibold">Exact Matches</h2>
                    <Badge variant="secondary">{exactResults.length} results</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exactResults.map((result) => (
                      <div key={result.company.id} className="relative">
                        <CompanyCard company={result.company} />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-100 text-green-800">
                            Exact {Math.round((result.relevanceScore || 0) * 100)}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fuzzy Results */}
              {fuzzyResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <h2 className="text-xl font-semibold">Fuzzy Matches</h2>
                    <Badge variant="secondary">{fuzzyResults.length} results</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fuzzyResults.map((result) => (
                      <div key={result.company.id} className="relative">
                        <CompanyCard company={result.company} />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Fuzzy {Math.round((result.relevanceScore || 0) * 100)}%
                          </Badge>
                        </div>
                        {result.matchType && (
                          <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                            <strong>Match:</strong> {result.matchType}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Semantic Results */}
              {semanticResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="h-5 w-5 text-purple-600" />
                    <h2 className="text-xl font-semibold">Semantic Matches</h2>
                    <Badge variant="secondary">{semanticResults.length} results</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {semanticResults.map((result) => (
                      <CompanyCard key={result.company.id} company={result.company} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <Section className="border-b">
          <Container>
            <div className="mb-4">
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-64 bg-muted animate-pulse rounded" />
              <div className="h-4 w-48 bg-muted animate-pulse rounded" />
            </div>
          </Container>
        </Section>
        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CompanyCardSkeleton key={i} />
              ))}
            </div>
          </Container>
        </Section>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}
