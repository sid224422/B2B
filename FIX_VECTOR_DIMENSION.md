# Fix Vector Dimension Error - Step by Step Guide

## Problem
Error: "different vector dimensions 384 and 1"

This means your `ai_documents` table was created with 1-dimensional vectors instead of 384-dimensional vectors required by the BGE embedding model.

## Solution

### Option 1: Using Supabase SQL Editor (Recommended - 2 minutes)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `ryhuhmgnfsajfuooxwya`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Fix Script**
   - Copy the entire contents of `fix-ai-documents-vector-dimension.sql`
   - Paste it into the SQL editor
   - Click "Run" or press Ctrl+Enter

4. **Verify Success**
   - You should see a success message
   - The query results should show the table structure with `embedding vector(384)`

5. **Done!**
   - Refresh your application
   - The AI bot should now work properly

### Option 2: Quick Manual Fix (1 minute)

If you just want to quickly recreate the table, run these commands in Supabase SQL Editor:

```sql
-- 1. Drop existing objects
DROP FUNCTION IF EXISTS public.match_ai_documents(vector, int, jsonb);
DROP TABLE IF EXISTS public.ai_documents CASCADE;

-- 2. Enable extensions
CREATE EXTENSION IF NOT EXISTS vector;

-- 3. Create table with correct dimension
CREATE TABLE public.ai_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  embedding vector(384) NOT NULL,
  inserted_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Create index
CREATE INDEX ai_documents_embedding_idx
  ON public.ai_documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- 5. Create search function
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

-- 6. Enable RLS and policies
ALTER TABLE public.ai_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read to all" ON public.ai_documents 
  FOR SELECT USING (true);

CREATE POLICY "Service role can write" ON public.ai_documents 
  FOR ALL USING (auth.role() = 'service_role');
```

### After Running the Fix

1. **The table will be empty** - This is expected. The AI bot will still work, but with no data yet.

2. **To populate with data**, you can:
   - Run the ingestion script: `npm run ingest` (if available)
   - Or manually add company data to the table
   - Or wait for the system to auto-populate

3. **Test the AI bot**:
   - Refresh your app at http://localhost:3000
   - Click the "AI Assistant" button
   - Try a query like "Find web development agencies"
   - If the table is empty, you'll get "No relevant documents found" - this is normal

## Important Notes

⚠️ **Warning**: This will delete all existing data in the `ai_documents` table. If you have important embeddings, back them up first.

✅ **Safe to run**: If you haven't ingested any data yet, this is completely safe to run.

## Verification

After running the fix, verify the dimension is correct:

```sql
SELECT 
  column_name,
  data_type,
  udt_name
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'ai_documents'
  AND column_name = 'embedding';
```

You should see the embedding column with the correct vector type.

## Why This Happened

The `ai_documents` table was likely created manually or by an old migration with `vector(1)` instead of `vector(384)`. The BGE embedding model (`BAAI/bge-small-en-v1.5`) generates 384-dimensional vectors, so the dimensions must match.

## Need Help?

If you encounter any issues:
1. Check the Supabase logs in the dashboard
2. Verify the `pgvector` extension is installed: `CREATE EXTENSION IF NOT EXISTS vector;`
3. Make sure you're using the correct project and have proper permissions

