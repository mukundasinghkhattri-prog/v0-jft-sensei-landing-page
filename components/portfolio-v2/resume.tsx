'use client'

import { personal } from '@/lib/portfolio-v2-data'
import { Download, ExternalLink, FileText, Linkedin } from 'lucide-react'

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

const resumeHighlights = [
  { label: "Current Role", value: "PPC Strategist & Research Specialist" },
  { label: "Current Company", value: "ATM Strategic Solutions" },
  { label: "Experience", value: "5+ years in Digital Marketing" },
  { label: "Specialisation", value: "Google Ads, Meta Ads, Analytics" },
  { label: "Education", value: "B.E. Information Science & Engineering" },
  { label: "Location", value: "Kathmandu, Nepal (Remote OK)" },
]

export function ResumeV2() {
  return (
    <section id="resume" className="py-24 lg:py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <SectionBadge>Resume</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Resume
            </span>
          </h2>
          <p className="text-[#CBD5E1] text-lg">
            A summary of my professional background and qualifications.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Resume card */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            {/* Preview area */}
            <div className="relative bg-gradient-to-br from-[#111827] to-[#1E293B] p-10 sm:p-16 flex flex-col items-center justify-center min-h-[280px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-[#06B6D4]/5 pointer-events-none" />
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/30">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{personal.name}</h3>
                <p className="text-[#CBD5E1]">{personal.title}</p>
                <p className="text-sm text-[#CBD5E1]/60 mt-1">{personal.location}</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-white/[0.06]">
              {resumeHighlights.map((item, i) => (
                <div
                  key={i}
                  className={`p-5 ${i < resumeHighlights.length - 1 ? 'border-b sm:border-b-0 border-r-0 sm:border-r border-white/[0.06]' : ''} ${i < 3 ? 'sm:border-b border-white/[0.06]' : ''}`}
                >
                  <p className="text-xs text-[#CBD5E1]/50 mb-1 font-medium">{item.label}</p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="p-6 border-t border-white/[0.06] flex flex-col sm:flex-row gap-3">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
              >
                <Download className="w-4 h-4" />
                Download Resume (PDF)
              </a>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.1] text-white font-medium hover:bg-white/5 hover:border-white/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View Resume
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2563EB]/30 text-[#2563EB] font-medium hover:bg-[#2563EB]/10 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-sm text-[#CBD5E1]/40 mt-4 font-mono">
            [PLACEHOLDER: Upload your PDF resume and update <code className="text-amber-400">personal.resumeUrl</code> in lib/portfolio-v2-data.ts]
          </p>
        </div>
      </div>
    </section>
  )
}
