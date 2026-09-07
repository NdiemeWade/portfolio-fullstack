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
      return val.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
};

export default async function ExperiencesPage() {
  let experiencesList: any[] = [];

  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      experiencesList = data;
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des expériences depuis Supabase', err);
  }

  return (
    <main className="bg-[#FAF8FC] min-h-screen pt-28 pb-16 px-4 sm:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-pink-600 border border-purple-200 rounded-xl px-4 py-2 bg-white hover:bg-pink-50 transition-colors shadow-sm"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="text-center space-y-3">
          <span className="uppercase text-[10px] tracking-widest font-mono font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
            Parcours Professionnel
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900">
            Expériences<span className="text-pink-500">.</span>
          </h1>
          <p className="text-sm font-light text-gray-600 max-w-xl mx-auto">
            Mon parcours professionnel, stages et projets en développement logiciel et ingénierie.
          </p>
        </div>

        <div className="relative border-l-2 border-purple-200 ml-4 sm:ml-32 space-y-12 py-4">
          {experiencesList.length === 0 ? (
            <div className="pl-8 text-xs font-mono text-gray-500 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              Aucune expérience enregistrée pour le moment.
            </div>
          ) : (
            experiencesList.map((item: any, index: number) => {
              const title = item.title;
              const company = item.company;
              const location = item.location;
              const period = item.period;
              const type = item.type || 'STAGE';
              const apercu = item.apercu || '';
              const technologies = toArray(item.technologies);

              return (
                <div key={item.id || index} className="relative pl-8 sm:pl-10 group">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-pink-500 group-hover:bg-pink-500 group-hover:scale-125 transition-all duration-200 shadow-sm" />

                  <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono font-bold text-pink-600 mb-1 sm:mb-0 sm:w-28 sm:text-right">
                    {period}
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-4 transition-all hover:border-pink-300 hover:shadow-md">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h2 className="text-xl font-serif font-bold text-gray-900">
                          {title}
                        </h2>
                        {type && (
                          <span className="uppercase text-[9px] tracking-wider font-mono font-bold px-2.5 py-0.5 rounded-md bg-pink-50 text-pink-600 border border-pink-200">
                            {type}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-500">
                        <span className="font-semibold text-gray-700">{company}</span>
                        {location && (
                          <>
                            <span>·</span>
                            <span>📍 {location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {apercu && (
                      <p className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-line">
                        {apercu}
                      </p>
                    )}

                    {technologies.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-2">
                        {technologies.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-pink-50 text-pink-700 border border-pink-100 text-[11px] font-mono px-2.5 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-3 border-t border-purple-100 flex justify-end">
                      <Link
                        href={`/experiences/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3.5 py-2 rounded-xl border border-pink-200 transition-all"
                      >
                        Voir les détails <span className="text-sm">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}