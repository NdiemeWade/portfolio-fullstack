import Link from 'next/link'

interface Skill {
  id: string | number
  name?: string
  Nom?: string
  category?: string
  Categorie?: string
  level?: string | number
  Niveau?: string | number
  icon?: string
}

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="w-full max-w-6xl mx-auto px-4 sm:px-8 space-y-8 scroll-mt-24">
      {/* HEADER EN-TÊTE */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#EC4899]/30 pb-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BE185D] block">
            COMPÉTENCES
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#2C1820]">
            Mon Stack<span className="text-[#EC4899]">.</span>
          </h2>
        </div>

        {/* BOUTON VERS LA PAGE DÉDIÉE */}
        <Link
          href="/skills"
          className="inline-flex items-center justify-center px-6 py-3 text-xs font-mono font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:from-[#DB2777] hover:to-[#7C3AED] rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
        >
          Toutes les compétences →
        </Link>
      </div>

      {/* GRILLE DES COMPÉTENCES */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill) => {
          const name = skill.name || skill.Nom || 'Compétence'
          const category = skill.category || skill.Categorie

          return (
            <div
              key={skill.id}
              className="bg-[#FAF4F7] p-5 rounded-2xl border border-[#F472B6]/30 hover:border-[#EC4899] hover:bg-white transition-all shadow-sm flex flex-col justify-between space-y-2 group"
            >
              <div className="space-y-1">
                {category && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#BE185D]">
                    {category}
                  </span>
                )}
                <h3 className="text-base font-bold text-[#2C1820] group-hover:text-[#EC4899] transition-colors">
                  {name}
                </h3>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}