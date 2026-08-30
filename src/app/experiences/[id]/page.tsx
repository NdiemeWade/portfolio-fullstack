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
  const overview = exp.overview || (exp.Description !== 'je no sais pas' ? exp.Description : '');

  const responsibilities = toArray(exp.responsibilities || exp.Tâches);
  const achievements = toArray(exp.key_achievements || exp.achievements || exp['Quelque chose']);
  const learned = toArray(exp.what_i_learned || exp.learned);
  const technologies = toArray(exp.technologies || exp.Technologies);

  // LOGIQUE ATTESTATION DE STAGE
  const certificateUrl = exp.certificate_url || exp.attestation_url;
  const isInternship = (type || '').toLowerCase().includes('intern') || 
                       (title || '').toLowerCase().includes('intern');

  return (
    <div className="min-h-screen bg-[#FAF7F8] text-[#2C1820] pt-28 pb-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* BOUTON RETOUR HAUT */}
        <div>
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] border border-[#F472B6]/30 rounded-xl px-4 py-2 bg-white hover:bg-[#FCE7F3]/40 transition-colors shadow-2xs"
          >
            ← Retour aux expériences
          </Link>
        </div>

        {/* EN-TÊTE PRINCIPAL */}
        <div className="space-y-3">
          {type && (
            <span className="uppercase text-[10px] tracking-wider font-mono font-bold px-2.5 py-1 rounded-md bg-[#FCE7F3] text-[#BE185D] border border-[#F472B6]/30">
              {type}
            </span>
          )}

          <h1 className="text-3xl sm:text-5xl font-serif text-[#2C1820] font-bold">
            {title}
          </h1>

          <p className="text-lg font-serif text-[#5C404E]">
            {company}
          </p>

          <p className="text-xs font-mono text-[#8C5873]">
            📍 {location} · {period}
          </p>

          {/* BOUTON ATTESTATION DE STAGE */}
          {isInternship && (
            <div className="pt-2">
              {certificateUrl && typeof certificateUrl === 'string' && certificateUrl.trim().toLowerCase().startsWith('http') ? (
                <a
                  href={certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] bg-[#FCE7F3]/50 hover:bg-[#FCE7F3] px-4 py-2 rounded-xl border border-[#F472B6]/30 transition-all shadow-2xs"
                >
                  📄 Voir l'attestation de stage ↗
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#8C5873] bg-[#FAF7F8] px-3.5 py-1.5 rounded-xl border border-[#F472B6]/20">
                  ⏳ Attestation à venir
                </span>
              )}
            </div>
          )}
        </div>

        {/* CONTENU & SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          <div className="lg:col-span-2 space-y-10">
            {overview && (
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2C1820] mb-3 border-b border-[#F472B6]/20 pb-2">
                  Overview
                </h3>
                <p className="text-sm text-[#5C404E] leading-relaxed font-light">
                  {overview}
                </p>
              </div>
            )}

            {responsibilities.length > 0 && (
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2C1820] mb-4 border-b border-[#F472B6]/20 pb-2">
                  Responsibilities
                </h3>
                <ul className="space-y-3">
                  {responsibilities.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#5C404E] font-light">
                      <span className="text-[#EC4899] font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {achievements.length > 0 && (
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2C1820] mb-4 border-b border-[#F472B6]/20 pb-2">
                  Key Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-xl border-l-4 border-l-[#EC4899] border border-[#F472B6]/30 text-sm text-[#2C1820] shadow-2xs font-light"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {learned.length > 0 && (
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2C1820] mb-4 border-b border-[#F472B6]/20 pb-2">
                  What I learned
                </h3>
                <ul className="space-y-3">
                  {learned.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#5C404E] font-light">
                      <span className="text-[#EC4899] text-xs mt-0.5">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {technologies.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-[#F472B6]/30 shadow-2xs space-y-3">
                <h4 className="text-[10px] font-mono tracking-widest text-[#BE185D] uppercase font-bold">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-[#FCE7F3]/60 text-[#BE185D] border border-[#F472B6]/30 text-xs font-mono px-3 py-1.5 rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-2xl border border-[#F472B6]/30 shadow-2xs space-y-4">
              <h4 className="text-[10px] font-mono tracking-widest text-[#BE185D] uppercase font-bold">
                DETAILS
              </h4>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-[#8C5873] block mb-0.5">Company</span>
                  <span className="text-[#2C1820] font-medium">{company}</span>
                </div>
                <div className="border-t border-[#F472B6]/10 pt-3">
                  <span className="text-[#8C5873] block mb-0.5">Type</span>
                  <span className="text-[#BE185D] font-medium uppercase">{type}</span>
                </div>
                <div className="border-t border-[#F472B6]/10 pt-3">
                  <span className="text-[#8C5873] block mb-0.5">Location</span>
                  <span className="text-[#2C1820] font-medium">{location}</span>
                </div>
                <div className="border-t border-[#F472B6]/10 pt-3">
                  <span className="text-[#8C5873] block mb-0.5">Duration</span>
                  <span className="text-[#2C1820] font-medium">{period}</span>
                </div>
              </div>
            </div>

            {/* BOUTON RETOUR BAS */}
            <div>
              <Link
                href="/experiences"
                className="w-full flex items-center justify-center gap-2 border border-[#F472B6]/30 bg-white hover:bg-[#FCE7F3]/40 text-[#BE185D] text-xs font-mono py-3 rounded-xl transition-colors shadow-2xs font-bold"
              >
                ← Retour aux expériences
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}