"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageHeading } from "@/components/layout/page-heading"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AISearchInput } from "@/components/ai/ai-search-input"
import { AIChat } from "@/components/ai/ai-chat"
import { CompanyCard } from "@/components/app/company-card"
import { CompanyCardSkeleton } from "@/components/app/company-card.skeleton"
import { useSearch } from "@/hooks/useSearch"
import { useAskAI } from "@/hooks/useAskAI"
import { Bot, Sparkles, TrendingUp, Search, Filter, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [aiQuery, setAiQuery] = useState("")
  const [showAIChat, setShowAIChat] = useState(false)
  const [searchMode, setSearchMode] = useState<'traditional' | 'ai'>('ai')
  
  const { search, loading: searchLoading, results: searchResults, totalResults } = useSearch()
  const { ask: askAI, loading: aiLoading, answer: aiAnswer, docs: aiDocs } = useAskAI()

  // Handle traditional search
  const handleTraditionalSearch = async (query: string) => {
    setSearchQuery(query)
    setSearchMode('traditional')
    await search(query, 'hybrid')
  }

  // Handle AI search
  const handleAISearch = async (query: string) => {
    setAiQuery(query)
    setSearchMode('ai')
    await askAI(query, { type: 'company' })
  }

  // Handle search suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    if (searchMode === 'ai') {
      setAiQuery(suggestion)
      askAI(suggestion, { type: 'company' })
    } else {
      setSearchQuery(suggestion)
      search(suggestion, 'hybrid')
    }
  }

  const searchModes = [
    {
      id: 'ai',
      name: 'AI Search',
      description: 'Natural language search with AI recommendations',
      icon: <Bot className="h-4 w-4" />,
      active: searchMode === 'ai'
    },
    {
      id: 'traditional',
      name: 'Traditional Search',
      description: 'Fast keyword-based search',
      icon: <Search className="h-4 w-4" />,
      active: searchMode === 'traditional'
    }
  ]

  const popularSearches = [
    "web development agencies",
    "digital marketing companies",
    "cloud services providers",
    "design agencies",
    "SaaS companies",
    "consulting firms"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <Section className="py-8">
          <PageHeading
            title="AI-Enhanced Search"
            description="Discover B2B services with the power of artificial intelligence"
          />

          {/* Search Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted/50 p-1 rounded-xl">
              {searchModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={mode.active ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSearchMode(mode.id as 'ai' | 'traditional')}
                  className="mx-1"
                >
                  {mode.icon}
                  <span className="ml-2">{mode.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Search Input */}
          <div className="max-w-4xl mx-auto mb-8">
            <AISearchInput
              onSearch={searchMode === 'ai' ? handleAISearch : handleTraditionalSearch}
              onSuggestionClick={handleSuggestionClick}
              placeholder={
                searchMode === 'ai' 
                  ? "Ask AI about B2B services, companies, or get recommendations..." 
                  : "Search companies, services, or industries..."
              }
            />
          </div>

          {/* Popular Searches */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Popular:
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick(search)}
                    className="h-7 px-3 text-xs hover:bg-primary/10 hover:text-primary"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="max-w-6xl mx-auto">
            {/* AI Search Results */}
            {searchMode === 'ai' && (aiLoading || aiAnswer || aiDocs) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Search Results</h3>
                      <p className="text-sm text-muted-foreground">
                        {aiQuery || "AI-powered recommendations"}
                      </p>
                    </div>
                  </div>

                  {aiLoading && (
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span>AI is analyzing your request...</span>
                    </div>
                  )}

                  {aiAnswer && (
                    <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm leading-relaxed">{aiAnswer}</p>
                    </div>
                  )}

                  {aiDocs && aiDocs.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Recommended Companies</h4>
                        <Badge variant="secondary">
                          {aiDocs.length} result{aiDocs.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {aiDocs.map((doc, index) => (
                          <Card key={doc.id || index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium text-sm truncate">
                                {doc.metadata?.company_name || `Company ${index + 1}`}
                              </h5>
                              {doc.similarity && (
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(doc.similarity * 100)}% match
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {doc.metadata?.company_description || doc.content?.slice(0, 100) + '...'}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                {doc.metadata?.rating && (
                                  <span className="flex items-center">
                                    ⭐ {doc.metadata.rating}
                                  </span>
                                )}
                                {doc.metadata?.location && (
                                  <span>📍 {doc.metadata.location}</span>
                                )}
                              </div>
                              
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2"
                                onClick={() => {
                                  const company = doc.metadata?.company_id
                                  if (company) {
                                    window.location.href = `/companies/${company}`
                                  }
                                }}
                              >
                                <ArrowRight className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}

            {/* Traditional Search Results */}
            {searchMode === 'traditional' && (searchLoading || searchResults.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Search Results</h3>
                    <p className="text-sm text-muted-foreground">
                      {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
                    </p>
                  </div>
                  <Badge variant="secondary">
                    <Search className="h-3 w-3 mr-1" />
                    Traditional Search
                  </Badge>
                </div>

                {searchLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <CompanyCardSkeleton key={index} />
                    ))}
                  </div>
                )}

                {searchResults.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((result) => (
                      <CompanyCard key={result.company.id} company={result.company} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* No Results */}
            {!searchLoading && !aiLoading && searchResults.length === 0 && !aiDocs && (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or use AI search for better results.
                  </p>
                  <Button onClick={() => setSearchMode('ai')}>
                    <Bot className="h-4 w-4 mr-2" />
                    Try AI Search
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </Section>
      </Container>

      {/* AI Chat - Always available */}
      <AIChat />
    </div>
  )
}
