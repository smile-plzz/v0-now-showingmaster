# Vercel Deployment Guide - NowShowing

## Quick Deployment Steps

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Code pushed to GitHub repository

### Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Prepare for Vercel deployment with Server Components"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/smile-plzz/v0-now-showingmaster.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `next build`
   - **Output Directory**: (leave as default)

5. Add Environment Variable (optional):
   - Name: `NEXT_PUBLIC_APP_URL`
   - Value: `https://your-project-name.vercel.app` (you'll get this after first deploy)

6. Click "Deploy"

### Step 3: After First Deployment

1. Copy your deployment URL (e.g., `https://nowshowing-xyz.vercel.app`)
2. Go to Project Settings → Environment Variables
3. Add `NEXT_PUBLIC_APP_URL` with your deployment URL
4. Redeploy the project

### Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, then deploy to production
vercel --prod
```

## Troubleshooting

### If build fails:
1. Check build logs in Vercel dashboard
2. Make sure all dependencies are in `package.json`
3. Verify PostCSS and Tailwind configs are correct

### Common issues:
- **PostCSS errors**: Make sure `@tailwindcss/postcss`, `tailwindcss`, and `autoprefixer` are in devDependencies
- **API errors during build**: This is expected - APIs will work once deployed
- **Missing dependencies**: Run `npm install` locally to verify

## Expected Result

Once deployed, your app will be available at `https://your-project-name.vercel.app` with:
- ✅ Server-side rendering
- ✅ Optimized performance
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant cache invalidation on redeploy

---

**Need the deployed link?** After deployment, your URL will be:
`https://[your-project-name].vercel.app`

Share that link to get feedback!
