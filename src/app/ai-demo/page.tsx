"use client"

import * as React from "react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageHeading } from "@/components/layout/page-heading"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Sparkles, MessageCircle, Search, Building2 } from "lucide-react"

export default function AIDemoPage() {
  const [isChatOpen, setIsChatOpen] = React.useState(false)

  React.useEffect(() => {
    const handleOpenAIChat = () => {
      setIsChatOpen(true)
    }

    window.addEventListener('openAIChat', handleOpenAIChat)
    return () => window.removeEventListener('openAIChat', handleOpenAIChat)
  }, [])

  const features = [
    {
      icon: <Bot className="h-5 w-5" />,
      title: "Conversational AI",
      description: "Natural language conversations to find the perfect service providers",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Smart Search",
      description: "AI-powered semantic search with multiple algorithms",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Company Matching",
      description: "Get personalized recommendations based on your needs",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Context Aware",
      description: "Understands your requirements and provides relevant suggestions",
      color: "bg-orange-500/10 text-orange-600"
    }
  ]

  const exampleQueries = [
    "Find web development agencies in my area",
    "Best digital marketing companies for startups",
    "Top-rated SaaS providers with good customer support",
    "Companies that specialize in fintech development",
    "Affordable design agencies for small businesses"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <Section className="py-12">
          <PageHeading
            title="AI Assistant Demo"
            description="Experience the power of AI-driven B2B service discovery"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Features */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Bot className="h-5 w-5 mr-2 text-primary" />
                AI Features
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Example Queries */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                Try These Queries
              </h3>
              <div className="space-y-3">
                {exampleQueries.map((query, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">"{query}"</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* How to Use */}
          <Card className="p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">How to Use the AI Assistant</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-medium mb-2">Click the AI Button</h4>
                <p className="text-sm text-muted-foreground">
                  Click the AI Assistant button in the header or the floating chat button
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-medium mb-2">Ask Your Question</h4>
                <p className="text-sm text-muted-foreground">
                  Type your question about B2B services or use our suggested queries
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-medium mb-2">Get Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Receive AI-powered company recommendations with detailed information
                </p>
              </div>
            </div>
          </Card>

          {/* Status */}
          <Card className="p-6 mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">AI Assistant Status</h3>
                <p className="text-sm text-muted-foreground">
                  The AI assistant is integrated and ready to help you find the perfect B2B services.
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Active
              </Badge>
            </div>
          </Card>
        </Section>
      </Container>
    </div>
  )
}
