"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, TrendingUp, Clock, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearch } from "@/hooks/useSearch"
import { VoiceInput } from "./voice-input"

interface AISearchInputProps {
  onSearch: (query: string) => void
  onSuggestionClick: (suggestion: string) => void
  placeholder?: string
  className?: string
}

const popularQueries = [
  { text: "web development agencies", category: "Development", icon: "💻" },
  { text: "digital marketing companies", category: "Marketing", icon: "📈" },
  { text: "cloud services providers", category: "Technology", icon: "☁️" },
  { text: "design agencies", category: "Design", icon: "🎨" },
  { text: "SaaS companies", category: "Software", icon: "🔧" },
  { text: "consulting firms", category: "Business", icon: "💼" }
]

const trendingSearches = [
  "AI development companies",
  "fintech software providers", 
  "e-commerce solutions",
  "mobile app development",
  "data analytics services",
  "cybersecurity companies"
]

export function AISearchInput({ 
  onSearch, 
  onSuggestionClick, 
  placeholder = "Ask AI about B2B services...",
  className 
}: AISearchInputProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { search, loading, results } = useSearch()

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ai-search-history')
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading search history:', error)
      }
    }
  }, [])

  // Save search history to localStorage
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('ai-search-history', JSON.stringify(searchHistory))
    }
  }, [searchHistory])

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    // Add to search history
    const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)]
    setSearchHistory(newHistory.slice(0, 10)) // Keep last 10 searches

    // Perform AI search
    await search(searchQuery, 'ai')
    
    // Call the parent search handler
    onSearch(searchQuery)
    
    setShowSuggestions(false)
    setIsSearching(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onSuggestionClick(suggestion)
    setShowSuggestions(false)
  }

  const getSearchSuggestions = () => {
    const suggestions = []
    
    // Add recent searches
    if (searchHistory.length > 0) {
      suggestions.push({
        type: 'recent',
        title: 'Recent Searches',
        items: searchHistory.slice(0, 3).map(item => ({
          text: item,
          icon: <Clock className="h-4 w-4" />
        }))
      })
    }
    
    // Add popular queries
    suggestions.push({
      type: 'popular',
      title: 'Popular Searches',
      items: popularQueries.slice(0, 3).map(item => ({
        text: item.text,
        icon: <span className="text-sm">{item.icon}</span>,
        category: item.category
      }))
    })
    
    // Add trending searches
    suggestions.push({
      type: 'trending',
      title: 'Trending Now',
      items: trendingSearches.slice(0, 3).map(item => ({
        text: item,
        icon: <TrendingUp className="h-4 w-4 text-green-500" />
      }))
    })
    
    return suggestions
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {loading || isSearching ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          ) : (
            <Search className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="pl-10 pr-20 h-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-300 text-sm"
        />
        
        {/* Voice Input Button */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2">
          <VoiceInput 
            onTranscript={(text) => setQuery(text)}
            disabled={loading || isSearching}
          />
        </div>
        
        <Button
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSearch()
          }}
          disabled={!query.trim() || loading || isSearching}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-2 bg-primary hover:bg-primary/90 text-xs cursor-pointer"
        >
          <Sparkles className="h-3 w-3 mr-1" />
          AI
        </Button>
      </div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-lg shadow-xl z-50 max-h-72 overflow-y-auto"
          >
            {getSearchSuggestions().map((section, sectionIndex) => (
              <div key={section.type} className={sectionIndex > 0 ? "border-t border-border/50" : ""}>
                <div className="px-4 py-2 bg-muted/30">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {section.title}
                  </h4>
                </div>
                
                <div className="p-2">
                  {section.items.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-auto p-3 text-left hover:bg-primary/5 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleSuggestionClick(item.text)
                      }}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className="text-muted-foreground flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm leading-tight">
                            {item.text}
                          </div>
                          {item.category && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {item.category}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="px-4 py-2 border-t border-border/50 bg-muted/20">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>💡 Press Enter to search</span>
                <span>ESC to close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
