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

export default async function EducationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: edu, error } = await supabase
    .from('education')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !edu) {
    notFound();
  }

  const degree = edu.degree || edu.Diplôme || edu.title;
  const institution = edu.institution || edu.École;
  const location = edu.location || edu.Lieu;
  const period = edu.period || edu.Période;
  const description = edu.description || edu.Description;
  const diplomaUrl = edu.diploma_url || edu.diploma;
  const status = edu.status || 'En cours';

  const courses = toArray(edu.courses || edu.skills || edu.Matières);
  const tools = toArray(edu.tools || edu.Outils);
  const keyProjects = toArray(edu.key_projects || edu.projets || edu.projects);

  return (
    <div className="min-h-screen bg-[#FAF7F8] text-[#2C1820] pt-28 pb-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* BOUTON RETOUR À L'ÉDUCATION */}
        <div>
          <Link
            href="/education"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] border border-[#F472B6]/30 rounded-xl px-4 py-2 bg-white hover:bg-[#FCE7F3]/40 transition-colors shadow-2xs"
          >
            ← Retour aux formations
          </Link>
        </div>

        {/* EN-TÊTE DE LA FORMATION */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F472B6]/30 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {period && (
              <span className="uppercase text-[10px] tracking-wider font-mono font-bold px-2.5 py-1 rounded-md bg-[#FCE7F3] text-[#BE185D] border border-[#F472B6]/30">
                {period}
              </span>
            )}
            <span className="text-xs font-mono text-[#8C5873] bg-[#FAF7F8] px-3 py-1 rounded-full border border-[#F472B6]/20">
              🎓 Status : {status}
            </span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#2C1820] font-bold">
              {degree}
            </h1>
            <p className="text-base text-[#5C404E] font-serif mt-1">
              <span className="font-semibold">{institution}</span> {location && `· 📍 ${location}`}
            </p>
          </div>

          {/* BOUTON DIPLÔME / ATTESTATION */}
          <div className="pt-2">
            {diplomaUrl && typeof diplomaUrl === 'string' && diplomaUrl.trim().toLowerCase().startsWith('http') ? (
              <a
                href={diplomaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] bg-[#FCE7F3]/50 hover:bg-[#FCE7F3] px-4 py-2 rounded-xl border border-[#F472B6]/30 transition-all shadow-2xs"
              >
                📄 Voir le diplôme / justificatif ↗
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#8C5873] bg-[#FAF7F8] px-3.5 py-1.5 rounded-xl border border-[#F472B6]/20">
                ⏳ Document à venir
              </span>
            )}
          </div>
        </div>

        {/* DÉTAILS DE LA FORMATION */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F472B6]/30 shadow-2xs space-y-8">
          
          {/* PRÉSENTATION DU PROGRAMME */}
          {description && (
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-3 border-b border-[#F472B6]/20 pb-2">
                Présentation du programme
              </h2>
              <p className="text-sm text-[#5C404E] leading-relaxed font-light whitespace-pre-line">
                {description}
              </p>
            </div>
          )}

          {/* PROJETS ACADÉMIQUES */}
          {keyProjects.length > 0 && (
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-4 border-b border-[#F472B6]/20 pb-2">
                Projets académiques & Réalisations
              </h2>
              <ul className="space-y-2.5">
                {keyProjects.map((proj: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#5C404E] font-light bg-[#FAF7F8] p-3.5 rounded-xl border border-[#F472B6]/20">
                    <span className="text-[#EC4899] font-bold">🚀</span>
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* MATIÈRES & LANGAGES */}
          {courses.length > 0 && (
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-4 border-b border-[#F472B6]/20 pb-2">
                Matières & Compétences acquises
              </h2>
              <div className="flex flex-wrap gap-2">
                {courses.map((course: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-[#FCE7F3]/60 text-[#BE185D] border border-[#F472B6]/30 text-xs font-mono px-3 py-1.5 rounded-lg font-medium"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* OUTILS ET TECHNOLOGIES */}
          {tools.length > 0 && (
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2C1820] mb-4 border-b border-[#F472B6]/20 pb-2">
                Outils & Environnements
              </h2>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-white text-[#5C404E] border border-[#F472B6]/30 text-xs font-mono px-3 py-1.5 rounded-lg font-medium shadow-2xs"
                  >
                    🛠️ {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RETOUR BAS DE PAGE */}
        <div className="pt-4">
          <Link
            href="/education"
            className="inline-flex items-center gap-2 border border-[#F472B6]/30 bg-white hover:bg-[#FCE7F3]/40 text-[#BE185D] text-xs font-mono px-6 py-3 rounded-xl transition-colors shadow-2xs font-bold"
          >
            ← Retour aux formations
          </Link>
        </div>

      </div>
    </div>
  );
}