# 🚀 Vercel Deployment Guide

This guide will walk you through deploying your Feedback Form App to Vercel with a PostgreSQL database.

## Prerequisites

- [ ] GitHub, GitLab, or Bitbucket account
- [ ] Vercel account ([vercel.com](https://vercel.com))
- [ ] Your code pushed to a Git repository
- [ ] OpenAI API key

---

## Step 1: Set Up PostgreSQL Database

You need a PostgreSQL database for production. Choose one of these options:

### Option A: Vercel Postgres (Recommended) ⭐

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" in the top navigation
3. Click "Create Database"
4. Select "Postgres"
5. Choose your region (select closest to your users)
6. Click "Create"
7. **Copy the `POSTGRES_PRISMA_URL`** - you'll need this later

### Option B: Neon (Free Tier Available)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string (looks like `postgresql://user:pass@host.neon.tech/dbname`)
4. Save it for later

### Option C: Supabase (Free Tier Available)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to Settings → Database
4. Copy the "Connection string" (URI format)
5. Save it for later

---

## Step 2: Prepare Environment Variables

Generate your `AUTH_SECRET` by running this command locally:

```bash
openssl rand -base64 32
```

**Prepare these values (copy them to a text file):**

```
DATABASE_URL=<your-postgres-connection-string>
AUTH_SECRET=<output-from-openssl-command>
DASHBOARD_PASSWORD=<choose-a-secure-password>
OPENAI_API_KEY=<your-openai-api-key>
NODE_ENV=production
```

---

## Step 3: Push Your Code to Git

If you haven't already, push your code to GitHub (or GitLab/Bitbucket):

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create a GitHub repository, then push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy to Vercel

### Via Vercel Dashboard (Recommended for First Deploy)

1. **Go to [vercel.com](https://vercel.com/new)** and sign in

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Find and import your repository

3. **Configure Project**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `pnpm build` (should auto-detect)
   - **Install Command**: `pnpm install` (should auto-detect)

4. **Add Environment Variables**

   Click "Environment Variables" and add each one:

   | Name                 | Value                             | Environment |
   | -------------------- | --------------------------------- | ----------- |
   | `DATABASE_URL`       | Your PostgreSQL connection string | Production  |
   | `AUTH_SECRET`        | Generated secret from Step 2      | Production  |
   | `DASHBOARD_PASSWORD` | Your secure password              | Production  |
   | `OPENAI_API_KEY`     | Your OpenAI API key               | Production  |
   | `NODE_ENV`           | `production`                      | Production  |

   > **Important**: If using Vercel Postgres, the `DATABASE_URL` will be automatically set when you connect the database to your project.

5. **Connect Vercel Postgres Database** (if using Option A)
   - In your project settings, go to "Storage"
   - Click "Connect Store"
   - Select your Postgres database
   - This will automatically set `DATABASE_URL` and related env vars

6. **Click "Deploy"**

   Wait 2-3 minutes for the deployment to complete.

7. **Verify Deployment**
   - Once deployed, click "Visit" to see your live site
   - Visit `/login` to access the dashboard
   - Use your `DASHBOARD_PASSWORD` to log in

---

## Step 5: Run Database Migrations

Your migrations should run automatically during the build process (thanks to the updated `build` script). However, if you encounter database issues:

### Option A: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Get production DATABASE_URL
vercel env pull .env.production

# Run migrations
DATABASE_URL="<your-production-url>" pnpm db:migrate
```

### Option B: Manually via Database Client

If migrations fail, you can run them manually:

1. Connect to your PostgreSQL database using a client (like pgAdmin or TablePlus)
2. Run the SQL files in `prisma/migrations/` in order

---

## Step 6: Test Your Deployment

Visit your deployed site and test:

- [ ] Homepage loads correctly
- [ ] Feedback form works
- [ ] Can submit feedback
- [ ] Dashboard login works (`/login`)
- [ ] Dashboard displays data correctly
- [ ] No console errors

---

## Ongoing Deployments

After the initial setup, Vercel will automatically deploy:

- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

To redeploy manually:

```bash
vercel --prod
```

---

## Troubleshooting

### "Build failed" error

**Check build logs** in Vercel dashboard:

- Look for missing environment variables
- Check for TypeScript errors
- Verify all dependencies are installed

### Database connection errors

**Verify DATABASE_URL**:

- Check that it starts with `postgresql://`
- Ensure it includes `?sslmode=require` for production databases
- Test connection locally with the production URL

### "Prisma Client not found" error

**Run in Vercel project settings**:

```bash
prisma generate
```

Or make sure your `build` script includes `prisma generate` (already done).

### Migration errors

**Check migration status**:

```bash
# Get production DATABASE_URL from Vercel
vercel env pull .env.production

# Check status
DATABASE_URL="<production-url>" pnpm prisma migrate status

# Deploy pending migrations
DATABASE_URL="<production-url>" pnpm prisma migrate deploy
```

### Environment variables not working

1. Go to Vercel project → Settings → Environment Variables
2. Verify all required variables are set for "Production"
3. Redeploy after adding/updating variables

---

## Updating Your Deployment

### To deploy code changes:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically rebuild and redeploy.

### To update environment variables:

1. Go to Vercel project → Settings → Environment Variables
2. Update the variable
3. Redeploy from the Deployments tab

### To run new database migrations:

1. Create migration locally: `pnpm db:generate`
2. Test locally
3. Commit migration files
4. Push to Git
5. Vercel will run migrations automatically during build

---

## Security Checklist

Before going live, ensure:

- [ ] `AUTH_SECRET` is strong and secure (32+ characters)
- [ ] `DASHBOARD_PASSWORD` is strong (12+ characters recommended)
- [ ] `OPENAI_API_KEY` is kept secret
- [ ] `DATABASE_URL` is never committed to Git
- [ ] `.env` file is in `.gitignore` (should be by default)
- [ ] All API endpoints are protected as needed
- [ ] HTTPS is enabled (Vercel does this automatically)

---

## Custom Domain (Optional)

To add a custom domain:

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your domain
4. Update DNS records with your domain provider
5. Wait for DNS propagation (up to 24 hours)

---

## Useful Commands

```bash
# Check deployment status
vercel inspect [deployment-url]

# View logs
vercel logs [deployment-url]

# Pull environment variables
vercel env pull

# Redeploy
vercel --prod

# Run production build locally
pnpm preview
```

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides)

---

## 🎉 You're Done!

Your Feedback Form App is now live on Vercel! Share your URL with users and start collecting feedback.

**Your deployment URL**: `https://your-app-name.vercel.app`

Need to make changes? Just push to your Git repository and Vercel will handle the rest! 🚀
