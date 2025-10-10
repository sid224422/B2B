-- Insert Company Records for All Newly Added Companies
-- This creates proper company cards that appear in the companies listing page

-- First, ensure industries exist
INSERT INTO industries (name, description) VALUES
('Cloud Services', 'Cloud infrastructure, migration, and managed services'),
('AI/ML', 'Artificial intelligence and machine learning solutions'),
('Mobile Development', 'iOS and Android mobile application development'),
('Data Analytics', 'Business intelligence and data analytics services'),
('Cybersecurity', 'Security audits, compliance, and protection services'),
('Design Services', 'UI/UX design, branding, and creative services'),
('SaaS Development', 'Software as a Service product development'),
('E-commerce', 'Online store development and e-commerce solutions'),
('Digital Marketing', 'SEO, PPC, social media, and content marketing'),
('Web Development', 'Custom web applications and website development')
ON CONFLICT (name) DO NOTHING;

-- Helper function to get industry ID
CREATE OR REPLACE FUNCTION get_industry_id(industry_name TEXT)
RETURNS UUID AS $$
DECLARE
  industry_uuid UUID;
BEGIN
  SELECT id INTO industry_uuid FROM industries WHERE name = industry_name LIMIT 1;
  RETURN industry_uuid;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- WEB DEVELOPMENT COMPANIES (8)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('TechSolutions Pro', 'techsolutions-pro', 
'A leading web development agency specializing in React, Next.js, and modern web applications. We have completed over 500 projects for startups to Fortune 500 companies, focusing on e-commerce platforms, SaaS applications, and enterprise solutions.',
'https://techsolutions-pro.example.com',
'San Francisco, CA',
get_industry_id('Web Development'),
ARRAY['React Development', 'Next.js', 'E-commerce', 'SaaS', 'Enterprise Solutions'],
4.8, 127, true, true),

('WebCraft Studios', 'webcraft-studios',
'Expert web development team creating responsive websites and web applications. We specialize in WordPress, custom PHP, and JavaScript frameworks with over 200 successful projects completed.',
'https://webcraft-studios.example.com',
'Austin, TX',
get_industry_id('Web Development'),
ARRAY['WordPress', 'PHP', 'JavaScript', 'Responsive Design', 'CMS Development'],
4.7, 89, true, true),

('Digital Solutions Inc', 'digital-solutions-inc',
'Full-stack web development company with expertise in modern frameworks and cloud deployment. We provide end-to-end web solutions from concept to deployment, serving Fortune 500 clients.',
'https://digital-solutions-inc.example.com',
'New York, NY',
get_industry_id('Web Development'),
ARRAY['React', 'Vue.js', 'Node.js', 'Cloud Deployment', 'Full-stack Development'],
4.9, 156, true, true),

('Frontend Masters', 'frontend-masters',
'Specialized frontend development agency creating beautiful, responsive web interfaces. We focus on user experience and performance optimization with expertise in HTML5, CSS3, and modern JavaScript frameworks.',
'https://frontend-masters.example.com',
'Seattle, WA',
get_industry_id('Web Development'),
ARRAY['Frontend Development', 'HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js'],
4.8, 94, true, true),

('CodeCrafters', 'codecrafters',
'Full-service web development agency offering custom web applications, e-commerce solutions, and API development. We specialize in Laravel, Django, and modern JavaScript frameworks.',
'https://codecrafters.example.com',
'Chicago, IL',
get_industry_id('Web Development'),
ARRAY['Laravel', 'Django', 'E-commerce', 'API Development', 'Custom Web Apps'],
4.6, 78, true, true),

('Pixel Perfect Web', 'pixel-perfect-web',
'UI/UX focused web development company creating stunning, user-centered web experiences. We combine design excellence with technical expertise in responsive layouts and accessibility.',
'https://pixel-perfect-web.example.com',
'Los Angeles, CA',
get_industry_id('Web Development'),
ARRAY['UI/UX Design', 'Responsive Design', 'Design Systems', 'Accessibility', 'Web Development'],
4.7, 112, true, true),

('Agile Web Solutions', 'agile-web-solutions',
'Rapid web development company specializing in MVP development, startup solutions, and agile methodologies. We have helped 100+ startups launch their web products using React, Angular, and cloud-native technologies.',
'https://agile-web-solutions.example.com',
'Denver, CO',
get_industry_id('Web Development'),
ARRAY['MVP Development', 'React', 'Angular', 'Startup Solutions', 'Agile Development'],
4.8, 145, true, true),

('Enterprise Web Builders', 'enterprise-web-builders',
'Large-scale web development company serving enterprise clients with complex web applications, microservices, and high-traffic systems. We specialize in scalable architecture and DevOps with Fortune 500 clients.',
'https://enterprise-web-builders.example.com',
'Boston, MA',
get_industry_id('Web Development'),
ARRAY['Enterprise Development', 'Microservices', 'Scalable Architecture', 'DevOps', 'High-traffic Systems'],
4.9, 203, true, true);

-- ==========================================
-- CLOUD SERVICES COMPANIES (6)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('CloudScale Solutions', 'cloudscale-solutions',
'Enterprise cloud infrastructure and DevOps consulting firm specializing in AWS, Azure, and Kubernetes. We provide comprehensive cloud migration, optimization, and managed services.',
'https://cloudscale-solutions.example.com',
'Seattle, WA',
get_industry_id('Cloud Services'),
ARRAY['AWS', 'Azure', 'Kubernetes', 'DevOps', 'CI/CD'],
4.8, 167, true, true),

('CloudTech Solutions', 'cloudtech-solutions',
'Premier cloud infrastructure and migration services provider specializing in AWS, Azure, and Google Cloud Platform. We have helped 500+ companies migrate to the cloud with expertise in cloud architecture and cost optimization.',
'https://cloudtech-solutions.example.com',
'Seattle, WA',
get_industry_id('Cloud Services'),
ARRAY['AWS', 'Azure', 'Google Cloud', 'Cloud Migration', 'DevOps', 'Cost Optimization'],
4.9, 234, true, true),

('SkyNet Cloud Services', 'skynet-cloud-services',
'Enterprise cloud consulting and managed services company. We provide 24/7 cloud monitoring and support with expertise in Kubernetes, Docker, and container orchestration for Fortune 500 companies.',
'https://skynet-cloud.example.com',
'San Francisco, CA',
get_industry_id('Cloud Services'),
ARRAY['Kubernetes', 'Docker', 'Container Orchestration', 'Cloud Monitoring', 'Managed Services'],
4.8, 189, true, true),

('DataCloud Innovations', 'datacloud-innovations',
'Cloud data warehousing and analytics platform specialists focusing on AWS Redshift, Snowflake, and BigQuery. We help businesses unlock insights from their data with 300+ data migration projects completed.',
'https://datacloud-innovations.example.com',
'New York, NY',
get_industry_id('Cloud Services'),
ARRAY['AWS Redshift', 'Snowflake', 'BigQuery', 'Data Warehousing', 'Analytics'],
4.7, 156, true, true),

('CloudFirst Consulting', 'cloudfirst-consulting',
'Multi-cloud strategy and implementation specialists helping businesses choose and optimize their cloud infrastructure. We provide hybrid cloud solutions and disaster recovery with expertise in cloud security.',
'https://cloudfirst-consulting.example.com',
'Austin, TX',
get_industry_id('Cloud Services'),
ARRAY['Multi-cloud Strategy', 'Hybrid Cloud', 'Disaster Recovery', 'Cloud Security', 'Infrastructure'],
4.8, 142, true, true),

('SecureCloud Partners', 'securecloud-partners',
'Cloud security and compliance specialists providing SOC 2, HIPAA, and GDPR compliant cloud solutions. We ensure your cloud infrastructure is secure with 99.9% uptime guarantee.',
'https://securecloud-partners.example.com',
'Boston, MA',
get_industry_id('Cloud Services'),
ARRAY['Cloud Security', 'SOC 2 Compliance', 'HIPAA', 'GDPR', 'Compliance', 'Uptime Guarantee'],
4.9, 178, true, true);

-- ==========================================
-- AI/ML COMPANIES (2)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('AI Innovations Lab', 'ai-innovations-lab',
'Artificial intelligence and machine learning consultancy specializing in natural language processing, computer vision, and predictive analytics. We have completed 200+ AI projects across various industries.',
'https://ai-innovations-lab.example.com',
'Austin, TX',
get_industry_id('AI/ML'),
ARRAY['NLP', 'Computer Vision', 'Predictive Analytics', 'Machine Learning', 'Deep Learning'],
4.8, 156, true, true);

-- ==========================================
-- MOBILE DEVELOPMENT COMPANIES (2)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('Mobile First Studios', 'mobile-first-studios',
'Award-winning mobile app development company creating iOS and Android applications. We specialize in React Native, Flutter, and native development with 300+ apps published to app stores.',
'https://mobile-first-studios.example.com',
'New York, NY',
get_industry_id('Mobile Development'),
ARRAY['iOS Development', 'Android Development', 'React Native', 'Flutter', 'Mobile UI/UX'],
4.9, 287, true, true);

-- ==========================================
-- DATA ANALYTICS COMPANIES (2)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('DataDriven Analytics', 'datadriven-analytics',
'Business intelligence and data analytics consultancy with expertise in Tableau, Power BI, and advanced data science. We have helped 150+ companies make data-driven decisions.',
'https://datadriven-analytics.example.com',
'Chicago, IL',
get_industry_id('Data Analytics'),
ARRAY['Business Intelligence', 'Tableau', 'Power BI', 'Data Science', 'Analytics'],
4.7, 142, true, true);

-- ==========================================
-- CYBERSECURITY COMPANIES (2)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('SecureNet Cybersecurity', 'securenet-cybersecurity',
'Comprehensive cybersecurity services including penetration testing, security audits, and compliance consulting. We specialize in SOC 2 and HIPAA compliance with enterprise-grade security solutions.',
'https://securenet-cybersecurity.example.com',
'Boston, MA',
get_industry_id('Cybersecurity'),
ARRAY['Penetration Testing', 'Security Audits', 'Compliance', 'SOC 2', 'HIPAA'],
4.9, 198, true, true);

-- ==========================================
-- DESIGN SERVICES COMPANIES (2)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('CreativeWorks Design', 'creativeworks-design',
'Full-service design agency offering UI/UX design, branding, graphic design, and motion graphics. We create award-winning creative solutions with a focus on user-centered design.',
'https://creativeworks-design.example.com',
'Los Angeles, CA',
get_industry_id('Design Services'),
ARRAY['UI/UX Design', 'Branding', 'Graphic Design', 'Motion Graphics', 'Creative Strategy'],
4.8, 167, true, true);

-- ==========================================
-- SAAS DEVELOPMENT COMPANIES (2)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('SaaS Builders Inc', 'saas-builders-inc',
'End-to-end SaaS product development company helping you build subscription-based software solutions. From MVP to scale, we have launched 100+ successful SaaS products.',
'https://saas-builders-inc.example.com',
'Denver, CO',
get_industry_id('SaaS Development'),
ARRAY['SaaS Development', 'MVP Development', 'Product Strategy', 'Subscription Management', 'Scalable Architecture'],
4.8, 134, true, true);

-- ==========================================
-- E-COMMERCE COMPANIES (1)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('Ecommerce Masters', 'ecommerce-masters',
'Specialized e-commerce development and optimization company with expertise in Shopify, WooCommerce, and custom e-commerce solutions. We have built 250+ successful online stores.',
'https://ecommerce-masters.example.com',
'Miami, FL',
get_industry_id('E-commerce'),
ARRAY['Shopify', 'WooCommerce', 'E-commerce Development', 'Payment Integration', 'Store Optimization'],
4.7, 189, true, true);

-- ==========================================
-- DIGITAL MARKETING COMPANIES (2)
-- ==========================================

INSERT INTO companies (name, slug, description, website, location, industry_id, services, avg_rating, review_count, is_verified, is_active) VALUES

('Digital Marketing Experts', 'digital-marketing-experts',
'Full-service digital marketing agency with proven track record in SEO, PPC, social media, and content marketing. We have driven growth for 300+ businesses across various industries.',
'https://digital-marketing-experts.example.com',
'Phoenix, AZ',
get_industry_id('Digital Marketing'),
ARRAY['SEO', 'PPC', 'Social Media Marketing', 'Content Marketing', 'Marketing Automation'],
4.8, 223, true, true);

-- Clean up helper function
DROP FUNCTION get_industry_id(TEXT);

-- Verify the insertion
SELECT 
  i.name as industry,
  COUNT(c.id) as company_count
FROM companies c
JOIN industries i ON c.industry_id = i.id
WHERE c.created_at > NOW() - INTERVAL '1 minute'
GROUP BY i.name
ORDER BY company_count DESC;

-- Show all newly inserted companies
SELECT 
  c.name as company_name,
  i.name as industry,
  c.location,
  c.avg_rating,
  c.review_count,
  c.is_verified,
  c.slug
FROM companies c
JOIN industries i ON c.industry_id = i.id
WHERE c.created_at > NOW() - INTERVAL '1 minute'
ORDER BY i.name, c.name;

COMMENT ON TABLE companies IS 'Contains all company records including newly added companies across various industries for the B2B reviews platform.';
