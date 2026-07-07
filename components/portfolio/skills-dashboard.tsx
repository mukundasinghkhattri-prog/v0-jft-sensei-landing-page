'use client'

import { motion } from 'framer-motion'
import { skills } from '@/lib/portfolio-data'
import { Star, Zap } from 'lucide-react'

export function SkillsDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800/50 border-b border-slate-700">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
          <p className="text-slate-400">A comprehensive overview of my professional capabilities</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Expert Skills */}
          <motion.div
            className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Expert Level</h3>
            </div>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skills.expert.map((skill) => (
                <motion.div
                  key={skill}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 cursor-default"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Intermediate Skills */}
          <motion.div
            className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Intermediate Level</h3>
            </div>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skills.intermediate.map((skill) => (
                <motion.div
                  key={skill}
                  className="px-4 py-2 bg-slate-700/50 border border-purple-500/30 text-slate-300 rounded-full font-medium text-sm hover:border-purple-500 hover:text-slate-200 transition-all duration-300 cursor-default"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Skill Categories */}
        <motion.div
          className="mt-16 grid md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Digital Marketing', level: 95 },
            { label: 'Google Analytics', level: 90 },
            { label: 'SEO/SEM', level: 85 },
            { label: 'Content Strategy', level: 88 },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="bg-slate-700/30 border border-slate-600 rounded-lg p-4"
              whileHover={{ borderColor: '#3b82f6', boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' }}
            >
              <p className="text-slate-300 text-sm mb-2">{item.label}</p>
              <div className="w-full bg-slate-600/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  viewport={{ once: true }}
                />
              </div>
              <p className="text-blue-400 text-xs mt-1 font-semibold">{item.level}%</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
