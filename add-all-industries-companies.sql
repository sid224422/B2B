-- Comprehensive script to add companies from all industries
-- This ensures the AI can find companies for any query

-- Helper function to create a dummy 384-dimensional vector
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

-- Insert comprehensive set of companies across all industries
INSERT INTO public.ai_documents (content, metadata, embedding) VALUES

-- CLOUD SERVICES COMPANIES
(
  'CloudTech Solutions - Premier cloud infrastructure and migration services provider. Specializes in AWS, Azure, and Google Cloud Platform. Seattle, WA. Rated 4.9/5 with expertise in cloud architecture, DevOps automation, and cost optimization. We have helped 500+ companies migrate to the cloud.',
  '{
    "type": "company",
    "company_name": "CloudTech Solutions",
    "company_id": "cloudtech-solutions-001",
    "company_slug": "cloudtech-solutions",
    "industry": "Cloud Services",
    "category": "Cloud Services",
    "location": "Seattle, WA",
    "rating": 4.9,
    "reviews": 234,
    "employees": "100-200",
    "services": ["AWS", "Azure", "Google Cloud", "Cloud Migration", "DevOps", "Cost Optimization"],
    "company_size": "100-200 employees",
    "description": "Premier cloud infrastructure and migration services provider"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'SkyNet Cloud Services - Enterprise cloud consulting and managed services. Experts in Kubernetes, Docker, and container orchestration. San Francisco, CA. 4.8/5 rating serving Fortune 500 companies. We provide 24/7 cloud monitoring and support.',
  '{
    "type": "company",
    "company_name": "SkyNet Cloud Services",
    "company_id": "skynet-cloud-002",
    "company_slug": "skynet-cloud-services",
    "industry": "Cloud Services",
    "category": "Cloud Services",
    "location": "San Francisco, CA",
    "rating": 4.8,
    "reviews": 189,
    "employees": "75-150",
    "services": ["Kubernetes", "Docker", "Container Orchestration", "Cloud Monitoring", "Managed Services"],
    "company_size": "75-150 employees",
    "description": "Enterprise cloud consulting and managed services"
  }'::jsonb,
  generate_dummy_embedding()
),

-- AI/ML COMPANIES
(
  'AI Innovations Lab - Artificial intelligence and machine learning consultancy specializing in natural language processing, computer vision, and predictive analytics. Austin, TX. 4.8/5 rating with 200+ AI projects completed.',
  '{
    "type": "company",
    "company_name": "AI Innovations Lab",
    "company_id": "ai-innovations-lab-001",
    "company_slug": "ai-innovations-lab",
    "industry": "AI/ML",
    "category": "AI/ML",
    "location": "Austin, TX",
    "rating": 4.8,
    "reviews": 156,
    "employees": "50-100",
    "services": ["NLP", "Computer Vision", "Predictive Analytics", "Machine Learning", "Deep Learning"],
    "company_size": "50-100 employees",
    "description": "Artificial intelligence and machine learning consultancy"
  }'::jsonb,
  generate_dummy_embedding()
),

-- MOBILE DEVELOPMENT COMPANIES
(
  'Mobile First Studios - Award-winning mobile app development company creating iOS and Android applications. Specialists in React Native, Flutter, and native development. New York, NY. 4.9/5 rating with 300+ apps published.',
  '{
    "type": "company",
    "company_name": "Mobile First Studios",
    "company_id": "mobile-first-studios-001",
    "company_slug": "mobile-first-studios",
    "industry": "Mobile Development",
    "category": "Mobile Development",
    "location": "New York, NY",
    "rating": 4.9,
    "reviews": 287,
    "employees": "75-150",
    "services": ["iOS Development", "Android Development", "React Native", "Flutter", "Mobile UI/UX"],
    "company_size": "75-150 employees",
    "description": "Award-winning mobile app development company"
  }'::jsonb,
  generate_dummy_embedding()
),

-- DATA ANALYTICS COMPANIES
(
  'DataDriven Analytics - Business intelligence and data analytics consultancy. Experts in Tableau, Power BI, and advanced data science. Chicago, IL. 4.7/5 rating helping 150+ companies make data-driven decisions.',
  '{
    "type": "company",
    "company_name": "DataDriven Analytics",
    "company_id": "datadriven-analytics-001",
    "company_slug": "datadriven-analytics",
    "industry": "Data Analytics",
    "category": "Data Analytics",
    "location": "Chicago, IL",
    "rating": 4.7,
    "reviews": 142,
    "employees": "40-80",
    "services": ["Business Intelligence", "Tableau", "Power BI", "Data Science", "Analytics"],
    "company_size": "40-80 employees",
    "description": "Business intelligence and data analytics consultancy"
  }'::jsonb,
  generate_dummy_embedding()
),

-- CYBERSECURITY COMPANIES
(
  'SecureNet Cybersecurity - Comprehensive cybersecurity services including penetration testing, security audits, and compliance consulting. Boston, MA. 4.9/5 rating with SOC 2 and HIPAA expertise.',
  '{
    "type": "company",
    "company_name": "SecureNet Cybersecurity",
    "company_id": "securenet-cybersecurity-001",
    "company_slug": "securenet-cybersecurity",
    "industry": "Cybersecurity",
    "category": "Cybersecurity",
    "location": "Boston, MA",
    "rating": 4.9,
    "reviews": 198,
    "employees": "60-120",
    "services": ["Penetration Testing", "Security Audits", "Compliance", "SOC 2", "HIPAA"],
    "company_size": "60-120 employees",
    "description": "Comprehensive cybersecurity services provider"
  }'::jsonb,
  generate_dummy_embedding()
),

-- DESIGN SERVICES COMPANIES
(
  'CreativeWorks Design - Full-service design agency offering UI/UX design, branding, graphic design, and motion graphics. Los Angeles, CA. 4.8/5 rating with award-winning creative solutions.',
  '{
    "type": "company",
    "company_name": "CreativeWorks Design",
    "company_id": "creativeworks-design-001",
    "company_slug": "creativeworks-design",
    "industry": "Design Services",
    "category": "Design Services",
    "location": "Los Angeles, CA",
    "rating": 4.8,
    "reviews": 167,
    "employees": "30-60",
    "services": ["UI/UX Design", "Branding", "Graphic Design", "Motion Graphics", "Creative Strategy"],
    "company_size": "30-60 employees",
    "description": "Full-service design agency offering creative solutions"
  }'::jsonb,
  generate_dummy_embedding()
),

-- SAAS DEVELOPMENT COMPANIES
(
  'SaaS Builders Inc - End-to-end SaaS product development company. From MVP to scale, we build subscription-based software solutions. Denver, CO. 4.8/5 rating with 100+ successful SaaS launches.',
  '{
    "type": "company",
    "company_name": "SaaS Builders Inc",
    "company_id": "saas-builders-inc-001",
    "company_slug": "saas-builders-inc",
    "industry": "SaaS Development",
    "category": "SaaS Development",
    "location": "Denver, CO",
    "rating": 4.8,
    "reviews": 134,
    "employees": "50-100",
    "services": ["SaaS Development", "MVP Development", "Product Strategy", "Subscription Management", "Scalable Architecture"],
    "company_size": "50-100 employees",
    "description": "End-to-end SaaS product development company"
  }'::jsonb,
  generate_dummy_embedding()
),

-- E-COMMERCE COMPANIES
(
  'Ecommerce Masters - Specialized e-commerce development and optimization company. Shopify, WooCommerce, and custom e-commerce solutions. Miami, FL. 4.7/5 rating with 250+ online stores built.',
  '{
    "type": "company",
    "company_name": "Ecommerce Masters",
    "company_id": "ecommerce-masters-001",
    "company_slug": "ecommerce-masters",
    "industry": "E-commerce",
    "category": "E-commerce",
    "location": "Miami, FL",
    "rating": 4.7,
    "reviews": 189,
    "employees": "40-80",
    "services": ["Shopify", "WooCommerce", "E-commerce Development", "Payment Integration", "Store Optimization"],
    "company_size": "40-80 employees",
    "description": "Specialized e-commerce development and optimization company"
  }'::jsonb,
  generate_dummy_embedding()
),

-- DIGITAL MARKETING COMPANIES
(
  'Digital Marketing Experts - Full-service digital marketing agency with proven track record in SEO, PPC, social media, and content marketing. Phoenix, AZ. 4.8/5 rating driving growth for 300+ businesses.',
  '{
    "type": "company",
    "company_name": "Digital Marketing Experts",
    "company_id": "digital-marketing-experts-001",
    "company_slug": "digital-marketing-experts",
    "industry": "Digital Marketing",
    "category": "Digital Marketing",
    "location": "Phoenix, AZ",
    "rating": 4.8,
    "reviews": 223,
    "employees": "60-120",
    "services": ["SEO", "PPC", "Social Media Marketing", "Content Marketing", "Marketing Automation"],
    "company_size": "60-120 employees",
    "description": "Full-service digital marketing agency"
  }'::jsonb,
  generate_dummy_embedding()
);

-- Clean up helper function
DROP FUNCTION generate_dummy_embedding();

-- Verify the insertion
SELECT 
  metadata->>'industry' as industry,
  COUNT(*) as company_count
FROM public.ai_documents
WHERE metadata->>'type' = 'company'
GROUP BY metadata->>'industry'
ORDER BY company_count DESC;

-- Show sample companies by industry
SELECT 
  metadata->>'industry' as industry,
  metadata->>'company_name' as company_name,
  metadata->>'location' as location,
  metadata->>'rating' as rating
FROM public.ai_documents
WHERE metadata->>'type' = 'company'
ORDER BY metadata->>'industry', metadata->>'company_name';

COMMENT ON TABLE public.ai_documents IS 'Contains comprehensive company data across all industries with dummy embeddings for AI retrieval testing.';
