'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Skill {
  id: string
  name: string
  category: string
  level: string
  description?: string
  icon_url?: string
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true })

        if (error) throw error
        if (data) setSkills(data as Skill[])
      } catch (err) {
        console.error('Erreur Supabase :', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Récupération dynamique de toutes les catégories enregistrées en base
  const categories = Array.from(new Set(skills.map((s) => s.category)))

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Advanced':
        return <span className="text-[11px] font-mono text-emerald-600 font-medium">Avancé</span>
      case 'Intermediate':
        return <span className="text-[11px] font-mono text-blue-600 font-medium">Intermédiaire</span>
      case 'Learning':
        return <span className="text-[11px] font-mono text-amber-600 font-medium">En apprentissage</span>
      default:
        return <span className="text-[11px] font-mono text-neutral-500 font-medium">{level}</span>
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-12">
      {/* En-tête traduit */}
      <div className="mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D7D] block mb-2">
          EXPERTISE TECHNIQUE
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#2C1820] font-bold tracking-tight mb-4">
          Compétences<span className="text-[#C86D7D]">.</span>
        </h1>
        <p className="text-sm font-mono text-[#7A5C66] max-w-xl mb-6">
          Un catalogue vivant des technologies que j'utilise, organisées par domaine et niveau de maîtrise.
        </p>

        {/* Légende */}
        <div className="flex items-center gap-6 text-xs font-mono text-[#7A5C66]">
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Avancé
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Intermédiaire
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> En apprentissage
          </span>
        </div>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-neutral-400 animate-pulse">Chargement des compétences...</p>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0D3CE]/80 pb-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2C1820]">
                    {category}
                  </h3>
                  <span className="text-xs font-mono text-[#7A5C66]">
                    {categorySkills.length} compétences
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-white rounded-2xl p-4 border border-[#F0D3CE]/70 shadow-2xs hover:shadow-xs transition-shadow flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FAF3F0] flex items-center justify-center shrink-0 text-xs font-bold font-mono text-[#7A5C66]">
                        {skill.icon_url ? (
                          <img src={skill.icon_url} alt={skill.name} className="w-6 h-6 object-contain" />
                        ) : (
                          skill.name.slice(0, 2).toUpperCase()
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h4 className="text-sm font-semibold text-[#2C1820] truncate">
                            {skill.name}
                          </h4>
                          {getLevelBadge(skill.level)}
                        </div>
                        {skill.description && (
                          <p className="text-xs text-[#7A5C66] font-light truncate">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}