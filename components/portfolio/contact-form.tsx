'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Mail, MessageSquare, User, Phone } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Save to Supabase
      const { error } = await supabase.from('contact_inquiries').insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      })

      if (error) throw error

      // Send email via API route
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
      }

      toast.success('Message sent successfully! I will get back to you soon.')
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-slate-800/50 backdrop-blur-lg border-b border-slate-700">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-slate-400">Have a project in mind? Let's collaborate!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/20 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <a
                    href="mailto:khattrikrishna123@gmail.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    khattrikrishna123@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-900/20 border border-cyan-500/20 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <a
                    href="tel:+977-970-586-5379"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    +977-970-586-5379
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/20 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Location</h3>
                  <p className="text-slate-400">
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/50 focus:ring-1 outline-none transition-all duration-300"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/50 focus:ring-1 outline-none transition-all duration-300"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone (Optional)
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/50 focus:ring-1 outline-none transition-all duration-300"
                placeholder="+977-XXXXXXXXXX"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
              <input
                type="text"
                {...register('subject')}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/50 focus:ring-1 outline-none transition-all duration-300"
                placeholder="Project inquiry"
              />
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Message
              </label>
              <textarea
                {...register('message')}
                rows={5}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/50 focus:ring-1 outline-none transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
