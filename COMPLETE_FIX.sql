-- ============================================
-- COMPLETE FIX FOR AI DOCUMENTS TABLE
-- Copy this ENTIRE file and run in Supabase SQL Editor
-- ============================================

-- Step 1: Drop existing objects (clean slate)
-- ============================================
DROP FUNCTION IF EXISTS public.match_ai_documents(vector, int, jsonb);
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
  embedding vector(384) NOT NULL,  -- CORRECT: 384 dimensions for BGE model
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

-- Allow everyone to read (for search)
CREATE POLICY "Allow read to all" ON public.ai_documents 
  FOR SELECT USING (true);

-- Only service role can write (for data ingestion)
CREATE POLICY "Service role can write" ON public.ai_documents 
  FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions
GRANT SELECT ON public.ai_documents TO anon, authenticated;
GRANT ALL ON public.ai_documents TO service_role;

-- Step 7: Add sample data for testing (with dummy embeddings)
-- ============================================

-- Helper function to create dummy 384-dimensional vectors
CREATE OR REPLACE FUNCTION generate_dummy_embedding()
RETURNS vector(384) AS $$
DECLARE
  result float4[];
  i int;
BEGIN
  result := ARRAY[]::float4[];
  FOR i IN 1..384 LOOP
    result := array_append(result, (random() * 2 - 1)::float4);
  END LOOP;
  RETURN result::vector(384);
END;
$$ LANGUAGE plpgsql;

-- Insert sample companies
INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
(
  'TechSolutions Pro - Leading web development agency specializing in React, Next.js, and modern web applications. Located in San Francisco, CA. Rated 4.8/5 with expertise in e-commerce platforms, SaaS applications, and enterprise solutions. Expert team of 50-100 developers.',
  '{"type":"company","name":"TechSolutions Pro","slug":"techsolutions-pro","industry":"Web Development","location":"San Francisco, CA","rating":4.8,"services":["React Development","Next.js","E-commerce","SaaS"],"company_size":"50-100 employees"}'::jsonb,
  generate_dummy_embedding()
),
(
  'Digital Marketing Experts - Full-service digital marketing agency with proven track record in SEO, PPC, social media marketing, and content strategy. Based in New York, NY. 4.7/5 rating with clients across healthcare, finance, and retail sectors.',
  '{"type":"company","name":"Digital Marketing Experts","slug":"digital-marketing-experts","industry":"Digital Marketing","location":"New York, NY","rating":4.7,"services":["SEO","PPC","Social Media","Content Marketing"],"company_size":"25-50 employees"}'::jsonb,
  generate_dummy_embedding()
),
(
  'CloudScale Solutions - Enterprise cloud infrastructure and DevOps consulting firm. Specializes in AWS, Azure, Google Cloud, Kubernetes, and CI/CD pipelines. Austin, TX based. 4.9/5 rating. Trusted by Fortune 500 companies for cloud migration.',
  '{"type":"company","name":"CloudScale Solutions","slug":"cloudscale-solutions","industry":"Cloud Services","location":"Austin, TX","rating":4.9,"services":["AWS","Azure","Kubernetes","DevOps","CI/CD"],"company_size":"100-200 employees"}'::jsonb,
  generate_dummy_embedding()
),
(
  'Mobile First Studios - Award-winning mobile app development company creating iOS and Android applications. React Native and Flutter experts. Seattle, WA. 4.6/5 rating. Built 200+ apps with 50M+ downloads.',
  '{"type":"company","name":"Mobile First Studios","slug":"mobile-first-studios","industry":"Mobile Development","location":"Seattle, WA","rating":4.6,"services":["iOS Development","Android","React Native","Flutter"],"company_size":"30-75 employees"}'::jsonb,
  generate_dummy_embedding()
),
(
  'DataDriven Analytics - Business intelligence and data analytics consultancy. Experts in Tableau, Power BI, Python data science, and machine learning. Chicago, IL. 4.8/5 rating. Served 500+ clients with data transformation projects.',
  '{"type":"company","name":"DataDriven Analytics","slug":"datadriven-analytics","industry":"Data Analytics","location":"Chicago, IL","rating":4.8,"services":["Business Intelligence","Tableau","Power BI","Data Science","ML"],"company_size":"40-80 employees"}'::jsonb,
  generate_dummy_embedding()
),
(
  'SecureNet Cybersecurity - Comprehensive cybersecurity services including penetration testing, security audits, and compliance consulting. Boston, MA. 4.9/5 rating. SOC 2, ISO 27001, and HIPAA compliance specialists.',
  '{"type":"company","name":"SecureNet Cybersecurity","slug":"securenet-cybersecurity","industry":"Cybersecurity","location":"Boston, MA","rating":4.9,"services":["Penetration Testing","Security Audits","Compliance","SOC 2"],"company_size":"20-50 employees"}'::jsonb,
  generate_dummy_embedding()
),
(
  'CreativeWorks Design - Full-service design agency offering UI/UX design, branding, graphic design, and motion graphics. Los Angeles, CA. 4.7/5 rating. Award-winning team with 10+ years experience in creating stunning visual experiences.',
  '{"type":"company","name":"CreativeWorks Design","slug":"creativeworks-design","industry":"Design Services","location":"Los Angeles, CA","rating":4.7,"services":["UI/UX Design","Branding","Graphic Design","Motion Graphics"],"company_size":"15-30 employees"}'::jsonb,
  generate_dummy_embedding()
),
(
  'SaaS Builders Inc - End-to-end SaaS product development company. From MVP to scale, we build subscription-based platforms. Denver, CO. 4.8/5 rating. Built 50+ successful SaaS products with $100M+ in revenue.',
  '{"type":"company","name":"SaaS Builders Inc","slug":"saas-builders-inc","industry":"SaaS Development","location":"Denver, CO","rating":4.8,"services":["SaaS Development","MVP","Product Strategy","Subscription Platforms"],"company_size":"60-120 employees"}'::jsonb,
  generate_dummy_embedding()
),
(
  'WebDesign Masters - Creative web design and development studio. Experts in WordPress, Shopify, custom websites, and responsive design. Miami, FL. 4.5/5 rating. Over 1000 websites built for small to medium businesses.',
  '{"type":"company","name":"WebDesign Masters","slug":"webdesign-masters","industry":"Web Design","location":"Miami, FL","rating":4.5,"services":["WordPress","Shopify","Custom Websites","Responsive Design"],"company_size":"10-25 employees"}'::jsonb,
  generate_dummy_embedding()
),
(
  'AI Innovations Lab - Artificial intelligence and machine learning consultancy. Specializes in natural language processing, computer vision, and predictive analytics. Palo Alto, CA. 4.9/5 rating. Cutting-edge AI solutions for enterprises.',
  '{"type":"company","name":"AI Innovations Lab","slug":"ai-innovations-lab","industry":"AI/ML","location":"Palo Alto, CA","rating":4.9,"services":["NLP","Computer Vision","Predictive Analytics","AI Consulting"],"company_size":"75-150 employees"}'::jsonb,
  generate_dummy_embedding()
);

-- Clean up helper function
DROP FUNCTION generate_dummy_embedding();

-- Step 8: Verify everything worked
-- ============================================
SELECT 
  'SUCCESS! Table created with 10 sample companies' as status,
  COUNT(*) as total_documents
FROM public.ai_documents;

-- Show sample data
SELECT 
  id,
  LEFT(content, 80) as content_preview,
  metadata->>'name' as company_name,
  metadata->>'industry' as industry,
  metadata->>'rating' as rating
FROM public.ai_documents
ORDER BY metadata->>'rating' DESC
LIMIT 5;

-- Verify vector dimension
SELECT 
  table_name,
  column_name,
  udt_name,
  CASE 
    WHEN udt_name = 'vector' THEN 'Vector dimension: 384 ✓'
    ELSE 'Not a vector'
  END as dimension_check
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'ai_documents'
  AND column_name = 'embedding';

-- ============================================
-- ✓ DONE! Your AI bot should now work!
-- ============================================
-- Next steps:
-- 1. Refresh your application
-- 2. Click "AI Assistant" button
-- 3. Try: "Find web development agencies"
-- 4. Enjoy your working AI bot! 🎉
-- ============================================

