'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

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

export default function ExperienceTimeline() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Erreur Supabase:', error);
      } else if (data) {
        setExperiences(data);
      }
      setLoading(false);
    }

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-xs font-mono text-purple-300/60">
        Chargement des expériences...
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-purple-500/30 ml-4 md:ml-28 space-y-10 pl-6 md:pl-8 pt-4">
      {experiences.map((exp) => {
        const title = exp.title || exp.Titre;
        const company = exp.company || exp.Entreprise;
        const period = exp.period || exp['point final'];
        const type = exp.type || 'INTERNSHIP';
        const technologies = toArray(exp.technologies || exp.Technologies);

        const yearMatch = period?.match(/\b(20\d{2})\b/);
        const displayYear = yearMatch ? yearMatch[0] : '';

        return (
          <div key={exp.id} className="relative group">
            
            {displayYear && (
              <span className="hidden md:block absolute -left-32 top-1.5 text-xs font-mono font-bold text-pink-400">
                {displayYear}
              </span>
            )}

            <span className="absolute -left-[31px] md:-left-[39px] top-2 w-4 h-4 rounded-full bg-[#130F1C] border-2 border-pink-500 group-hover:bg-pink-500 group-hover:scale-125 transition-all" />

            <div className="bg-[#161224] p-6 sm:p-8 rounded-2xl border border-purple-500/20 shadow-xl space-y-4 hover:border-pink-500/40 transition-all">
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="uppercase text-[10px] font-mono tracking-wider font-bold px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-300 border border-pink-500/30">
                  {type}
                </span>
                <span className="text-xs font-mono text-purple-300/60">
                  {period}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {title}
                </h3>
                <p className="text-sm font-mono text-purple-200 font-medium mt-0.5">
                  {company}
                </p>
              </div>

              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs font-mono bg-pink-500/10 text-pink-300 border border-pink-500/30 px-3 py-1 rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <Link
                  href={`/experiences/${exp.id}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-pink-300 border border-pink-500/30 rounded-xl px-4 py-2 bg-pink-500/10 hover:bg-pink-500/20 transition-colors"
                >
                  Voir l'expérience →
                </Link>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}