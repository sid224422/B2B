-- Fix AI Documents table vector dimension issue
-- This script drops and recreates the ai_documents table with correct 384 dimensions

-- Drop existing objects
DROP FUNCTION IF EXISTS public.match_ai_documents(vector, int, jsonb);
DROP INDEX IF EXISTS public.ai_documents_embedding_idx;
DROP TABLE IF EXISTS public.ai_documents;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create ai_documents table with correct 384-dimensional vectors
CREATE TABLE public.ai_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  embedding vector(384) NOT NULL,
  inserted_at timestamptz NOT NULL DEFAULT now()
);

-- Create IVFFLAT index for approximate nearest neighbor search
-- Using cosine distance operator (<=>) for BGE embeddings
CREATE INDEX ai_documents_embedding_idx
  ON public.ai_documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Create RPC function for semantic search with filtering
-- Returns documents ordered by cosine similarity
CREATE OR REPLACE FUNCTION public.match_ai_documents(
  query_embedding vector(384),
  match_count int DEFAULT 8,
  filter jsonb DEFAULT '{}'::jsonb
)
RETURNS TABLE (id uuid, content text, metadata jsonb, similarity float4)
LANGUAGE sql STABLE AS $$
  SELECT
    d.id,
    d.content,
    d.metadata,
    (1 - (d.embedding <=> query_embedding))::float4 as similarity
  FROM public.ai_documents d
  WHERE (filter = '{}'::jsonb OR d.metadata @> filter)
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count
$$;

-- Enable Row Level Security
ALTER TABLE public.ai_documents ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users (for search functionality)
CREATE POLICY "Allow read to all" ON public.ai_documents 
  FOR SELECT USING (true);

-- Only service role can write (for ingestion)
CREATE POLICY "Service role can write" ON public.ai_documents 
  FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions
GRANT SELECT ON public.ai_documents TO anon, authenticated;
GRANT ALL ON public.ai_documents TO service_role;

-- Verify the table was created correctly
SELECT 
  table_name,
  column_name,
  data_type,
  udt_name
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'ai_documents'
ORDER BY ordinal_position;

-- Show vector dimension
SELECT 
  atttypmod 
FROM pg_attribute 
WHERE attrelid = 'public.ai_documents'::regclass 
  AND attname = 'embedding';

COMMENT ON TABLE public.ai_documents IS 'Stores document embeddings for AI-powered semantic search using BGE (384 dimensions)';
COMMENT ON COLUMN public.ai_documents.embedding IS 'BGE embedding vector (384 dimensions) for semantic search';

