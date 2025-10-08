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
      'softwareName', 'tagline', 'softwareWebsite', 'vendorName', 
      'softwareDescription', 'category', 'deployment', 'pricingModel'
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
    const { data: softwareListing, error: listingError } = await supabase
      .from('software_listings')
      .insert({
        user_id: user.id,
        software_logo_url: body.softwareLogoUrl || null,
        software_name: body.softwareName,
        tagline: body.tagline,
        software_website: body.softwareWebsite,
        vendor_name: body.vendorName,
        vendor_founded: body.vendorFounded ? parseInt(body.vendorFounded) : null,
        software_description: body.softwareDescription,
        category: body.category,
        deployment: body.deployment,
        pricing_model: body.pricingModel,
        short_description: body.shortDescription || null,
        long_description: body.longDescription || null,
        status: 'pending'
      })
      .select()
      .single()

    if (listingError) {
      console.error('Error creating software listing:', listingError)
      return NextResponse.json(
        { error: 'Failed to create software listing' },
        { status: 500 }
      )
    }

    const softwareListingId = softwareListing.id

    // Insert key features
    if (body.keyFeatures && body.keyFeatures.length > 0) {
      const keyFeaturesData = body.keyFeatures.map((feature: string) => ({
        software_listing_id: softwareListingId,
        feature: feature
      }))

      const { error: keyFeaturesError } = await supabase
        .from('software_key_features')
        .insert(keyFeaturesData)

      if (keyFeaturesError) {
        console.error('Error creating key features:', keyFeaturesError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert benefits
    if (body.benefits && body.benefits.length > 0) {
      const benefitsData = body.benefits.map((benefit: string) => ({
        software_listing_id: softwareListingId,
        benefit: benefit
      }))

      const { error: benefitsError } = await supabase
        .from('software_benefits')
        .insert(benefitsData)

      if (benefitsError) {
        console.error('Error creating benefits:', benefitsError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert features
    if (body.features && body.features.length > 0) {
      const featuresData = body.features.map((feature: any) => ({
        software_listing_id: softwareListingId,
        name: feature.name,
        description: feature.description,
        category: feature.category || null
      }))

      const { error: featuresError } = await supabase
        .from('software_features')
        .insert(featuresData)

      if (featuresError) {
        console.error('Error creating features:', featuresError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert media
    if (body.media && body.media.length > 0) {
      const mediaData = body.media.map((media: any) => ({
        software_listing_id: softwareListingId,
        media_type: media.type,
        media_url: media.url
      }))

      const { error: mediaError } = await supabase
        .from('software_media')
        .insert(mediaData)

      if (mediaError) {
        console.error('Error creating media:', mediaError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert URLs
    if (body.urls && body.urls.length > 0) {
      const urlsData = body.urls.map((url: any) => ({
        software_listing_id: softwareListingId,
        url_type: url.type,
        url: url.url
      }))

      const { error: urlsError } = await supabase
        .from('software_urls')
        .insert(urlsData)

      if (urlsError) {
        console.error('Error creating URLs:', urlsError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert pricing plans
    if (body.pricingPlans && body.pricingPlans.length > 0) {
      for (const plan of body.pricingPlans) {
        const { data: pricingPlan, error: pricingPlanError } = await supabase
          .from('software_pricing_plans')
          .insert({
            software_listing_id: softwareListingId,
            name: plan.name,
            price: plan.price,
            billing_period: plan.billingPeriod || null,
            is_popular: plan.isPopular || false
          })
          .select()
          .single()

        if (pricingPlanError) {
          console.error('Error creating pricing plan:', pricingPlanError)
          continue
        }

        // Insert pricing plan features
        if (plan.features && plan.features.length > 0) {
          const planFeaturesData = plan.features.map((feature: string) => ({
            pricing_plan_id: pricingPlan.id,
            feature: feature
          }))

          const { error: planFeaturesError } = await supabase
            .from('software_pricing_plan_features')
            .insert(planFeaturesData)

          if (planFeaturesError) {
            console.error('Error creating pricing plan features:', planFeaturesError)
            // Continue execution, don't fail the entire operation
          }
        }
      }
    }

    // Insert integrations
    if (body.integrations && body.integrations.length > 0) {
      const integrationsData = body.integrations.map((integration: string) => ({
        software_listing_id: softwareListingId,
        integration: integration
      }))

      const { error: integrationsError } = await supabase
        .from('software_integrations')
        .insert(integrationsData)

      if (integrationsError) {
        console.error('Error creating integrations:', integrationsError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert API info
    if (body.apiInfo) {
      const { error: apiInfoError } = await supabase
        .from('software_api_info')
        .insert({
          software_listing_id: softwareListingId,
          api_available: body.apiInfo.apiAvailable || false,
          api_documentation_url: body.apiInfo.apiDocumentation || null,
          sdk_available: body.apiInfo.sdkAvailable || false,
          webhooks: body.apiInfo.webhooks || false
        })

      if (apiInfoError) {
        console.error('Error creating API info:', apiInfoError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert support channels
    if (body.supportChannels && body.supportChannels.length > 0) {
      const supportChannelsData = body.supportChannels.map((channel: string) => ({
        software_listing_id: softwareListingId,
        support_channel: channel
      }))

      const { error: supportChannelsError } = await supabase
        .from('software_support_channels')
        .insert(supportChannelsData)

      if (supportChannelsError) {
        console.error('Error creating support channels:', supportChannelsError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert training options
    if (body.trainingOptions && body.trainingOptions.length > 0) {
      const trainingOptionsData = body.trainingOptions.map((option: string) => ({
        software_listing_id: softwareListingId,
        training_option: option
      }))

      const { error: trainingOptionsError } = await supabase
        .from('software_training_options')
        .insert(trainingOptionsData)

      if (trainingOptionsError) {
        console.error('Error creating training options:', trainingOptionsError)
        // Continue execution, don't fail the entire operation
      }
    }

    // Insert support info
    if (body.supportInfo) {
      const { error: supportInfoError } = await supabase
        .from('software_support_info')
        .insert({
          software_listing_id: softwareListingId,
          documentation_quality: body.supportInfo.documentationQuality || null,
          community_support: body.supportInfo.communitySupport || false
        })

      if (supportInfoError) {
        console.error('Error creating support info:', supportInfoError)
        // Continue execution, don't fail the entire operation
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Software listing created successfully',
      data: {
        id: softwareListingId,
        status: 'pending'
      }
    })

  } catch (error) {
    console.error('Unexpected error in software listing creation:', error)
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

    // Get user's software listings
    const { data: listings, error: listingsError } = await supabase
      .from('software_listings')
      .select(`
        *,
        software_key_features(*),
        software_benefits(*),
        software_features(*),
        software_media(*),
        software_urls(*),
        software_pricing_plans(*),
        software_integrations(*),
        software_api_info(*),
        software_support_channels(*),
        software_training_options(*),
        software_support_info(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (listingsError) {
      console.error('Error fetching software listings:', listingsError)
      return NextResponse.json(
        { error: 'Failed to fetch software listings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: listings
    })

  } catch (error) {
    console.error('Unexpected error in fetching software listings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
