"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useAskAI } from "@/hooks/useAskAI"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Sparkles, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AISuggestions } from "./ai-suggestions"
import { AIResponse } from "./ai-response"
import { AISearchInput } from "./ai-search-input"
import { ConversationExport } from "./conversation-export"
import { LanguageSelector, getTranslation } from "./language-selector"
import { mockCompanies } from "@/lib/data/mock"

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  docs?: any[]
}

export function AIChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([])
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ai-language-preference') || 'en'
    }
    return 'en'
  })
  const { ask, loading, answer, docs, error } = useAskAI()

  // Load conversation history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ai-conversation')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setConversationHistory(messagesWithDates)
        setMessages(messagesWithDates)
      } catch (error) {
        console.error('Error loading conversation history:', error)
      }
    }
  }, [])

  // Save conversation history to localStorage
  useEffect(() => {
    if (conversationHistory.length > 0) {
      localStorage.setItem('ai-conversation', JSON.stringify(conversationHistory))
    }
  }, [conversationHistory])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")

    try {
      await ask(input.trim())
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: answer || "I'm here to help you find the perfect B2B service providers. What are you looking for?",
        timestamp: new Date(),
        docs: docs || []
      }

      setMessages(prev => [...prev, aiMessage])
      setConversationHistory(prev => [...prev, userMessage, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleCompanyClick = (company: any) => {
    // Redirect to company page
    if (company.slug) {
      window.location.href = `/companies/${company.slug}`
    } else if (company.metadata?.company_slug) {
      window.location.href = `/companies/${company.metadata.company_slug}`
    }
  }

  const handleAddToCompare = (company: any) => {
    // Dispatch event for comparison
    window.dispatchEvent(new CustomEvent('addToCompare', { 
      detail: { 
        id: company.id || company.metadata?.company_id,
        name: company.name || company.metadata?.name,
        slug: company.slug || company.metadata?.company_slug
      }
    }))
  }

  const clearConversation = () => {
    setMessages([])
    setConversationHistory([])
    localStorage.removeItem('ai-conversation')
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">B2B Assistant</h3>
            <p className="text-xs text-muted-foreground truncate">Find the perfect service provider</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={setLanguage}
            className="h-8"
          />
        </div>
      </div>

      {/* Enhanced AI Search Input */}
      <div className="px-3 py-3 border-b border-border/50">
        <AISearchInput
          onSearch={handleSend}
          onSuggestionClick={handleSuggestionClick}
          placeholder={getTranslation('placeholder', language)}
          className="mb-3"
        />
        
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSuggestionClick("Find web development agencies")
              }}
              className="text-xs h-7 px-2 cursor-pointer hover:bg-primary/10"
            >
              💻 {getTranslation('webDev', language)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSuggestionClick("Best digital marketing companies")
              }}
              className="text-xs h-7 px-2 cursor-pointer hover:bg-primary/10"
            >
              📈 {getTranslation('marketing', language)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSuggestionClick("Top SaaS providers")
              }}
              className="text-xs h-7 px-2 cursor-pointer hover:bg-primary/10"
            >
              🔧 {getTranslation('saas', language)}
            </Button>
          </div>
          
          {/* Clear conversation and export buttons */}
          {messages.length > 0 && (
            <div className="flex items-center gap-2">
              <ConversationExport 
                messages={messages} 
                onExport={() => {}} 
                disabled={loading}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  clearConversation()
                }}
                className="text-xs text-muted-foreground hover:text-foreground h-7 cursor-pointer"
              >
                Clear chat
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Welcome to B2B Assistant!</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                I&apos;m here to help you find the perfect B2B service providers. Ask me anything about companies, services, or get personalized recommendations.
              </p>
              <AISuggestions onSuggestionClick={handleSuggestionClick} />
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <div className="flex items-start gap-2 mb-2">
                      {message.type === 'ai' && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm break-words leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                    
                    {/* AI Response with company recommendations */}
                    {message.type === 'ai' && message.docs && message.docs.length > 0 && (
                      <div className="mt-3">
                        <AIResponse 
                          docs={message.docs}
                          onCompanyClick={handleCompanyClick}
                          onAddToCompare={handleAddToCompare}
                        />
                      </div>
                    )}
                    
                    <div className="text-xs opacity-70 mt-2">
                      {(message.timestamp instanceof Date 
                        ? message.timestamp 
                        : new Date(message.timestamp)
                      ).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
