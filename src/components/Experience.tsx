import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// Initialisation du client Supabase pour récupérer les données côté serveur
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Fonction utilitaire pour s'assurer qu'on manipule bien un tableau (pour les technologies stockées en JSONB)
function toArray(value: any): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [];
    }
  }
  return [];
}

export default async function Experience() {
  // Récupération de la dernière expérience directement depuis Supabase (triée par display_order)
  const { data: experiences, error } = await supabase
    .from('experiences')
    .select('*')
    .order('display_order', { ascending: true })
    .limit(1)

  const latestExp = experiences && experiences.length > 0 ? experiences[0] : null

  return (
    <section id="experience" className="w-full max-w-6xl mx-auto py-20 px-4 sm:px-8 border-t border-purple-500/10">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400 block mb-2">
            PARCOURS PROFESSIONNEL
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Dernière Expérience<span className="text-pink-500">.</span>
          </h2>
        </div>

        <Link
          href="/experiences"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-purple-300/20 text-purple-200 text-xs font-mono hover:border-pink-500 hover:text-pink-300 transition-all backdrop-blur-md self-start sm:self-auto"
        >
          Voir tout le parcours →
        </Link>
      </div>

      {error || !latestExp ? (
        <div className="rounded-3xl bg-[#161224]/80 border border-purple-500/20 p-6 sm:p-8 text-center text-purple-300/60 font-mono text-sm">
          Aucune expérience disponible pour le moment.
        </div>
      ) : (
        <div className="relative rounded-3xl bg-[#161224]/80 border border-purple-500/20 p-6 sm:p-8 backdrop-blur-xl hover:border-pink-500/40 transition-all shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            <div className="space-y-4 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono">
                  {latestExp.type || 'INTERNSHIP'}
                </span>
                <span className="text-xs font-mono text-purple-300/60">
                  {latestExp.company} {latestExp.location ? `• ${latestExp.location}` : ''}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {latestExp.title}
              </h3>

              <p className="text-sm font-mono text-purple-200/80 leading-relaxed max-w-3xl">
                {latestExp.apercu}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {toArray(latestExp.technologies).map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-purple-300/10 text-purple-300 text-[11px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/experiences"
              className="shrink-0 px-6 py-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500 hover:text-white text-xs font-mono transition-all text-center"
            >
              Détails de la mission
            </Link>
          </div>
        </div>
      )}

    </section>
  )
}