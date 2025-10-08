import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

// GET /api/auth - Get current user info
export async function GET() {
  try {
    const supabase = createClient()

    // Get current user
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        ...profile
      }
    })
  } catch (error) {
    console.error('Error in auth API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/auth - Update user profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { full_name, company_name, bio, website, location } = body

    const supabase = createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Update user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .update({
        full_name,
        company_name,
        bio,
        website,
        location,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single()

    if (profileError) {
      console.error('Error updating profile:', profileError)
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Error in update profile API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/auth - Delete user account
export async function DELETE() {
  try {
    const supabase = createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Soft delete user profile
    const { error: profileError } = await supabase
      .from('users')
      .update({ is_active: false })
      .eq('id', user.id)

    if (profileError) {
      console.error('Error deleting profile:', profileError)
      return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 })
    }

    // Note: In a real application, you might want to also delete the auth user
    // This would require admin privileges or a separate admin endpoint

    return NextResponse.json({ message: 'Account deleted successfully' })
  } catch (error) {
    console.error('Error in delete account API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
