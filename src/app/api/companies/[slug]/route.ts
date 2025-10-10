import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

// GET /api/companies/[slug] - Get a specific company by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params
    const { slug } = resolvedParams

    if (!slug) {
      return NextResponse.json(
        { error: 'Company slug is required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()
    
    try {
      // Fetch company by slug
      const { data: company, error } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          slug,
          description,
          website,
          location,
          avg_rating,
          review_count,
          is_verified,
          is_active,
          services,
          created_at,
          updated_at
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error) {
        console.error('Database error:', error)
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        )
      }

      if (!company) {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        )
      }

      // Convert database company to our format
      const convertedCompany = {
        id: company.id,
        slug: company.slug,
        name: company.name,
        logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random`,
        verified: company.is_verified,
        rating: company.avg_rating || 0,
        reviewCount: company.review_count || 0,
        services: company.services || [],
        industries: ['Technology'], // Default industry
        location: company.location,
        hourlyRate: '$100-200', // Default
        description: company.description,
        website: company.website,
        foundedYear: new Date(company.created_at).getFullYear(),
        employeeCount: '10-50', // Default
        headquarters: company.location,
        socialLinks: {
          linkedin: '',
          twitter: '',
        },
        createdAt: company.created_at,
        updatedAt: company.updated_at,
      }

      return NextResponse.json({
        company: convertedCompany
      })

    } catch (dbError) {
      console.error('Database connection error:', dbError)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error fetching company:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}