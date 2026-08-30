export const revalidate = 0;

import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Informations Complémentaires | Ndiémé Wade',
};

export default async function OthersPage() {
  const { data: items, error } = await supabase
    .from('other_info')
    .select('*')
    .order('display_order', { ascending: true });

  // Regroupement automatique des données par catégorie
  const categories = items
    ? items.reduce((acc: Record<string, any[]>, item: any) => {
        const cat = item.category || 'Divers';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {})
    : {};

  return (
    <main className="bg-[#FAF7F8] min-h-screen pt-28 pb-16 px-4 sm:px-8 text-[#2C1820]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* BOUTON RETOUR */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] border border-[#F472B6]/30 rounded-xl px-4 py-2 bg-white hover:bg-[#FCE7F3]/40 transition-colors shadow-2xs"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        {/* EN-TÊTE */}
        <div className="text-center space-y-3">
          <span className="uppercase text-[10px] tracking-widest font-mono font-bold px-3 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] border border-[#F472B6]/30">
            Profil & Intérêts
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C1820]">
            Autres Informations<span className="text-[#EC4899]">.</span>
          </h1>
          <p className="text-sm font-light text-[#5C404E] max-w-xl mx-auto">
            Langues pratiquées, permis de conduire, centres d'intérêt, passions et engagements personnels.
          </p>
        </div>

        {/* CONTENU */}
        {error ? (
          <div className="text-center py-12 text-sm text-[#BE185D]">
            Erreur lors du chargement des informations.
          </div>
        ) : !items || items.length === 0 ? (
          /* ÉTAT VIDE SI LA TABLE SUPABASE EST VIDE */
          <div className="bg-white p-10 rounded-2xl border border-[#F472B6]/30 shadow-2xs text-center space-y-4 max-w-lg mx-auto">
            <div className="text-4xl">🌟</div>
            <h3 className="text-lg font-serif font-bold text-[#2C1820]">
              Informations en cours de mise à jour
            </h3>
            <p className="text-xs font-light text-[#5C404E] leading-relaxed">
              Les détails concernant mes compétences linguistiques, centres d'intérêt et permis seront ajoutés prochainement.
            </p>
            <span className="inline-block text-[11px] font-mono font-semibold text-[#8C5873] bg-[#FAF7F8] px-3 py-1.5 rounded-xl border border-[#F472B6]/20">
              ⏳ Contenu à venir
            </span>
          </div>
        ) : (
          /* AFFICHAGE PAR CATÉGORIES */
          <div className="space-y-8">
            {Object.entries(categories).map(([categoryName, groupItems]) => (
              <div key={categoryName} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F472B6]/30 shadow-2xs space-y-4">
                <h2 className="text-xl font-serif font-bold text-[#2C1820] border-b border-[#F472B6]/20 pb-3 flex items-center gap-2">
                  <span className="text-[#EC4899]">✦</span> {categoryName}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {groupItems.map((item: any, idx: number) => (
                    <div
                      key={item.id || idx}
                      className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#F472B6]/20 space-y-2 hover:border-[#F472B6]/40 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <span className="text-xl">{item.icon}</span>}
                        <div>
                          <h3 className="text-sm font-bold font-serif text-[#2C1820]">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-xs font-mono text-[#BE185D]">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {item.description && (
                        <p className="text-xs font-light text-[#5C404E] leading-relaxed pt-1 border-t border-[#F472B6]/10">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}