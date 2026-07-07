'use client'

import { certifications } from '@/lib/portfolio-v2-data'
import { ExternalLink, Award } from 'lucide-react'

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

const certColors = [
  'from-[#2563EB]/20 to-[#2563EB]/5 border-[#2563EB]/20',
  'from-rose-500/20 to-rose-500/5 border-rose-500/20',
  'from-orange-500/20 to-orange-500/5 border-orange-500/20',
  'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20',
  'from-[#06B6D4]/20 to-[#06B6D4]/5 border-[#06B6D4]/20',
]

const certBadgeColors = [
  'text-[#2563EB]',
  'text-rose-400',
  'text-orange-400',
  'text-emerald-400',
  'text-[#06B6D4]',
]

export function CertificationsV2() {
  return (
    <section id="certifications" className="py-24 lg:py-32 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <SectionBadge>Certifications</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Professional{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Credentials
            </span>
          </h2>
          <p className="text-[#CBD5E1] text-lg">
            Industry certifications validating platform expertise across the marketing stack.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {certifications.map((cert, i) => {
            const colorClass = certColors[i % certColors.length]
            const badgeColor = certBadgeColors[i % certBadgeColors.length]

            return (
              <div
                key={cert.id}
                className={`group relative rounded-2xl bg-gradient-to-br ${colorClass} border p-6 hover:scale-[1.02] transition-all duration-300`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${badgeColor} mb-4`}>
                  <Award className="w-6 h-6" />
                </div>

                <h3 className="font-semibold text-white text-sm leading-snug mb-1">{cert.name}</h3>
                <p className={`text-sm font-medium ${badgeColor} mb-3`}>{cert.issuer}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#CBD5E1]/60">Issued</p>
                    <p className="text-sm text-[#CBD5E1] font-medium">{cert.year}</p>
                  </div>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-[#CBD5E1] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Verify
                  </a>
                </div>

                {cert.credentialId && cert.credentialId.startsWith('[PLACEHOLDER') && (
                  <div className="mt-3 pt-3 border-t border-white/[0.06]">
                    <p className="text-xs text-amber-400/70 font-mono">{cert.credentialId}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
