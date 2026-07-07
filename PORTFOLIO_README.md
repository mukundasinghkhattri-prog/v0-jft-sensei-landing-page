# Mukunda Singh Khattri - Professional Portfolio

A modern, high-end professional portfolio website for Mukunda Singh Khattri, a Digital Marketing Professional specializing in SEO, SEM, and PPC strategies.

## Features

### 🎨 Design & UX
- **Dark-themed SaaS-style aesthetic** with electric blue accent colors
- **Smooth animations** using Framer Motion for engaging scroll transitions
- **Responsive design** optimized for all devices
- **Premium visual hierarchy** with modern glassmorphism effects
- **Hover effects and micro-interactions** for enhanced engagement

### 📑 Core Sections

1. **Hero Section** - Captivating headline with call-to-action and animated background
2. **Experience Timeline** - Vertical timeline showcasing career progression from ATM Strategic Solutions to OnlineZeal
3. **Skills Dashboard** - Categorized skills grid (Expert & Intermediate levels) with visual proficiency indicators
4. **Education & Certifications** - Academic background and professional credentials
5. **Projects Showcase** - Featured projects including Fraud Detection Software (integrated with Supabase)
6. **Contact Form** - Professional contact form with email integration

### 🔧 Technology Stack

**Frontend:**
- Next.js 16+ (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Framer Motion (animations)
- React Hook Form + Zod (form validation)
- Lucide React (icons)

**Backend & Database:**
- Supabase (PostgreSQL database + Auth)
- Edge Functions support ready

**Communications:**
- Resend (Email service for contact form submissions)

**Analytics & Monitoring:**
- PostHog (Product analytics)
- Environment ready for Sentry integration

### 📊 Database Schema

#### Contact Inquiries Table
```sql
- id (UUID primary key)
- name (text)
- email (text)
- subject (text)
- message (text)
- phone (optional)
- read (boolean)
- created_at, updated_at (timestamps)
```

#### Projects Table
```sql
- id (UUID primary key)
- title, description, long_description (text)
- technologies (array)
- image_url, project_url, github_url (optional URLs)
- category, featured (text/boolean)
- created_at, updated_at (timestamps)
```

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Portfolio Config
NEXT_PUBLIC_SITE_NAME=Mukunda Singh Khattri
NEXT_PUBLIC_AUTHOR_EMAIL=khattrikrishna123@gmail.com
NEXT_PUBLIC_AUTHOR_PHONE=+977-970-586-5379
NEXT_PUBLIC_AUTHOR_LOCATION=Kathmandu, Nepal

# Email Service
RESEND_API_KEY=your_resend_api_key

# Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Supabase Setup

1. Create a new Supabase project
2. Run the migration in `supabase/migrations/`
3. The database schema includes Contact Inquiries and Projects tables with proper RLS policies

### 4. Configure Resend (Email)

1. Sign up at [Resend.com](https://resend.com)
2. Get your API key
3. Add it to `.env.local` as `RESEND_API_KEY`
4. Update the email sender address in `app/api/send-email/route.ts`

### 5. PostHog Analytics (Optional)

1. Create a PostHog account at [PostHog.com](https://posthog.com)
2. Get your project key
3. Add it to `.env.local`

## Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000/portfolio` to see the portfolio site.

## Build & Deploy

### Build

```bash
npm run build
```

### Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or deploy via Vercel CLI
vercel deploy
```

## Project Structure

```
app/
├── portfolio/              # Main portfolio page
├── api/
│   └── send-email/        # Email API endpoint
├── auth/                  # Authentication pages
├── admin/                 # Admin panel
├── dashboard/             # User dashboard
└── pricing/               # Pricing page

components/
├── portfolio/
│   ├── hero.tsx
│   ├── navbar.tsx
│   ├── experience-timeline.tsx
│   ├── skills-dashboard.tsx
│   ├── education.tsx
│   ├── projects.tsx
│   ├── contact-form.tsx
│   └── footer.tsx
└── landing/               # Original landing pages

lib/
├── supabase.ts
├── portfolio-data.ts      # Portfolio content data
└── utils.ts

supabase/
└── migrations/
    └── create_portfolio_schema.sql
```

## Key Features Explained

### Animations
- **Hero Section**: Animated background gradients and fade-in text
- **Timeline**: Staggered animations for experience items
- **Skills**: Interactive skill cards with hover effects
- **Scroll Triggers**: Elements animate into view using Framer Motion viewport detection

### Form Handling
- Client-side validation with React Hook Form + Zod
- Server-side data storage in Supabase
- Email notifications via Resend
- Error handling and user feedback with toast notifications

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints for all screen sizes
- Optimized navigation for mobile devices
- Touch-friendly interactive elements

## Content Management

### Adding Projects
Projects are fetched from Supabase. To add a new project:

```sql
INSERT INTO projects (title, description, technologies, category, featured)
VALUES (
  'Project Title',
  'Short description',
  ARRAY['Tech1', 'Tech2'],
  'Category',
  true
);
```

### Updating Portfolio Data
Edit `lib/portfolio-data.ts` to update:
- Experience details
- Skills
- Education
- Certifications

## Customization

### Color Scheme
Modify colors in Tailwind classes throughout components:
- Primary: `from-blue-500 to-cyan-500`
- Accent: `text-blue-400`
- Background: `bg-slate-900`

### Typography
All text uses the system font stack via Tailwind. Modify in your Tailwind config if needed.

### Content
Update `lib/portfolio-data.ts` with your own information.

## Performance Optimizations

- Next.js static optimization for public pages
- Image optimization with Next.js Image component (ready to use)
- Lazy loading for components with `whileInView` from Framer Motion
- Database indexing on frequently queried fields
- Edge function ready for serverless deployment

## Monitoring & Analytics

### PostHog Setup
- Automatically tracks page views and user interactions
- Custom events for form submissions
- Cohort analysis for user engagement

### Error Tracking
- Ready for Sentry integration
- Environment variables configured
- Error boundaries recommended for React components

## Common Issues & Solutions

### Build Errors
If you encounter build errors:
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Email Not Sending
1. Verify Resend API key is correct
2. Check domain is verified in Resend
3. Review email configuration in `app/api/send-email/route.ts`

### Database Connection Issues
1. Verify Supabase URL and keys are correct
2. Check RLS policies if data not loading
3. Ensure database migrations have run

## Future Enhancements

- [ ] AI-powered chat with resume (Pinecone integration)
- [ ] Blog section with CMS
- [ ] Testimonials/case studies
- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Video demonstrations

## License

This portfolio is customized for Mukunda Singh Khattri. Feel free to use as a template for your own portfolio.

## Support & Questions

For issues or questions:
- Email: khattrikrishna123@gmail.com
- Phone: +977-970-586-5379
- Location: Kathmandu, Nepal

---

**Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion**
