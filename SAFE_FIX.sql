-- ============================================
-- SAFE FIX FOR AI DOCUMENTS TABLE ONLY
-- This version only touches the ai_documents table
-- Copy this ENTIRE file and run in Supabase SQL Editor
-- ============================================

-- Step 1: Drop existing AI objects (clean slate)
-- ============================================
DROP FUNCTION IF EXISTS public.match_ai_documents(vector, int, jsonb);
DROP FUNCTION IF EXISTS public.match_ai_documents(vector(384), int, jsonb);
DROP INDEX IF EXISTS public.ai_documents_embedding_idx;
DROP TABLE IF EXISTS public.ai_documents CASCADE;

-- Step 2: Enable required extensions
-- ============================================
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Step 3: Create ai_documents table with CORRECT 384 dimensions
-- ============================================
CREATE TABLE public.ai_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  embedding vector(384) NOT NULL,
  inserted_at timestamptz NOT NULL DEFAULT now()
);

-- Step 4: Create index for fast vector search
-- ============================================
CREATE INDEX ai_documents_embedding_idx
  ON public.ai_documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Step 5: Create search function
-- ============================================
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

-- Step 6: Enable Row Level Security
-- ============================================
ALTER TABLE public.ai_documents ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow read to all" ON public.ai_documents;
DROP POLICY IF EXISTS "Service role can write" ON public.ai_documents;

-- Create new policies
CREATE POLICY "Allow read to all" ON public.ai_documents 
  FOR SELECT USING (true);

CREATE POLICY "Service role can write" ON public.ai_documents 
  FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions
GRANT SELECT ON public.ai_documents TO anon, authenticated;
GRANT ALL ON public.ai_documents TO service_role;

-- Step 7: Add sample data for testing
-- ============================================
DO $$
DECLARE
  embedding_array float4[];
  i int;
BEGIN
  -- Insert sample companies with dummy embeddings
  FOR rec IN 1..10 LOOP
    -- Generate a random 384-dimensional vector
    embedding_array := ARRAY[]::float4[];
    FOR i IN 1..384 LOOP
      embedding_array := array_append(embedding_array, (random() * 2 - 1)::float4);
    END LOOP;
    
    -- Insert based on loop counter
    CASE rec
      WHEN 1 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'TechSolutions Pro - Leading web development agency specializing in React, Next.js, and modern web applications. Located in San Francisco, CA. Rated 4.8/5 with expertise in e-commerce platforms, SaaS applications, and enterprise solutions.',
          '{"type":"company","name":"TechSolutions Pro","slug":"techsolutions-pro","industry":"Web Development","location":"San Francisco, CA","rating":4.8,"services":["React Development","Next.js","E-commerce","SaaS"]}'::jsonb,
          embedding_array::vector(384)
        );
      WHEN 2 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'Digital Marketing Experts - Full-service digital marketing agency with proven track record in SEO, PPC, social media marketing, and content strategy. Based in New York, NY. 4.7/5 rating.',
          '{"type":"company","name":"Digital Marketing Experts","slug":"digital-marketing-experts","industry":"Digital Marketing","location":"New York, NY","rating":4.7,"services":["SEO","PPC","Social Media","Content Marketing"]}'::jsonb,
          embedding_array::vector(384)
        );
      WHEN 3 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'CloudScale Solutions - Enterprise cloud infrastructure and DevOps consulting firm. Specializes in AWS, Azure, Google Cloud, Kubernetes, and CI/CD pipelines. Austin, TX based. 4.9/5 rating.',
          '{"type":"company","name":"CloudScale Solutions","slug":"cloudscale-solutions","industry":"Cloud Services","location":"Austin, TX","rating":4.9,"services":["AWS","Azure","Kubernetes","DevOps","CI/CD"]}'::jsonb,
          embedding_array::vector(384)
        );
      WHEN 4 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'Mobile First Studios - Award-winning mobile app development company creating iOS and Android applications. React Native and Flutter experts. Seattle, WA. 4.6/5 rating.',
          '{"type":"company","name":"Mobile First Studios","slug":"mobile-first-studios","industry":"Mobile Development","location":"Seattle, WA","rating":4.6,"services":["iOS Development","Android","React Native","Flutter"]}'::jsonb,
          embedding_array::vector(384)
        );
      WHEN 5 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'DataDriven Analytics - Business intelligence and data analytics consultancy. Experts in Tableau, Power BI, Python data science, and machine learning. Chicago, IL. 4.8/5 rating.',
          '{"type":"company","name":"DataDriven Analytics","slug":"datadriven-analytics","industry":"Data Analytics","location":"Chicago, IL","rating":4.8,"services":["Business Intelligence","Tableau","Power BI","Data Science"]}'::jsonb,
          embedding_array::vector(384)
        );
      WHEN 6 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'SecureNet Cybersecurity - Comprehensive cybersecurity services including penetration testing, security audits, and compliance consulting. Boston, MA. 4.9/5 rating.',
          '{"type":"company","name":"SecureNet Cybersecurity","slug":"securenet-cybersecurity","industry":"Cybersecurity","location":"Boston, MA","rating":4.9,"services":["Penetration Testing","Security Audits","Compliance","SOC 2"]}'::jsonb,
          embedding_array::vector(384)
        );
      WHEN 7 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'CreativeWorks Design - Full-service design agency offering UI/UX design, branding, graphic design, and motion graphics. Los Angeles, CA. 4.7/5 rating.',
          '{"type":"company","name":"CreativeWorks Design","slug":"creativeworks-design","industry":"Design Services","location":"Los Angeles, CA","rating":4.7,"services":["UI/UX Design","Branding","Graphic Design","Motion Graphics"]}'::jsonb,
          embedding_array::vector(384)
        );
      WHEN 8 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'SaaS Builders Inc - End-to-end SaaS product development company. From MVP to scale, we build subscription-based platforms. Denver, CO. 4.8/5 rating.',
          '{"type":"company","name":"SaaS Builders Inc","slug":"saas-builders-inc","industry":"SaaS Development","location":"Denver, CO","rating":4.8,"services":["SaaS Development","MVP","Product Strategy"]}'::jsonb,
          embedding_array::vector(384)
        );
      WHEN 9 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'WebDesign Masters - Creative web design and development studio. Experts in WordPress, Shopify, custom websites, and responsive design. Miami, FL. 4.5/5 rating.',
          '{"type":"company","name":"WebDesign Masters","slug":"webdesign-masters","industry":"Web Design","location":"Miami, FL","rating":4.5,"services":["WordPress","Shopify","Custom Websites"]}'::jsonb,
          embedding_array::vector(384)
        );
      WHEN 10 THEN
        INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
        (
          'AI Innovations Lab - Artificial intelligence and machine learning consultancy. Specializes in natural language processing, computer vision, and predictive analytics. Palo Alto, CA. 4.9/5 rating.',
          '{"type":"company","name":"AI Innovations Lab","slug":"ai-innovations-lab","industry":"AI/ML","location":"Palo Alto, CA","rating":4.9,"services":["NLP","Computer Vision","Predictive Analytics"]}'::jsonb,
          embedding_array::vector(384)
        );
    END CASE;
  END LOOP;
END $$;

-- Step 8: Verify everything worked
-- ============================================
SELECT 
  '✓ SUCCESS! Table created with sample companies' as status,
  COUNT(*) as total_documents
FROM public.ai_documents;

-- Show top companies
SELECT 
  LEFT(content, 60) as company,
  metadata->>'name' as name,
  metadata->>'industry' as industry,
  metadata->>'rating' as rating
FROM public.ai_documents
ORDER BY (metadata->>'rating')::float DESC
LIMIT 5;

-- ============================================
-- ✓ DONE! Your AI bot should now work!
-- Refresh your app and test the AI Assistant
-- ============================================

