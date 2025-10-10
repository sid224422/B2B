import { NextRequest, NextResponse } from 'next/server'
import { mockCompanies } from '@/lib/data/mock'
import { createServerClient } from '@/lib/supabase-server'

// GET /api/companies - Get all companies with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get filter parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const sort = searchParams.get('sort') || 'rating_desc'
    const query = searchParams.get('q') || ''
    const services = searchParams.get('services')?.split(',') || []
    const industries = searchParams.get('industries')?.split(',') || []
    const countries = searchParams.get('countries')?.split(',') || []
    const ratingMin = searchParams.get('ratingMin') ? parseFloat(searchParams.get('ratingMin')!) : undefined
    const ratingMax = searchParams.get('ratingMax') ? parseFloat(searchParams.get('ratingMax')!) : undefined
    const verified = searchParams.get('verified') === 'true' ? true : searchParams.get('verified') === 'false' ? false : undefined

    // Try to fetch from database first
    const supabase = createServerClient()
    
    try {
      // Build the query
      let dbQuery = supabase
        .from('companies')
        .select(`
          id,
          name,
          slug,
          description,
          website,
          location,
          avg_rating,
          review_count,
          is_verified,
          is_active,
          services,
          created_at,
          updated_at
        `)
        .eq('is_active', true)

      // Apply filters
      if (query.trim()) {
        const searchTerm = query.toLowerCase().trim()
        dbQuery = dbQuery.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      }

      if (ratingMin !== undefined) {
        dbQuery = dbQuery.gte('avg_rating', ratingMin)
      }

      if (ratingMax !== undefined) {
        dbQuery = dbQuery.lte('avg_rating', ratingMax)
      }

      if (verified !== undefined) {
        dbQuery = dbQuery.eq('is_verified', verified)
      }

      // Apply sorting
      switch (sort) {
        case 'rating_desc':
          dbQuery = dbQuery.order('avg_rating', { ascending: false })
          break
        case 'rating_asc':
          dbQuery = dbQuery.order('avg_rating', { ascending: true })
          break
        case 'name_asc':
          dbQuery = dbQuery.order('name', { ascending: true })
          break
        case 'name_desc':
          dbQuery = dbQuery.order('name', { ascending: false })
          break
        case 'newest':
          dbQuery = dbQuery.order('created_at', { ascending: false })
          break
        case 'oldest':
          dbQuery = dbQuery.order('created_at', { ascending: true })
          break
        case 'reviews_desc':
          dbQuery = dbQuery.order('review_count', { ascending: false })
          break
        case 'reviews_asc':
          dbQuery = dbQuery.order('review_count', { ascending: true })
          break
        default:
          dbQuery = dbQuery.order('avg_rating', { ascending: false })
      }

      const { data: dbCompanies, error: dbError } = await dbQuery

      if (!dbError && dbCompanies && dbCompanies.length > 0) {
        // Convert database companies to our format
        const convertedCompanies = dbCompanies.map((company: any) => ({
          id: company.id,
          slug: company.slug,
          name: company.name,
          logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random`,
          verified: company.is_verified,
          rating: company.avg_rating || 0,
          reviewCount: company.review_count || 0,
          services: company.services || [],
          industries: ['Technology'], // Default industry since we're not joining
          location: company.location,
          hourlyRate: '$100-200', // Default
          description: company.description,
          website: company.website,
          foundedYear: new Date(company.created_at).getFullYear(),
          employeeCount: '10-50', // Default
          headquarters: company.location,
          socialLinks: {
            linkedin: '',
            twitter: '',
          },
          createdAt: company.created_at,
          updatedAt: company.updated_at,
        }))

        // Apply additional filters that can't be done in the database query
        let filteredCompanies = [...convertedCompanies]

        if (services.length > 0) {
          filteredCompanies = filteredCompanies.filter(company =>
            services.some(service => 
              company.services?.some((companyService: string) => 
                companyService.toLowerCase().includes(service.toLowerCase())
              )
            )
          )
        }

        if (industries.length > 0) {
          filteredCompanies = filteredCompanies.filter(company =>
            industries.some(industry => 
              company.industries?.some((companyIndustry: string) => 
                companyIndustry.toLowerCase().includes(industry.toLowerCase())
              )
            )
          )
        }

        if (countries.length > 0) {
          filteredCompanies = filteredCompanies.filter(company =>
            countries.some(country => 
              company.location?.toLowerCase().includes(country.toLowerCase())
            )
          )
        }

        // Calculate pagination
        const total = filteredCompanies.length
        const totalPages = Math.ceil(total / limit)
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex)

        return NextResponse.json({
          companies: paginatedCompanies,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        })
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
    }

    // Fallback to mock data if database fails
    console.log('Database failed, using mock data for companies')
    let filteredCompanies = [...mockCompanies]

    // Apply text search filter first
    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim()
      filteredCompanies = filteredCompanies.filter(company => 
        company.name.toLowerCase().includes(searchTerm) ||
        company.description?.toLowerCase().includes(searchTerm) ||
        company.services?.some(service => service.toLowerCase().includes(searchTerm)) ||
        company.industries?.some(industry => industry.toLowerCase().includes(searchTerm)) ||
        company.location?.toLowerCase().includes(searchTerm)
      )
    }

    // Apply filters
    if (services.length > 0) {
      filteredCompanies = filteredCompanies.filter(company =>
        services.some(service => 
          company.services?.some(companyService => 
            companyService.toLowerCase().includes(service.toLowerCase())
          )
        )
      )
    }

    if (industries.length > 0) {
      filteredCompanies = filteredCompanies.filter(company =>
        industries.some(industry => 
          company.industries?.some(companyIndustry => 
            companyIndustry.toLowerCase().includes(industry.toLowerCase())
          )
        )
      )
    }

    if (countries.length > 0) {
      filteredCompanies = filteredCompanies.filter(company =>
        countries.some(country => 
          company.location?.toLowerCase().includes(country.toLowerCase())
        )
      )
    }

    if (ratingMin !== undefined) {
      filteredCompanies = filteredCompanies.filter(company => company.rating >= ratingMin)
    }

    if (ratingMax !== undefined) {
      filteredCompanies = filteredCompanies.filter(company => company.rating <= ratingMax)
    }

    if (verified !== undefined) {
      filteredCompanies = filteredCompanies.filter(company => company.verified === verified)
    }

    // Apply sorting
    switch (sort) {
      case 'rating_desc':
        filteredCompanies.sort((a, b) => b.rating - a.rating)
        break
      case 'rating_asc':
        filteredCompanies.sort((a, b) => a.rating - b.rating)
        break
      case 'name_asc':
        filteredCompanies.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name_desc':
        filteredCompanies.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'newest':
        filteredCompanies.sort((a, b) => 
          new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        )
        break
      case 'oldest':
        filteredCompanies.sort((a, b) => 
          new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime()
        )
        break
      case 'reviews_desc':
        filteredCompanies.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        break
      case 'reviews_asc':
        filteredCompanies.sort((a, b) => (a.reviewCount || 0) - (b.reviewCount || 0))
        break
    }

    // Calculate pagination
    const total = filteredCompanies.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex)

    return NextResponse.json({
      companies: paginatedCompanies,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })

  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}