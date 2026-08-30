'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: string | number
  title?: string
  Titre?: string
  category?: string
  Categorie?: string
  description?: string
  Description?: string
  technologies?: any
  Technologies?: any
  image_url?: string
  image?: string
  github_url?: string
  demo_url?: string
}

const toArray = (val: any): string[] => {
  if (!val) return []
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val)
      if (Array.isArray(parsed)) return parsed
    } catch {
      return val.split(',').map((s) => s.trim()).filter(Boolean)
    }
  }
  return []
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  // Gestion de l'état des images défectueuses
  const [imageErrors, setImageErrors] = useState<Record<string | number, boolean>>({})

  const handleImageError = (id: string | number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
      {/* HEADER EN-TÊTE */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#EC4899]/30 pb-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BE185D] block">
            RÉALISATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#2C1820]">
            Mes Projets<span className="text-[#EC4899]">.</span>
          </h2>
        </div>

        {/* BOUTON AVEC DÉGRADÉ ROSE - VIOLET */}
        <Link
          href="/projects"
          className="inline-flex items-center justify-center px-6 py-3 text-xs font-mono font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:from-[#DB2777] hover:to-[#7C3AED] rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
        >
          Tous les projets →
        </Link>
      </div>

      {/* GRILLE DES CARTES DE PROJETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => {
          const title = project.title || project.Titre || 'Projet sans titre'
          const category = project.category || project.Categorie || 'Web'
          const imageUrl = project.image_url || project.image
          const techList = toArray(project.technologies || project.Technologies)
          const hasImageError = imageErrors[project.id]

          return (
            <div
              key={project.id}
              className="group bg-white rounded-3xl border border-[#F472B6]/40 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#EC4899] transition-all"
            >
              <div>
                {/* IMAGE DU PROJET */}
                <div className="relative w-full h-48 sm:h-56 bg-pink-50 overflow-hidden border-b border-[#F472B6]/20">
                  {imageUrl && !hasImageError ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      unoptimized
                      onError={() => handleImageError(project.id)}
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#8C5873] bg-gradient-to-br from-[#FAF4F7] to-[#FCE7F3]">
                      <span>Aperçu à venir</span>
                    </div>
                  )}

                  {/* BADGE CATEGORY */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#BE185D] shadow-sm border border-[#F472B6]/30">
                      {category}
                    </span>
                  </div>
                </div>

                {/* CONTENU TEXTE */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-[#2C1820] tracking-tight group-hover:text-[#EC4899] transition-colors">
                    {title}
                  </h3>

                  {/* LISTE DES TECHNOLOGIES */}
                  {techList.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {techList.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono bg-[#FCE7F3]/60 text-[#BE185D] px-3 py-1 rounded-lg border border-[#F472B6]/30 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* LIEN DÉTAILS DU PROJET */}
              <div className="p-6 sm:p-8 pt-0">
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#BE185D] group-hover:text-[#EC4899] transition-colors"
                >
                  Voir le projet <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}