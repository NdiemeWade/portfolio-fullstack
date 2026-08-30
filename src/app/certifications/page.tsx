export const revalidate = 0;

import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Certifications | Ndiémé Wade',
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

export default async function CertificationsPage() {
  const { data: certificationsList, error } = await supabase
    .from('certifications')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="bg-[#FAF7F8] min-h-screen pt-28 pb-16 px-4 sm:px-8 text-[#2C1820]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* BOUTON RETOUR À L'ACCUEIL */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] border border-[#F472B6]/30 rounded-xl px-4 py-2 bg-white hover:bg-[#FCE7F3]/40 transition-colors shadow-2xs"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        {/* EN-TÊTE DE LA PAGE */}
        <div className="text-center space-y-3">
          <span className="uppercase text-[10px] tracking-widest font-mono font-bold px-3 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] border border-[#F472B6]/30">
            Reconnaissances & Distinctions
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C1820]">
            Certifications<span className="text-[#EC4899]">.</span>
          </h1>
          <p className="text-sm font-light text-[#5C404E] max-w-xl mx-auto">
            Mes accréditations, certifications académiques et spécialisations suivies auprès d'organismes internationaux (Google, universités, plateformes professionnelles).
          </p>
        </div>

        {/* CONTENU : ERREUR, LISTE VIDE OU TUILES */}
        {error ? (
          <div className="text-center py-12 text-sm text-[#BE185D]">
            Erreur lors du chargement des certifications.
          </div>
        ) : !certificationsList || certificationsList.length === 0 ? (
          /* ÉTAT VIDE : QUAND AUCUNE CERTIFICATION N'EST DANS SUPABASE */
          <div className="bg-white p-10 rounded-2xl border border-[#F472B6]/30 shadow-2xs text-center space-y-4 max-w-lg mx-auto">
            <div className="text-4xl">📜</div>
            <h3 className="text-lg font-serif font-bold text-[#2C1820]">
              Aucune certification pour le moment
            </h3>
            <p className="text-xs font-light text-[#5C404E] leading-relaxed">
              Mes certifications et parcours de spécialisation sont actuellement en cours de préparation ou de validation. Elles s'afficheront ici dès leur obtention.
            </p>
            <span className="inline-block text-[11px] font-mono font-semibold text-[#8C5873] bg-[#FAF7F8] px-3 py-1.5 rounded-xl border border-[#F472B6]/20">
              ⏳ Prochaines accréditations à venir
            </span>
          </div>
        ) : (
          /* TIMELINE DE CERTIFICATIONS (AFFICHÉE AUTOMATIQUEMENT DÈS AJOUT DANS SUPABASE) */
          <div className="relative border-l-2 border-[#F472B6]/40 ml-4 sm:ml-32 space-y-12 py-4">
            {certificationsList.map((item: any, index: number) => {
              const title = item.title;
              const issuer = item.issuer;
              const issueDate = item.issue_date || 'Date non précisée';
              const expirationDate = item.expiration_date;
              const credentialId = item.credential_id;
              const credentialUrl = item.credential_url;
              const certUrl = item.certificate_url;
              const description = item.description;
              const skills = toArray(item.skills);

              const activeUrl = certUrl || credentialUrl;
              const hasValidLink = Boolean(
                activeUrl &&
                typeof activeUrl === 'string' &&
                activeUrl.trim().toLowerCase().startsWith('http')
              );

              return (
                <div key={item.id || index} className="relative pl-8 sm:pl-10 group">
                  
                  {/* Point Timeline */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#FAF7F8] border-2 border-[#BE185D] group-hover:bg-[#BE185D] group-hover:scale-125 transition-all duration-200" />

                  {/* Date */}
                  <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono font-bold text-[#BE185D] mb-1 sm:mb-0 sm:w-28 sm:text-right">
                    {issueDate}
                  </div>

                  {/* Carte d'information */}
                  <div className="bg-white p-6 rounded-2xl border border-[#F472B6]/30 shadow-2xs space-y-4 transition-all group-hover:shadow-md">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h2 className="text-xl font-serif font-bold text-[#2C1820]">
                          {title}
                        </h2>
                        {expirationDate && (
                          <span className="text-[10px] font-mono text-[#8C5873] bg-[#FAF7F8] px-2.5 py-1 rounded-md border border-[#F472B6]/20">
                            Validité : {expirationDate}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8C5873]">
                        <span className="font-semibold text-[#5C404E]">🏛️ {issuer}</span>
                        {credentialId && (
                          <>
                            <span>·</span>
                            <span>ID: {credentialId}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {description && (
                      <p className="text-sm text-[#5C404E] font-light leading-relaxed whitespace-pre-line line-clamp-2">
                        {description}
                      </p>
                    )}

                    {/* Badges Compétences */}
                    {skills.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-2">
                        {skills.map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-[#FCE7F3]/60 text-[#BE185D] border border-[#F472B6]/30 text-[11px] font-mono px-2.5 py-1 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* BOUTONS D'ACTION */}
                    <div className="pt-3 border-t border-[#F472B6]/10 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        {hasValidLink ? (
                          <a
                            href={activeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#BE185D] bg-[#FCE7F3]/50 hover:bg-[#FCE7F3] px-3.5 py-2 rounded-xl border border-[#F472B6]/30 transition-all shadow-2xs"
                          >
                            📄 Voir la certification ↗
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#8C5873] bg-[#FAF7F8] px-3 py-1.5 rounded-xl border border-[#F472B6]/20">
                            ⏳ Certification à venir
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/certifications/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#BE185D] hover:text-[#EC4899] bg-[#FCE7F3]/40 hover:bg-[#FCE7F3] px-3.5 py-2 rounded-xl border border-[#F472B6]/30 transition-all shadow-2xs"
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