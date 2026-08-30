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

export default async function CertificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: cert, error } = await supabase
    .from('certifications')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !cert) {
    notFound();
  }

  const certUrl = cert.certificate_url || cert.credential_url;
  const hasValidLink = Boolean(
    certUrl &&
    typeof certUrl === 'string' &&
    certUrl.trim().toLowerCase().startsWith('http')
  );

  const skills = toArray(cert.skills);

  return (
    <main className="bg-[#FAF7F8] min-h-screen pt-28 pb-16 px-4 sm:px-8 text-[#2C1820]">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* BOUTON RETOUR */}
        <div>
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] border border-[#F472B6]/30 rounded-xl px-4 py-2 bg-white hover:bg-[#FCE7F3]/40 transition-colors shadow-2xs"
          >
            ← Retour aux certifications
          </Link>
        </div>

        {/* CARTE PRINCIPALE DE DÉTAIL */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#F472B6]/30 shadow-sm space-y-8">
          
          {/* EN-TÊTE */}
          <div className="border-b border-[#F472B6]/15 pb-6 space-y-3">
            <span className="uppercase text-[10px] tracking-widest font-mono font-bold px-3 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] border border-[#F472B6]/30">
              Détails de la certification
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1820]">
              {cert.title}
            </h1>
            <p className="text-sm font-mono text-[#8C5873]">
              Organisme délivreur : <span className="font-bold text-[#5C404E]">{cert.issuer}</span>
            </p>
          </div>

          {/* INFORMATIONS CLÉS (GRILLE) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-[#FAF7F8] rounded-2xl border border-[#F472B6]/20 space-y-1">
              <span className="text-[#8C5873] block text-[10px] uppercase tracking-wider">Date d'obtention</span>
              <span className="font-bold text-[#2C1820] text-sm">{cert.issue_date || 'Non spécifiée'}</span>
            </div>

            <div className="p-4 bg-[#FAF7F8] rounded-2xl border border-[#F472B6]/20 space-y-1">
              <span className="text-[#8C5873] block text-[10px] uppercase tracking-wider">Date d'expiration</span>
              <span className="font-bold text-[#2C1820] text-sm">{cert.expiration_date || 'Sans expiration'}</span>
            </div>

            {cert.credential_id && (
              <div className="p-4 bg-[#FAF7F8] rounded-2xl border border-[#F472B6]/20 space-y-1 sm:col-span-2">
                <span className="text-[#8C5873] block text-[10px] uppercase tracking-wider">Identifiant du certificat</span>
                <span className="font-bold font-mono text-[#BE185D] text-xs select-all">{cert.credential_id}</span>
              </div>
            )}
          </div>

          {/* DESCRIPTION & PROGRAMME */}
          {cert.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-serif font-bold text-[#2C1820] uppercase tracking-wider">
                À propos de cette formation
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#5C404E] whitespace-pre-line">
                {cert.description}
              </p>
            </div>
          )}

          {/* COMPÉTENCES ACQUISES */}
          {skills.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-serif font-bold text-[#2C1820] uppercase tracking-wider">
                Compétences validées
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-[#FCE7F3]/60 text-[#BE185D] border border-[#F472B6]/30 text-xs font-mono px-3 py-1.5 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* BOUTON D'ACTION DÉLIVRANCE */}
          <div className="pt-4 border-t border-[#F472B6]/15 flex items-center justify-between">
            {hasValidLink ? (
              <a
                href={certUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] bg-[#FCE7F3] hover:bg-[#FBCFE8] px-5 py-2.5 rounded-xl border border-[#F472B6]/40 transition-all shadow-2xs"
              >
                📄 Consulter le certificat officiel ↗
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#8C5873] bg-[#FAF7F8] px-4 py-2 rounded-xl border border-[#F472B6]/20">
                ⏳ Certificat en cours de délivrance
              </span>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}