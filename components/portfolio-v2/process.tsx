'use client'

import { process, industries, tools } from '@/lib/portfolio-v2-data'

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

const processIcons: Record<string, React.ReactNode> = {
  Search: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Map: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  Rocket: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  TrendingUp: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
}

export function ProcessV2() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Process */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <SectionBadge>My Process</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            How I{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-[#CBD5E1] text-lg">
            A repeatable framework for delivering predictable results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {process.map((step, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.06] transition-all group"
            >
              {/* Connector line */}
              {i < process.length - 1 && (
                <div className="hidden lg:block absolute top-[2.25rem] left-full w-5 h-px bg-gradient-to-r from-white/10 to-transparent z-10" />
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#06B6D4]/20 border border-[#2563EB]/20 flex items-center justify-center text-[#06B6D4] group-hover:scale-110 transition-transform">
                  {processIcons[step.icon] || processIcons.Search}
                </div>
                <span className="text-4xl font-bold text-white/[0.06] leading-none mt-1">{step.step}</span>
              </div>

              <h3 className="font-semibold text-white text-base mb-2">{step.title}</h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Industries */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <SectionBadge>Industries</SectionBadge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
              Industries I've Worked With
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-[#CBD5E1] hover:text-white hover:border-white/[0.18] hover:bg-white/[0.07] transition-all"
              >
                {ind}
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <div className="text-center mb-10">
            <SectionBadge>Tech Stack</SectionBadge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
              Tools & Platforms
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#2563EB]">{tool.name[0]}</span>
                </div>
                <span className="text-sm text-[#CBD5E1] group-hover:text-white transition-colors">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
