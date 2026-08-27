'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Experience as ExperienceType } from '@/types/experience'

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('display_order', { ascending: true })

        if (error) throw error

        if (data) {
          const formatted: ExperienceType[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            company: item.company,
            location: item.location,
            period: item.period,
            description: item.description,
            tasks: Array.isArray(item.tasks) ? item.tasks : [],
            technologies: Array.isArray(item.technologies) ? item.technologies : [],
          }))
          setExperiences(formatted)
        }
      } catch (err) {
        console.error('Erreur Supabase experiences :', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D7D]">
            Parcours professionnel
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1820] mt-2">
            Expériences<span className="text-[#C86D7D]">.</span>
          </h2>
        </div>

        {/* Bouton pour voir toutes les expériences */}
        <Link
          href="/experiences"
          className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D7D] hover:underline flex items-center gap-1"
        >
          Voir toutes les expériences <span>→</span>
        </Link>
      </div>

      {loading ? (
        <p className="text-[#7A5C66] text-sm animate-pulse">Chargement des expériences...</p>
      ) : experiences.length === 0 ? (
        <p className="text-[#7A5C66] text-sm">Aucune expérience répertoriée pour le moment.</p>
      ) : (
        <div className="space-y-8">
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              className="group block bg-white p-6 sm:p-8 rounded-2xl border border-[#F0D3CE] hover:border-[#C86D7D] transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#2C1820] group-hover:text-[#C86D7D] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#C86D7D]">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FAF3F0] text-[#7A5C66] w-fit">
                  {exp.period}
                </span>
              </div>

              {exp.description && (
                <p className="text-[#7A5C66] text-sm leading-relaxed mb-4 line-clamp-3">
                  {exp.description}
                </p>
              )}

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#FAF3F0] text-[#7A5C66]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Lien en savoir plus */}
              <div className="flex items-center justify-end text-xs font-semibold text-[#C86D7D] pt-2 border-t border-[#FAF3F0]">
                <span className="group-hover:mr-1 transition-all">En savoir plus</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}