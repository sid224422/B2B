"use client"

import { EnhancedAIChat } from '@/components/ai/enhanced-ai-chat'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Bot, MessageCircle, Sparkles, Users, TrendingUp, Star, Zap } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: MessageCircle,
    title: 'Natural Conversations',
    description: 'Chat naturally with our AI assistant using voice or text input'
  },
  {
    icon: Sparkles,
    title: 'Smart Recommendations',
    description: 'Get personalized company recommendations based on your needs'
  },
  {
    icon: Users,
    title: 'Expert Insights',
    description: 'Access expert insights and detailed company information'
  },
  {
    icon: TrendingUp,
    title: 'Real-time Data',
    description: 'Get up-to-date information about companies and market trends'
  }
]

const quickActions = [
  {
    title: "Find Web Development Agencies",
    description: "Get recommendations for top web development companies",
    emoji: "💻"
  },
  {
    title: "Best Digital Marketing Companies", 
    description: "Discover leading digital marketing agencies",
    emoji: "📈"
  },
  {
    title: "Top SaaS Providers",
    description: "Find the best SaaS solutions for your business",
    emoji: "🔧"
  },
  {
    title: "Cybersecurity Consulting",
    description: "Get expert cybersecurity consulting recommendations",
    emoji: "🔒"
  }
]

export function AIChatPageWrapper() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">AI Chat Assistant</h1>
                  <p className="text-sm text-muted-foreground">Your B2B service discovery partner</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                AI Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            {/* Chat Container */}
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI Assistant Chat
                </CardTitle>
                <CardDescription>
                  Start a conversation to find the perfect B2B service providers for your needs
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 p-0">
                {/* Enhanced AI Chat Component */}
                <div className="h-full">
                  <EnhancedAIChat />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Features</CardTitle>
                <CardDescription>
                  What our AI assistant can do for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>
                  Get started with these popular searches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-auto p-3 justify-start text-left hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('openAIChat'))
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('setAIQuery', { detail: action.title }))
                      }, 100)
                    }}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <span className="text-lg flex-shrink-0">{action.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">{action.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Be specific about your requirements and budget range
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use voice input for faster query input
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Compare multiple companies using the comparison tool
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Export conversations for future reference
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-medium text-sm">1.2s avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="font-medium text-sm">4.8/5</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="font-medium text-sm text-green-600">99.9%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
