'use client'

import { personal, navLinks } from '@/lib/portfolio-v2-data'
import { Mail, Phone, MapPin, ExternalLink, ArrowUp } from 'lucide-react'

export function FooterV2() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0F172A] border-t border-white/[0.06]">
      {/* CTA Banner */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Ready to grow your business?</h3>
              <p className="text-[#CBD5E1]">Let's build campaigns that drive real results.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => scrollTo('#contact')}
                className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
              >
                Start a Conversation
              </button>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-white/[0.1] text-[#CBD5E1] hover:text-white hover:border-white/20 transition-all text-sm font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center">
                <span className="text-white font-bold text-sm">MK</span>
              </div>
              <span className="text-white font-bold tracking-tight">{personal.name}</span>
            </div>
            <p className="text-sm text-[#CBD5E1] leading-relaxed mb-5 max-w-xs">
              {personal.tagline}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#CBD5E1]/70">
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <a href={`mailto:${personal.email}`} className="hover:text-white transition-colors">
                  {personal.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#CBD5E1]/70">
                <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                <a href={`tel:${personal.phone}`} className="hover:text-white transition-colors">
                  {personal.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#CBD5E1]/70">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{personal.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-[#CBD5E1]/70 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              {['Google Ads', 'Meta Ads', 'Analytics & GTM', 'SEO Strategy', 'DV360', 'Account Audits'].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-sm text-[#CBD5E1]/70 hover:text-white transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-[#CBD5E1]/40">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400/70">
              <span className="w-1.5 h-1.5 bg-emerald-400/70 rounded-full animate-pulse" />
              Available for work
            </div>
            <button
              onClick={scrollTop}
              className="flex items-center gap-1.5 text-xs text-[#CBD5E1]/50 hover:text-white transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
