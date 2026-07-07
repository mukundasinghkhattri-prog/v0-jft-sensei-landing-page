'use client'

import { useState } from 'react'
import { personal } from '@/lib/portfolio-v2-data'
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Send, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
      <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">{children}</span>
    </div>
  )
}

export function ContactV2() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', budget: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setStatus('loading')

    try {
      const { error: dbError } = await supabase.from('contact_inquiries').insert({
        name: form.name,
        email: form.email,
        subject: form.subject || `Portfolio Inquiry from ${form.name}`,
        message: `Budget: ${form.budget || 'Not specified'}\n\n${form.message}`,
      })

      if (dbError) throw dbError

      // Also try to send email
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject || `Portfolio Inquiry from ${form.name}`,
            message: `Budget: ${form.budget || 'Not specified'}\n\n${form.message}`,
          }),
        })
      } catch (_) {}

      setStatus('success')
      setForm({ name: '', email: '', subject: '', budget: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError('Something went wrong. Please try again or email me directly.')
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <SectionBadge>Contact</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Let's Work{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-[#CBD5E1] text-lg">
            Ready to grow your business through data-driven marketing? Let's talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Get In Touch</h3>
              <p className="text-[#CBD5E1] text-sm leading-relaxed">
                Whether you need campaign management, an account audit, or analytics setup — I'd love to hear about your goals.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#CBD5E1]/60 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-white">{personal.email}</p>
                </div>
              </a>

              <a
                href={`tel:${personal.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#CBD5E1]/60 mb-0.5">Phone / WhatsApp</p>
                  <p className="text-sm font-medium text-white">{personal.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#CBD5E1]/60 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-white">{personal.location}</p>
                  <p className="text-xs text-emerald-400">Available worldwide (remote)</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="pt-2">
              <p className="text-sm text-[#CBD5E1]/60 mb-3 font-medium">Connect with me</p>
              <div className="flex gap-3">
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-sm font-medium hover:bg-[#2563EB]/20 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#CBD5E1] text-sm font-medium hover:text-white hover:border-white/20 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-[#CBD5E1] text-sm max-w-sm">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-medium hover:opacity-90 transition-all"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#CBD5E1]/30 text-sm focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#CBD5E1]/30 text-sm focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Google Ads Management"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#CBD5E1]/30 text-sm focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">Monthly Ad Budget</label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#CBD5E1] text-sm focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/20 outline-none transition-all appearance-none"
                      >
                        <option value="">Select range...</option>
                        <option value="under-1k">Under $1,000</option>
                        <option value="1k-5k">$1,000 – $5,000</option>
                        <option value="5k-20k">$5,000 – $20,000</option>
                        <option value="20k-50k">$20,000 – $50,000</option>
                        <option value="50k+">$50,000+</option>
                        <option value="audit-only">Audit / Consultation only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your business, current challenges, and what you're looking to achieve..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#CBD5E1]/30 text-sm focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/20 outline-none transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-rose-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-60 transition-all shadow-lg shadow-blue-500/20"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-[#CBD5E1]/40 text-center">
                    I typically respond within 24 hours. Your information is never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
