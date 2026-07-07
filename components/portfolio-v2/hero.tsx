'use client'

import { useEffect, useRef } from 'react'
import { personal, stats } from '@/lib/portfolio-v2-data'
import { ArrowRight, Download, Mail, MapPin, ChevronDown } from 'lucide-react'

const ROLES = [
  'Performance Marketing Specialist',
  'Google Ads Expert',
  'Meta Ads Strategist',
  'Analytics & Tracking Pro',
  'Growth Marketing Specialist',
]

export function HeroV2() {
  const roleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let roleIndex = 0
    let charIndex = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const type = () => {
      const current = ROLES[roleIndex]
      if (!roleRef.current) return

      if (!deleting) {
        roleRef.current.textContent = current.slice(0, charIndex + 1)
        charIndex++
        if (charIndex === current.length) {
          deleting = true
          timer = setTimeout(type, 2000)
          return
        }
      } else {
        roleRef.current.textContent = current.slice(0, charIndex - 1)
        charIndex--
        if (charIndex === 0) {
          deleting = false
          roleIndex = (roleIndex + 1) % ROLES.length
        }
      }
      timer = setTimeout(type, deleting ? 40 : 70)
    }

    timer = setTimeout(type, 500)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0F172A]"
    >
      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#2563EB]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-[#06B6D4]/8 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-[#2563EB]/5 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-[#CBD5E1]">Available for remote opportunities</span>
            <span className="text-[#CBD5E1]/40">·</span>
            <span className="text-sm text-[#CBD5E1]">{personal.location}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#2563EB] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Mukunda
            </span>
            <br />
            <span className="text-[#CBD5E1] font-normal text-3xl sm:text-4xl lg:text-5xl block mt-2">
              <span ref={roleRef} className="text-white font-semibold" />
              <span className="animate-blink border-r-2 border-[#2563EB] ml-0.5">&nbsp;</span>
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-[#CBD5E1] max-w-2xl leading-relaxed mb-10">
            {personal.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <button
              onClick={() => scrollTo('portfolio')}
              className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 px-6 py-3.5 text-[#CBD5E1] font-semibold rounded-xl border border-white/10 hover:border-white/20 hover:text-white transition-all hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-5 py-4 backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/[0.12] transition-all group"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2563EB] group-hover:to-[#06B6D4] transition-all">
                  {stat.value}
                </div>
                <div className="text-xs text-[#CBD5E1]/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#CBD5E1]/50 hover:text-[#CBD5E1] transition-colors animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient { animation: gradient 4s ease infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}</style>
    </section>
  )
}
