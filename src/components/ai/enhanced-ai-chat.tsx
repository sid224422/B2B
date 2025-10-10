"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { useAskAI } from "@/hooks/useAskAI"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { 
  Bot, 
  Send, 
  Sparkles, 
  Loader2, 
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  Mic,
  StopCircle
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AIResponse } from "./ai-response"
import { VoiceInput } from "./voice-input"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  docs?: any[]
  isStreaming?: boolean
}

interface QuickSuggestion {
  icon: string
  text: string
  category: string
}

const quickSuggestions: QuickSuggestion[] = [
  { icon: "💻", text: "Find top web development agencies", category: "Development" },
  { icon: "📱", text: "Best mobile app development companies", category: "Development" },
  { icon: "📈", text: "Leading digital marketing agencies", category: "Marketing" },
  { icon: "🎨", text: "Top UI/UX design companies", category: "Design" },
  { icon: "☁️", text: "Cloud consulting services", category: "Infrastructure" },
  { icon: "🔒", text: "Cybersecurity consulting firms", category: "Security" },
]

export function EnhancedAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { ask, loading, answer, docs, error } = useAskAI()

  // Load conversation from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('enhanced-ai-conversation')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error('Error loading conversation:', error)
      }
    }
  }, [])

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('enhanced-ai-conversation', JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    if (isAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isAutoScroll])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || loading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsAutoScroll(true)

    try {
      const response = await ask(messageText)
      
      // Generate contextual response based on the actual response data
      const hasRecommendations = response && response.docs && response.docs.length > 0
      const contextualResponse = hasRecommendations 
        ? (response.answer || "I found some great companies for you. Take a look at the recommendations below.")
        : "I searched our database for companies matching your requirements. Please see the results below:"

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: contextualResponse,
        timestamp: new Date(),
        docs: response?.docs || []
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I encountered an error. Please try again or rephrase your question.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.type === 'user')
    if (lastUserMessage) {
      handleSend(lastUserMessage.content)
    }
  }

  const clearConversation = () => {
    setMessages([])
    localStorage.removeItem('enhanced-ai-conversation')
    inputRef.current?.focus()
  }

  const handleCompanyClick = (company: any) => {
    if (company.slug) {
      window.location.href = `/companies/${company.slug}`
    } else if (company.metadata?.company_slug) {
      window.location.href = `/companies/${company.metadata.company_slug}`
    }
  }

  const handleAddToCompare = (company: any) => {
    window.dispatchEvent(new CustomEvent('addToCompare', { 
      detail: { 
        id: company.id || company.metadata?.company_id,
        name: company.name || company.metadata?.name,
        slug: company.slug || company.metadata?.company_slug
      }
    }))
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-6" ref={scrollAreaRef}>
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Bot className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                Welcome to Your AI Assistant
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                I&apos;m here to help you discover the perfect B2B service providers. 
                Ask me anything or try one of these suggestions:
              </p>

              {/* Quick Suggestions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {quickSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSend(suggestion.text)}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{suggestion.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                          {suggestion.text}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {suggestion.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex gap-3",
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.type === 'ai' && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}

                  <div className={cn(
                    "group relative max-w-[85%] rounded-2xl px-4 py-3 overflow-hidden",
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words m-0 overflow-wrap-anywhere word-break-break-word">
                        {message.content}
                      </p>
                    </div>

                    {/* AI Response with company recommendations */}
                    {message.type === 'ai' && (
                      <div className="mt-4">
                        <AIResponse 
                          docs={message.docs || []}
                          onCompanyClick={handleCompanyClick}
                          onAddToCompare={handleAddToCompare}
                          query={messages[messages.indexOf(message) - 1]?.content || ''}
                        />
                      </div>
                    )}

                    {/* Message Actions */}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                      <span className="text-xs opacity-60">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      
                      {message.type === 'ai' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleCopy(message.content, message.id)}
                        >
                          {copiedId === message.id ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-medium text-sm">
                      You
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Loading Indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl px-4 py-3 max-w-[85%]">
                <p className="text-sm text-red-900 dark:text-red-200">
                  {error}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 h-7"
                  onClick={handleRetry}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {messages.length > 0 && (
            <div className="flex items-center justify-between mb-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearConversation}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                New Chat
              </Button>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                <span>{messages.length} messages</span>
              </div>
            </div>
          )}

          <div className="relative flex items-end gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about B2B services..."
                disabled={loading}
                className="pr-24 py-6 text-base resize-none rounded-2xl border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
              />
              
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <VoiceInput
                  onTranscript={(transcript) => {
                    setInput(transcript)
                    inputRef.current?.focus()
                  }}
                  className="h-8 w-8"
                />
                
                <Button
                  size="sm"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="h-8 w-8 p-0 rounded-xl"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-3">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  )
}

