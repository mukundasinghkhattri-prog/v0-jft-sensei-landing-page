'use client'

import { useState } from 'react'
import { faqs, testimonials } from '@/lib/portfolio-v2-data'
import { ChevronDown, Info, Star } from 'lucide-react'

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

export function FaqV2() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 lg:py-32 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <div className="mb-24">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <SectionBadge>Testimonials</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              What Clients{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                Say
              </span>
            </h2>
          </div>

          {/* Placeholder notice */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8 max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-200">
              Testimonials are placeholders. Request reviews from past clients and update{' '}
              <code className="font-mono text-amber-300 bg-amber-500/10 px-1 rounded">lib/portfolio-v2-data.ts</code>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={t.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-[#CBD5E1] text-sm leading-relaxed mb-4 italic">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-semibold text-sm">
                    {t.name.startsWith('[') ? '?' : t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-[#CBD5E1]/60">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.06] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <span className="font-medium text-white text-sm pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#CBD5E1] flex-shrink-0 transition-transform duration-300 ${
                      open === i ? 'rotate-180 text-[#2563EB]' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-[#CBD5E1] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
