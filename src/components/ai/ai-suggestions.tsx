"use client"

import { Button } from "@/components/ui/button"
import { Lightbulb, Search, Building2, Star, Code, Palette, TrendingUp, Users } from "lucide-react"

interface AISuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
  {
    icon: <Building2 className="h-4 w-4" />,
    text: "Find web development agencies",
    category: "Development",
    description: "Get recommendations for web development companies"
  },
  {
    icon: <Palette className="h-4 w-4" />,
    text: "Best digital marketing companies",
    category: "Marketing",
    description: "Discover top digital marketing agencies"
  },
  {
    icon: <Code className="h-4 w-4" />,
    text: "Top-rated SaaS providers",
    category: "Software",
    description: "Find the best software as a service companies"
  },
  {
    icon: <Users className="h-4 w-4" />,
    text: "HR and recruitment services",
    category: "Business",
    description: "Get HR and talent acquisition recommendations"
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    text: "Analytics and data companies",
    category: "Analytics",
    description: "Find companies specializing in data analytics"
  },
  {
    icon: <Search className="h-4 w-4" />,
    text: "Companies in my budget range",
    category: "Discovery",
    description: "Find services that fit your budget"
  }
]

export function AISuggestions({ onSuggestionClick }: AISuggestionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        <h4 className="font-medium text-sm">Try asking:</h4>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="justify-start h-auto p-3 text-left hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-200 w-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onSuggestionClick(suggestion.text)
            }}
          >
            <div className="flex items-start space-x-3 w-full">
              <div className="text-muted-foreground mt-0.5 flex-shrink-0">
                {suggestion.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-foreground leading-tight">
                  {suggestion.text}
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {suggestion.description}
                </div>
                <div className="text-xs text-primary/70 mt-1">
                  {suggestion.category}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
        💡 Tip: Be specific about your needs for better recommendations
      </div>
    </div>
  )
}
