"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, ExternalLink, Star, MapPin, Users, TrendingUp, ArrowRight, Plus, Eye } from "lucide-react"
import { AIComparisonIntegration } from "./ai-comparison-integration"
import { mockCompanies } from "@/lib/data/mock"

interface AIResponseProps {
  docs: any[]
  onCompanyClick?: (companyId: string) => void
  onAddToCompare?: (companyId: string) => void
  query?: string
}

export function AIResponse({ docs, onCompanyClick, onAddToCompare, query }: AIResponseProps) {
  // Debug logging to help troubleshoot retrieval issues
  console.log('AIResponse - docs received:', docs?.length || 0);
  console.log('AIResponse - query:', query);
  
  // Only show actual database results - no fallbacks
  if (!docs || docs.length === 0) {
    return (
      <div className="w-full">
        <div className="bg-muted/30 rounded-xl p-6 text-center border border-border/50">
          <div className="flex items-center justify-center mb-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <h4 className="font-medium text-sm mb-2 text-muted-foreground">
            No matching companies found
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            I couldn't find any companies in our database that match your requirements.
          </p>
          <p className="text-xs text-muted-foreground">
            Try searching for different keywords or browse our <a href="/companies" className="text-primary hover:underline font-medium">company directory</a>.
          </p>
        </div>
      </div>
    )
  }

  const handleCompanyClick = (doc: any) => {
    if (doc.metadata?.company_id && onCompanyClick) {
      onCompanyClick(doc.metadata.company_id)
    } else {
      // Find company in mock data for proper slug
      const company = mockCompanies.find(c => 
        c.id === doc.metadata?.company_id || 
        c.name.toLowerCase() === getCompanyName(doc).toLowerCase()
      )
      
      if (company) {
        window.location.href = `/companies/${company.slug}`
      } else if (doc.metadata?.company_slug) {
        window.location.href = `/companies/${doc.metadata.company_slug}`
      }
    }
  }

  const handleAddToCompare = (doc: any, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (onAddToCompare && doc.metadata?.company_id) {
      onAddToCompare(doc.metadata.company_id)
    } else {
      // Find company and add to compare store
      const company = mockCompanies.find(c => 
        c.id === doc.metadata?.company_id || 
        c.name.toLowerCase() === getCompanyName(doc).toLowerCase()
      )
      
      if (company) {
        // Dispatch custom event to add to compare
        window.dispatchEvent(new CustomEvent('addToCompare', { 
          detail: { companyId: company.id } 
        }))
      }
    }
  }

  const getCompanyName = (doc: any) => {
    return doc.metadata?.company_name || 
           doc.metadata?.name || 
           `Company ${doc.n || 'Unknown'}`
  }

  const getCompanyDescription = (doc: any) => {
    return doc.metadata?.company_description || 
           doc.metadata?.description || 
           doc.content?.slice(0, 120) + '...' || 
           'No description available'
  }

  const getSimilarityScore = (doc: any) => {
    if (doc.similarity) {
      return Math.round(doc.similarity * 100)
    }
    return null
  }

  // Convert docs to company format for comparison integration
  const companies = docs.slice(0, 5).map((doc, index) => {
    const companyName = getCompanyName(doc)
    const company = mockCompanies.find(c => 
      c.id === doc.metadata?.company_id || 
      c.name.toLowerCase() === companyName.toLowerCase()
    )
    
    return company || {
      id: doc.metadata?.company_id || `doc-${index}`,
      slug: doc.metadata?.company_slug || companyName.toLowerCase().replace(/\s+/g, '-'),
      name: companyName,
      logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=random`,
      verified: doc.metadata?.is_verified || true,
      rating: doc.metadata?.rating || 4.5,
      reviewCount: doc.metadata?.reviews || Math.floor(Math.random() * 100),
      services: Array.isArray(doc.metadata?.services) ? doc.metadata.services : ['Technology Services'],
      industries: Array.isArray(doc.metadata?.category) ? doc.metadata.category : [doc.metadata?.category || 'Technology'],
      location: doc.metadata?.location || 'Global',
      hourlyRate: '$100-200',
      description: getCompanyDescription(doc),
      website: doc.metadata?.website || '#',
      foundedYear: 2020,
      employeeCount: doc.metadata?.employees || '10-50',
      headquarters: doc.metadata?.location || 'Global',
      socialLinks: {
        linkedin: '',
        twitter: '',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  })

  return (
    <div className="w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Recommended Companies ({docs.length})
            </span>
          </div>
        </div>
        
        {/* Enhanced Comparison Integration */}
        <AIComparisonIntegration
          companies={companies}
          onCompanyClick={(company) => {
            window.location.href = `/companies/${company.slug}`
          }}
          onAddToCompare={(company) => {
            // Company is already added to compare store in the integration component
            console.log('Added to compare:', company.name)
          }}
        />
        
        {docs.length > 3 && (
          <div className="text-center pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 w-full"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // Navigate to search results page with the query
                const query = encodeURIComponent("AI recommended companies")
                window.location.href = `/search?q=${query}&type=ai`
              }}
            >
              View {docs.length - 3} more results
              <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
