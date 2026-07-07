'use client'

import { motion } from 'framer-motion'
import { education, certifications } from '@/lib/portfolio-data'
import { BookOpen, Award, Globe } from 'lucide-react'

export function EducationSection() {
  return (
    <section id="education" className="py-24 bg-slate-800/50 backdrop-blur-lg border-b border-slate-700">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Education & Certifications</h2>
          <p className="text-slate-400">Academic foundation and professional credentials</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-blue-400" />
              Degrees
            </h3>

            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-slate-600 rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                    <p className="text-blue-400">{edu.field}</p>
                  </div>
                  <Globe className="w-5 h-5 text-slate-500" />
                </div>

                <p className="text-slate-400 text-sm mb-2">{edu.school}</p>
                <p className="text-slate-500 text-sm mb-3">{edu.location} • {edu.period}</p>

                {edu.project && (
                  <div className="mt-4 pt-4 border-t border-slate-600">
                    <p className="text-slate-300 font-medium">Project: {edu.project}</p>
                    <p className="text-slate-400 text-sm mt-1">{edu.projectDescription}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-cyan-400" />
              Certifications
            </h3>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-cyan-600/20 to-blue-900/20 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ translateY: -4 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-white text-sm">{cert.name}</p>
                      <p className="text-cyan-400 text-xs mt-1">{cert.issuer}</p>
                    </div>
                    <span className="text-slate-500 text-xs ml-2 flex-shrink-0">{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
