'use client'

import { useState } from 'react'
import { portfolio } from '@/lib/portfolio-v2-data'
import { TrendingUp, TrendingDown, ArrowRight, Info } from 'lucide-react'

const FILTERS = ['All', 'Google Ads', 'Meta Ads', 'Analytics', 'SEO', 'DV360', 'Lead Generation', 'E-commerce']

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

export function PortfolioV2() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? portfolio
    : portfolio.filter(p => p.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase()) || p.category === activeFilter)

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionBadge>Portfolio</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Work &{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          <p className="text-[#CBD5E1] text-lg">
            A selection of campaign projects across paid media, analytics, and organic channels.
          </p>
        </div>

        {/* Placeholder notice */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8 max-w-2xl mx-auto">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-200">
            Results shown as placeholders. Update metrics in{' '}
            <code className="font-mono text-amber-300 bg-amber-500/10 px-1 rounded">lib/portfolio-v2-data.ts</code>{' '}
            with real campaign data.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeFilter === f
                  ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-lg shadow-blue-500/20'
                  : 'border-white/[0.1] text-[#CBD5E1] hover:border-white/20 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="relative h-44 bg-gradient-to-br from-[#111827] to-[#1E293B] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#06B6D4]/20 border border-[#2563EB]/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-[#2563EB]">{project.category[0]}</span>
                    </div>
                    <p className="text-xs text-[#CBD5E1]/40 font-medium">{project.category}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60" />

                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 2).map((tag, j) => (
                    <span key={j} className="text-[10px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-1">
                  <span className="text-xs text-[#CBD5E1]/50 font-medium">{project.industry}</span>
                </div>
                <h3 className="font-semibold text-white text-base mb-2 leading-snug">{project.title}</h3>
                <p className="text-sm text-[#CBD5E1] leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                {/* Results */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {project.results.map((result, j) => (
                    <div key={j} className="text-center p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <div className="flex items-center justify-center gap-0.5 mb-0.5">
                        {result.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-rose-400" />
                        )}
                        <span className={`text-xs font-bold ${result.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {result.value}
                        </span>
                      </div>
                      <p className="text-[9px] text-[#CBD5E1]/50 leading-tight">{result.metric}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.08] text-sm text-[#CBD5E1] hover:text-white hover:border-white/20 hover:bg-white/5 transition-all group-hover:border-[#2563EB]/30">
                  View Case Study
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
