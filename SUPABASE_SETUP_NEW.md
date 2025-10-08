# Supabase Setup - New Project

## 🎯 New Supabase Project URL
**Updated URL**: `https://ryhuhmgnfsajfuooxwya.supabase.co`

## 📋 Setup Steps

### Step 1: Create Environment File

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration - New Project
NEXT_PUBLIC_SUPABASE_URL=https://ryhuhmgnfsajfuooxwya.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Supabase Service Role Key (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: Other environment variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 2: Get Your API Keys

1. Go to [supabase.com](https://supabase.com)
2. Navigate to your project: `ryhuhmgnfsajfuooxwya`
3. Go to **Settings** → **API**
4. Copy the **anon public key** and paste it in your `.env.local` file

### Step 3: Create Database Schema

Go to your Supabase project → **SQL Editor** and run this complete migration:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Industries table
CREATE TABLE IF NOT EXISTS industries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  website TEXT,
  location TEXT,
  industry_id UUID REFERENCES industries(id),
  services TEXT[],
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  project_type TEXT,
  project_budget TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  message TEXT NOT NULL,
  project_type TEXT,
  budget_range TEXT,
  timeline TEXT,
  contact_preference TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company media table
CREATE TABLE IF NOT EXISTS company_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample industries
INSERT INTO industries (name, description) VALUES
('Web Development', 'Custom web applications and websites'),
('Digital Marketing', 'SEO, social media, and online advertising'),
('Cloud Solutions', 'Cloud infrastructure and migration services'),
('Mobile App Development', 'iOS and Android app development'),
('Data Analytics', 'Business intelligence and data analysis'),
('Cybersecurity', 'Security consulting and implementation')
ON CONFLICT (name) DO NOTHING;

-- Insert sample companies
INSERT INTO companies (name, slug, description, website, location, industry_id, services, is_verified, is_active) VALUES
('TechCorp Solutions', 'techcorp-solutions', 'Leading provider of enterprise software solutions', 'https://techcorp.com', 'San Francisco, CA', (SELECT id FROM industries WHERE name = 'Web Development'), ARRAY['Web Development', 'API Integration', 'Cloud Migration'], true, true),
('Digital Marketing Pro', 'digital-marketing-pro', 'Full-service digital marketing agency', 'https://digitalmarketingpro.com', 'New York, NY', (SELECT id FROM industries WHERE name = 'Digital Marketing'), ARRAY['SEO', 'Social Media', 'PPC Advertising'], true, true),
('Cloud Innovators', 'cloud-innovators', 'Cloud infrastructure and DevOps experts', 'https://cloudinnovators.com', 'Seattle, WA', (SELECT id FROM industries WHERE name = 'Cloud Solutions'), ARRAY['AWS Consulting', 'Azure Solutions', 'DevOps'], true, true)
ON CONFLICT (slug) DO NOTHING;
```

### Step 4: Enable Row Level Security (RLS)

Run this in the SQL Editor to enable RLS:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_media ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for companies table
CREATE POLICY "Anyone can view active companies" ON companies
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can create companies" ON companies
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own companies" ON companies
  FOR UPDATE USING (auth.uid() = owner_id);

-- Create policies for reviews table
CREATE POLICY "Anyone can view active reviews" ON reviews
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for leads table
CREATE POLICY "Users can view their own leads" ON leads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create leads" ON leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for company_media table
CREATE POLICY "Anyone can view company media" ON company_media
  FOR SELECT USING (true);

CREATE POLICY "Company owners can manage media" ON company_media
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM companies 
      WHERE companies.id = company_media.company_id 
      AND companies.owner_id = auth.uid()
    )
  );
```

### Step 5: Test the Connection

After setting up the environment file and database schema:

1. **Restart your development server**:
   ```bash
   cd "C:\Users\ssid2\OneDrive\Desktop\B2B App\b2b-reviews-platform"
   npm run dev
   ```

2. **Test the Supabase connection**:
   ```bash
   Invoke-WebRequest -Uri "http://localhost:3000/api/test-supabase" -Method GET
   ```

3. **Test the companies API**:
   ```bash
   Invoke-WebRequest -Uri "http://localhost:3000/api/companies" -Method GET
   ```

## 🎯 Expected Results

After completing these steps:

- ✅ All API endpoints will work
- ✅ Database operations will function properly
- ✅ Authentication will work
- ✅ Sample data will be available
- ✅ All CRUD operations will work

## 🔧 Troubleshooting

If you encounter issues:

1. **Check environment variables** are correctly set
2. **Verify API keys** are copied correctly
3. **Check database schema** was created successfully
4. **Restart the development server** after changes
5. **Check browser console** for any errors

## 📊 API Endpoints Status

Once configured, these will work:

- ✅ `/api/test-supabase` - Connection test
- ✅ `/api/companies` - List/create companies
- ✅ `/api/companies/[slug]` - Get/update/delete company
- ✅ `/api/reviews` - List/create reviews
- ✅ `/api/reviews/[id]` - Get/update/delete review
- ✅ `/api/auth` - User authentication
- ✅ `/api/leads` - Lead management
- ✅ `/api/search` - Search functionality
- ✅ `/api/analytics` - Analytics data
- ✅ `/api/upload` - File uploads
