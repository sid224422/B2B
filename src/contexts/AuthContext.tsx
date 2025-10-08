"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { createClient as createServiceClient } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create client once outside the component
const supabase = createClient()

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setUser(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        setLoading(false)
        return
      }

      setUser(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      setLoading(true)
      
      console.log('Attempting signup with:', { email, hasPassword: !!password, userData })
      
      // Use regular client-side signup (simpler approach)
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: userData.full_name,
                avatar_url: userData.avatar_url,
              },
              emailRedirectTo: undefined // Disable email confirmation for now
            }
          })

      console.log('Signup response:', { authData, authError })

      if (authError) {
        console.error('Auth signup error:', authError)
        
        // Handle specific database errors
        if (authError.message.includes('Database error saving new user')) {
          return { error: 'Database setup issue. Please contact support or try again later.' }
        }
        
        return { error: `Authentication failed: ${authError.message}` }
      }

      if (authData.user) {
        // Try to create user profile immediately after signup
        try {
          const { error: createError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: authData.user.email!,
              full_name: userData.full_name || null,
              avatar_url: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })

          if (createError) {
            console.error('Error creating user profile during signup:', createError)
            console.error('Error details:', {
              message: createError.message,
              details: createError.details,
              hint: createError.hint,
              code: createError.code
            })
            // Don't fail the signup if profile creation fails
            // The user can still sign in and the profile will be created then
          } else {
            console.log('User profile created successfully during signup')
          }
        } catch (error) {
          console.error('Error creating user profile during signup:', error)
          // Don't fail the signup if profile creation fails
        }
      }

      return { error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      if (data.user) {
        try {
          await fetchUserProfile(data.user.id)
        } catch (error) {
          // If user profile doesn't exist, create it
          console.log('User profile not found, creating it...')
          const { error: createError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email!,
              full_name: data.user.user_metadata?.full_name || null,
              avatar_url: data.user.user_metadata?.avatar_url || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })

          if (createError) {
            console.error('Error creating user profile:', createError)
            return { error: 'Failed to create user profile' }
          }

          // Now fetch the created profile
          await fetchUserProfile(data.user.id)
        }
      }

      return { error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) {
      return { error: 'No user logged in' }
    }

    try {
      setLoading(true)
      
      const { error } = await supabase
        .from('users')
        .update({
          ...userData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) {
        return { error: error.message }
      }

      // Update local user state
      setUser(prev => prev ? { ...prev, ...userData } : null)

      return { error: null }
    } catch (error) {
      console.error('Update profile error:', error)
      return { error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}