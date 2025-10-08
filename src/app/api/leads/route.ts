import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

// GET /api/leads - List leads with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const companyId = searchParams.get('companyId')
    const status = searchParams.get('status')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Build query
    let query = supabase
      .from('leads')
      .select(`
        *,
        companies(name, slug),
        users(email, full_name)
      `)

    // Apply filters
    if (companyId) {
      query = query.eq('company_id', companyId)
    }
    if (status) {
      query = query.eq('status', status)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: leads, error, count } = await query

    if (error) {
      console.error('Error fetching leads:', error)
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
    }

    return NextResponse.json({
      leads: leads || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('Error in leads API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/leads - Create a new lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      company_id,
      message,
      project_type,
      budget_range,
      timeline,
      contact_preference
    } = body

    // Validate required fields
    if (!company_id || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        company_id,
        user_id: user.id,
        message,
        project_type,
        budget_range,
        timeline,
        contact_preference,
        status: 'new'
      })
      .select(`
        *,
        companies(name, slug),
        users(email, full_name)
      `)
      .single()

    if (error) {
      console.error('Error creating lead:', error)
      return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
    }

    // TODO: Send notification to company owner
    // await sendLeadNotification(lead)

    return NextResponse.json({ lead }, { status: 201 })
  } catch (error) {
    console.error('Error in create lead API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
