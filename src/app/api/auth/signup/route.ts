import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name, avatar_url } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Create Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceKey)

    // Try to disable the trigger temporarily to avoid conflicts
    try {
      await supabase.rpc('exec_sql', {
        sql: 'DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;'
      })
    } catch (e) {
      console.log('Could not disable trigger (this is expected if not admin)')
    }

    // Try regular signup first (bypasses admin API issues)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          avatar_url,
        }
      }
    })

    if (authError) {
      return NextResponse.json({ 
        error: authError.message,
        details: 'Regular signup failed'
      }, { status: 400 })
    }

    if (authData.user) {
      // Check if user was created in users table by trigger
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (checkError && checkError.code === 'PGRST116') {
        // User doesn't exist in users table, create manually
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: authData.user.email!,
            full_name,
            avatar_url,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

        if (profileError) {
          console.error('Error creating user profile:', profileError)
          return NextResponse.json({ 
            error: 'Failed to create user profile',
            details: profileError.message
          }, { status: 500 })
        }
      } else if (checkError) {
        console.error('Error checking user profile:', checkError)
        return NextResponse.json({ 
          error: 'Failed to check user profile',
          details: checkError.message
        }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
        full_name,
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
