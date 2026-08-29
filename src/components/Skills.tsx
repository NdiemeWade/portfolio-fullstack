'use client'

import Link from 'next/link'

export default function Skills({ skills }: { skills: any[] }) {
  return (
    <section id="skills" className="w-full bg-[#FAF8F5] py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-pink-200 pb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600 block mb-1">
              EXPERTISE TECHNIQUE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#231118]">
              Mes Compétences<span className="text-pink-600">.</span>
            </h2>
          </div>

          <Link
            href="/skills"
            className="text-xs font-mono font-bold text-pink-700 hover:text-pink-900 underline underline-offset-4"
          >
            Voir toutes les compétences →
          </Link>
        </div>

        {skills.length === 0 ? (
          <p className="text-xs font-mono text-[#5C424E]">Aucune compétence chargée pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((s) => {
              const name = s.name || s.Nom || s.title
              const category = s.category || s.Categorie || 'Général'
              const level = s.level || s.Niveau || 'Avancé'

              return (
                <div
                  key={s.id || name}
                  className="p-5 rounded-2xl bg-white border-2 border-pink-200 shadow-xs hover:border-pink-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-purple-700 font-bold uppercase tracking-wider">
                      {category}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#231118]">{name}</h3>
                  </div>
                  <span className="mt-4 self-start text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {level}
                  </span>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}