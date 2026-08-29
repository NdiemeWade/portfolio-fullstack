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

export default function ExperienceSection({ experience }: { experience: any }) {
  if (!experience) return null

  const title = experience.title || experience.Titre || ''
  const company = experience.company || experience.Entreprise || ''
  const location = experience.location || experience.Emplacement || ''
  const description = experience.overview || experience.Description || ''
  const techList = toArray(experience.technologies || experience.Technologies)

  return (
    <section id="experience" className="w-full bg-white border-y border-pink-200/60 py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TITRE PRINCIPAL HORS DE LA CARTE */}
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600 block">
            PARCOURS PROFESSIONNEL
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#231118]">
            Expériences<span className="text-pink-600">.</span>
          </h2>
        </div>

        {/* CARTE DE L'EXPÉRIENCE */}
        <div className="w-full bg-[#FAF8F5] rounded-3xl p-8 sm:p-10 border-2 border-pink-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-pink-600"></span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-pink-700">
                Dernière expérience
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#231118]">
                {title}
              </h3>
              <p className="text-xs font-mono text-[#5C424E] font-medium mt-1">
                {company} {location ? `· ${location}` : ''}
              </p>
            </div>

            {description && description !== 'je ne sais pas' && (
              <p className="text-xs sm:text-sm font-mono text-[#5C424E] leading-relaxed max-w-2xl">
                {description}
              </p>
            )}

            {techList.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {techList.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono bg-pink-100 text-pink-900 px-3 py-1 rounded-lg border border-pink-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Link
              href={`/experiences/${experience.id}`}
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-mono font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl shadow-xs transition-all"
            >
              Voir le détail →
            </Link>

            <Link
              href="/experiences"
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-mono font-bold text-[#231118] bg-white border-2 border-pink-200 hover:border-pink-400 rounded-xl transition-all"
            >
              Toutes les expériences
            </Link>
          </div>

        </div>

      </div>
    </section>
  )
}