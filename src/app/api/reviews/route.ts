import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

// GET /api/reviews - List reviews with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const companyId = searchParams.get('companyId')
    const userId = searchParams.get('userId')
    const minRating = parseInt(searchParams.get('minRating') || '0')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const supabase = createClient()

    // Build query
    let query = supabase
      .from('reviews')
      .select(`
        *,
        users(email, full_name),
        companies(name, slug)
      `)
      .eq('is_verified', true)
      .eq('is_active', true)

    // Apply filters
    if (companyId) {
      query = query.eq('company_id', companyId)
    }
    if (userId) {
      query = query.eq('user_id', userId)
    }
    if (minRating > 0) {
      query = query.gte('rating', minRating)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: reviews, error, count } = await query

    if (error) {
      console.error('Error fetching reviews:', error)
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }

    return NextResponse.json({
      reviews: reviews || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('Error in reviews API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company_id, rating, title, content, project_type, project_budget } = body

    // Validate required fields
    if (!company_id || !rating || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has already reviewed this company
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('company_id', company_id)
      .eq('user_id', user.id)
      .single()

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this company' },
        { status: 400 }
      )
    }

    // Create review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        company_id,
        user_id: user.id,
        rating,
        title,
        content,
        project_type,
        project_budget,
        is_verified: false,
        is_active: true
      })
      .select(`
        *,
        users(email, full_name),
        companies(name, slug)
      `)
      .single()

    if (error) {
      console.error('Error creating review:', error)
      return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
    }

    // Update company rating (this would typically be done with a database trigger)
    await updateCompanyRating(supabase, company_id)

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    console.error('Error in create review API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to update company rating
async function updateCompanyRating(supabase: ReturnType<typeof createClient>, companyId: string) {
  try {
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('company_id', companyId)
      .eq('is_verified', true)
      .eq('is_active', true)

    if (reviews && reviews.length > 0) {
      const averageRating = reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / reviews.length
      
      await supabase
        .from('companies')
        .update({ 
          average_rating: Math.round(averageRating * 10) / 10,
          total_reviews: reviews.length
        })
        .eq('id', companyId)
    }
  } catch (error) {
    console.error('Error updating company rating:', error)
  }
}
