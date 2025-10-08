import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, full_name } = body

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 })
    }

    // Create a direct Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Attempting simple signup for:', email)

    // Try signup with minimal options
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: full_name || null
        },
        emailRedirectTo: undefined // Disable email confirmation
      }
    })

    if (error) {
      console.error('Simple signup error:', error)
      return NextResponse.json({
        success: false,
        message: 'Signup failed',
        error: error.message,
        details: {
          status: error.status,
          statusText: error.statusText
        }
      }, { status: 400 })
    }

    console.log('Simple signup success:', { user: !!data.user, session: !!data.session })

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email,
          created_at: data.user.created_at
        } : null,
        session: data.session ? 'Session created' : 'No session (email confirmation required)'
      }
    })

  } catch (error) {
    console.error('Unexpected error in simple signup:', error)
    return NextResponse.json({
      success: false,
      message: 'Unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
