'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Project } from '@/types/project'
import { ExternalLink, ArrowLeft } from 'lucide-react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        if (data) {
          setProject({
            id: data.id,
            title: data.title,
            category: data.category || 'Web',
            shortDescription: data.short_description || '',
            image: data.image || '/placeholder-project.png',
            technologies: data.technologies || [],
            githubUrl: data.github_url,
            demoUrl: data.demo_url,
            context: data.context,
            problem: data.problem,
            solution: data.solution,
            role: data.role,
            challenges: data.challenges,
            learnings: data.learnings,
            results: data.results,
          })
        }
      } catch (err) {
        console.error('Erreur Supabase :', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 max-w-4xl mx-auto">
        <p className="text-[#7A5C66] animate-pulse">Chargement du projet...</p>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 max-w-4xl mx-auto">
        <p className="text-[#2C1820] font-bold">Projet non trouvé.</p>
        <Link href="/projects" className="text-[#C86D7D] underline mt-4 inline-block">
          Retour aux projets
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF3F0] py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Bouton Retour */}
      <Link
        href="/projects"
        className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D7D] hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour à tous les projets</span>
      </Link>

      {/* Titre & Catégorie */}
      <div className="mb-8">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-[#C86D7D] border border-[#F0D3CE] mb-4 inline-block shadow-xs">
          {project.category}
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C1820] mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-[#7A5C66] leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Image / Bannière */}
      {project.image && (
        <div className="h-80 sm:h-96 rounded-3xl overflow-hidden mb-12 border border-[#F0D3CE] shadow-xs">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Section détaillée du projet */}
      <div className="bg-white rounded-3xl border border-[#F0D3CE] p-8 sm:p-10 shadow-xs space-y-8 mb-10">
        
        {project.context && (
          <div>
            <h3 className="font-serif font-bold text-xl text-[#2C1820] mb-2">📌 Contexte</h3>
            <p className="text-[#7A5C66] leading-relaxed">{project.context}</p>
          </div>
        )}

        {project.problem && (
          <div>
            <h3 className="font-serif font-bold text-xl text-[#2C1820] mb-2">🎯 Le Problème</h3>
            <p className="text-[#7A5C66] leading-relaxed">{project.problem}</p>
          </div>
        )}

        {project.solution && (
          <div>
            <h3 className="font-serif font-bold text-xl text-[#2C1820] mb-2">💡 La Solution</h3>
            <p className="text-[#7A5C66] leading-relaxed">{project.solution}</p>
          </div>
        )}

        {project.role && (
          <div>
            <h3 className="font-serif font-bold text-xl text-[#2C1820] mb-2">👤 Mon Rôle</h3>
            <p className="text-[#7A5C66] leading-relaxed">{project.role}</p>
          </div>
        )}

        {project.challenges && (
          <div>
            <h3 className="font-serif font-bold text-xl text-[#2C1820] mb-2">⚡ Challenges rencontrés</h3>
            <p className="text-[#7A5C66] leading-relaxed">{project.challenges}</p>
          </div>
        )}

        {project.learnings && (
          <div>
            <h3 className="font-serif font-bold text-xl text-[#2C1820] mb-2">🚀 Ce que j'ai appris</h3>
            <p className="text-[#7A5C66] leading-relaxed">{project.learnings}</p>
          </div>
        )}

        {project.results && (
          <div>
            <h3 className="font-serif font-bold text-xl text-[#2C1820] mb-2">📈 Résultats</h3>
            <p className="text-[#7A5C66] leading-relaxed">{project.results}</p>
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h3 className="font-serif font-bold text-xl text-[#2C1820] mb-4">🛠️ Technologies utilisées</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#FAF3F0] text-[#2C1820] border border-[#F0D3CE]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Liens de bas de page */}
      <div className="flex flex-col sm:flex-row gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-[#2C1820] text-white text-sm font-medium hover:bg-black transition-all shadow-xs"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Voir le code GitHub</span>
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-[#C86D7D] text-white text-sm font-medium hover:bg-[#B55869] transition-all shadow-xs"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Voir la démo en ligne</span>
          </a>
        )}
      </div>

    </main>
  )
}