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

  let exp = null;

  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      exp = data;
    }
  } catch (err) {
    console.error('Erreur Supabase lors de la récupération du détail', err);
  }

  if (!exp) {
    notFound();
  }

  const title = exp.title;
  const company = exp.company;
  const location = exp.location;
  const period = exp.period;
  const type = exp.type || 'STAGE';
  
  const apercu = exp.apercu || '';
  const responsabilites = toArray(exp.responsabilites);
  const realisationsCles = toArray(exp.realisations_cles);
  const ceQueJaiAppris = toArray(exp.ce_que_j_ai_appris);
  const technologies = toArray(exp.technologies);

  return (
    <div className="min-h-screen bg-[#FAF8FC] text-gray-800 pt-16 pb-20">
      {/* En-tête de la page de détail */}
      <div className="border-b border-purple-200/50 bg-[#FAF8FC] py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-pink-600 border border-purple-200 rounded-xl px-4 py-2 bg-white hover:bg-pink-50 transition-all shadow-sm"
            >
              ← Retour aux expériences
            </Link>
          </div>

          <div className="space-y-3">
            {type && (
              <span className="inline-block uppercase text-[10px] tracking-widest font-mono font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                {type}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              {title}
            </h1>

            <p className="text-xl font-serif text-purple-900">
              {company}
            </p>

            <p className="text-xs font-mono text-gray-500 flex items-center gap-2 pt-1">
              <span>📍 {location}</span>
              <span>•</span>
              <span className="text-pink-600 font-bold">{period}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal en deux colonnes */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Colonne de gauche (2/3) */}
          <div className="lg:col-span-2 space-y-12">
            {apercu && (
              <div className="space-y-4">
                <h2 className="text-2xl font-serif text-gray-900 font-bold">Aperçu</h2>
                <div className="w-full h-px bg-purple-200/60" />
                <p className="text-base text-gray-700 font-light leading-relaxed whitespace-pre-line font-mono">
                  {apercu}
                </p>
              </div>
            )}

            {responsabilites.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-gray-900 font-bold">Responsabilités</h2>
                <div className="w-full h-px bg-purple-200/60" />
                <ul className="space-y-4">
                  {responsabilites.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 font-light font-mono">
                      <span className="text-pink-600 font-bold mt-0.5">→</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {realisationsCles.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-gray-900 font-bold">Réalisations clés</h2>
                <div className="w-full h-px bg-purple-200/60" />
                <div className="space-y-4">
                  {realisationsCles.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-5 bg-white rounded-2xl border-l-4 border-l-pink-500 border border-purple-100 shadow-sm text-sm sm:text-base text-gray-800 font-light font-mono"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ceQueJaiAppris.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-gray-900 font-bold">Ce que j'ai appris</h2>
                <div className="w-full h-px bg-purple-200/60" />
                <ul className="space-y-4">
                  {ceQueJaiAppris.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 font-light font-mono">
                      <span className="text-pink-600 text-xs mt-1.5">◆</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Colonne de droite (1/3) */}
          <div className="space-y-8">
            {technologies.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
                <h3 className="text-xs font-mono tracking-widest text-pink-600 uppercase font-bold">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-pink-50 text-pink-700 border border-pink-100 text-xs font-mono px-3 py-1.5 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-6">
              <h3 className="text-xs font-mono tracking-widest text-pink-600 uppercase font-bold">
                Détails
              </h3>
              
              <div className="space-y-5 text-sm font-mono">
                <div>
                  <span className="text-gray-400 block text-xs mb-1">Entreprise</span>
                  <span className="text-gray-900 font-bold text-base font-serif">{company}</span>
                </div>

                <div className="border-t border-purple-50 pt-4">
                  <span className="text-gray-400 block text-xs mb-1">Type</span>
                  <span className="text-pink-600 font-medium uppercase">{type}</span>
                </div>

                <div className="border-t border-purple-50 pt-4">
                  <span className="text-gray-400 block text-xs mb-1">Emplacement</span>
                  <span className="text-gray-900 font-medium">{location}</span>
                </div>

                <div className="border-t border-purple-50 pt-4">
                  <span className="text-gray-400 block text-xs mb-1">Durée</span>
                  <span className="text-gray-900 font-medium">{period}</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/experiences"
                className="w-full block text-center py-3.5 px-6 rounded-2xl bg-white border border-purple-200 text-gray-800 text-xs font-mono font-bold hover:border-pink-400 hover:text-pink-600 transition-all shadow-sm"
              >
                ← Toutes les expériences
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}