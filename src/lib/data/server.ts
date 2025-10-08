import { Company } from '../types'

// Server-side data fetching functions that directly query the database
export async function getTopRatedCompanies(limit: number = 6): Promise<Company[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceKey) {
    throw new Error('Missing Supabase credentials')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/companies?select=*&order=avg_rating.desc&limit=${limit}`, {
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch companies')
  }

  const companies = await response.json()
  return companies.map(transformApiCompany)
}

export async function getLatestCompanies(limit: number = 6): Promise<Company[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceKey) {
    throw new Error('Missing Supabase credentials')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/companies?select=*&order=created_at.desc&limit=${limit}`, {
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch companies')
  }

  const companies = await response.json()
  return companies.map(transformApiCompany)
}

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
