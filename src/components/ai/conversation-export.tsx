'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, FileText, Mail, Share2, Calendar, User } from 'lucide-react'
import { ChatMessage } from './ai-chat'

interface ConversationExportProps {
  messages: ChatMessage[]
  onExport: (format: string, data: string) => void
  disabled?: boolean
}

export function ConversationExport({ messages, onExport, disabled = false }: ConversationExportProps) {
  const [selectedFormat, setSelectedFormat] = useState('txt')
  const [isOpen, setIsOpen] = useState(false)

  const formatConversation = (format: string) => {
    const timestamp = new Date().toISOString().split('T')[0]
    const header = `B2B Reviews AI Assistant Conversation\nExported on: ${timestamp}\n\n`

    switch (format) {
      case 'txt':
        return header + messages.map(msg => {
          const time = new Date(msg.timestamp).toLocaleTimeString()
          const sender = msg.type === 'user' ? 'You' : 'AI Assistant'
          return `[${time}] ${sender}: ${msg.content}`
        }).join('\n\n')

      case 'json':
        return JSON.stringify({
          exportedAt: new Date().toISOString(),
          totalMessages: messages.length,
          conversation: messages.map(msg => ({
            timestamp: msg.timestamp,
            type: msg.type,
            content: msg.content,
            ...(msg.docs && { docs: msg.docs })
          }))
        }, null, 2)

      case 'markdown':
        return `# B2B Reviews AI Assistant Conversation\n\n**Exported on:** ${timestamp}\n\n` +
          messages.map(msg => {
            const time = new Date(msg.timestamp).toLocaleTimeString()
            const sender = msg.type === 'user' ? '**You**' : '**AI Assistant**'
            return `## ${sender} - ${time}\n\n${msg.content}\n`
          }).join('\n---\n\n')

      case 'csv':
        const csvHeader = 'Timestamp,Type,Content\n'
        const csvData = messages.map(msg => {
          const time = new Date(msg.timestamp).toISOString()
          const type = msg.type
          const content = msg.content.replace(/"/g, '""') // Escape quotes
          return `"${time}","${type}","${content}"`
        }).join('\n')
        return csvHeader + csvData

      default:
        return ''
    }
  }

  const handleExport = () => {
    const data = formatConversation(selectedFormat)
    const filename = `ai-conversation-${new Date().toISOString().split('T')[0]}.${selectedFormat}`
    
    const blob = new Blob([data], { 
      type: selectedFormat === 'json' ? 'application/json' : 
            selectedFormat === 'csv' ? 'text/csv' : 'text/plain' 
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setIsOpen(false)
  }

  const handleShare = () => {
    const data = formatConversation('txt')
    
    if (navigator.share) {
      navigator.share({
        title: 'AI Assistant Conversation',
        text: data.substring(0, 1000) + '...',
        url: window.location.href
      }).catch(console.error)
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(data).then(() => {
        alert('Conversation copied to clipboard!')
      }).catch(console.error)
    }
    
    setIsOpen(false)
  }

  if (messages.length === 0) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="h-8 w-8 p-0"
        >
          <Download className="h-4 w-4" />
          <span className="sr-only">Export conversation</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Export Conversation
          </DialogTitle>
          <DialogDescription>
            Export your AI conversation in various formats for record keeping or sharing.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="txt">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Text File (.txt)
                  </div>
                </SelectItem>
                <SelectItem value="json">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    JSON (.json)
                </div>
                </SelectItem>
                <SelectItem value="markdown">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Markdown (.md)
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    CSV (.csv)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Conversation Summary</span>
            </div>
            <div className="space-y-1 text-muted-foreground">
              <div>Total messages: {messages.length}</div>
              <div>Date range: {new Date(messages[0]?.timestamp).toLocaleDateString()} - {new Date(messages[messages.length - 1]?.timestamp).toLocaleDateString()}</div>
              <div>Participants: You & AI Assistant</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleExport} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
