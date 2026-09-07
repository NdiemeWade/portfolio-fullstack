export const revalidate = 0;

import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Expériences | Ndiémé Wade',
};

const toArray = (val: any): string[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      if (val.includes('\n')) {
        return val.split('\n').map((s) => s.replace(/^[-•→◆]\s*/, '').trim()).filter(Boolean);
      }
      return val.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
};

export default async function ExperiencesPage() {
  const { data: experiencesList, error } = await supabase
    .from('experiences')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <main className="bg-[#130F1C] min-h-screen pt-28 pb-16 px-4 sm:px-8 text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-pink-400 border border-purple-500/30 rounded-xl px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="text-center space-y-3">
          <span className="uppercase text-[10px] tracking-widest font-mono font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/30">
            Parcours Professionnel
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Expériences<span className="text-pink-500">.</span>
          </h1>
          <p className="text-sm font-light text-purple-200/80 max-w-xl mx-auto">
            Mon parcours professionnel, stages et projets en développement logiciel.
          </p>
        </div>

        {error ? (
          <div className="text-center py-12 text-sm text-pink-400">
            Erreur de chargement des expériences.
          </div>
        ) : !experiencesList || experiencesList.length === 0 ? (
          <div className="text-center py-12 text-sm text-purple-300/60">
            Aucune expérience enregistrée pour le moment.
          </div>
        ) : (
          <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-32 space-y-12 py-4">
            {experiencesList.map((item: any, index: number) => {
              const title = item.title || item.Titre;
              const company = item.company || item.Entreprise;
              const location = item.location || item.Emplacement;
              const period = item.period || item['point final'];
              const type = item.type || 'INTERNSHIP';
              const apercu = item.apercu || item.overview || '';
              const technologies = toArray(item.technologies || item.Technologies);

              const certificateUrl = item.certificate_url || item.attestation_url;
              const hasCertificate = Boolean(
                certificateUrl && 
                typeof certificateUrl === 'string' && 
                certificateUrl.trim().toLowerCase().startsWith('http')
              );

              return (
                <div key={item.id || index} className="relative pl-8 sm:pl-10 group">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#130F1C] border-2 border-pink-500 group-hover:bg-pink-500 group-hover:scale-125 transition-all duration-200" />

                  <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono font-bold text-pink-400 mb-1 sm:mb-0 sm:w-28 sm:text-right">
                    {period}
                  </div>

                  <div className="bg-[#161224] p-6 rounded-2xl border border-purple-500/20 shadow-sm space-y-4 transition-all group-hover:border-pink-500/40">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h2 className="text-xl font-serif font-bold text-white">
                          {title}
                        </h2>
                        {type && (
                          <span className="uppercase text-[9px] tracking-wider font-mono font-bold px-2 py-0.5 rounded-md bg-pink-500/10 text-pink-300 border border-pink-500/30">
                            {type}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-purple-300/60">
                        <span className="font-semibold text-purple-200">{company}</span>
                        {location && (
                          <>
                            <span>·</span>
                            <span>📍 {location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {apercu && (
                      <p className="text-sm text-purple-200/80 font-light leading-relaxed whitespace-pre-line line-clamp-2">
                        {apercu}
                      </p>
                    )}

                    {technologies.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-2">
                        {technologies.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-pink-500/10 text-pink-300 border border-pink-500/30 text-[11px] font-mono px-2.5 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-3 border-t border-purple-500/10 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        {hasCertificate ? (
                          <a
                            href={certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 px-3.5 py-2 rounded-xl border border-pink-500/30 transition-all"
                          >
                            📄 Voir l'attestation ↗
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-purple-300/60 bg-white/5 px-3 py-1.5 rounded-xl border border-purple-500/20">
                            ⏳ Attestation à venir
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/experiences/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-pink-300 hover:text-white bg-pink-500/10 hover:bg-pink-500/20 px-3.5 py-2 rounded-xl border border-pink-500/30 transition-all"
                      >
                        Voir les détails <span className="text-sm">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}