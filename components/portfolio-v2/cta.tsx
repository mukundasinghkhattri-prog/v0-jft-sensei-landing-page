'use client'

import { personal } from '@/lib/portfolio-v2-data'
import { ArrowRight, Download } from 'lucide-react'

export function CtaV2() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-[#111827] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-[#CBD5E1]">Open to new opportunities</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
          Ready to Scale Your{' '}
          <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
            Ad Performance?
          </span>
        </h2>

        <p className="text-lg text-[#CBD5E1] max-w-2xl mx-auto mb-10">
          Whether you need campaign management, a full account audit, or analytics implementation — I'm here to help you drive measurable growth.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => scrollTo('contact')}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 hover:border-white/20 transition-all hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}
