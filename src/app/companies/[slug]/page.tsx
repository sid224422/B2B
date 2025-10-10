"use client"

import * as React from "react"
import { notFound } from "next/navigation"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyHero } from "@/components/app/company-hero"
import { RatingBreakdown } from "@/components/app/rating-breakdown"
import { ReviewCard } from "@/components/app/review-card"
import { Pagination } from "@/components/app/pagination"
import { EmptyReviewsState } from "@/components/app/empty-state"
// Remove mock data imports - we'll fetch from API
import { Company, Review, CaseStudy } from "@/lib/types"

interface CompanyPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const [company, setCompany] = React.useState<Company | null>(null)
  const [reviews, setReviews] = React.useState<Review[]>([])
  const [caseStudies, setCaseStudies] = React.useState<CaseStudy[]>([])
  const [loading, setLoading] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [reviewsPerPage] = React.useState(6)
  const [slug, setSlug] = React.useState<string>('')

  // Unwrap params using React.use()
  React.useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params
        setSlug(resolvedParams.slug)
      } catch (error) {
        console.error('Error resolving params:', error)
        setLoading(false)
      }
    }
    unwrapParams()
  }, [params])

  React.useEffect(() => {
    if (!slug) return

    const fetchData = async () => {
      setLoading(true)
      
      try {
        // Fetch company data from API
        const response = await fetch(`/api/companies/${slug}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setLoading(false)
            return
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        const companyData = data.company

        if (!companyData) {
          setLoading(false)
          return
        }

        // Fetch reviews from API
        const reviewsResponse = await fetch(`/api/companies/${slug}/reviews`)
        const reviewsData = reviewsResponse.ok ? (await reviewsResponse.json()).reviews : []
        
        // For now, use empty array for case studies
        const caseStudiesData: CaseStudy[] = []

        setCompany(companyData)
        setReviews(reviewsData)
        setCaseStudies(caseStudiesData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching company data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Section>
          <Container>
            <div className="animate-pulse space-y-8">
              <div className="h-32 bg-muted rounded-lg"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  if (!company) {
    notFound()
  }

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  )

  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* Company Hero */}
      <CompanyHero company={company} />

      {/* Company Details */}
      <Section>
        <Container>
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies ({caseStudies.length})</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4">About {company.name}</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {company.description || "No description available for this company."}
                      </p>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {company.services.map((service) => (
                        <div key={service} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className="h-2 w-2 bg-brand rounded-full"></div>
                          <span className="font-medium">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Industries Served</h3>
                    <div className="flex flex-wrap gap-2">
                      {company.industries.map((industry) => (
                        <span
                          key={industry}
                          className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Rating Breakdown */}
                  <RatingBreakdown reviews={reviews} />

                  {/* Company Info */}
                  <div className="border rounded-lg p-6">
                    <h4 className="font-semibold mb-4">Company Information</h4>
                    <div className="space-y-3 text-sm">
                      {company.location && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="font-medium">{company.location}</span>
                        </div>
                      )}
                      {company.employeeCount && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size:</span>
                          <span className="font-medium">{company.employeeCount} employees</span>
                        </div>
                      )}
                      {company.foundedYear && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Founded:</span>
                          <span className="font-medium">{company.foundedYear}</span>
                        </div>
                      )}
                      {company.hourlyRate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hourly Rate:</span>
                          <span className="font-medium">{company.hourlyRate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-8">
              {reviews.length === 0 ? (
                <EmptyReviewsState />
              ) : (
                <>
                  <div className="space-y-6">
                    {paginatedReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={reviews.length}
                      itemsPerPage={reviewsPerPage}
                      onPageChange={handlePageChange}
                      onItemsPerPageChange={() => {}}
                    />
                  )}
                </>
              )}
            </TabsContent>

            {/* Case Studies Tab */}
            <TabsContent value="case-studies" className="space-y-8">
              {caseStudies.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    No case studies available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This company hasn't shared any case studies yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudies.map((caseStudy) => (
                    <div key={caseStudy.id} className="border rounded-lg p-6">
                      <h4 className="font-semibold text-lg mb-2">{caseStudy.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        {caseStudy.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {caseStudy.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {caseStudy.clientName && `Client: ${caseStudy.clientName} • `}
                        {caseStudy.budget && `Budget: ${caseStudy.budget} • `}
                        {caseStudy.duration && `Duration: ${caseStudy.duration}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Container>
      </Section>
    </div>
  )
}
