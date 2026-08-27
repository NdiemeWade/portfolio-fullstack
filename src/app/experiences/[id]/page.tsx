'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Experience } from '@/types/experience'

export default function ExperienceDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const [exp, setExp] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    async function fetchExperience() {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        if (data) {
          setExp({
            id: data.id,
            title: data.title,
            company: data.company,
            location: data.location,
            period: data.period,
            description: data.description,
            tasks: Array.isArray(data.tasks) ? data.tasks : [],
            technologies: Array.isArray(data.technologies) ? data.technologies : [],
          })
        }
      } catch (err) {
        console.error('Erreur chargement expérience :', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 text-center text-[#7A5C66]">
        Chargement de l'expérience...
      </main>
    )
  }

  if (!exp) {
    return (
      <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 text-center">
        <p className="text-[#2C1820] text-lg font-semibold mb-4">Expérience introuvable.</p>
        <Link href="/experiences" className="text-[#C86D7D] underline text-sm">
          ← Retour aux expériences
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF3F0] py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        href="/experiences"
        className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D7D] hover:underline mb-8 inline-block"
      >
        ← Retour aux expériences
      </Link>

      <header className="mb-8">
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#2C1820] text-white">
          {exp.period}
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#2C1820] mt-4 mb-2">
          {exp.title}
        </h1>
        <p className="text-lg font-semibold text-[#C86D7D]">
          {exp.company} {exp.location && `• ${exp.location}`}
        </p>
      </header>

      <div className="space-y-8 bg-white p-8 rounded-2xl border border-[#F0D3CE]">
        {exp.description && (
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-2">Aperçu</h2>
            <p className="text-[#7A5C66] text-sm leading-relaxed">{exp.description}</p>
          </div>
        )}

        {exp.tasks && exp.tasks.length > 0 && (
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-3">
              Missions & Réalisations
            </h2>
            <ul className="list-disc list-inside text-sm text-[#7A5C66] space-y-2 leading-relaxed">
              {exp.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </div>
        )}

        {exp.technologies && exp.technologies.length > 0 && (
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-3">
              Technologies & Outils
            </h2>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
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