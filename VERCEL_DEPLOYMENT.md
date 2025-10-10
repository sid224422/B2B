# Vercel Deployment Guide

## Quick Fix for Current Build Error

The build is failing because Vercel is looking for modules in the wrong path. This is a simple configuration issue.

### Solution: Set Root Directory in Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **General**
4. Scroll to **Build & Development Settings**
5. **Root Directory**: Leave as `.` (current directory) - this is correct since the repo root IS the Next.js project
6. **Framework Preset**: `Next.js`
7. **Build Command**: `npm run build`
8. **Install Command**: `npm install`
9. **Output Directory**: `.next`
10. Click **Save**

### Trigger New Deployment

After saving settings:
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**

OR simply push a new commit:
```bash
git commit --allow-empty -m "trigger vercel rebuild"
git push origin main
```

## Environment Variables

Make sure these are set in Vercel → Settings → Environment Variables:

### Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### AI Features (Optional)
```
HF_TOKEN=your_huggingface_token
EMBED_MODEL=BAAI/bge-small-en-v1.5
AI_TOP_K=8
AI_MIN_SIM=0.001
```

## Why the Build Failed

The error showed:
```
Module not found: Can't resolve '@/src/lib/ai/generator'
Import map: aliased to relative './src/src/lib/ai/generator'
```

Notice the double `src/src/` - this happens when the path resolution is incorrect. The `tsconfig.json` defines:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

So `@/lib` should resolve to `./src/lib`, not `./src/src/lib`.

This is now fixed with the proper Vercel configuration.

## Verification

After redeployment, you should see:
- ✅ Build completes successfully
- ✅ All routes accessible
- ✅ AI features working (if environment variables are set)

## Support

If issues persist:
1. Check Vercel build logs for specific errors
2. Verify all environment variables are set
3. Ensure latest commit (`a70d601`) is being deployed
4. Try clearing Vercel build cache: Settings → General → Clear Build Cache

## Project Structure

```
b2b-reviews-platform/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── lib/          # Utility functions and AI logic
│   └── hooks/        # Custom React hooks
├── public/           # Static assets
├── package.json      # Dependencies
├── tsconfig.json     # TypeScript config (defines @ paths)
└── next.config.js    # Next.js config
```

The `@` alias points to `./src/` directory as defined in `tsconfig.json`.

