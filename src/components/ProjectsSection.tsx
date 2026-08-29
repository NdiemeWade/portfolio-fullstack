'use client'

import Link from 'next/link'

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

export default function ProjectsSection({ projects = [] }: { projects?: any[] }) {
  const hasProjects = Array.isArray(projects) && projects.length > 0

  return (
    <section id="projects" className="w-full bg-[#FAF8F5] py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* TITRE PRINCIPAL EN DEHORS DES CARTES */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-pink-200 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600 block">
              RÉALISATIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#231118]">
              Mes Projets<span className="text-pink-600">.</span>
            </h2>
          </div>

          <Link
            href="/projects"
            className="text-xs font-mono font-bold text-pink-700 hover:text-pink-900 underline underline-offset-4"
          >
            Tous les projets →
          </Link>
        </div>

        {/* AFFICHAGE DES PROJETS */}
        {!hasProjects ? (
          <div className="p-8 rounded-3xl bg-white border-2 border-pink-200 text-center font-mono text-xs text-[#5C424E]">
            Aucun projet chargé pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, index) => {
              const techs = toArray(p.technologies || p.tech_stack || p.Technologies)
              const title = p.title || p.Titre || p.name || 'Projet sans titre'
              const category = p.category || p.Categorie || 'Projet'
              const description = p.description || p.Description || p.overview

              return (
                <div
                  key={p.id || index}
                  className="bg-white rounded-3xl p-8 border-2 border-pink-200 shadow-md hover:border-pink-400 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <span className="inline-block text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-800 border border-pink-300">
                      {category}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#231118]">{title}</h3>
                    {description && (
                      <p className="text-xs font-mono text-[#5C424E] leading-relaxed line-clamp-3">
                        {description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 pt-2">
                    {techs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {techs.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-purple-50 text-purple-900 border border-purple-200/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {p.id && (
                      <Link
                        href={`/projects/${p.id}`}
                        className="inline-block text-xs font-mono font-bold text-pink-600 hover:text-pink-800"
                      >
                        Voir le projet →
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}