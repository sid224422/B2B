# API Setup Guide

## 🚨 Current Issues

Your API routes are failing because of missing Supabase configuration. Here's how to fix them:

## 1. Create Environment Configuration

Create a `.env.local` file in the root directory with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Supabase Service Role Key (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Other environment variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 2. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Go to Settings > API
4. Copy the Project URL and anon public key
5. Paste them in your `.env.local` file

## 3. Database Schema

You'll need to create these tables in Supabase:

```sql
-- Users table
CREATE TABLE users (
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
CREATE TABLE industries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
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
CREATE TABLE reviews (
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
CREATE TABLE leads (
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
CREATE TABLE company_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. API Status After Setup

Once configured, these APIs will work:

- ✅ `/api/companies` - List/create companies
- ✅ `/api/companies/[slug]` - Get/update/delete company
- ✅ `/api/reviews` - List/create reviews
- ✅ `/api/reviews/[id]` - Get/update/delete review
- ✅ `/api/auth` - User authentication
- ✅ `/api/leads` - Lead management
- ✅ `/api/test-supabase` - Connection test

## 5. Test Your APIs

After setup, test with:

```bash
# Test Supabase connection
curl http://localhost:3000/api/test-supabase

# Test companies API
curl http://localhost:3000/api/companies

# Test search API
curl http://localhost:3000/api/search
```

## 6. Current Working APIs

- `/api/test-supabase` - ✅ Working (shows connection status)
- `/api/search` - ✅ Working (placeholder response)
- `/api/analytics` - ✅ Working (placeholder response)

## 7. APIs Needing Database

These will work once Supabase is configured:
- `/api/companies` - ❌ Needs database
- `/api/reviews` - ❌ Needs database
- `/api/auth` - ❌ Needs database
- `/api/leads` - ❌ Needs database
