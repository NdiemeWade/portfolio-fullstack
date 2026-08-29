export const revalidate = 0;

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

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

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: exp, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !exp) {
    notFound();
  }

  const title = exp.title || exp.Titre;
  const company = exp.company || exp.Entreprise;
  const location = exp.location || exp.Emplacement;
  const period = exp.period || exp['point final'];
  const type = exp.type || 'INTERNSHIP';
  const overview = exp.overview || (exp.Description !== 'je ne sais pas' ? exp.Description : '');

  const responsibilities = toArray(exp.responsibilities || exp.Tâches);
  const achievements = toArray(exp.key_achievements || exp.achievements || exp['Quelque chose']);
  const learned = toArray(exp.what_i_learned || exp.learned);
  const technologies = toArray(exp.technologies || exp.Technologies);

  return (
    // pt-28 garantit que le bouton "Back to experiences" passe SOUS la Navbar fixe
    <div className="min-h-screen bg-[#F9F9FB] text-neutral-800 pt-28 pb-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* BOUTON RETOUR CORRIGÉ */}
        <div>
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-700 border border-neutral-200 rounded-lg px-4 py-2 bg-white hover:bg-neutral-50 transition-colors shadow-2xs"
          >
            ← Back to experiences
          </Link>
        </div>

        {/* EN-TÊTE */}
        <div>
          {type && (
            <span className="uppercase text-[10px] tracking-wider font-semibold px-2.5 py-1 rounded-md bg-blue-100/70 text-blue-600 border border-blue-200/50">
              {type}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 font-normal mt-4 mb-2">
            {title}
          </h1>
          <p className="text-lg text-neutral-600 font-serif mb-2">
            {company}
          </p>
          <p className="text-xs font-mono text-neutral-400 flex items-center gap-1">
            📍 {location} · {period}
          </p>
        </div>

        {/* CONTENU & SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          <div className="lg:col-span-2 space-y-10">
            {overview && (
              <div>
                <h3 className="text-lg font-serif text-neutral-900 mb-3 border-b border-neutral-200 pb-2">
                  Overview
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {overview}
                </p>
              </div>
            )}

            {responsibilities.length > 0 && (
              <div>
                <h3 className="text-lg font-serif text-neutral-900 mb-4 border-b border-neutral-200 pb-2">
                  Responsibilities
                </h3>
                <ul className="space-y-3">
                  {responsibilities.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                      <span className="text-blue-600 font-semibold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {achievements.length > 0 && (
              <div>
                <h3 className="text-lg font-serif text-neutral-900 mb-4 border-b border-neutral-200 pb-2">
                  Key Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-xl border-l-4 border-l-blue-600 border border-neutral-200/80 text-sm text-neutral-700 shadow-2xs font-light"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {learned.length > 0 && (
              <div>
                <h3 className="text-lg font-serif text-neutral-900 mb-4 border-b border-neutral-200 pb-2">
                  What I learned
                </h3>
                <ul className="space-y-3">
                  {learned.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                      <span className="text-blue-600 text-xs mt-0.5">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {technologies.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3">
                <h4 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-neutral-100 text-neutral-700 text-xs font-mono px-3 py-1.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
              <h4 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                DETAILS
              </h4>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block mb-0.5">Company</span>
                  <span className="text-neutral-800 font-medium">{company}</span>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <span className="text-neutral-400 block mb-0.5">Type</span>
                  <span className="text-neutral-800 font-medium">{type}</span>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <span className="text-neutral-400 block mb-0.5">Location</span>
                  <span className="text-neutral-800 font-medium">{location}</span>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <span className="text-neutral-400 block mb-0.5">Duration</span>
                  <span className="text-neutral-800 font-medium">{period}</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/experiences"
                className="w-full flex items-center justify-center gap-2 border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-mono py-3 rounded-xl transition-colors shadow-2xs"
              >
                ← All experiences
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}