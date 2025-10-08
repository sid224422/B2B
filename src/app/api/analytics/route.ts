import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

// GET /api/analytics - Get platform analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d' // 7d, 30d, 90d, 1y
    const type = searchParams.get('type') || 'overview' // overview, companies, reviews, users

    const supabase = createClient()

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    const analytics: any = {}

    if (type === 'overview' || type === 'all') {
      // Get total counts
      const [
        { count: totalCompanies },
        { count: totalReviews },
        { count: totalUsers },
        { count: totalLeads }
      ] = await Promise.all([
        supabase.from('companies').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('leads').select('*', { count: 'exact', head: true })
      ])

      // Get recent activity
      const [
        { count: recentCompanies },
        { count: recentReviews },
        { count: recentUsers },
        { count: recentLeads }
      ] = await Promise.all([
        supabase.from('companies').select('*', { count: 'exact', head: true }).eq('is_active', true).gte('created_at', startDate.toISOString()),
        supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('is_active', true).gte('created_at', startDate.toISOString()),
        supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_active', true).gte('created_at', startDate.toISOString()),
        supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', startDate.toISOString())
      ])

      analytics.overview = {
        total: {
          companies: totalCompanies || 0,
          reviews: totalReviews || 0,
          users: totalUsers || 0,
          leads: totalLeads || 0
        },
        recent: {
          companies: recentCompanies || 0,
          reviews: recentReviews || 0,
          users: recentUsers || 0,
          leads: recentLeads || 0
        },
        period,
        startDate: startDate.toISOString(),
        endDate: now.toISOString()
      }
    }

    if (type === 'companies' || type === 'all') {
      // Company analytics
      const { data: companies } = await supabase
        .from('companies')
        .select('average_rating, total_reviews, created_at, industries(name)')
        .eq('is_active', true)
        .gte('created_at', startDate.toISOString())

      const { data: topRatedCompanies } = await supabase
        .from('companies')
        .select('name, slug, average_rating, total_reviews')
        .eq('is_active', true)
        .eq('is_verified', true)
        .order('average_rating', { ascending: false })
        .limit(10)

      const { data: industryStats } = await supabase
        .from('companies')
        .select('industries(name)')
        .eq('is_active', true)
        .gte('created_at', startDate.toISOString())

      // Calculate industry distribution
      const industryCounts: { [key: string]: number } = {}
      industryStats?.forEach((company: any) => {
        const industry = company.industries?.name || 'Unknown'
        industryCounts[industry] = (industryCounts[industry] || 0) + 1
      })

      analytics.companies = {
        topRated: topRatedCompanies || [],
        industryDistribution: industryCounts,
        averageRating: companies?.length ? 
          companies.reduce((sum: number, c: any) => sum + (c.average_rating || 0), 0) / companies.length : 0,
        totalReviews: companies?.reduce((sum: number, c: any) => sum + (c.total_reviews || 0), 0) || 0
      }
    }

    if (type === 'reviews' || type === 'all') {
      // Review analytics
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating, created_at, companies(name)')
        .eq('is_active', true)
        .eq('is_verified', true)
        .gte('created_at', startDate.toISOString())

      // Calculate rating distribution
      const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      reviews?.forEach((review: any) => {
        ratingDistribution[review.rating as keyof typeof ratingDistribution]++
      })

      // Calculate average rating
      const averageRating = reviews?.length ? 
        reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length : 0

      analytics.reviews = {
        total: reviews?.length || 0,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution,
        recentReviews: reviews?.slice(0, 10) || []
      }
    }

    if (type === 'users' || type === 'all') {
      // User analytics
      const { data: users } = await supabase
        .from('users')
        .select('created_at, company_name, location')
        .eq('is_active', true)
        .gte('created_at', startDate.toISOString())

      // Calculate location distribution
      const locationCounts: { [key: string]: number } = {}
      users?.forEach((user: any) => {
        const location = user.location || 'Unknown'
        locationCounts[location] = (locationCounts[location] || 0) + 1
      })

      analytics.users = {
        total: users?.length || 0,
        locationDistribution: locationCounts,
        recentUsers: users?.slice(0, 10) || []
      }
    }

    return NextResponse.json({
      analytics,
      period,
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in analytics API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/analytics - Get custom analytics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      metrics = ['overview'], 
      filters = {}, 
      groupBy = 'day',
      startDate,
      endDate 
    } = body

    const supabase = createClient()

    // Use provided dates or default to last 30 days
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate ? new Date(endDate) : new Date()

    const results: any = {}

    // Generate time series data based on groupBy
    const timeSeries = generateTimeSeries(start, end, groupBy)

    for (const metric of metrics) {
      switch (metric) {
        case 'companies':
          results.companies = await getCompanyMetrics(supabase, start, end, timeSeries, filters)
          break
        case 'reviews':
          results.reviews = await getReviewMetrics(supabase, start, end, timeSeries, filters)
          break
        case 'users':
          results.users = await getUserMetrics(supabase, start, end, timeSeries, filters)
          break
        case 'leads':
          results.leads = await getLeadMetrics(supabase, start, end, timeSeries, filters)
          break
        default:
          results.overview = await getOverviewMetrics(supabase, start, end, timeSeries, filters)
      }
    }

    return NextResponse.json({
      results,
      timeRange: {
        start: start.toISOString(),
        end: end.toISOString(),
        groupBy
      },
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in custom analytics API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper functions
function generateTimeSeries(start: Date, end: Date, groupBy: string) {
  const series = []
  const current = new Date(start)
  
  while (current <= end) {
    series.push(new Date(current))
    
    switch (groupBy) {
      case 'hour':
        current.setHours(current.getHours() + 1)
        break
      case 'day':
        current.setDate(current.getDate() + 1)
        break
      case 'week':
        current.setDate(current.getDate() + 7)
        break
      case 'month':
        current.setMonth(current.getMonth() + 1)
        break
      default:
        current.setDate(current.getDate() + 1)
    }
  }
  
  return series
}

async function getOverviewMetrics(supabase: any, start: Date, end: Date, timeSeries: Date[], filters: any) {
  // Implementation for overview metrics
  return { message: 'Overview metrics implementation' }
}

async function getCompanyMetrics(supabase: any, start: Date, end: Date, timeSeries: Date[], filters: any) {
  // Implementation for company metrics
  return { message: 'Company metrics implementation' }
}

async function getReviewMetrics(supabase: any, start: Date, end: Date, timeSeries: Date[], filters: any) {
  // Implementation for review metrics
  return { message: 'Review metrics implementation' }
}

async function getUserMetrics(supabase: any, start: Date, end: Date, timeSeries: Date[], filters: any) {
  // Implementation for user metrics
  return { message: 'User metrics implementation' }
}

async function getLeadMetrics(supabase: any, start: Date, end: Date, timeSeries: Date[], filters: any) {
  // Implementation for lead metrics
  return { message: 'Lead metrics implementation' }
}