"use client"

import * as React from "react"
import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageHeading } from "@/components/layout/page-heading"
import { FilterSidebar } from "@/components/app/filter-sidebar"
import { SortDropdown } from "@/components/app/sort-dropdown"
import { CompanyCard } from "@/components/app/company-card"
import { CompanyCardSkeleton } from "@/components/app/company-card.skeleton"
import { Pagination } from "@/components/app/pagination"
import { FilterChip } from "@/components/app/filter-chip"
import { EmptySearchState } from "@/components/app/empty-state"
import { useUrlState } from "@/lib/filters/urlState"
import { searchCompanies, mockFilterOptions } from "@/lib/data/mock"
import { Company } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ApiCompany {
  id: string
  name: string
  slug: string
  description: string
  website: string
  location: string
  average_rating: number
  total_reviews: number
  services: string[]
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  industries?: {
    name: string
  }
  company_media?: Array<{
    media_url: string
    media_type: string
  }>
}

interface ApiResponse {
  companies: ApiCompany[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

function CompaniesPageContent() {
  const { filters, removeArrayFilter, removeFilter, clearAllFilters, updateFilter } = useUrlState()
  const [companies, setCompanies] = React.useState<Company[]>([])
  const [loading, setLoading] = React.useState(true)
  const [totalResults, setTotalResults] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)
  const [usingMockData, setUsingMockData] = React.useState(false)

  // Convert API company to our Company type
  const convertApiCompany = (apiCompany: ApiCompany): Company => {
    return {
      id: apiCompany.id,
      slug: apiCompany.slug,
      name: apiCompany.name,
      logoUrl: apiCompany.company_media?.find(m => m.media_type === 'logo')?.media_url || 
               `https://ui-avatars.com/api/?name=${encodeURIComponent(apiCompany.name)}&background=random`,
      verified: apiCompany.is_verified,
      rating: apiCompany.average_rating || 0,
      reviewCount: apiCompany.total_reviews || 0,
      services: apiCompany.services || [],
      industries: apiCompany.industries ? [apiCompany.industries.name] : [],
      location: apiCompany.location,
      hourlyRate: '$100-200', // Default since not in API
      description: apiCompany.description,
      website: apiCompany.website,
      foundedYear: new Date(apiCompany.created_at).getFullYear(),
      employeeCount: '10-50', // Default since not in API
      headquarters: apiCompany.location,
      socialLinks: {
        linkedin: '',
        twitter: '',
      },
      createdAt: apiCompany.created_at,
      updatedAt: apiCompany.updated_at,
    }
  }

  // Fetch companies from API with fallback to mock data
  const fetchCompanies = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Try to fetch from companies API first
      const searchParams = new URLSearchParams()
      if (filters.query) searchParams.set('q', filters.query)
      if (filters.services?.length) searchParams.set('services', filters.services.join(','))
      if (filters.industries?.length) searchParams.set('industries', filters.industries.join(','))
      if (filters.countries?.length) searchParams.set('countries', filters.countries.join(','))
      if (filters.ratingMin) searchParams.set('ratingMin', filters.ratingMin.toString())
      if (filters.ratingMax) searchParams.set('ratingMax', filters.ratingMax.toString())
      if (filters.verified !== undefined) searchParams.set('verified', filters.verified.toString())
      if (filters.sort) searchParams.set('sort', filters.sort)
      searchParams.set('limit', (filters.limit || 12).toString())
      searchParams.set('page', (filters.page || 1).toString())
      
      const response = await fetch(`/api/companies?${searchParams.toString()}`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.companies?.length > 0) {
          // Apply text search filter if query is provided
          let filteredCompanies = data.companies
          if (filters.query && filters.query.trim()) {
            const query = filters.query.toLowerCase()
            filteredCompanies = data.companies.filter((company: any) =>
              company.name.toLowerCase().includes(query) ||
              company.description?.toLowerCase().includes(query) ||
              company.industries?.some((industry: string) => industry.toLowerCase().includes(query)) ||
              company.services?.some((service: string) => service.toLowerCase().includes(query))
            )
          }
          
          setCompanies(filteredCompanies)
          setTotalResults(data.pagination?.total || filteredCompanies.length)
          setUsingMockData(false)
          setError(null)
          setLoading(false)
          return
        }
      }
      
      // Fallback to mock data if API fails
      console.log('API failed, using mock data for companies')
      const results = searchCompanies(filters.query || "", {
        services: filters.services || [],
        industries: filters.industries || [],
        countries: filters.countries || [],
        ratingMin: filters.ratingMin,
        ratingMax: filters.ratingMax,
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
        verified: filters.verified,
        foundedYearMin: filters.foundedYearMin,
        foundedYearMax: filters.foundedYearMax,
        employeeCount: filters.employeeCount || [],
      })

      // Apply sorting
      const sortedResults = [...results].sort((a, b) => {
        const sortField = filters.sort?.split('_')[0] || 'rating'
        const sortOrder = filters.sort?.includes('_desc') ? 'desc' : 'asc'
        
        let aValue: any = a[sortField as keyof Company]
        let bValue: any = b[sortField as keyof Company]
        
        if (sortField === 'reviews') {
          aValue = a.reviewCount
          bValue = b.reviewCount
        }
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }
        
        if (sortOrder === 'desc') {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        }
      })

      // Apply pagination
      const startIndex = ((filters.page || 1) - 1) * (filters.limit || 12)
      const endIndex = startIndex + (filters.limit || 12)
      const paginatedResults = sortedResults.slice(startIndex, endIndex)

      setCompanies(paginatedResults)
      setTotalResults(sortedResults.length)
      setUsingMockData(true)
      setError('Using sample data for demonstration.')
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Fetch companies when filters change
  React.useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  const totalPages = Math.ceil(totalResults / (filters.limit || 12))

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    updateFilter('page', page)
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    updateFilter('limit', itemsPerPage)
    updateFilter('page', 1) // Reset to first page
  }

  const getActiveFilters = () => {
    const activeFilters = []
    
    if (filters.services?.length) {
      filters.services.forEach(service => {
        activeFilters.push({ type: 'services', label: service, value: service })
      })
    }
    
    if (filters.industries?.length) {
      filters.industries.forEach(industry => {
        activeFilters.push({ type: 'industries', label: industry, value: industry })
      })
    }
    
    if (filters.countries?.length) {
      filters.countries.forEach(country => {
        activeFilters.push({ type: 'countries', label: country, value: country })
      })
    }
    
    if (filters.employeeCount?.length) {
      filters.employeeCount.forEach(count => {
        activeFilters.push({ type: 'employeeCount', label: `${count} employees`, value: count })
      })
    }
    
    if (filters.verified) {
      activeFilters.push({ type: 'verified', label: 'Verified only', value: 'verified' })
    }
    
    if (filters.ratingMin && filters.ratingMin > 1) {
      activeFilters.push({ type: 'ratingMin', label: `Min ${filters.ratingMin} stars`, value: filters.ratingMin.toString() })
    }
    
    if (filters.ratingMax && filters.ratingMax < 5) {
      activeFilters.push({ type: 'ratingMax', label: `Max ${filters.ratingMax} stars`, value: filters.ratingMax.toString() })
    }
    
    if (filters.priceMin && filters.priceMin > 50) {
      activeFilters.push({ type: 'priceMin', label: `Min $${filters.priceMin}/hr`, value: filters.priceMin.toString() })
    }
    
    if (filters.priceMax && filters.priceMax < 500) {
      activeFilters.push({ type: 'priceMax', label: `Max $${filters.priceMax}/hr`, value: filters.priceMax.toString() })
    }
    
    return activeFilters
  }

  const activeFilters = getActiveFilters()

  return (
    <div className="min-h-screen">
      <Section className="border-b">
        <Container>
          <PageHeading
            title={filters.query ? `Search Results for "${filters.query}"` : "B2B Service Providers"}
            description={filters.query 
              ? `Found ${totalResults} companies matching "${filters.query}"`
              : "Discover and compare the best B2B service providers. Find the perfect partner for your business needs."
            }
          />
          {filters.query && (
            <div className="mt-4">
              <button
                onClick={() => updateFilter('query', '')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to all companies
              </button>
            </div>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Filters and Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {loading ? 'Loading...' : `${totalResults} companies found`}
                  </span>
                  <SortDropdown />
                </div>
              </div>

              {/* Mock Data Warning */}
              {usingMockData && (
                <div className="mb-6 p-4 bg-blue-100 border border-blue-400 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-800 font-medium">Using Sample Data</div>
                    <button
                      onClick={fetchCompanies}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Refresh
                    </button>
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    Showing sample companies for demonstration. All filtering and search functionality is working.
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && !usingMockData && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="text-destructive font-medium">Error loading companies</div>
                    <button
                      onClick={fetchCompanies}
                      className="text-sm text-destructive hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                  <div className="text-sm text-destructive/80 mt-1">{error}</div>
                </div>
              )}

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Active filters:</span>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter, index) => (
                      <FilterChip
                        key={`${filter.type}-${index}`}
                        label={filter.label}
                        value={filter.value}
                        onRemove={(value) => {
                          if (filter.type === 'services' || filter.type === 'industries' || filter.type === 'countries' || filter.type === 'employeeCount') {
                            removeArrayFilter(filter.type, value)
                          } else {
                            removeFilter(filter.type as any)
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <CompanyCardSkeleton key={index} />
                  ))}
                </div>
              ) : companies.length === 0 ? (
                <EmptySearchState onClearFilters={clearAllFilters} />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {companies.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={filters.page || 1}
                      totalPages={totalPages}
                      totalItems={totalResults}
                      itemsPerPage={filters.limit || 12}
                      onPageChange={handlePageChange}
                      onItemsPerPageChange={handleItemsPerPageChange}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default function CompaniesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Section className="py-12 md:py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              <div className="space-y-6">
                <div className="h-96 animate-pulse bg-muted rounded-lg" />
              </div>
              <div className="space-y-6">
                <div className="h-12 animate-pulse bg-muted rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <CompanyCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    }>
      <CompaniesPageContent />
    </Suspense>
  )
}