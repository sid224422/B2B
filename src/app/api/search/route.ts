import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

// GET /api/search - Search companies and reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all' // all, companies, reviews
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')

    if (!query.trim()) {
      return NextResponse.json({ 
        results: [], 
        message: 'Please provide a search query' 
      })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 })
    }

    const results: any = {
      companies: [],
      reviews: [],
      total: 0
    }

    // Search companies
    if (type === 'all' || type === 'companies') {
      const response = await fetch(`${supabaseUrl}/rest/v1/companies?select=id,name,slug,description,website,location,avg_rating,review_count,services,industry&or=name.ilike.%${query}%,description.ilike.%${query}%&limit=${limit}`, {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`
        }
      })

      if (response.ok) {
        const companies = await response.json()
        results.companies = companies || []
      }
    }

    // Search reviews
    if (type === 'all' || type === 'reviews') {
      const response = await fetch(`${supabaseUrl}/rest/v1/reviews?select=id,title,content,rating,created_at,company_id&or=title.ilike.%${query}%,content.ilike.%${query}%&limit=${limit}`, {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`
        }
      })

      if (response.ok) {
        const reviews = await response.json()
        results.reviews = reviews || []
      }
    }

    results.total = results.companies.length + results.reviews.length

    return NextResponse.json({
      results,
      query,
      pagination: {
        page,
        limit,
        total: results.total
      }
    })
  } catch (error) {
    console.error('Error in search API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/search - Advanced search with filters
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      query, 
      filters = {}, 
      sortBy = 'relevance', 
      sortOrder = 'desc',
      limit = 10,
      page = 1 
    } = body

    if (!query?.trim()) {
      return NextResponse.json({ 
        results: [], 
        message: 'Please provide a search query' 
      })
    }

    const supabase = createServerClient()
    const results: any = {
      companies: [],
      reviews: [],
      total: 0
    }

    // Advanced company search with filters
    let companyQuery = supabase
      .from('companies')
      .select(`
        id,
        name,
        slug,
        description,
        website,
        location,
        average_rating,
        total_reviews,
        services,
        industries(name)
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,services.cs.{${query}}`)

    // Apply filters
    if (filters.industry) {
      companyQuery = companyQuery.eq('industry_id', filters.industry)
    }
    if (filters.location) {
      companyQuery = companyQuery.ilike('location', `%${filters.location}%`)
    }
    if (filters.minRating) {
      companyQuery = companyQuery.gte('average_rating', filters.minRating)
    }
    if (filters.services && filters.services.length > 0) {
      companyQuery = companyQuery.overlaps('services', filters.services)
    }

    // Apply sorting
    if (sortBy === 'rating') {
      companyQuery = companyQuery.order('average_rating', { ascending: sortOrder === 'asc' })
    } else if (sortBy === 'reviews') {
      companyQuery = companyQuery.order('total_reviews', { ascending: sortOrder === 'asc' })
    } else {
      companyQuery = companyQuery.order('name', { ascending: sortOrder === 'asc' })
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    companyQuery = companyQuery.range(from, to)

    const { data: companies, error: companiesError } = await companyQuery

    if (!companiesError) {
      results.companies = companies || []
    }

    // Advanced review search
    let reviewQuery = supabase
      .from('reviews')
      .select(`
        id,
        title,
        content,
        rating,
        created_at,
        companies(name, slug),
        users(full_name)
      `)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)

    // Apply review filters
    if (filters.minRating) {
      reviewQuery = reviewQuery.gte('rating', filters.minRating)
    }
    if (filters.dateFrom) {
      reviewQuery = reviewQuery.gte('created_at', filters.dateFrom)
    }
    if (filters.dateTo) {
      reviewQuery = reviewQuery.lte('created_at', filters.dateTo)
    }

    // Apply sorting
    if (sortBy === 'rating') {
      reviewQuery = reviewQuery.order('rating', { ascending: sortOrder === 'asc' })
    } else if (sortBy === 'date') {
      reviewQuery = reviewQuery.order('created_at', { ascending: sortOrder === 'asc' })
    } else {
      reviewQuery = reviewQuery.order('created_at', { ascending: false })
    }

    reviewQuery = reviewQuery.range(from, to)

    const { data: reviews, error: reviewsError } = await reviewQuery

    if (!reviewsError) {
      results.reviews = reviews || []
    }

    results.total = results.companies.length + results.reviews.length

    return NextResponse.json({
      results,
      query,
      filters,
      pagination: {
        page,
        limit,
        total: results.total
      }
    })
  } catch (error) {
    console.error('Error in advanced search API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}