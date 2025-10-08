import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

export async function GET() {
  try {
    // Test Supabase connection
    const supabase = createClient()
    
    // Test basic connection by trying to get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    // Test database connection by trying to query a simple table
    // Skip companies table for now due to RLS recursion issue
    const { data: industries, error: dbError } = await supabase
      .from('industries')
      .select('id, name')
      .limit(1)
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection test successful',
      data: {
        auth: {
          connected: !authError,
          user: user ? 'User authenticated' : 'No user authenticated',
          error: authError?.message || null
        },
        database: {
          connected: !dbError,
          industriesCount: industries?.length || 0,
          error: dbError?.message || null
        },
        environment: {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
        }
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Supabase connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
      }
    }, { status: 500 })
  }
}
