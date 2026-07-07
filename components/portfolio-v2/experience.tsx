'use client'

import { experiences } from '@/lib/portfolio-v2-data'

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

export function ExperienceV2() {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <SectionBadge>Experience</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Career{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="text-[#CBD5E1] text-lg">
            Over 5 years of progressive experience in performance marketing and digital strategy.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] via-[#06B6D4] to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div key={exp.id} className="relative flex gap-6 sm:gap-10 group">
                  {/* Dot */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-8 h-8 sm:w-16 sm:h-16 flex items-center justify-center ${exp.current ? 'sm:flex hidden' : 'sm:flex hidden'}`}>
                      <div className={`w-3 h-3 rounded-full border-2 ${exp.current ? 'bg-[#2563EB] border-[#2563EB] shadow-lg shadow-blue-500/50' : 'bg-[#0F172A] border-[#CBD5E1]/30'} relative z-10`} />
                    </div>
                    {/* Mobile dot */}
                    <div className={`sm:hidden w-3 h-3 rounded-full border-2 mt-2 ${exp.current ? 'bg-[#2563EB] border-[#2563EB]' : 'bg-[#0F172A] border-[#CBD5E1]/30'} relative z-10`} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 pb-2">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-white text-lg leading-snug">{exp.title}</h3>
                            {exp.current && (
                              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                            <span className="text-xs text-[#CBD5E1]/50 bg-white/5 px-2 py-0.5 rounded-full">
                              {exp.type}
                            </span>
                          </div>
                          <p className="text-[#2563EB] font-medium mt-0.5">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[#CBD5E1]/70 font-medium">{exp.period}</p>
                          <p className="text-xs text-[#CBD5E1]/40 mt-0.5">{exp.location}</p>
                        </div>
                      </div>

                      <p className="text-[#CBD5E1] text-sm mb-4 leading-relaxed">{exp.description}</p>

                      <ul className="space-y-2 mb-5">
                        {exp.achievements.map((ach, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[#CBD5E1]">
                            <span className="text-[#06B6D4] mt-0.5 flex-shrink-0">›</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, j) => (
                          <span key={j} className="text-xs font-medium text-[#CBD5E1] bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
