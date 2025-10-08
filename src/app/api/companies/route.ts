import { NextRequest, NextResponse } from 'next/server'
import { mockCompanies } from '@/lib/data/mock'

// GET /api/companies - Get all companies with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get filter parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const sort = searchParams.get('sort') || 'rating_desc'
    const services = searchParams.get('services')?.split(',') || []
    const industries = searchParams.get('industries')?.split(',') || []
    const countries = searchParams.get('countries')?.split(',') || []
    const ratingMin = searchParams.get('ratingMin') ? parseFloat(searchParams.get('ratingMin')!) : undefined
    const ratingMax = searchParams.get('ratingMax') ? parseFloat(searchParams.get('ratingMax')!) : undefined
    const verified = searchParams.get('verified') === 'true' ? true : searchParams.get('verified') === 'false' ? false : undefined

    // Start with all mock companies
    let filteredCompanies = [...mockCompanies]

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