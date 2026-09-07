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
  
  const apercu = exp.apercu || exp.overview || exp.Description || '';
  const responsabilites = toArray(exp.responsabilites || exp.responsibilities || exp.Tâches);
  const realisationsCles = toArray(exp.realisations_cles || exp.key_achievements || exp['Quelque chose']);
  const ceQueJaiAppris = toArray(exp.ce_que_j_ai_appris || exp.what_i_learned || exp.learned);
  const technologies = toArray(exp.technologies || exp.Technologies);

  const certificateUrl = exp.certificate_url || exp.attestation_url;
  const isInternship = (type || '').toLowerCase().includes('intern') || 
                       (title || '').toLowerCase().includes('intern') ||
                       (type || '').toLowerCase().includes('stage');

  return (
    <div className="min-h-screen bg-[#130F1C] text-white pt-28 pb-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div>
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-pink-400 border border-purple-500/30 rounded-xl px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors"
          >
            ← Retour aux expériences
          </Link>
        </div>

        <div className="space-y-3">
          {type && (
            <span className="uppercase text-[10px] tracking-wider font-mono font-bold px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-300 border border-pink-500/30">
              {type}
            </span>
          )}

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            {title}
          </h1>

          <p className="text-lg font-serif text-purple-200">
            {company}
          </p>

          <p className="text-xs font-mono text-purple-300/60">
            📍 {location} · {period}
          </p>

          {isInternship && (
            <div className="pt-2">
              {certificateUrl && typeof certificateUrl === 'string' && certificateUrl.trim().toLowerCase().startsWith('http') ? (
                <a
                  href={certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 px-4 py-2 rounded-xl border border-pink-500/30 transition-all"
                >
                  📄 Voir l'attestation de stage ↗
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-purple-300/60 bg-white/5 px-3.5 py-1.5 rounded-xl border border-purple-500/20">
                  ⏳ Attestation à venir
                </span>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          <div className="lg:col-span-2 space-y-10">
            {apercu && (
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-3 border-b border-purple-500/20 pb-2">
                  Aperçu du projet
                </h3>
                <p className="text-sm text-purple-200/80 leading-relaxed font-light">
                  {apercu}
                </p>
              </div>
            )}

            {responsabilites.length > 0 && (
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-4 border-b border-purple-500/20 pb-2">
                  Responsabilités & Tâches
                </h3>
                <ul className="space-y-3">
                  {responsabilites.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-purple-200/80 font-light">
                      <span className="text-pink-400 font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {realisationsCles.length > 0 && (
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-4 border-b border-purple-500/20 pb-2">
                  Réalisations clés
                </h3>
                <div className="space-y-3">
                  {realisationsCles.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#161224] rounded-xl border-l-4 border-l-pink-500 border border-purple-500/20 text-sm text-white shadow-sm font-light"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ceQueJaiAppris.length > 0 && (
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-4 border-b border-purple-500/20 pb-2">
                  Ce que j'ai appris
                </h3>
                <ul className="space-y-3">
                  {ceQueJaiAppris.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-purple-200/80 font-light">
                      <span className="text-pink-400 text-xs mt-0.5">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {technologies.length > 0 && (
              <div className="bg-[#161224] p-6 rounded-2xl border border-purple-500/20 space-y-3">
                <h4 className="text-[10px] font-mono tracking-widest text-pink-400 uppercase font-bold">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-pink-500/10 text-pink-300 border border-pink-500/30 text-xs font-mono px-3 py-1.5 rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#161224] p-6 rounded-2xl border border-purple-500/20 space-y-4">
              <h4 className="text-[10px] font-mono tracking-widest text-pink-400 uppercase font-bold">
                DÉTAILS
              </h4>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-purple-300/60 block mb-0.5">Entreprise</span>
                  <span className="text-white font-medium">{company}</span>
                </div>
                <div className="border-t border-purple-500/10 pt-3">
                  <span className="text-purple-300/60 block mb-0.5">Type</span>
                  <span className="text-pink-300 font-medium uppercase">{type}</span>
                </div>
                <div className="border-t border-purple-500/10 pt-3">
                  <span className="text-purple-300/60 block mb-0.5">Emplacement</span>
                  <span className="text-white font-medium">{location}</span>
                </div>
                <div className="border-t border-purple-500/10 pt-3">
                  <span className="text-purple-300/60 block mb-0.5">Période</span>
                  <span className="text-white font-medium">{period}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}