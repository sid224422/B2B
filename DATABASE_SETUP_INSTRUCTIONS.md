# Database Setup Instructions

## 🎯 **Goal**
Add real web development companies directly to the database so the AI can find and recommend them.

## 📋 **Steps to Add Companies to Database**

### **Step 1: Access Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** tab
3. Click **"New query"**

### **Step 2: Run the SQL Script**
1. Copy the entire content of `insert-web-development-companies.sql`
2. Paste it into the SQL Editor
3. Click **"Run"** to execute the script

### **Step 3: Verify the Insertion**
The script will show you:
- Count of existing companies before insertion
- List of newly inserted web development companies
- Final count of web development companies

## 🏢 **Companies Being Added**

The script adds **8 professional web development companies**:

1. **TechSolutions Pro** (San Francisco) - React, Next.js specialists
2. **WebCraft Studios** (Austin) - WordPress, PHP experts  
3. **Digital Solutions Inc** (New York) - Full-stack development
4. **Frontend Masters** (Seattle) - Frontend specialists
5. **CodeCrafters** (Chicago) - Laravel, Django experts
6. **Pixel Perfect Web** (Los Angeles) - UI/UX focused
7. **Agile Web Solutions** (Denver) - MVP, startup solutions
8. **Enterprise Web Builders** (Boston) - Large-scale, enterprise

## 🔧 **What the Script Does**

### **1. Checks Existing Data**
```sql
SELECT COUNT(*) as existing_companies FROM public.ai_documents;
```

### **2. Creates Helper Function**
- Generates dummy 384-dimensional embeddings
- Required for vector similarity search

### **3. Inserts Company Data**
Each company includes:
- **Detailed content** describing services and expertise
- **Rich metadata** (name, industry, rating, location, services)
- **Dummy embedding** for vector search (384 dimensions)

### **4. Verifies Results**
```sql
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
```

## ✅ **Expected Results**

After running the script, you should see:
- **8 new companies** added to `ai_documents` table
- **All companies** have `industry: "Web Development"`
- **Rich metadata** for each company
- **Verification query** showing all inserted companies

## 🚀 **Test the AI Chat**

After running the script:

1. **Go to**: `http://localhost:3001/ai-chat`
2. **Ask**: "web development agencies" or "find me web developers"
3. **See**: Real companies from your database
4. **Click**: Company cards to view details
5. **Add to compare**: Test the comparison functionality

## 🔍 **Troubleshooting**

### **If Script Fails**
- Check if `ai_documents` table exists
- Verify table has correct schema (embedding column with vector(384))
- Ensure you have proper permissions

### **If No Companies Show**
- Check browser console for errors
- Verify the vector similarity search is working
- Test with a simple query like "web development"

### **If Companies Show but No Details**
- Verify metadata structure matches expected format
- Check if company cards are rendering properly

## 📊 **Database Structure**

### **ai_documents Table**
```sql
CREATE TABLE public.ai_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  embedding vector(384) NOT NULL,
  inserted_at timestamptz NOT NULL DEFAULT now()
);
```

### **Required Metadata Fields**
```json
{
  "type": "company",
  "company_name": "Company Name",
  "company_id": "unique-id",
  "company_slug": "company-slug",
  "industry": "Web Development",
  "category": "Web Development",
  "location": "City, State",
  "rating": 4.8,
  "reviews": 127,
  "employees": "50-100",
  "services": ["React", "Next.js"],
  "description": "Company description"
}
```

## 🎯 **Next Steps**

1. **Run the SQL script** in Supabase
2. **Test the AI chat** with web development queries
3. **Verify companies appear** in search results
4. **Test company interactions** (click, compare)
5. **Add more companies** if needed using the same pattern

**Once the script is run, your AI will show real web development companies from the database!** 🎉
