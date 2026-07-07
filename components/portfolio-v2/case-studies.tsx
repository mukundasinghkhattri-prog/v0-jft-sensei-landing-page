'use client'

import { caseStudies } from '@/lib/portfolio-v2-data'
import { ArrowRight, Info, Clock, DollarSign, Tag } from 'lucide-react'

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

export function CaseStudiesV2() {
  return (
    <section id="case-studies" className="py-24 lg:py-32 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionBadge>Case Studies</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Deep Dives Into{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Real Campaigns
            </span>
          </h2>
          <p className="text-[#CBD5E1] text-lg">
            Detailed breakdowns of strategy, execution, and measurable results.
          </p>
        </div>

        {/* Placeholder notice */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-10 max-w-2xl mx-auto">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-200">
            Case study metrics are placeholders. Update with real client data in{' '}
            <code className="font-mono text-amber-300 bg-amber-500/10 px-1 rounded">lib/portfolio-v2-data.ts</code>.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {caseStudies.map((study, i) => (
            <div
              key={study.id}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden hover:border-white/[0.14] transition-all group"
            >
              {/* Hero image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#2563EB]/10 mb-2">{study.category}</div>
                    <p className="text-xs text-[#CBD5E1]/30 font-medium">Case Study</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-xs font-semibold text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 px-2.5 py-1 rounded-full">
                    {study.category}
                  </span>
                  <span className="text-xs text-[#CBD5E1]/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {study.industry}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2563EB] group-hover:to-[#06B6D4] transition-all">
                  {study.title}
                </h3>
                <p className="text-[#CBD5E1] mb-6 leading-relaxed">{study.subtitle}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-[#CBD5E1]/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Duration: {study.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    Budget: {study.budget}
                  </div>
                </div>

                {/* Sections overview */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'Overview', text: study.sections.overview.slice(0, 80) + '...' },
                    { label: 'Challenge', text: study.sections.challenge.slice(0, 80) + '...' },
                    { label: 'Strategy', text: study.sections.strategy.slice(0, 80) + '...' },
                    { label: 'Lessons', text: study.sections.lessons[0].slice(0, 80) + '...' },
                  ].map((sec, j) => (
                    <div key={j} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-xs font-semibold text-[#2563EB] mb-1">{sec.label}</p>
                      <p className="text-xs text-[#CBD5E1]/70 leading-relaxed">{sec.text}</p>
                    </div>
                  ))}
                </div>

                {/* Results preview */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-white mb-3">Results Preview</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {study.sections.results.metrics.map((metric, j) => (
                      <div key={j} className="p-3 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#06B6D4]/5 border border-[#2563EB]/10 text-center">
                        <p className="text-xs text-[#CBD5E1]/60 mb-1">{metric.label}</p>
                        <p className="text-sm font-bold text-emerald-400">{metric.change}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.sections.tools.map((tool, j) => (
                    <span key={j} className="text-xs font-medium text-[#CBD5E1] bg-white/5 border border-white/[0.08] px-2.5 py-1 rounded-lg">
                      {tool}
                    </span>
                  ))}
                </div>

                <button className="flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#06B6D4] transition-colors">
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
