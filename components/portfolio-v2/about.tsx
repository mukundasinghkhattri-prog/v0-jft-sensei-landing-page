'use client'

import { personal, education, whyWorkWithMe } from '@/lib/portfolio-v2-data'
import { MapPin, Mail, Phone, ExternalLink, GraduationCap } from 'lucide-react'
import dynamic from 'next/dynamic'

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    Code: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    GitMerge: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
    BarChart2: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    MessageCircle: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    Layers: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4l8 4-8 4-8-4 8-4zm0 8l8 4-8 4-8-4 8-4z" /></svg>,
    Globe: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  }

  return (
    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#06B6D4]/20 border border-[#2563EB]/20 flex items-center justify-center text-[#06B6D4] group-hover:scale-110 transition-transform">
          {iconMap[icon] || iconMap['Globe']}
        </div>
        <div>
          <h4 className="font-semibold text-white mb-1 text-sm">{title}</h4>
          <p className="text-[#CBD5E1] text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function AboutV2() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionBadge>About Me</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Turning Ad Budgets Into{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Predictable Revenue
            </span>
          </h2>
          <p className="text-[#CBD5E1] text-lg leading-relaxed">{personal.bio}</p>
        </div>

        {/* Bio + Quick Info */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Portrait placeholder */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#111827] to-[#1E293B] border border-white/[0.06] aspect-[4/5] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white shadow-2xl shadow-blue-500/30">
                  MK
                </div>
                <p className="text-white font-semibold text-lg">{personal.name}</p>
                <p className="text-[#CBD5E1] text-sm mt-1">{personal.title}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  {personal.availability}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-[#06B6D4]/5 pointer-events-none" />
            </div>

            {/* Quick contact */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#CBD5E1]">
                <MapPin className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                {personal.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-[#CBD5E1]">
                <Mail className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                <a href={`mailto:${personal.email}`} className="hover:text-white transition-colors truncate">
                  {personal.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#CBD5E1]">
                <Phone className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                <a href={`tel:${personal.phone}`} className="hover:text-white transition-colors">
                  {personal.phone}
                </a>
              </div>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full justify-center mt-4 py-2.5 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-sm font-medium hover:bg-[#2563EB]/20 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Bio + Education */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">My Story</h3>
              <div className="space-y-4 text-[#CBD5E1] leading-relaxed">
                <p>{personal.bioExtended}</p>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#2563EB]" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="font-semibold text-white text-sm leading-snug">{edu.degree}</h4>
                        <p className="text-[#2563EB] text-sm mt-0.5">{edu.institution}</p>
                      </div>
                      <span className="flex-shrink-0 text-xs text-[#CBD5E1]/60 font-medium bg-white/5 px-2.5 py-1 rounded-lg">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs text-[#CBD5E1]/60 mb-2">{edu.location}</p>
                    <ul className="space-y-1">
                      {edu.highlights.map((h, j) => (
                        <li key={j} className="text-sm text-[#CBD5E1] flex gap-2">
                          <span className="text-[#06B6D4] mt-0.5 flex-shrink-0">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Work With Me */}
        <div>
          <div className="text-center mb-10">
            <SectionBadge>Why Work With Me</SectionBadge>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              What Sets Me Apart
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyWorkWithMe.map((item, i) => (
              <ValueCard key={i} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
