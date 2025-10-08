import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if environment variables are loaded
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    return NextResponse.json({
      success: true,
      message: 'Environment variables debug',
      environment: {
        supabaseUrl: supabaseUrl ? 'Set' : 'Not set',
        supabaseAnonKey: supabaseAnonKey ? 'Set' : 'Not set',
        serviceKey: serviceKey ? 'Set' : 'Not set',
        nodeEnv: process.env.NODE_ENV,
        // Show partial values for debugging (first 10 chars)
        supabaseUrlValue: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'Not set',
        supabaseAnonKeyValue: supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'Not set',
      },
      allEnvKeys: Object.keys(process.env).filter(key => 
        key.includes('SUPABASE') || key.includes('NEXT_PUBLIC')
      )
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Environment debug failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
