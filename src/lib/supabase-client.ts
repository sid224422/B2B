import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Singleton instance to prevent multiple client creation
let supabaseClient: any = null

export const createClient = () => {
  // Return existing client if it exists
  if (supabaseClient) {
    return supabaseClient
  }

  // Use environment variables for Supabase configuration
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.')
  }
  
  // Create client with environment variables
  const { createClient: createSupabaseClient } = require('@supabase/supabase-js')
  supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  
  return supabaseClient
}
