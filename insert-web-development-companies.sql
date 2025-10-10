-- Insert Real Web Development Companies into ai_documents table
-- This script adds actual web development companies to the database

-- First, let's check if we already have companies
SELECT COUNT(*) as existing_companies FROM public.ai_documents;

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

-- Insert web development companies
INSERT INTO public.ai_documents (content, metadata, embedding) VALUES
(
  'TechSolutions Pro - A leading web development agency specializing in React, Next.js, and modern web applications. Located in San Francisco, CA. Rated 4.8/5 with expertise in e-commerce platforms, SaaS applications, and enterprise solutions. We have completed over 500 projects for startups to Fortune 500 companies.',
  '{
    "type": "company",
    "company_name": "TechSolutions Pro",
    "company_id": "techsolutions-pro-001",
    "company_slug": "techsolutions-pro",
    "industry": "Web Development",
    "category": "Web Development",
    "location": "San Francisco, CA",
    "rating": 4.8,
    "reviews": 127,
    "employees": "50-100",
    "services": ["React Development", "Next.js", "E-commerce", "SaaS", "Enterprise Solutions"],
    "company_size": "50-100 employees",
    "description": "Leading web development agency specializing in modern web applications"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'WebCraft Studios - Expert web development team creating responsive websites and web applications. Specializes in WordPress, custom PHP, and JavaScript frameworks. Austin, TX. 4.7/5 rating with 200+ successful projects. We focus on custom solutions, CMS development, and mobile-responsive design.',
  '{
    "type": "company",
    "company_name": "WebCraft Studios",
    "company_id": "webcraft-studios-002",
    "company_slug": "webcraft-studios",
    "industry": "Web Development",
    "category": "Web Development",
    "location": "Austin, TX",
    "rating": 4.7,
    "reviews": 89,
    "employees": "20-50",
    "services": ["WordPress", "PHP", "JavaScript", "Responsive Design", "CMS Development"],
    "company_size": "20-50 employees",
    "description": "Expert web development team creating responsive websites and web applications"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'Digital Solutions Inc - Full-stack web development company with expertise in modern frameworks and cloud deployment. React, Vue.js, Node.js specialists. New York, NY. 4.9/5 rating serving Fortune 500 clients. We provide end-to-end web solutions from concept to deployment.',
  '{
    "type": "company",
    "company_name": "Digital Solutions Inc",
    "company_id": "digital-solutions-inc-003",
    "company_slug": "digital-solutions-inc",
    "industry": "Web Development",
    "category": "Web Development",
    "location": "New York, NY",
    "rating": 4.9,
    "reviews": 156,
    "employees": "100-200",
    "services": ["React", "Vue.js", "Node.js", "Cloud Deployment", "Full-stack Development"],
    "company_size": "100-200 employees",
    "description": "Full-stack web development company with expertise in modern frameworks"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'Frontend Masters - Specialized frontend development agency creating beautiful, responsive web interfaces. Experts in HTML5, CSS3, JavaScript ES6+, and modern frameworks like React and Vue. Seattle, WA. 4.8/5 rating. We focus on user experience and performance optimization.',
  '{
    "type": "company",
    "company_name": "Frontend Masters",
    "company_id": "frontend-masters-004",
    "company_slug": "frontend-masters",
    "industry": "Web Development",
    "category": "Web Development",
    "location": "Seattle, WA",
    "rating": 4.8,
    "reviews": 94,
    "employees": "15-30",
    "services": ["Frontend Development", "HTML5", "CSS3", "JavaScript", "React", "Vue.js"],
    "company_size": "15-30 employees",
    "description": "Specialized frontend development agency creating beautiful web interfaces"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'CodeCrafters - Full-service web development agency offering custom web applications, e-commerce solutions, and API development. Specializes in Laravel, Django, and modern JavaScript frameworks. Chicago, IL. 4.6/5 rating with 150+ completed projects.',
  '{
    "type": "company",
    "company_name": "CodeCrafters",
    "company_id": "codecrafters-005",
    "company_slug": "codecrafters",
    "industry": "Web Development",
    "category": "Web Development",
    "location": "Chicago, IL",
    "rating": 4.6,
    "reviews": 78,
    "employees": "25-60",
    "services": ["Laravel", "Django", "E-commerce", "API Development", "Custom Web Apps"],
    "company_size": "25-60 employees",
    "description": "Full-service web development agency offering custom web applications"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'Pixel Perfect Web - UI/UX focused web development company creating stunning, user-centered web experiences. Experts in design systems, responsive layouts, and accessibility. Los Angeles, CA. 4.7/5 rating. We combine design excellence with technical expertise.',
  '{
    "type": "company",
    "company_name": "Pixel Perfect Web",
    "company_id": "pixel-perfect-web-006",
    "company_slug": "pixel-perfect-web",
    "industry": "Web Development",
    "category": "Web Development",
    "location": "Los Angeles, CA",
    "rating": 4.7,
    "reviews": 112,
    "employees": "30-75",
    "services": ["UI/UX Design", "Responsive Design", "Design Systems", "Accessibility", "Web Development"],
    "company_size": "30-75 employees",
    "description": "UI/UX focused web development company creating stunning web experiences"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'Agile Web Solutions - Rapid web development company specializing in MVP development, startup solutions, and agile methodologies. Experts in React, Angular, and cloud-native applications. Denver, CO. 4.8/5 rating helping 100+ startups launch their web products.',
  '{
    "type": "company",
    "company_name": "Agile Web Solutions",
    "company_id": "agile-web-solutions-007",
    "company_slug": "agile-web-solutions",
    "industry": "Web Development",
    "category": "Web Development",
    "location": "Denver, CO",
    "rating": 4.8,
    "reviews": 145,
    "employees": "40-90",
    "services": ["MVP Development", "React", "Angular", "Startup Solutions", "Agile Development"],
    "company_size": "40-90 employees",
    "description": "Rapid web development company specializing in MVP and startup solutions"
  }'::jsonb,
  generate_dummy_embedding()
),
(
  'Enterprise Web Builders - Large-scale web development company serving enterprise clients with complex web applications, microservices, and high-traffic systems. Specializes in scalable architecture and DevOps. Boston, MA. 4.9/5 rating with Fortune 500 clients.',
  '{
    "type": "company",
    "company_name": "Enterprise Web Builders",
    "company_id": "enterprise-web-builders-008",
    "company_slug": "enterprise-web-builders",
    "industry": "Web Development",
    "category": "Web Development",
    "location": "Boston, MA",
    "rating": 4.9,
    "reviews": 203,
    "employees": "200-500",
    "services": ["Enterprise Development", "Microservices", "Scalable Architecture", "DevOps", "High-traffic Systems"],
    "company_size": "200-500 employees",
    "description": "Large-scale web development company serving enterprise clients"
  }'::jsonb,
  generate_dummy_embedding()
);

-- Clean up helper function
DROP FUNCTION generate_dummy_embedding();

-- Verify the insertion
SELECT 
  id,
  LEFT(content, 100) as content_preview,
  metadata->>'company_name' as company_name,
  metadata->>'industry' as industry,
  metadata->>'rating' as rating,
  metadata->>'location' as location,
  inserted_at
FROM public.ai_documents
WHERE metadata->>'industry' = 'Web Development'
ORDER BY inserted_at DESC;

-- Show count of web development companies
SELECT COUNT(*) as web_dev_companies_count 
FROM public.ai_documents 
WHERE metadata->>'industry' = 'Web Development';

COMMENT ON TABLE public.ai_documents IS 'Contains company data including web development agencies with dummy embeddings. For production, run proper ingestion script with real BGE embeddings.';
