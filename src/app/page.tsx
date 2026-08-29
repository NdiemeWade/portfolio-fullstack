import Link from 'next/link'
import Hero from '@/components/Hero'
import About from '@/components/About'
import StatsSection from '@/components/StatsSection'
import ProjectsSection from '@/components/ProjectsSection'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

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

export default async function Home() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(2)

  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .limit(8)

  const { data: experiences } = await supabase
    .from('experiences')
    .select('*')
    .order('display_order', { ascending: true })
    .limit(1)

  const latestExp = experiences && experiences.length > 0 ? experiences[0] : null

  const title = latestExp ? (latestExp.title || latestExp.Titre) : ''
  const company = latestExp ? (latestExp.company || latestExp.Entreprise) : ''
  const location = latestExp ? (latestExp.location || latestExp.Emplacement) : ''
  const description = latestExp ? (latestExp.overview || latestExp.Description) : ''
  const techList = latestExp ? toArray(latestExp.technologies || latestExp.Technologies) : []

  return (
    <main className="min-h-screen">
      
      {/* 1. HERO : Rose poudré clair */}
      <section className="bg-[#FAF4F7]">
        <Hero />
      </section>

      {/* 2. BARRE DE STATISTIQUES AUTOMATISÉE */}
      <StatsSection />

      {/* 3. À PROPOS : Blanc pur */}
      <section className="bg-white py-16 border-b border-[#F472B6]/20">
        <About />
      </section>

      {/* 4. PROJETS : Fond rose très léger */}
      <section className="bg-[#FDF0F5] py-16 border-b border-[#F472B6]/20">
        <ProjectsSection projects={projects || []} />
      </section>

      {/* 5. EXPÉRIENCE : Fond lavande / lilas poudré */}
      <section id="experience" className="bg-[#F5EBF7] py-20 border-b border-[#F472B6]/20">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#EC4899]/30 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BE185D] block">
                PARCOURS PROFESSIONNEL
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#2C1820]">
                Expérience<span className="text-[#EC4899]">.</span>
              </h2>
            </div>

            <Link
              href="/experiences"
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-mono font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:from-[#DB2777] hover:to-[#7C3AED] rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Toutes les expériences →
            </Link>
          </div>

          {latestExp && (
            <div className="w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#F472B6]/40 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-[#EC4899] transition-all">
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899]"></span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#BE185D]">
                    DERNIÈRE EXPÉRIENCE
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#2C1820] font-bold tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm font-mono text-[#8C5873] mt-1 font-semibold">
                    {company} {location ? `· ${location}` : ''}
                  </p>
                </div>

                {description && description !== 'je ne sais pas' && (
                  <p className="text-sm text-[#593E4D] leading-relaxed font-normal max-w-2xl">
                    {description}
                  </p>
                )}

                {techList.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {techList.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs font-mono bg-[#FCE7F3] text-[#BE185D] px-3.5 py-1.5 rounded-lg border border-[#F472B6]/40 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 justify-center">
                <Link
                  href={`/experiences/${latestExp.id}`}
                  className="inline-flex items-center justify-center px-6 py-3 text-xs font-mono font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:from-[#DB2777] hover:to-[#7C3AED] rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  Voir le détail →
                </Link>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* 6. COMPÉTENCES : Blanc pur */}
      <section className="bg-white py-16 border-b border-[#F472B6]/20">
        <Skills skills={skills || []} />
      </section>

      {/* 7. CONTACT : Rose poudré */}
      <section className="bg-[#FAF4F7] py-16">
        <Contact />
      </section>

      {/* 8. FOOTER */}
      <Footer />
    </main>
  )
}