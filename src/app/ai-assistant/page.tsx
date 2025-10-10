import { Metadata } from 'next'
import { AIChat } from '@/components/ai/ai-chat'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Bot, MessageCircle, Search, Users, TrendingUp, Star, CheckCircle } from 'lucide-react'
import { AIAssistantHeroActions, AIAssistantQueryButton, AIAssistantCTAButton } from '@/components/ai/ai-assistant-actions'

export const metadata: Metadata = {
  title: 'AI Assistant - Find the Perfect B2B Service Provider',
  description: 'Get AI-powered recommendations for B2B services, companies, and solutions. Our intelligent assistant helps you find the perfect match for your business needs.',
}

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Natural language search with AI-powered understanding of your business needs.'
  },
  {
    icon: Users,
    title: 'Expert Recommendations',
    description: 'Get personalized company recommendations based on your specific requirements.'
  },
  {
    icon: TrendingUp,
    title: 'Real-time Insights',
    description: 'Access up-to-date information about companies, ratings, and market trends.'
  },
  {
    icon: Star,
    title: 'Verified Reviews',
    description: 'Browse authentic reviews and ratings from real customers and clients.'
  }
]

const popularQueries = [
  "Find web development agencies",
  "Best digital marketing companies",
  "Top SaaS providers",
  "Cybersecurity consulting firms",
  "Cloud migration services",
  "Mobile app development teams",
  "Data analytics consultants",
  "UI/UX design agencies"
]

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full p-4">
                  <Bot className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              AI-Powered{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                B2B Assistant
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Find the perfect service provider for your business needs. Our intelligent AI assistant 
              understands your requirements and recommends the best companies, services, and solutions.
            </p>
            
            <AIAssistantHeroActions />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Our AI Assistant?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of B2B service discovery with our advanced AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Queries Section */}
      <div className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Popular AI Queries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Try these popular searches to see how our AI assistant can help you find the perfect service provider
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularQueries.map((query, index) => (
              <AIAssistantQueryButton key={index} query={query} />
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in seconds and find your perfect B2B service provider
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">1</Badge>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ask Your Question</h3>
              <p className="text-muted-foreground">
                Describe what you&apos;re looking for in natural language. Our AI understands context and intent.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">2</Badge>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your requirements and searches through thousands of verified companies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">3</Badge>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Receive personalized recommendations with detailed company information and reviews.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 lg:py-24 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of businesses who have found their ideal service providers through our AI assistant.
          </p>
          <AIAssistantCTAButton />
        </div>
      </div>

      {/* AI Chat Component */}
      <AIChat />
    </div>
  )
}
