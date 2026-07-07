'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/lib/portfolio-data'
import { Calendar, MapPin, Briefcase } from 'lucide-react'

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 bg-slate-800/50 backdrop-blur-lg border-b border-slate-700">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Professional Experience</h2>
          <p className="text-slate-400">Journey through my career growth and achievements</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-slate-600" />

          {/* Experience items */}
          <div className="space-y-8 pl-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-10 top-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full border-4 border-slate-800 flex items-center justify-center">
                  <div className="w-3 h-3 bg-slate-800 rounded-full" />
                </div>

                {/* Card */}
                <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <Briefcase className="w-5 h-5 text-slate-500" />
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4">{exp.description}</p>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-slate-300 flex gap-2">
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
