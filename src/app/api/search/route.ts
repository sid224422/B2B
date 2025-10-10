import { NextRequest, NextResponse } from 'next/server'
import { retrieve } from '@/lib/ai/retriever'
import { mockCompanies } from '@/lib/data/mock'
import { Company } from '@/lib/types'
import { searchCache } from '@/lib/search-cache'
import { env } from '@/lib/env'

interface SearchResult {
  type: 'exact' | 'ai' | 'fuzzy' | 'semantic'
  company: Company
  relevanceScore?: number
  aiContext?: string
  matchType?: string
}

/**
 * Advanced Hybrid Search API - Combines multiple search algorithms for better results
 * 
 * GET /api/search?q=searchterm&type=hybrid|exact|ai|fuzzy|semantic
 * 
 * Returns: { results: SearchResult[], totalResults: number, searchType: string }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.trim()
    const searchType = searchParams.get('type') || 'hybrid' // hybrid, exact, ai, fuzzy, semantic
    
    if (!query) {
      return NextResponse.json(
        { error: 'Missing required parameter: q' },
        { status: 400 }
      )
    }

    // Check cache first
    const cacheKey = searchCache.generateKey(query, searchType)
    const cachedResult = searchCache.get(cacheKey)
    
    if (cachedResult) {
      return NextResponse.json({
        ...cachedResult,
        cached: true
      })
    }

    const results: SearchResult[] = []
    let finalSearchType = searchType

    // 1. Exact Company Search (Fastest, most precise)
    if (searchType === 'exact' || searchType === 'hybrid') {
      const exactMatches = performExactSearch(query)
      results.push(...exactMatches)
    }

    // 2. Fuzzy Search (Handles typos and partial matches)
    if (searchType === 'fuzzy' || searchType === 'hybrid') {
      const fuzzyMatches = performFuzzySearch(query)
      results.push(...fuzzyMatches)
    }

    // 3. Semantic Search (Context-aware, handles synonyms)
    if (searchType === 'semantic' || searchType === 'hybrid') {
      const semanticMatches = performSemanticSearch(query)
      results.push(...semanticMatches)
    }

    // 4. AI Semantic Search (Fallback with graceful degradation)
    if (searchType === 'ai' || searchType === 'hybrid') {
      // Check if AI is enabled before attempting to use it
      if (env.isAIEnabled()) {
        try {
          const aiResults = await retrieve(query, { type: 'company' })
          
          // Map AI results to companies
          for (const doc of aiResults) {
            if (doc.metadata?.company_id) {
              const company = mockCompanies.find(c => c.id === doc.metadata.company_id)
              if (company) {
                // Check if company already exists in results
                const existingIndex = results.findIndex(r => r.company.id === company.id)
                
                if (existingIndex >= 0) {
                  // Update existing result with AI context
                  results[existingIndex].aiContext = doc.content
                  results[existingIndex].relevanceScore = Math.max(
                    results[existingIndex].relevanceScore || 0,
                    doc.similarity
                  )
                  results[existingIndex].type = 'ai'
                } else {
                  // Add new AI result
                  results.push({
                    type: 'ai',
                    company,
                    relevanceScore: doc.similarity,
                    aiContext: doc.content
                  })
                }
              }
            }
          }
        } catch (error) {
          console.error('AI search error:', error)
          // Graceful degradation: continue with other search methods
          if (searchType === 'ai') {
            // If AI-only search fails, fall back to semantic search
            const fallbackResults = performSemanticSearch(query)
            results.push(...fallbackResults)
            finalSearchType = 'semantic-fallback'
          }
          // For hybrid search, just continue with other methods (exact, fuzzy, semantic)
        }
      } else {
        // AI is disabled, use semantic search as fallback
        if (searchType === 'ai') {
          const fallbackResults = performSemanticSearch(query)
          results.push(...fallbackResults)
          finalSearchType = 'semantic-fallback'
        }
        // For hybrid search, just continue with other methods (exact, fuzzy, semantic)
      }
    }

    // 5. Sort results by relevance score
    results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))

    // 6. Remove duplicates and limit results
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.company.id === result.company.id)
    )

    const responseData = {
      results: uniqueResults.slice(0, 20), // Limit to 20 results
      totalResults: uniqueResults.length,
      searchType: finalSearchType,
      query,
      cached: false
    }

    // Cache the results (shorter TTL for AI results)
    const cacheTTL = searchType === 'ai' ? 2 * 60 * 1000 : 5 * 60 * 1000 // 2 min for AI, 5 min for others
    searchCache.set(cacheKey, responseData, cacheTTL)

    return NextResponse.json(responseData)

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Perform exact string matching search
 */
function performExactSearch(query: string): SearchResult[] {
  const searchTerm = query.toLowerCase()
  const results: SearchResult[] = []

  mockCompanies.forEach(company => {
    let score = 0
    let matchType = ''

    // Name match gets highest score
    if (company.name.toLowerCase().includes(searchTerm)) {
      score += 10
      matchType = 'name'
      // Exact name match gets bonus
      if (company.name.toLowerCase() === searchTerm) {
        score += 5
        matchType = 'exact-name'
      }
    }

    // Description match
    if (company.description?.toLowerCase().includes(searchTerm)) {
      score += 3
      matchType = matchType ? `${matchType}+description` : 'description'
    }

    // Services match
    if (company.services?.some(service => service.toLowerCase().includes(searchTerm))) {
      score += 2
      matchType = matchType ? `${matchType}+services` : 'services'
    }

    // Industries match
    if (company.industries?.some(industry => industry.toLowerCase().includes(searchTerm))) {
      score += 2
      matchType = matchType ? `${matchType}+industries` : 'industries'
    }

    // Location match
    if (company.location?.toLowerCase().includes(searchTerm)) {
      score += 1
      matchType = matchType ? `${matchType}+location` : 'location'
    }

    if (score > 0) {
      // Boost verified companies
      if (company.verified) score += 0.5
      // Boost highly rated companies
      if (company.rating >= 4.5) score += 0.5

      results.push({
        type: 'exact',
        company,
        relevanceScore: score,
        matchType
      })
    }
  })

  return results
}

/**
 * Perform fuzzy search with typo tolerance
 */
function performFuzzySearch(query: string): SearchResult[] {
  const searchTerm = query.toLowerCase()
  const results: SearchResult[] = []

  mockCompanies.forEach(company => {
    let score = 0
    let matchType = ''

    // Fuzzy name matching
    const nameScore = calculateFuzzyScore(company.name.toLowerCase(), searchTerm)
    if (nameScore > 0.6) {
      score += nameScore * 8
      matchType = 'fuzzy-name'
    }

    // Fuzzy description matching
    if (company.description) {
      const descScore = calculateFuzzyScore(company.description.toLowerCase(), searchTerm)
      if (descScore > 0.6) {
        score += descScore * 3
        matchType = matchType ? `${matchType}+fuzzy-description` : 'fuzzy-description'
      }
    }

    // Fuzzy services matching
    if (company.services) {
      const serviceScore = Math.max(...company.services.map(service => 
        calculateFuzzyScore(service.toLowerCase(), searchTerm)
      ))
      if (serviceScore > 0.6) {
        score += serviceScore * 2
        matchType = matchType ? `${matchType}+fuzzy-services` : 'fuzzy-services'
      }
    }

    if (score > 0) {
      // Boost verified companies
      if (company.verified) score += 0.5
      // Boost highly rated companies
      if (company.rating >= 4.5) score += 0.5

      results.push({
        type: 'fuzzy',
        company,
        relevanceScore: score,
        matchType
      })
    }
  })

  return results
}

/**
 * Perform semantic search with keyword expansion
 */
function performSemanticSearch(query: string): SearchResult[] {
  const searchTerm = query.toLowerCase()
  const results: SearchResult[] = []

  // Expand query with synonyms and related terms
  const expandedTerms = expandQuery(searchTerm)

  mockCompanies.forEach(company => {
    let score = 0
    let matchType = ''

    // Check against expanded terms
    for (const term of expandedTerms) {
      // Name semantic matching
      if (company.name.toLowerCase().includes(term)) {
        score += 8
        matchType = 'semantic-name'
      }

      // Description semantic matching
      if (company.description?.toLowerCase().includes(term)) {
        score += 3
        matchType = matchType ? `${matchType}+semantic-description` : 'semantic-description'
      }

      // Services semantic matching
      if (company.services?.some(service => service.toLowerCase().includes(term))) {
        score += 2
        matchType = matchType ? `${matchType}+semantic-services` : 'semantic-services'
      }

      // Industries semantic matching
      if (company.industries?.some(industry => industry.toLowerCase().includes(term))) {
        score += 2
        matchType = matchType ? `${matchType}+semantic-industries` : 'semantic-industries'
      }
    }

    if (score > 0) {
      // Boost verified companies
      if (company.verified) score += 0.5
      // Boost highly rated companies
      if (company.rating >= 4.5) score += 0.5

      results.push({
        type: 'semantic',
        company,
        relevanceScore: score,
        matchType
      })
    }
  })

  return results
}

/**
 * Calculate fuzzy matching score using Levenshtein distance
 */
function calculateFuzzyScore(str1: string, str2: string): number {
  const maxLength = Math.max(str1.length, str2.length)
  if (maxLength === 0) return 1

  const distance = levenshteinDistance(str1, str2)
  return 1 - (distance / maxLength)
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      )
    }
  }

  return matrix[str2.length][str1.length]
}

/**
 * Expand query with synonyms and related terms
 */
function expandQuery(query: string): string[] {
  const terms = [query]
  
  // Simple synonym mapping for common business terms
  const synonyms: Record<string, string[]> = {
    'cloud': ['saas', 'software', 'platform', 'service'],
    'company': ['business', 'organization', 'firm', 'enterprise'],
    'software': ['application', 'app', 'platform', 'system'],
    'service': ['solution', 'platform', 'tool'],
    'management': ['admin', 'administration', 'governance'],
    'analytics': ['data', 'insights', 'reporting', 'metrics'],
    'marketing': ['promotion', 'advertising', 'campaign'],
    'sales': ['revenue', 'selling', 'commerce'],
    'customer': ['client', 'user', 'buyer'],
    'support': ['help', 'assistance', 'service'],
    'security': ['protection', 'safety', 'privacy'],
    'integration': ['connection', 'api', 'sync'],
    'automation': ['workflow', 'process', 'efficiency'],
    'mobile': ['app', 'smartphone', 'ios', 'android'],
    'web': ['website', 'online', 'internet'],
    'api': ['integration', 'developer', 'connect'],
    'database': ['data', 'storage', 'repository'],
    'payment': ['billing', 'transaction', 'finance'],
    'email': ['communication', 'messaging', 'notification'],
    'crm': ['customer relationship', 'sales', 'management']
  }

  // Add synonyms
  for (const [key, values] of Object.entries(synonyms)) {
    if (query.includes(key)) {
      terms.push(...values)
    }
    // Also check if any synonym is in the query
    for (const value of values) {
      if (query.includes(value)) {
        terms.push(key)
        terms.push(...values.filter(v => v !== value))
      }
    }
  }

  // Add partial matches (for autocomplete-like behavior)
  if (query.length > 2) {
    terms.push(query.slice(0, -1)) // Remove last character
    terms.push(query + 's') // Add plural
  }

  return [...new Set(terms)] // Remove duplicates
}