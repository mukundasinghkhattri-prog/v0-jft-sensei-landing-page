'use client'

import { useState, useEffect } from 'react'
import { personal, navLinks } from '@/lib/portfolio-v2-data'
import { Menu, X, Download, ExternalLink } from 'lucide-react'

export function NavbarV2() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <span className="text-white font-bold text-sm">MK</span>
            </div>
            <span className="text-white font-semibold text-sm hidden sm:block tracking-tight">
              {personal.name.split(' ')[0]}{' '}
              <span className="text-[#CBD5E1] font-normal">{personal.name.split(' ').slice(1).join(' ')}</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active === link.href.replace('#', '')
                    ? 'text-white bg-white/10'
                    : 'text-[#CBD5E1] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#CBD5E1] border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-lg hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#CBD5E1] hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen border-b border-white/[0.06]' : 'max-h-0'
        } bg-[#0F172A]/95 backdrop-blur-xl`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`w-full text-left px-4 py-3 text-sm rounded-xl transition-all ${
                active === link.href.replace('#', '')
                  ? 'text-white bg-white/10 font-medium'
                  : 'text-[#CBD5E1] hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 pb-2 flex flex-col gap-2">
            <button
              onClick={() => scrollTo('#contact')}
              className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-xl"
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
