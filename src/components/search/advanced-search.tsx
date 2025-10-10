'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Filter, Zap, Brain, Target, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface SearchResult {
  type: 'exact' | 'ai' | 'fuzzy' | 'semantic'
  company: {
    id: string
    name: string
    description?: string
    rating: number
    verified: boolean
    location?: string
    services?: string[]
    industries?: string[]
  }
  relevanceScore?: number
  aiContext?: string
  matchType?: string
}

interface AdvancedSearchProps {
  onResults: (results: SearchResult[]) => void
  onLoading: (loading: boolean) => void
}

export function AdvancedSearch({ onResults, onLoading }: AdvancedSearchProps) {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<'hybrid' | 'exact' | 'ai' | 'fuzzy' | 'semantic'>('hybrid')
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Debounced search
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, type: string) => {
      if (!searchQuery.trim()) {
        onResults([])
        return
      }

      setIsSearching(true)
      onLoading(true)

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=${type}`)
        const data = await response.json()

        if (data.results) {
          onResults(data.results)
          
          // Add to search history
          setSearchHistory(prev => {
            const newHistory = [searchQuery, ...prev.filter(item => item !== searchQuery)]
            return newHistory.slice(0, 5) // Keep only last 5 searches
          })
        } else {
          onResults([])
        }
      } catch (error) {
        console.error('Search error:', error)
        onResults([])
      } finally {
        setIsSearching(false)
        onLoading(false)
      }
    }, 300),
    [onResults, onLoading]
  )

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length > 2) {
      const commonTerms = [
        'cloud software', 'CRM system', 'project management', 'analytics platform',
        'marketing automation', 'customer support', 'payment processing', 'email marketing',
        'data analytics', 'business intelligence', 'workflow automation', 'API integration'
      ]
      
      const filtered = commonTerms.filter(term => 
        term.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = () => {
    debouncedSearch(query, searchType)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    debouncedSearch(suggestion, searchType)
  }

  const getSearchTypeIcon = (type: string) => {
    switch (type) {
      case 'exact': return <Target className="h-4 w-4" />
      case 'fuzzy': return <Zap className="h-4 w-4" />
      case 'semantic': return <Brain className="h-4 w-4" />
      case 'ai': return <Brain className="h-4 w-4" />
      default: return <Search className="h-4 w-4" />
    }
  }

  const getSearchTypeDescription = (type: string) => {
    switch (type) {
      case 'exact': return 'Precise string matching'
      case 'fuzzy': return 'Typo-tolerant search'
      case 'semantic': return 'Context-aware search'
      case 'ai': return 'AI-powered semantic search'
      default: return 'Combined search methods'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Advanced Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies, services, or industries..."
              className="pr-10"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
            )}
          </div>
          <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {/* Search Type Selection */}
        <Tabs value={searchType} onValueChange={(value) => setSearchType(value as any)}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hybrid" className="text-xs">
              <div className="flex items-center gap-1">
                <Search className="h-3 w-3" />
                Hybrid
              </div>
            </TabsTrigger>
            <TabsTrigger value="exact" className="text-xs">
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                Exact
              </div>
            </TabsTrigger>
            <TabsTrigger value="fuzzy" className="text-xs">
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Fuzzy
              </div>
            </TabsTrigger>
            <TabsTrigger value="semantic" className="text-xs">
              <div className="flex items-center gap-1">
                <Brain className="h-3 w-3" />
                Semantic
              </div>
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-xs">
              <div className="flex items-center gap-1">
                <Brain className="h-3 w-3" />
                AI
              </div>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-2 text-sm text-muted-foreground">
            {getSearchTypeDescription(searchType)}
          </div>
        </Tabs>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Suggestions:</div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Recent searches:</div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
