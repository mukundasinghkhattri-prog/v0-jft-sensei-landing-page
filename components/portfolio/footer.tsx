'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900/95 backdrop-blur-sm border-t border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">MS</span>
              </div>
              <span className="text-white font-bold">Mukunda</span>
            </div>
            <p className="text-slate-400 text-sm">
              Digital Marketing Professional | SEO & PPC Specialist
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="#experience" className="hover:text-blue-400 transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-400 transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a
                  href="mailto:khattrikrishna123@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  khattrikrishna123@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+977-970-586-5379"
                  className="hover:text-blue-400 transition-colors"
                >
                  +977-970-586-5379
                </a>
              </li>
              <li className="text-slate-500">
                Kathmandu, Nepal
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:khattrikrishna123@gmail.com"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-300"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              © {currentYear} Mukunda Singh Khattri. All rights reserved.
            </p>
            <motion.div
              className="flex items-center gap-1 text-slate-400 text-sm"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Made with</span>
              <Heart size={16} className="text-red-500" fill="currentColor" />
              <span>by Mukunda</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
