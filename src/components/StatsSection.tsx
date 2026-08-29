import { supabase } from '@/lib/supabase'

export default async function StatsSection() {
  const { count: projectsCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })

  const { count: experiencesCount } = await supabase
    .from('experiences')
    .select('*', { count: 'exact', head: true })

  const stats = [
    { value: '2+', label: "Années d'études" },
    { value: `${projectsCount || 0}`, label: 'Projets réalisés' },
    { value: `${experiencesCount || 0}`, label: 'Expériences pro' },
    { value: 'IA & Data', label: 'Spécialisation' },
  ]

  return (
    <section className="w-full bg-[#FAF4F7] py-10 border-b border-[#F472B6]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#F472B6]/30 shadow-sm hover:border-[#EC4899] transition-all"
          >
            <p className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2C1820]">
              {stat.value}
            </p>
            <p className="text-xs font-mono font-medium text-[#BE185D] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}