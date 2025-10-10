# ✅ Column Names Fixed

## 🔧 **Issue Resolved**

The SQL script was using incorrect column names for the `companies` table. This has been fixed.

## 📊 **Correct vs Incorrect Column Names**

| ❌ Incorrect (Old) | ✅ Correct (Fixed) |
|-------------------|-------------------|
| `average_rating` | `avg_rating` |
| `total_reviews` | `review_count` |

## 🎯 **What Was Changed**

### **Before (Caused Error)**
```sql
INSERT INTO companies (
  name, slug, description, website, location, 
  industry_id, services, 
  average_rating,    -- ❌ Wrong column name
  total_reviews,     -- ❌ Wrong column name
  is_verified, is_active
) VALUES ...
```

### **After (Fixed)**
```sql
INSERT INTO companies (
  name, slug, description, website, location, 
  industry_id, services, 
  avg_rating,        -- ✅ Correct column name
  review_count,      -- ✅ Correct column name
  is_verified, is_active
) VALUES ...
```

## 📋 **Full Companies Table Schema**

Based on your actual Supabase database:

```sql
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  website TEXT,
  location TEXT,
  industry_id UUID REFERENCES industries(id),
  services TEXT[],                -- Array of service strings
  avg_rating NUMERIC DEFAULT 0,   -- ✅ Correct name
  review_count INTEGER DEFAULT 0, -- ✅ Correct name
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  logo_url TEXT,
  employee_count INTEGER,
  founded_year INTEGER,
  org_id UUID REFERENCES orgs(id),
  embedding VECTOR(384),
  industry TEXT
);
```

## 🚀 **Ready to Run**

The SQL script (`insert-company-records.sql`) is now fixed and ready to run in Supabase.

### **Steps to Execute**

1. **Go to Supabase Dashboard**
2. **Navigate to SQL Editor**
3. **Copy the fixed `insert-company-records.sql`**
4. **Paste and Run**

### **Expected Result**

✅ Successfully inserts **27 companies** across **10 industries**

No more column name errors!

## 🔍 **Verification Queries Also Fixed**

The verification queries at the end of the script now also use the correct column names:

```sql
-- Show all newly inserted companies (FIXED)
SELECT 
  c.name as company_name,
  i.name as industry,
  c.location,
  c.avg_rating,      -- ✅ Fixed
  c.review_count,    -- ✅ Fixed
  c.is_verified,
  c.slug
FROM companies c
JOIN industries i ON c.industry_id = i.id
WHERE c.created_at > NOW() - INTERVAL '1 minute'
ORDER BY i.name, c.name;
```

## ✅ **All Set!**

The script is now corrected and will work with your Supabase database schema. Run it to create all 27 company cards! 🎉
