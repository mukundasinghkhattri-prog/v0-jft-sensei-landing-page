import { Toaster } from 'sonner'
import {
  Navbar,
  Hero,
  ExperienceTimeline,
  SkillsDashboard,
  EducationSection,
  ProjectsSection,
  ContactForm,
  Footer,
} from '@/components/portfolio'

export const metadata = {
  title: 'Mukunda Singh Khattri - Digital Marketing Professional',
  description:
    'Results-driven digital marketing professional with expertise in SEO, SEM, and PPC. Discover my experience, skills, and projects.',
  openGraph: {
    title: 'Mukunda Singh Khattri - Digital Marketing Professional',
    description:
      'Expertise in SEO, SEM, PPC, and digital strategy. View my portfolio and get in touch for collaborations.',
    url: 'https://mukunda-portfolio.vercel.app',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      <Hero />
      <ExperienceTimeline />
      <SkillsDashboard />
      <EducationSection />
      <ProjectsSection />
      <ContactForm />
      <Footer />
      <Toaster position="top-center" />
    </main>
  )
}
