/**
 * Environment variables configuration for AI bot integration
 * Provides typed access to all required environment variables
 */

export const env = {
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,

  // Hugging Face Configuration (Required for embeddings)
  HF_TOKEN: process.env.HF_TOKEN!,
  EMBED_MODEL: process.env.EMBED_MODEL || 'BAAI/bge-small-en-v1.5',

  // LLM Configuration (Optional - for generation)
  LLM_PROVIDER: process.env.LLM_PROVIDER || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  LLM_MODEL: process.env.LLM_MODEL || 'gpt-4o-mini',

  // AI Search Configuration
  AI_TOP_K: process.env.AI_TOP_K || '8',
  AI_MIN_SIM: process.env.AI_MIN_SIM || '0.001',

  // Validation with graceful degradation
  validate() {
    const required = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    const aiRequired = ['HF_TOKEN'];
    const missing = required.filter(key => !process.env[key]);
    const aiMissing = aiRequired.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.warn(`Missing required environment variables: ${missing.join(', ')} - Some features may not work properly`);
    }

    if (aiMissing.length > 0) {
      console.warn(`AI features disabled - missing: ${aiMissing.join(', ')}`);
    }
  },

  // Check if AI features are available
  isAIEnabled() {
    return !!process.env.HF_TOKEN;
  }
};

// Validate environment variables on import
if (typeof window === 'undefined') {
  // Only validate on server side
  try {
    env.validate();
  } catch (error) {
    console.warn('Environment validation warning:', error);
  }
}
