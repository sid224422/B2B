-- Sample AI Documents Data
-- Insert sample companies as AI documents for testing the AI bot
-- NOTE: These embeddings are dummy values. For real embeddings, use the ingestion script.

-- Helper function to create a dummy 384-dimensional vector
-- In production, use actual BGE embeddings from the API
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
  'TechSolutions Pro - A leading web development agency specializing in React, Next.js, and modern web applications. Located in San Francisco, CA. Rated 4.8/5 with expertise in e-commerce platforms, SaaS applications, and enterprise solutions.',
  '{
    "type": "company",
    "name": "TechSolutions Pro",
    "slug": "techsolutions-pro",
    "industry": "Web Development",
    "location": "San Francisco, CA",
    "rating": 4.8,
    "services": ["React Development", "Next.js", "E-commerce", "SaaS"],
    "company_size": "50-100 employees"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'Digital Marketing Experts - Full-service digital marketing agency with proven track record in SEO, PPC, social media marketing, and content strategy. Based in New York, NY. 4.7/5 rating with clients across healthcare, finance, and retail sectors.',
  '{
    "type": "company",
    "name": "Digital Marketing Experts",
    "slug": "digital-marketing-experts",
    "industry": "Digital Marketing",
    "location": "New York, NY",
    "rating": 4.7,
    "services": ["SEO", "PPC", "Social Media", "Content Marketing"],
    "company_size": "25-50 employees"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'CloudScale Solutions - Enterprise cloud infrastructure and DevOps consulting firm. Specializes in AWS, Azure, Google Cloud, Kubernetes, and CI/CD pipelines. Austin, TX based. 4.9/5 rating. Trusted by Fortune 500 companies.',
  '{
    "type": "company",
    "name": "CloudScale Solutions",
    "slug": "cloudscale-solutions",
    "industry": "Cloud Services",
    "location": "Austin, TX",
    "rating": 4.9,
    "services": ["AWS", "Azure", "Kubernetes", "DevOps", "CI/CD"],
    "company_size": "100-200 employees"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'Mobile First Studios - Award-winning mobile app development company creating iOS and Android applications. React Native and Flutter experts. Seattle, WA. 4.6/5 rating. Built 200+ apps with 50M+ downloads.',
  '{
    "type": "company",
    "name": "Mobile First Studios",
    "slug": "mobile-first-studios",
    "industry": "Mobile Development",
    "location": "Seattle, WA",
    "rating": 4.6,
    "services": ["iOS Development", "Android", "React Native", "Flutter"],
    "company_size": "30-75 employees"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'DataDriven Analytics - Business intelligence and data analytics consultancy. Experts in Tableau, Power BI, Python data science, and machine learning. Chicago, IL. 4.8/5 rating. Served 500+ clients with data transformation projects.',
  '{
    "type": "company",
    "name": "DataDriven Analytics",
    "slug": "datadriven-analytics",
    "industry": "Data Analytics",
    "location": "Chicago, IL",
    "rating": 4.8,
    "services": ["Business Intelligence", "Tableau", "Power BI", "Data Science", "ML"],
    "company_size": "40-80 employees"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'SecureNet Cybersecurity - Comprehensive cybersecurity services including penetration testing, security audits, and compliance consulting. Boston, MA. 4.9/5 rating. SOC 2, ISO 27001, and HIPAA compliance specialists.',
  '{
    "type": "company",
    "name": "SecureNet Cybersecurity",
    "slug": "securenet-cybersecurity",
    "industry": "Cybersecurity",
    "location": "Boston, MA",
    "rating": 4.9,
    "services": ["Penetration Testing", "Security Audits", "Compliance", "SOC 2"],
    "company_size": "20-50 employees"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'CreativeWorks Design - Full-service design agency offering UI/UX design, branding, graphic design, and motion graphics. Los Angeles, CA. 4.7/5 rating. Award-winning team with 10+ years experience.',
  '{
    "type": "company",
    "name": "CreativeWorks Design",
    "slug": "creativeworks-design",
    "industry": "Design Services",
    "location": "Los Angeles, CA",
    "rating": 4.7,
    "services": ["UI/UX Design", "Branding", "Graphic Design", "Motion Graphics"],
    "company_size": "15-30 employees"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'SaaS Builders Inc - End-to-end SaaS product development company. From MVP to scale, we build subscription-based platforms. Denver, CO. 4.8/5 rating. Built 50+ successful SaaS products with $100M+ in revenue.',
  '{
    "type": "company",
    "name": "SaaS Builders Inc",
    "slug": "saas-builders-inc",
    "industry": "SaaS Development",
    "location": "Denver, CO",
    "rating": 4.8,
    "services": ["SaaS Development", "MVP", "Product Strategy", "Subscription Platforms"],
    "company_size": "60-120 employees"
  }'::jsonb,
  generate_dummy_embedding()
);

-- Clean up helper function
DROP FUNCTION generate_dummy_embedding();

-- Verify insertion
SELECT 
  id,
  LEFT(content, 100) as content_preview,
  metadata->>'name' as company_name,
  metadata->>'industry' as industry,
  metadata->>'rating' as rating,
  inserted_at
FROM public.ai_documents
ORDER BY inserted_at DESC;

COMMENT ON TABLE public.ai_documents IS 'Note: This sample data uses dummy embeddings. For production, run the proper ingestion script with real BGE embeddings.';

