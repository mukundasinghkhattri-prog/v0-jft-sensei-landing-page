# Deployment & Setup Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Supabase database migrations applied
- [ ] Resend API key obtained and configured
- [ ] PostHog account created (optional)
- [ ] GitHub repository created
- [ ] Domain purchased (optional)
- [ ] SSL certificate ready

## Step-by-Step Deployment

### 1. Prepare Your Environment

#### A. Supabase Setup
```bash
# 1. Go to https://supabase.com and create a new project
# 2. Get your project URL and anon key
# 3. In your project, run the migration:

# Copy the contents of supabase/migrations/create_portfolio_schema.sql
# Paste into Supabase SQL Editor and execute
# Verify tables are created: projects, contact_inquiries
```

#### B. Resend Configuration
```bash
# 1. Create account at https://resend.com
# 2. Get your API key from the dashboard
# 3. Verify your sending domain
# 4. Add API key to .env.local
```

#### C. Local Testing
```bash
# Update .env.local with all credentials
cp .env.example .env.local

# Fill in all values:
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=...

# Test locally
npm run dev

# Visit http://localhost:3000/portfolio
```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Mukunda portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/mukunda-portfolio.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Choose "Next.js" as framework

3. **Set Environment Variables**
   ```
   In Vercel Dashboard -> Settings -> Environment Variables:
   
   NEXT_PUBLIC_SUPABASE_URL = your_value
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_value
   NEXT_PUBLIC_SITE_NAME = Mukunda Singh Khattri
   NEXT_PUBLIC_AUTHOR_EMAIL = khattrikrishna123@gmail.com
   NEXT_PUBLIC_AUTHOR_PHONE = +977-970-586-5379
   RESEND_API_KEY = your_value
   NEXT_PUBLIC_POSTHOG_KEY = your_value (optional)
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add RESEND_API_KEY
# ... add all other env vars

# Redeploy with env vars
vercel --prod
```

### 3. Configure Custom Domain

#### In Vercel Dashboard:
1. Go to Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

#### Update email configuration:
```javascript
// In app/api/send-email/route.ts
// Change from email:
from: 'portfolio@your-domain.com'  // Use your custom domain
```

### 4. Post-Deployment Configuration

#### A. Update Portfolio Data
Edit `lib/portfolio-data.ts` with your specific information:
```typescript
// Update experiences, skills, education, certifications
// Commit and push changes
git add lib/portfolio-data.ts
git commit -m "Update portfolio content"
git push
```

#### B. Add Your Projects
Via Supabase Dashboard:
```sql
INSERT INTO projects (
  title, description, technologies, 
  category, featured
) VALUES (
  'Your Project',
  'Description',
  ARRAY['Tech1', 'Tech2'],
  'Category',
  true
);
```

#### C. Test Contact Form
1. Visit your deployed site
2. Scroll to contact section
3. Submit test form
4. Check email for confirmations

#### D. Setup Analytics
In `components/portfolio/footer.tsx`, add PostHog tracking:
```typescript
// Already configured with NEXT_PUBLIC_POSTHOG_KEY
// Optional: Add custom events
posthog?.capture('Contact Form Submitted')
```

### 5. SSL Certificate (Auto-handled by Vercel)

- Vercel automatically provides SSL/TLS certificates
- No configuration needed
- Your site will be accessible via HTTPS

### 6. Email Domain Verification

For better email deliverability with Resend:

1. In Resend Dashboard → Domains
2. Add your custom domain
3. Add SPF, DKIM, DMARC records to your DNS provider
4. Verify domain
5. Use verified domain in `RESEND_FROM_EMAIL`

## Monitoring & Maintenance

### Post-Deployment Monitoring

```bash
# View deployment logs
vercel logs

# Monitor real-time errors
# In Vercel Dashboard → Functions → Logs

# Check database health
# In Supabase Dashboard → Status
```

### Regular Maintenance Tasks

- [ ] **Weekly**: Review contact form submissions in Supabase
- [ ] **Monthly**: Update portfolio content and projects
- [ ] **Monthly**: Review analytics in PostHog
- [ ] **Quarterly**: Update skills and certifications
- [ ] **Quarterly**: Review and optimize performance

### Updating Content

```bash
# To update portfolio:
1. Edit lib/portfolio-data.ts
2. git add lib/portfolio-data.ts
3. git commit -m "Update portfolio"
4. git push
# Vercel will auto-deploy

# To add new projects:
INSERT INTO projects (...) VALUES (...)  # via Supabase
```

## Performance Optimization

### Current Optimizations
- ✅ Static page pre-rendering
- ✅ Image optimization ready
- ✅ Component code splitting
- ✅ Database query indexing

### Additional Optimizations
```typescript
// Enable Image Optimization:
// 1. Install next/image in components
// 2. Add image sizes to next.config.js

// Reduce bundle size:
// npm run build
// Next will show bundle analysis

// Monitor Core Web Vitals:
// In Vercel Dashboard → Analytics
```

## Troubleshooting

### Issue: Build Fails on Vercel
```bash
# Solution:
1. Check build logs in Vercel Dashboard
2. Ensure all env vars are set
3. Test locally: npm run build
4. Fix errors and push again
```

### Issue: Contact Form Not Sending Emails
```bash
# Solution:
1. Verify RESEND_API_KEY is set
2. Check domain verification in Resend
3. Review email server logs
4. Test with curl:
curl -X POST https://api.resend.com/emails \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "from@example.com",
    "to": "to@example.com",
    "subject": "Test",
    "html": "<p>Test</p>"
  }'
```

### Issue: Database Connection Errors
```bash
# Solution:
1. Verify NEXT_PUBLIC_SUPABASE_URL is correct
2. Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is valid
3. Check Supabase project is running
4. Test connection from Supabase SQL editor
```

### Issue: Animations Not Smooth
```bash
# Solution:
1. Check browser hardware acceleration is enabled
2. Reduce animation complexity in Framer Motion
3. Test on different browsers
4. Monitor Core Web Vitals in Vercel Analytics
```

## Scaling Considerations

### When to Optimize:
- Traffic > 1000 requests/day
- Database queries slow
- Build time > 30 seconds

### Scaling Options:
1. **Database**: Upgrade Supabase plan for better performance
2. **CDN**: Vercel's default CDN should handle most traffic
3. **Caching**: Add Redis for frequently accessed data
4. **Search**: Implement Algolia for project search

## Security Checklist

- [ ] All secrets in environment variables (never commit to git)
- [ ] Supabase RLS policies configured
- [ ] Email rate limiting configured (if high volume)
- [ ] CORS properly configured
- [ ] API routes have proper error handling
- [ ] No sensitive data in frontend code
- [ ] SSL/TLS enabled (automatic via Vercel)

## Version Updates

### Keep Dependencies Updated:
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update major versions (review breaking changes first)
npm install -g npm
npm install <package>@latest
```

### Testing Before Updating:
```bash
# Create a backup branch
git checkout -b backup/current-version

# Update dependencies
npm install

# Test locally
npm run dev
npm run build

# If everything works, push to main
git push origin main
```

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Resend Docs**: https://resend.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Framer Motion Docs**: https://www.framer.com/motion/

## Questions or Issues?

Contact: khattrikrishna123@gmail.com
Phone: +977-970-586-5379
Location: Kathmandu, Nepal

---

**Last Updated**: April 28, 2026
