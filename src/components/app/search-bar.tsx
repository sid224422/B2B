"use client"

import * as React from "react"
import { Search, X, Building2, Wrench, Sparkles, Brain } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { mockCompanies } from "@/lib/data/mock"
import { useSearch, SearchResult } from "@/hooks/useSearch"

interface SearchBarProps {
  placeholder?: string
  className?: string
}

interface Suggestion {
  id: string
  text: string
  type: 'company' | 'service' | 'industry' | 'ai'
  icon: React.ReactNode
  searchResult?: SearchResult
}

export function SearchBar({ 
  placeholder = "Search companies, services, industries...",
  className 
}: SearchBarProps) {
  const [query, setQuery] = React.useState("")
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { search, loading: searchLoading, results: searchResults } = useSearch()

  // Debounced AI search effect
  React.useEffect(() => {
    if (query.length >= 3) {
      const timeoutId = setTimeout(() => {
        search(query, 'hybrid')
      }, 300) // 300ms debounce
      
      return () => clearTimeout(timeoutId)
    }
  }, [query, search])

  // Generate suggestions based on query
  const generateSuggestions = React.useCallback((searchQuery: string): Suggestion[] => {
    if (!searchQuery.trim() || searchQuery.length < 2) return []

    const query = searchQuery.toLowerCase()
    const suggestions: Suggestion[] = []

    // Add AI search results first (if available)
    if (searchResults.length > 0) {
      searchResults.slice(0, 3).forEach((result, index) => {
        suggestions.push({
          id: `ai-${result.company.id}`,
          text: result.company.name,
          type: 'ai' as const,
          icon: <Brain className="h-4 w-4" />,
          searchResult: result
        })
      })
    }

    // Get company names (exact matches)
    const companyMatches = mockCompanies
      .filter(company => company.name.toLowerCase().includes(query))
      .slice(0, 3)
      .map(company => ({
        id: `company-${company.id}`,
        text: company.name,
        type: 'company' as const,
        icon: <Building2 className="h-4 w-4" />
      }))

    // Get services
    const allServices = new Set<string>()
    mockCompanies.forEach(company => {
      company.services.forEach(service => allServices.add(service))
    })
    
    const serviceMatches = Array.from(allServices)
      .filter(service => service.toLowerCase().includes(query))
      .slice(0, 3)
      .map(service => ({
        id: `service-${service}`,
        text: service,
        type: 'service' as const,
        icon: <Wrench className="h-4 w-4" />
      }))

    // Get industries
    const allIndustries = new Set<string>()
    mockCompanies.forEach(company => {
      company.industries.forEach(industry => allIndustries.add(industry))
    })
    
    const industryMatches = Array.from(allIndustries)
      .filter(industry => industry.toLowerCase().includes(query))
      .slice(0, 2)
      .map(industry => ({
        id: `industry-${industry}`,
        text: industry,
        type: 'industry' as const,
        icon: <Building2 className="h-4 w-4" />
      }))

    suggestions.push(...companyMatches, ...serviceMatches, ...industryMatches)
    return suggestions.slice(0, 8) // Limit to 8 suggestions
  }, [])

  // Update suggestions when query changes
  React.useEffect(() => {
    const newSuggestions = generateSuggestions(query)
    setSuggestions(newSuggestions)
    setSelectedIndex(-1)
    setShowSuggestions(newSuggestions.length > 0 && query.length >= 2)
  }, [query, generateSuggestions])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        // Use selected suggestion
        const selectedSuggestion = suggestions[selectedIndex]
        setQuery(selectedSuggestion.text)
        setShowSuggestions(false)
        
        // Handle different suggestion types
        if (selectedSuggestion.type === 'ai' && selectedSuggestion.searchResult) {
          window.location.href = `/companies/${selectedSuggestion.searchResult.company.slug}`
        } else if (selectedSuggestion.type === 'company') {
          const company = mockCompanies.find(c => c.name === selectedSuggestion.text)
          if (company) {
            window.location.href = `/companies/${company.slug}`
          } else {
            window.location.href = `/companies?q=${encodeURIComponent(selectedSuggestion.text)}`
          }
        } else {
          window.location.href = `/search?q=${encodeURIComponent(selectedSuggestion.text)}&type=hybrid`
        }
      } else if (query.trim()) {
        // Use current query - redirect to hybrid search page
        setShowSuggestions(false)
        window.location.href = `/search?q=${encodeURIComponent(query)}&type=hybrid`
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.text)
    setShowSuggestions(false)
    
    // Handle different suggestion types
    if (suggestion.type === 'ai' && suggestion.searchResult) {
      // Navigate to AI search result company page
      window.location.href = `/companies/${suggestion.searchResult.company.slug}`
    } else if (suggestion.type === 'company') {
      // Find the company by name and navigate to its page
      const company = mockCompanies.find(c => c.name === suggestion.text)
      if (company) {
        // Use window.location to avoid Next.js prefetching issues
        window.location.href = `/companies/${company.slug}`
      } else {
        window.location.href = `/companies?q=${encodeURIComponent(suggestion.text)}`
      }
    } else {
      // For services and industries, search in hybrid search page
      window.location.href = `/search?q=${encodeURIComponent(suggestion.text)}&type=hybrid`
    }
  }

  const handleClear = () => {
    setQuery("")
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicks on suggestions
    setTimeout(() => {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }, 200)
  }

  return (
    <div className={`relative flex-1 ${className}`}>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute left-3 top-1/2 -translate-y-1/2"
          animate={{ 
            scale: query ? 1.1 : 1,
            rotate: query ? 5 : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </motion.div>
        
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pl-10 pr-10 h-12 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground rounded-xl transition-all duration-300 backdrop-blur-sm"
        />
        
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-3 w-3" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Loading Indicator */}
      {searchLoading && query.length >= 3 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-xl z-[9999] p-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm text-muted-foreground">Searching with AI...</span>
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-xl z-[9999] max-h-64 overflow-y-auto backdrop-blur-xl"
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center space-x-3 group ${
                  index === selectedIndex 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted/50'
                } ${index === 0 ? 'rounded-t-xl' : ''} ${index === suggestions.length - 1 ? 'rounded-b-xl' : ''}`}
                whileHover={{ x: 4 }}
              >
                <motion.div 
                  className={`transition-colors duration-200 ${
                    index === selectedIndex ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'
                  }`}
                  animate={{ 
                    scale: index === selectedIndex ? 1.1 : 1,
                    rotate: index === selectedIndex ? 5 : 0 
                  }}
                >
                  {suggestion.icon}
                </motion.div>
                <div className="flex-1">
                  <div className="font-medium flex items-center gap-2">
                    {suggestion.text}
                    {suggestion.type === 'ai' && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        AI
                      </span>
                    )}
                  </div>
                  <div className={`text-xs capitalize transition-colors duration-200 ${
                    index === selectedIndex ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {suggestion.type === 'ai' ? 'AI-powered match' : suggestion.type}
                    {suggestion.searchResult?.relevanceScore && (
                      <span className="ml-2 text-xs opacity-70">
                        ({Math.round(suggestion.searchResult.relevanceScore * 100)}% match)
                      </span>
                    )}
                  </div>
                </div>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
