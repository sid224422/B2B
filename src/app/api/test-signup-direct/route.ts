import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const supabase = createClient()

    console.log('Attempting direct signup for:', email)

    // Try signup with email confirmation disabled
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined, // Disable email confirmation
        data: {
          full_name: 'Test User'
        }
      }
    })

    if (error) {
      console.error('Direct signup error:', error)
      return NextResponse.json({ 
        success: false, 
        message: error.message,
        error: error,
        details: {
          message: error.message,
          status: error.status,
          code: error.code
        }
      }, { status: 400 })
    }

    console.log('Direct signup success:', data)
    return NextResponse.json({ 
      success: true, 
      message: 'User signed up successfully', 
      user: data.user,
      session: data.session
    })
  } catch (error) {
    console.error('Direct signup API error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
