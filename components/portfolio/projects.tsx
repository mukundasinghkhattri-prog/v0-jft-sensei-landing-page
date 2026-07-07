'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Github, ExternalLink, Code as Code2 } from 'lucide-react'

type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  image_url: string | null
  project_url: string | null
  github_url: string | null
  featured: boolean
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800/50 border-b border-slate-700">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400">Showcase of my work and accomplishments</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600 rounded-lg p-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Code2 className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">No projects available yet</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-slate-600 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, shadow: '0 25px 50px rgba(59, 130, 246, 0.2)' }}
              >
                {/* Image placeholder */}
                {project.image_url && (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30"
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-slate-600">
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">View Project</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors ml-auto"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
