import { useState, useCallback } from 'react';

/**
 * AI Ask API response types
 */
export interface AIDoc {
  n: number;
  id: string;
  similarity: number;
  content?: string;
  metadata: Record<string, any>;
}

export interface AIResponse {
  answer: string | null;
  docs: AIDoc[];
  message?: string;
  error?: string;
}

/**
 * React hook for AI question-answering functionality
 * Provides state management and API interaction for the AI ask feature
 */
export function useAskAI() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [docs, setDocs] = useState<AIDoc[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  /**
   * Ask a question to the AI system
   * 
   * @param question - The question to ask
   * @param filter - Optional metadata filter for document retrieval
   */
  const ask = useCallback(async (
    question: string, 
    filter: Record<string, any> = {}
  ): Promise<AIResponse | null> => {
    // Reset state
    setLoading(true);
    setError(null);
    setAnswer(null);
    setDocs([]);
    setMessage(null);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          question: question.trim(), 
          filter 
        })
      });

      const data: AIResponse = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Request failed with status ${response.status}`);
      }

      // Update state with response
      setAnswer(data.answer);
      setDocs(data.docs || []);
      setMessage(data.message || null);

      return data;

    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      console.error('AI Ask error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear all state
   */
  const clear = useCallback(() => {
    setAnswer(null);
    setDocs([]);
    setError(null);
    setMessage(null);
    setLoading(false);
  }, []);

  /**
   * Check if there are any results
   */
  const hasResults = answer !== null || docs.length > 0 || message !== null;

  return {
    // State
    loading,
    answer,
    docs,
    error,
    message,
    hasResults,
    
    // Actions
    ask,
    clear
  };
}
