import { env } from '../env';

/**
 * Pluggable LLM generator for AI responses
 * Supports multiple providers with fallback to retrieval-only mode
 */

/**
 * Generate AI response using configured LLM provider
 * 
 * @param prompt - Formatted prompt with context and question
 * @returns Generated response text or empty string if no LLM configured
 */
export async function generateAnswer(prompt: string): Promise<string> {
  // OpenAI provider
  if (env.LLM_PROVIDER === 'openai' && env.OPENAI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: env.LLM_MODEL || 'gpt-4o-mini',
          messages: [
            { 
              role: 'system', 
              content: 'You are a concise, factual assistant for a B2B reviews platform. Cite sources when provided and be helpful but accurate.' 
            },
            { 
              role: 'user', 
              content: prompt 
            }
          ],
          temperature: 0.2,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() ?? '';
      
    } catch (error) {
      console.error('OpenAI generation error:', error);
      throw error;
    }
  }

  // Add other providers here (Anthropic, Cohere, etc.)
  // if (env.LLM_PROVIDER === 'anthropic' && env.ANTHROPIC_API_KEY) {
  //   // Implementation for Anthropic Claude
  // }

  // Fallback: no generator configured
  console.warn('No LLM provider configured. Returning empty response.');
  return '';
}

/**
 * Check if LLM generation is available
 */
export function isLLMAvailable(): boolean {
  return !!(env.LLM_PROVIDER && env.OPENAI_API_KEY);
}
