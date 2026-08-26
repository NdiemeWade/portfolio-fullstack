'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Project } from '@/types/project'
import ProjectCard from './ProjectCard'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(2) // Récupère uniquement 2 projets pour l'accueil

        if (error) throw error

        if (data) {
          const formatted: Project[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            category: item.category || 'Web',
            shortDescription: item.short_description || '',
            image: item.image || '/placeholder-project.png',
            technologies: item.technologies || [],
            githubUrl: item.github_url,
            demoUrl: item.demo_url,
            context: item.context,
            problem: item.problem,
            solution: item.solution,
            role: item.role,
            challenges: item.challenges,
            learnings: item.learnings,
            results: item.results,
          }))
          setProjects(formatted)
        }
      } catch (err) {
        console.error('Erreur Supabase :', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#F0D3CE]/60">
      
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D7D] mb-2 block">
            SELECTED WORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1820]">
            Featured Projects<span className="text-[#C86D7D]">.</span>
          </h2>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-[#F0D3CE] text-[#2C1820] text-sm font-medium hover:border-[#C86D7D] hover:text-[#C86D7D] transition-all shadow-xs"
        >
          Voir tous les projets →
        </Link>
      </div>

      {/* Grille limitée à 2 projets */}
      {loading ? (
        <p className="text-[#7A5C66] text-sm animate-pulse">Chargement des projets...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

    </section>
  )
}