'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestExperiences() {
      try {
        // Récupère uniquement les 2 expériences les plus récentes triées par display_order
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('display_order', { ascending: true })
          .limit(2);

        if (!error && data) {
          setExperiences(data);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des expériences depuis Supabase', err);
      }
      setLoading(false);
    }
    fetchLatestExperiences();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="w-full max-w-6xl mx-auto py-20 px-4 sm:px-8 border-t border-purple-200/40">
        <div className="text-center text-xs font-mono text-gray-400">Chargement des expériences...</div>
      </section>
    );
  }

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="w-full max-w-6xl mx-auto py-20 px-4 sm:px-8 border-t border-purple-200/40">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600 block mb-2">
            PARCOURS PROFESSIONNEL
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Dernières Expériences<span className="text-pink-500">.</span>
          </h2>
        </div>

        <Link
          href="/experiences"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-purple-200 text-gray-700 text-xs font-mono hover:border-pink-500 hover:text-pink-600 transition-all shadow-sm self-start sm:self-auto"
        >
          Voir tout le parcours →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp) => {
          const technologies = Array.isArray(exp.technologies) 
            ? exp.technologies 
            : JSON.parse(exp.technologies || '[]');

          return (
            <div 
              key={exp.id} 
              className="flex flex-col justify-between rounded-3xl bg-white/85 border border-purple-100 p-6 sm:p-8 shadow-md hover:shadow-xl transition-all"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-200 text-xs font-mono font-medium uppercase">
                    {exp.type || 'STAGE'}
                  </span>
                  <span className="text-xs font-mono text-pink-600 font-bold">
                    {exp.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                  <p className="text-xs font-mono text-gray-500">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </p>
                </div>

                <p className="text-sm font-mono text-gray-600 leading-relaxed line-clamp-3">
                  {exp.apercu}
                </p>

                {technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {technologies.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-pink-50/60 border border-pink-100 text-pink-700 text-[11px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-purple-100 flex justify-end">
                <Link
                  href={`/experiences/${exp.id}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-pink-600 hover:text-pink-700"
                >
                  En savoir plus →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const revalidate = 0;