import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'companyName', 'tagline', 'website', 'phoneNumber', 
      'salesEmail', 'description', 'locations', 'services'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Start a transaction-like operation
    const { data: companyListing, error: listingError } = await supabase
      .from('company_listings')
      .insert({
        user_id: user.id,
        company_name: body.companyName,
        tagline: body.tagline,
        business_logo_url: body.businessLogoUrl || null,
        founded_year: body.foundedYear ? parseInt(body.foundedYear) : null,
        employee_count: body.employeeCount || null,
        hourly_rate: body.hourlyRate || null,
        website: body.website,
        phone_number: body.phoneNumber,
        sales_email: body.salesEmail,
        description: body.description,
        status: 'pending'
      })
      .select()
      .single()

    if (listingError) {
      console.error('Error creating company listing:', listingError)
      return NextResponse.json(
        { error: 'Failed to create company listing' },
        { status: 500 }
      )
    }

    const companyListingId = companyListing.id

    // Insert locations
    if (body.locations && body.locations.length > 0) {
      const locationsData = body.locations.map((location: any, index: number) => ({
        company_listing_id: companyListingId,
        address: location.address,
        city: location.city,
        state: location.state,
        country: location.country,
        zip_code: location.zipCode,
        is_primary: index === 0 // First location is primary
      }))

      const { error: locationsError } = await supabase
        .from('company_locations')
        .insert(locationsData)

      if (locationsError) {
        console.error('Error creating company locations:', locationsError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert services
    if (body.services && body.services.length > 0) {
      const servicesData = body.services.map((service: any) => ({
        company_listing_id: companyListingId,
        name: service.name,
        description: service.description,
        price_range: service.priceRange || null,
        delivery_time: service.deliveryTime || null
      }))

      const { error: servicesError } = await supabase
        .from('company_listing_services')
        .insert(servicesData)

      if (servicesError) {
        console.error('Error creating company services:', servicesError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert client industries
    if (body.clientIndustries && body.clientIndustries.length > 0) {
      const industriesData = body.clientIndustries.map((industry: string) => ({
        company_listing_id: companyListingId,
        industry: industry
      }))

      const { error: industriesError } = await supabase
        .from('company_client_industries')
        .insert(industriesData)

      if (industriesError) {
        console.error('Error creating client industries:', industriesError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert client sizes
    if (body.clientSizes && body.clientSizes.length > 0) {
      const sizesData = body.clientSizes.map((size: string) => ({
        company_listing_id: companyListingId,
        client_size: size
      }))

      const { error: sizesError } = await supabase
        .from('company_client_sizes')
        .insert(sizesData)

      if (sizesError) {
        console.error('Error creating client sizes:', sizesError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert project types
    if (body.projectTypes && body.projectTypes.length > 0) {
      const projectTypesData = body.projectTypes.map((type: string) => ({
        company_listing_id: companyListingId,
        project_type: type
      }))

      const { error: projectTypesError } = await supabase
        .from('company_project_types')
        .insert(projectTypesData)

      if (projectTypesError) {
        console.error('Error creating project types:', projectTypesError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert certifications
    if (body.certifications && body.certifications.length > 0) {
      const certificationsData = body.certifications.map((cert: string) => ({
        company_listing_id: companyListingId,
        certification: cert
      }))

      const { error: certificationsError } = await supabase
        .from('company_certifications')
        .insert(certificationsData)

      if (certificationsError) {
        console.error('Error creating certifications:', certificationsError)
        // Continue execution, don't fail the entire operation
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Company listing created successfully',
      data: {
        id: companyListingId,
        status: 'pending'
      }
    })

  } catch (error) {
    console.error('Unexpected error in company listing creation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's company listings
    const { data: listings, error: listingsError } = await supabase
      .from('company_listings')
      .select(`
        *,
        company_locations(*),
        company_listing_services(*),
        company_client_industries(*),
        company_client_sizes(*),
        company_project_types(*),
        company_certifications(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (listingsError) {
      console.error('Error fetching company listings:', listingsError)
      return NextResponse.json(
        { error: 'Failed to fetch company listings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: listings
    })

  } catch (error) {
    console.error('Unexpected error in fetching company listings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
