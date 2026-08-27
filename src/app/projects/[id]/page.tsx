'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { Project } from '@/types/project'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function ProjectDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

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
      } catch (err: any) {
        console.error('Erreur Supabase détaillée :', err?.message || err)
        setError('Impossible de charger ce projet.')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 text-center text-[#7A5C66]">
        Chargement du projet...
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 text-center">
        <p className="text-[#2C1820] text-lg font-semibold mb-4">Projet introuvable.</p>
        <Link href="/projects" className="text-[#C86D7D] underline text-sm">
          ← Retour aux projets
        </Link>
      </main>
    )
  }

  const isValidImage =
    project.image &&
    (project.image.startsWith('/') ||
      project.image.startsWith('http://') ||
      project.image.startsWith('https://'))

  const imageUrl = isValidImage ? project.image : '/placeholder-project.png'

  return (
    <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        href="/projects"
        className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D7D] hover:underline mb-8 inline-block"
      >
        ← Retour aux projets
      </Link>

      <header className="mb-8">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2C1820] text-white uppercase tracking-wider">
          {project.category}
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#2C1820] mt-4 mb-2">
          {project.title}
        </h1>
        <p className="text-[#7A5C66] text-lg">{project.shortDescription}</p>
      </header>

      {/* Image principale */}
      <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-10 border border-[#F0D3CE]">
        <Image src={imageUrl} alt={project.title} fill className="object-cover" />
      </div>

      {/* Liens Demo & GitHub (affichés uniquement si renseignés) */}
      <div className="flex flex-wrap gap-4 mb-10">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#C86D7D] text-white font-semibold text-sm hover:bg-[#b05a69] transition-colors"
          >
            Voir la démo ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-[#2C1820] text-[#2C1820] font-semibold text-sm hover:bg-[#2C1820] hover:text-white transition-colors"
          >
            Code GitHub ↗
          </a>
        )}
      </div>

      {/* Détails du projet */}
      <div className="space-y-8 bg-white p-8 rounded-2xl border border-[#F0D3CE]">
        {project.context && (
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-2">Contexte</h2>
            <p className="text-[#7A5C66] text-sm leading-relaxed">{project.context}</p>
          </div>
        )}

        {project.problem && (
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-2">Problématique</h2>
            <p className="text-[#7A5C66] text-sm leading-relaxed">{project.problem}</p>
          </div>
        )}

        {project.solution && (
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-2">Solution</h2>
            <p className="text-[#7A5C66] text-sm leading-relaxed">{project.solution}</p>
          </div>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-3">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs font-mono px-3 py-1 rounded-md bg-[#FAF3F0] text-[#7A5C66]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}