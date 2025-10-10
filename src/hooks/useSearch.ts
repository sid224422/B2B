import { useState, useCallback } from 'react'

export interface SearchResult {
  type: 'exact' | 'ai' | 'fuzzy' | 'semantic'
  company: {
    id: string
    name: string
    slug: string
    description?: string
    logoUrl?: string
    verified: boolean
    rating: number
    reviewCount: number
    services: string[]
    industries: string[]
    location: string
    hourlyRate: string
    website?: string
    foundedYear: number
    employeeCount: string
    headquarters: string
    socialLinks: {
      linkedin: string
      twitter: string
    }
    createdAt: string
  }
  relevanceScore?: number
  aiContext?: string
  matchType?: string
}

export interface SearchResponse {
  results: SearchResult[]
  totalResults: number
  searchType: string
  query: string
}

export function useSearch() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [totalResults, setTotalResults] = useState(0)
  const [lastQuery, setLastQuery] = useState('')

  const search = useCallback(async (
    query: string, 
    searchType: 'hybrid' | 'exact' | 'ai' = 'hybrid'
  ) => {
    if (!query.trim()) {
      setResults([])
      setTotalResults(0)
      setLastQuery('')
      return
    }

    setLoading(true)
    setError(null)
    setLastQuery(query)

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&type=${searchType}`
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Search failed')
      }

      const data: SearchResponse = await response.json()
      setResults(data.results)
      setTotalResults(data.totalResults)
    } catch (err: any) {
      setError(err.message)
      setResults([])
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
    setTotalResults(0)
    setError(null)
    setLastQuery('')
  }, [])

  return {
    search,
    clearResults,
    loading,
    results,
    error,
    totalResults,
    lastQuery
  }
}
