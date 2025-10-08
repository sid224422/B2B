import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

// GET /api/companies/[slug] - Get company by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = createClient()

    const { data: company, error } = await supabase
      .from('companies')
      .select(`
        *,
        industries(name),
        company_media(media_url, media_type),
        reviews(
          id,
          rating,
          title,
          content,
          created_at,
          users(email, full_name)
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching company:', error)
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    return NextResponse.json({ company })
  } catch (error) {
    console.error('Error in get company API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/companies/[slug] - Update company
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user owns this company
    const { data: company } = await supabase
      .from('companies')
      .select('id, owner_id')
      .eq('slug', slug)
      .single()

    if (!company || company.owner_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Update company
    const { data: updatedCompany, error } = await supabase
      .from('companies')
      .update(body)
      .eq('slug', slug)
      .select()
      .single()

    if (error) {
      console.error('Error updating company:', error)
      return NextResponse.json({ error: 'Failed to update company' }, { status: 500 })
    }

    return NextResponse.json({ company: updatedCompany })
  } catch (error) {
    console.error('Error in update company API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/companies/[slug] - Delete company
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user owns this company
    const { data: company } = await supabase
      .from('companies')
      .select('id, owner_id')
      .eq('slug', slug)
      .single()

    if (!company || company.owner_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Soft delete company
    const { error } = await supabase
      .from('companies')
      .update({ is_active: false })
      .eq('slug', slug)

    if (error) {
      console.error('Error deleting company:', error)
      return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Company deleted successfully' })
  } catch (error) {
    console.error('Error in delete company API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
