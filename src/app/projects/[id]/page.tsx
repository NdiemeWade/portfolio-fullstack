export const revalidate = 0; // Force la mise à jour des données Supabase en temps réel

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// Helper pour tout convertir en tableau d'éléments proprement
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
    return [val];
  }
  return [];
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) {
    notFound();
  }

  // Mappage précis avec les colonnes de ton Supabase
  const contextText = project.Contexte || project.context;
  const problemText = project.Problème || project.problem;
  const solutionText = project.Solution || project.solution;
  const roleText = project.Rôle || project.role;

  const challengesList = toArray(project.Défis || project.challenges);
  
  // Utilise "Enseignements" en priorité, sinon "what_i_learned"
  const learnedList = toArray(project.Enseignements || project.what_i_learned);
  
  const resultsList = toArray(project.Résultats || project.results);
  
  // Utilise "Technologies" en priorité, sinon "Stack"
  const stackList = toArray(project.Technologies || project.Stack || project.stack);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* BANNIÈRE HERO */}
      <div className="relative w-full h-[380px] md:h-[450px] bg-neutral-900 overflow-hidden">
        {project.Image && (
          <img
            src={project.Image}
            alt={project.Titre || 'Projet'}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 md:left-16 right-8 max-w-5xl mx-auto">
          {project.Catégorie && (
            <span className="inline-block bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {project.Catégorie}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-serif text-white font-normal">
            {project.Titre || project.title}
          </h1>
        </div>
      </div>

      {/* CONTENU PRINCIPAL & SIDEBAR */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-lg px-4 py-2 transition-colors bg-white shadow-sm"
          >
            ← Retour aux projets
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* COLONNE DE GAUCHE : DÉTAILS TEXTUELS */}
          <div className="lg:col-span-2 space-y-10">
            {project.short_description && (
              <p className="text-lg text-neutral-700 leading-relaxed font-light">
                {project.short_description}
              </p>
            )}

            {contextText && (
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-xl font-serif text-neutral-900 mb-2 font-semibold">
                  Contexte
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {contextText}
                </p>
              </div>
            )}

            {problemText && (
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-xl font-serif text-neutral-900 mb-2 font-semibold">
                  Le Problème
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {problemText}
                </p>
              </div>
            )}

            {solutionText && (
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-xl font-serif text-neutral-900 mb-2 font-semibold">
                  La Solution
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {solutionText}
                </p>
              </div>
            )}

            {roleText && (
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-xl font-serif text-neutral-900 mb-2 font-semibold">
                  Mon Rôle
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {roleText}
                </p>
              </div>
            )}

            {challengesList.length > 0 && (
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-xl font-serif text-neutral-900 mb-4 font-semibold">
                  Défis
                </h3>
                <ul className="space-y-3">
                  {challengesList.map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-neutral-700">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {learnedList.length > 0 && (
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-xl font-serif text-neutral-900 mb-4 font-semibold">
                  Ce que j'ai appris
                </h3>
                <div className="flex flex-wrap gap-3">
                  {learnedList.map((item: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 border border-blue-200 text-sm px-4 py-2 rounded-lg font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resultsList.length > 0 && (
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-xl font-serif text-neutral-900 mb-4 font-semibold">
                  Résultats
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resultsList.map((result: string, index: number) => (
                    <div
                      key={index}
                      className="bg-neutral-100 p-4 rounded-xl text-sm font-medium text-neutral-800 border border-neutral-200"
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COLONNE DE DROITE : MÉTADONNÉES ET LIENS */}
          <div className="space-y-6">
            {(project.github_url || project.demo_url || project.live_url) && (
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-neutral-300 text-neutral-800 hover:bg-neutral-50 font-medium py-3 rounded-xl transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
                {(project.demo_url || project.live_url) && (
                  <a
                    href={project.demo_url || project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm"
                  >
                    Démo en direct ↗
                  </a>
                )}
              </div>
            )}

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
              <h4 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                DÉTAILS
              </h4>
              {project.Catégorie && (
                <div className="flex justify-between items-center text-sm border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Catégorie</span>
                  <span className="font-semibold text-neutral-900">{project.Catégorie}</span>
                </div>
              )}
              {project.Statut && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">Statut</span>
                  <span className="font-semibold text-emerald-600">{project.Statut}</span>
                </div>
              )}
            </div>

            {stackList.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
                <h4 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  STACK / TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {stackList.map((tech: string) => (
                    <span
                      key={tech}
                      className="bg-neutral-100 text-neutral-700 text-xs px-3 py-1.5 rounded-md font-mono border border-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}