import { supabaseAnon } from '../supabase';
import { embedTextBGE } from './embeddings';
import { env } from '../env';

/**
 * Retrieved document type with similarity score
 */
export type RetrievedDoc = {
  id: string;
  content: string;
  metadata: Record<string, any>;
  similarity: number;
};

/**
 * Semantic search using BGE embeddings and pgvector cosine similarity
 * 
 * @param query - Natural language query
 * @param filter - Optional metadata filter (e.g., { type: 'company' })
 * @returns Array of relevant documents with similarity scores
 */
export async function retrieve(
  query: string, 
  filter: Record<string, any> = {}
): Promise<RetrievedDoc[]> {
  // Generate query embedding with BGE retrieval optimization
  const queryEmbedding = await embedTextBGE(query, { isQuery: true });

  // Call Supabase RPC for approximate nearest neighbor search
  const { data, error } = await supabaseAnon
    .rpc('match_ai_documents', {
      query_embedding: queryEmbedding,
      match_count: Number(env.AI_TOP_K ?? 8),
      filter
    });

  if (error) {
    throw new Error(`Retrieval error: ${error.message}`);
  }

  // Filter by minimum similarity threshold
  const minSimilarity = 0.001; // Very low threshold for dummy embeddings
  const filteredDocs = (data as any[])
    .filter(doc => doc.similarity >= minSimilarity)
    .map(doc => ({
      id: doc.id,
      content: doc.content,
      metadata: doc.metadata,
      similarity: doc.similarity
    }));

  return filteredDocs;
}
