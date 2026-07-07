'use client'

import { services } from '@/lib/portfolio-v2-data'
import { Check } from 'lucide-react'

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

const iconComponents: Record<string, React.ReactNode> = {
  BarChart3: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Target: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  LineChart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  Search: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Monitor: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  ClipboardList: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
}

const accentColors: Record<string, string> = {
  blue: 'from-[#2563EB]/20 to-[#2563EB]/5 border-[#2563EB]/20 text-[#2563EB]',
  cyan: 'from-[#06B6D4]/20 to-[#06B6D4]/5 border-[#06B6D4]/20 text-[#06B6D4]',
  emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
  orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/20 text-orange-400',
  purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400',
  rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/20 text-rose-400',
}

export function ServicesV2() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <SectionBadge>Services</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            What I Can Do For{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Your Business
            </span>
          </h2>
          <p className="text-[#CBD5E1] text-lg">
            End-to-end performance marketing solutions — from strategy to execution to reporting.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const colorClass = accentColors[service.accentColor] || accentColors.blue
            const [fromTo] = colorClass.split(' ')

            return (
              <div
                key={service.id}
                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${fromTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass.split(' ').slice(0, 2).join(' ')} border ${colorClass.split(' ')[2]} flex items-center justify-center mb-4 ${colorClass.split(' ')[3]} group-hover:scale-110 transition-transform`}>
                    {iconComponents[service.icon] || iconComponents.BarChart3}
                  </div>

                  <h3 className="font-semibold text-white text-lg mb-2">{service.title}</h3>
                  <p className="text-[#CBD5E1] text-sm mb-5 leading-relaxed">{service.shortDesc}</p>

                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#CBD5E1]">
                        <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${colorClass.split(' ')[3]}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
