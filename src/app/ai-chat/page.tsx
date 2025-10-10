import { Metadata } from 'next'
import { AIChatPageWrapper } from '@/components/ai/ai-chat-page-wrapper'

export const metadata: Metadata = {
  title: 'AI Chat - B2B Reviews Assistant',
  description: 'Chat with our AI assistant to find the perfect B2B service providers. Get personalized recommendations and expert insights.',
}

export default function ChatPage() {
  return <AIChatPageWrapper />
}
