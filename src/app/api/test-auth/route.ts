import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

export async function GET() {
  try {
    const supabase = createClient()
    
    // Test basic auth connection
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    // Test auth signup with a test email (this won't actually create a user)
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = 'TestPassword123!'
    
    console.log('Testing auth signup with:', testEmail)
    
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    })

    return NextResponse.json({
      success: true,
      message: 'Auth test completed',
      data: {
        session: {
          exists: !!session,
          error: sessionError?.message || null
        },
        signup: {
          success: !signupError,
          userCreated: !!signupData?.user,
          error: signupError?.message || null,
          errorDetails: signupError ? {
            message: signupError.message,
            status: signupError.status,
            statusText: signupError.statusText
          } : null
        },
        environment: {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
        }
      }
    })

  } catch (error) {
    console.error('Auth test error:', error)
    return NextResponse.json({
      success: false,
      message: 'Auth test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
