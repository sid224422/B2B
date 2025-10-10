// Using built-in fetch API (available in Next.js 13+)
import { env } from '../env';

/**
 * BGE (BAAI General Embedding) model integration via Hugging Face Inference API
 * 
 * Model: BAAI/bge-small-en-v1.5
 * - Dimensions: 384
 * - Retrieval: prefix queries with "Represent this sentence for searching relevant passages:"
 * - Mean-pool token features, then L2-normalize for cosine similarity
 */

const HF_URL = `https://api-inference.huggingface.co/models/${env.EMBED_MODEL}`;

/**
 * Mean pooling: average token embeddings to get sentence-level representation
 */
function meanPool(matrix: number[][]): number[] {
  const d = matrix[0].length;
  const acc = new Array(d).fill(0);
  
  for (const row of matrix) {
    for (let i = 0; i < d; i++) {
      acc[i] += row[i];
    }
  }
  
  for (let i = 0; i < d; i++) {
    acc[i] /= matrix.length;
  }
  
  return acc;
}

/**
 * L2 normalization: scale vector to unit length for cosine similarity
 */
function l2norm(vec: number[]): number[] {
  const n = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map(v => v / n);
}

/**
 * Generate embeddings using BGE model via Hugging Face API
 * 
 * @param text - Input text to embed
 * @param options - Configuration options
 * @returns Normalized 384-dimensional vector
 */
export async function embedTextBGE(
  text: string, 
  { isQuery = false }: { isQuery?: boolean } = {}
): Promise<number[]> {
  // Check if AI is enabled
  if (!env.isAIEnabled()) {
    throw new Error('AI features are disabled - missing HF_TOKEN');
  }

  // BGE retrieval optimization: prefix queries for better search performance
  const input = isQuery
    ? `Represent this sentence for searching relevant passages: ${text}`
    : text;

  try {
    const response = await fetch(HF_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        inputs: input, 
        options: { wait_for_model: true } 
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face embedding error: ${response.status} ${errorText}`);
    }

    const data = await response.json() as number[][] | number[];
    
    // Handle different response formats
    const tokenFeatures: number[][] = Array.isArray(data[0]) 
      ? (data as number[][]) 
      : [data as number[]];

    // Apply BGE processing pipeline: mean pooling + L2 normalization
    const pooled = meanPool(tokenFeatures);
    return l2norm(pooled); // Returns 384-dimensional normalized vector
  } catch (error) {
    console.error('Embedding generation failed:', error);
    throw error;
  }
}
