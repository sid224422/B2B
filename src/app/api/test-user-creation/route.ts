import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Test data
    const testUser = {
      id: 'test-user-' + Date.now(),
      email: 'test@example.com',
      full_name: 'Test User',
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log('Attempting to create test user:', testUser)

    // Try to insert a test user
    const { data, error } = await supabase
      .from('users')
      .insert(testUser)
      .select()

    if (error) {
      console.error('Error creating test user:', error)
      return NextResponse.json({
        success: false,
        message: 'Failed to create test user',
        error: {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        }
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Test user created successfully',
      data: data
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({
      success: false,
      message: 'Unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = createClient()
    
    // Test if we can query the users table
    const { data, error } = await supabase
      .from('users')
      .select('id, email, full_name')
      .limit(5)

    if (error) {
      return NextResponse.json({
        success: false,
        message: 'Failed to query users table',
        error: {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        }
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Users table query successful',
      data: data,
      count: data?.length || 0
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
