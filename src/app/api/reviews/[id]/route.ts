import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

// GET /api/reviews/[id] - Get review by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createClient()

    const { data: review, error } = await supabase
      .from('reviews')
      .select(`
        *,
        users(email, full_name),
        companies(name, slug)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching review:', error)
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    return NextResponse.json({ review })
  } catch (error) {
    console.error('Error in get review API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/reviews/[id] - Update review
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user owns this review
    const { data: review } = await supabase
      .from('reviews')
      .select('id, user_id, company_id')
      .eq('id', id)
      .single()

    if (!review || review.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Update review
    const { data: updatedReview, error } = await supabase
      .from('reviews')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        users(email, full_name),
        companies(name, slug)
      `)
      .single()

    if (error) {
      console.error('Error updating review:', error)
      return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
    }

    // Update company rating if rating changed
    if (body.rating && review.company_id) {
      await updateCompanyRating(supabase, review.company_id)
    }

    return NextResponse.json({ review: updatedReview })
  } catch (error) {
    console.error('Error in update review API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/reviews/[id] - Delete review
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user owns this review
    const { data: review } = await supabase
      .from('reviews')
      .select('id, user_id, company_id')
      .eq('id', id)
      .single()

    if (!review || review.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Soft delete review
    const { error } = await supabase
      .from('reviews')
      .update({ is_active: false })
      .eq('id', id)

    if (error) {
      console.error('Error deleting review:', error)
      return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
    }

    // Update company rating
    if (review.company_id) {
      await updateCompanyRating(supabase, review.company_id)
    }

    return NextResponse.json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error in delete review API:', error)
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
    } else {
      // No reviews left, reset rating
      await supabase
        .from('companies')
        .update({ 
          average_rating: 0,
          total_reviews: 0
        })
        .eq('id', companyId)
    }
  } catch (error) {
    console.error('Error updating company rating:', error)
  }
}
