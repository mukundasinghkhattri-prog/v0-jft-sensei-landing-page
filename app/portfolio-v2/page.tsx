import type { Metadata } from 'next'
import { NavbarV2 } from '@/components/portfolio-v2/navbar'
import { HeroV2 } from '@/components/portfolio-v2/hero'
import { AboutV2 } from '@/components/portfolio-v2/about'
import { ServicesV2 } from '@/components/portfolio-v2/services'
import { ExperienceV2 } from '@/components/portfolio-v2/experience'
import { PortfolioV2 } from '@/components/portfolio-v2/portfolio-section'
import { CaseStudiesV2 } from '@/components/portfolio-v2/case-studies'
import { SkillsV2 } from '@/components/portfolio-v2/skills'
import { ProcessV2 } from '@/components/portfolio-v2/process'
import { CertificationsV2 } from '@/components/portfolio-v2/certifications'
import { ResumeV2 } from '@/components/portfolio-v2/resume'
import { FaqV2 } from '@/components/portfolio-v2/faq'
import { CtaV2 } from '@/components/portfolio-v2/cta'
import { ContactV2 } from '@/components/portfolio-v2/contact'
import { FooterV2 } from '@/components/portfolio-v2/footer'

export const metadata: Metadata = {
  title: 'Mukunda Singh Khattri – Performance Marketing Specialist | Google Ads & Meta Ads Expert',
  description:
    'Mukunda Singh Khattri is a Performance Marketing Specialist based in Nepal with 5+ years of experience in Google Ads, Meta Ads, GA4, GTM, and data-driven growth strategies. Available for remote opportunities worldwide.',
  keywords: [
    'Performance Marketing Specialist',
    'Google Ads Expert Nepal',
    'Meta Ads Specialist',
    'Digital Marketing Consultant',
    'PPC Strategist',
    'Google Analytics 4',
    'Google Tag Manager',
    'Looker Studio',
    'Mukunda Singh Khattri',
    'Paid Media Expert',
    'DV360',
  ],
  openGraph: {
    title: 'Mukunda Singh Khattri – Performance Marketing Specialist',
    description:
      'Driving measurable business growth through Google Ads, Meta Ads, Analytics, and Data-Driven Marketing.',
    url: 'https://mukundasinghkhattri.com.np',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mukunda Singh Khattri – Performance Marketing Specialist',
    description:
      'Google Ads & Meta Ads Expert. Driving measurable ROI through data-driven paid media strategies.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://mukundasinghkhattri.com.np',
  },
}

export default function PortfolioV2Page() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-x-hidden">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Mukunda Singh Khattri',
            jobTitle: 'Performance Marketing Specialist',
            description: 'Performance Marketing Specialist with 5+ years experience in Google Ads, Meta Ads, and data-driven digital marketing.',
            url: 'https://mukundasinghkhattri.com.np',
            email: 'khattrikrishna123@gmail.com',
            telephone: '+977-970-586-5379',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kathmandu',
              addressCountry: 'NP',
            },
            sameAs: [
              'https://www.linkedin.com/in/mukunda-singh-khattri-1515b7129',
            ],
            knowsAbout: [
              'Google Ads',
              'Meta Ads',
              'Performance Marketing',
              'Google Analytics 4',
              'Google Tag Manager',
              'Looker Studio',
              'SEO',
              'Digital Marketing',
            ],
          }),
        }}
      />

      <NavbarV2 />
      <HeroV2 />
      <AboutV2 />
      <ServicesV2 />
      <ExperienceV2 />
      <PortfolioV2 />
      <CaseStudiesV2 />
      <SkillsV2 />
      <ProcessV2 />
      <CertificationsV2 />
      <ResumeV2 />
      <FaqV2 />
      <CtaV2 />
      <ContactV2 />
      <FooterV2 />
    </div>
  )
}
