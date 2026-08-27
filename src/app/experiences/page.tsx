'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Experience } from '@/types/experience'

export default function AllExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
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
          const formatted: Experience[] = data.map((item) => ({
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
    <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <Link
        href="/"
        className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D7D] hover:underline mb-8 inline-block"
      >
        ← Retour à l'accueil
      </Link>

      <header className="mb-12">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D7D]">
          Parcours complet
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#2C1820] mt-2">
          Toutes mes expériences<span className="text-[#C86D7D]">.</span>
        </h1>
      </header>

      {loading ? (
        <p className="text-[#7A5C66] text-sm animate-pulse">Chargement...</p>
      ) : (
        <div className="space-y-8">
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              className="group block bg-white p-6 sm:p-8 rounded-2xl border border-[#F0D3CE] hover:border-[#C86D7D] transition-all shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#2C1820] group-hover:text-[#C86D7D] transition-colors">
                    {exp.title}
                  </h2>
                  <p className="text-sm font-semibold text-[#C86D7D]">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FAF3F0] text-[#7A5C66] w-fit">
                  {exp.period}
                </span>
              </div>

              {exp.description && (
                <p className="text-[#7A5C66] text-sm leading-relaxed mb-4">{exp.description}</p>
              )}

              <div className="flex items-center justify-between text-xs font-semibold text-[#C86D7D] pt-4 border-t border-[#FAF3F0]">
                <span>Voir les détails de l'expérience</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}