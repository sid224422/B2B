import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

// GET /api/companies/[slug]/reviews - Get reviews for a specific company
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params
    const { slug } = resolvedParams

    if (!slug) {
      return NextResponse.json(
        { error: 'Company slug is required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()
    
    try {
      // First get the company ID from slug
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('id')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (companyError || !company) {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        )
      }

      // Get reviews for the company
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          title,
          content,
          project_type,
          project_budget,
          project_duration,
          is_verified,
          created_at,
          communication_rating,
          quality_rating,
          timeline_rating,
          value_rating,
          helpful_votes,
          reviewer_id
        `)
        .eq('company_id', company.id)
        .eq('is_active', true)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (reviewsError) {
        console.error('Database error:', reviewsError)
        return NextResponse.json(
          { error: 'Failed to fetch reviews' },
          { status: 500 }
        )
      }

      // Convert reviews to our format
      const convertedReviews = (reviews || []).map((review: any) => ({
        id: review.id,
        companyId: company.id,
        reviewerName: 'Anonymous User', // Default since we're not joining with users table
        rating: review.rating,
        title: review.title,
        content: review.content,
        projectType: review.project_type,
        projectBudget: review.project_budget,
        projectDuration: review.project_duration,
        isVerified: review.is_verified,
        createdAt: review.created_at,
        helpfulVotes: review.helpful_votes || 0,
        subRatings: {
          communication: review.communication_rating || review.rating,
          quality: review.quality_rating || review.rating,
          timeline: review.timeline_rating || review.rating,
          value: review.value_rating || review.rating,
        },
      }))

      return NextResponse.json({
        reviews: convertedReviews,
        total: convertedReviews.length
      })

    } catch (dbError) {
      console.error('Database connection error:', dbError)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
