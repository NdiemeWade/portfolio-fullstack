'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Project, ProjectCategory } from '@/types/project'
import ProjectCard from '@/components/ProjectCard'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const CATEGORIES: ProjectCategory[] = ['All', 'Web', 'AI', 'Data', 'Backend', 'SaaS']

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })

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

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory)

  return (
    <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <Link
          href="/"
          className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D7D] hover:underline mb-4 inline-block"
        >
          ← Retour à l'accueil
        </Link>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C1820]">
          Tous les projets<span className="text-[#C86D7D]">.</span>
        </h1>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#2C1820] text-white'
                : 'bg-white text-[#7A5C66] border border-[#F0D3CE] hover:border-[#C86D7D]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille de projets */}
      {loading ? (
        <p className="text-[#7A5C66] text-sm animate-pulse">Chargement des projets...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-[#7A5C66] text-sm">Aucun projet trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  )
}