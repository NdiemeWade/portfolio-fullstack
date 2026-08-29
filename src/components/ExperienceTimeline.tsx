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

export default async function ExperienceTimeline({ limit }: { limit?: number }) {
  let query = supabase.from('experiences').select('*').order('display_order', { ascending: true });
  if (limit) query = query.limit(limit);

  const { data: experiences, error } = await query;

  if (error) {
    console.error('Erreur Supabase experiences:', error);
  }

  return (
    <div className="relative pl-24 sm:pl-28 space-y-10">
      <div className="absolute left-[88px] sm:left-[104px] top-3 bottom-3 w-[2px] bg-neutral-200" />

      {(experiences || []).map((exp: any) => {
        const techList = toArray(exp.Technologies || exp.technologies);
        const period = exp['point final'] || exp.period || '';
        const yearMatch = period.match(/\b(20\d{2})\b/);
        const year = yearMatch ? yearMatch[1] : (exp.created_at ? new Date(exp.created_at).getFullYear() : '');

        return (
          <div key={exp.id} className="relative flex items-start group">
            <div className="absolute -left-24 sm:-left-28 w-16 text-right top-1 font-mono text-xs text-neutral-400 font-medium">
              {year}
            </div>

            <div className="absolute -left-[17px] sm:-left-[17px] top-1.5 w-6 h-6 rounded-full bg-[#F9F9FB] flex items-center justify-center z-10">
              <div className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100 group-hover:scale-110 transition-transform" />
            </div>

            <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="uppercase text-[10px] tracking-wider font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                  {exp.type || 'Expérience'}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {period}
                </span>
              </div>

              <h2 className="text-xl font-serif text-neutral-900 font-medium mb-1">
                {exp.Titre || exp.title}
              </h2>
              <p className="text-xs font-mono text-neutral-500 mb-4">
                {exp.Entreprise || exp.company} {exp.Emplacement ? `· ${exp.Emplacement}` : ''}
              </p>

              {exp.Description && exp.Description !== 'je ne sais pas' && (
                <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-light">
                  {exp.Description}
                </p>
              )}

              {techList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {techList.map((tech: string, i: number) => (
                    <span key={i} className="text-xs font-mono bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div>
                <Link
                  href={`/experiences/${exp.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-blue-600 border border-neutral-200 hover:border-blue-200 rounded-lg px-3.5 py-2 transition-colors bg-white"
                >
                  View experience →
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}