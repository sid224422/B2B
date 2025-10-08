import { Company } from '../types'

// API base URL - use relative URLs for same-origin requests
const API_BASE = ''

// Transform API company data to our Company type
function transformApiCompany(apiCompany: any): Company {
  return {
    id: apiCompany.id,
    slug: apiCompany.slug,
    name: apiCompany.name,
    logoUrl: apiCompany.logo_url,
    verified: apiCompany.is_verified,
    rating: apiCompany.avg_rating || 0,
    reviewCount: apiCompany.review_count || 0,
    services: apiCompany.services || [],
    industries: apiCompany.industry ? [apiCompany.industry] : [],
    location: apiCompany.location,
    hourlyRate: undefined, // Not in our current schema
    description: apiCompany.description,
    website: apiCompany.website,
    foundedYear: apiCompany.founded_year,
    employeeCount: apiCompany.employee_count?.toString(),
    headquarters: apiCompany.location,
    socialLinks: undefined, // Not in our current schema
    createdAt: apiCompany.created_at,
    updatedAt: apiCompany.updated_at
  }
}

// Fetch companies from API
export async function fetchCompanies(params: {
  page?: number
  limit?: number
  search?: string
  industry?: string
  location?: string
  minRating?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
} = {}): Promise<{ companies: Company[]; pagination: any }> {
  const searchParams = new URLSearchParams()
  
  if (params.page) searchParams.set('page', params.page.toString())
  if (params.limit) searchParams.set('limit', params.limit.toString())
  if (params.search) searchParams.set('search', params.search)
  if (params.industry) searchParams.set('industry', params.industry)
  if (params.location) searchParams.set('location', params.location)
  if (params.minRating) searchParams.set('minRating', params.minRating.toString())
  if (params.sortBy) searchParams.set('sortBy', params.sortBy)
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder)

  const response = await fetch(`${API_BASE}/api/companies?${searchParams.toString()}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch companies')
  }
  
  const data = await response.json()
  
  return {
    companies: data.companies.map(transformApiCompany),
    pagination: data.pagination
  }
}

// Fetch top rated companies
export async function fetchTopRatedCompanies(limit: number = 6): Promise<Company[]> {
  const { companies } = await fetchCompanies({
    limit,
    sortBy: 'rating',
    sortOrder: 'desc'
  })
  return companies
}

// Fetch latest companies
export async function fetchLatestCompanies(limit: number = 6): Promise<Company[]> {
  const { companies } = await fetchCompanies({
    limit,
    sortBy: 'created_at',
    sortOrder: 'desc'
  })
  return companies
}

// Fetch company by slug
export async function fetchCompanyBySlug(slug: string): Promise<Company | null> {
  const response = await fetch(`${API_BASE}/api/companies/${slug}`)
  
  if (!response.ok) {
    if (response.status === 404) return null
    throw new Error('Failed to fetch company')
  }
  
  const data = await response.json()
  return transformApiCompany(data)
}

// Fetch companies by search
export async function searchCompanies(query: string, filters: any = {}): Promise<Company[]> {
  const { companies } = await fetchCompanies({
    search: query,
    ...filters
  })
  return companies
}
