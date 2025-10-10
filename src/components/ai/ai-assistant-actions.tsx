"use client"

import { Button } from '@/components/ui/button'
import { MessageCircle, Zap, Bot } from 'lucide-react'

export function AIAssistantHeroActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button 
        size="lg" 
        className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('openAIChat'))
        }}
      >
        <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
        Start Chatting with AI
      </Button>
      
      <Button 
        variant="outline" 
        size="lg"
        className="group border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
      >
        <Zap className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
        See How It Works
      </Button>
    </div>
  )
}

export function AIAssistantQueryButton({ query }: { query: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto p-4 text-left justify-start hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group"
      onClick={() => {
        window.dispatchEvent(new CustomEvent('openAIChat'))
        // Small delay to ensure chat opens before setting input
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('setAIQuery', { detail: query }))
        }, 100)
      }}
    >
      <MessageCircle className="h-4 w-4 mr-3 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
      <span className="text-sm font-medium group-hover:text-primary transition-colors">
        {query}
      </span>
    </Button>
  )
}

export function AIAssistantCTAButton() {
  return (
    <Button 
      size="lg" 
      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={() => {
        window.dispatchEvent(new CustomEvent('openAIChat'))
      }}
    >
      <Bot className="h-5 w-5 mr-2" />
      Get Started Now
    </Button>
  )
}

