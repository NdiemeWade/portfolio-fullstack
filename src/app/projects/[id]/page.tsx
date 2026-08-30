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
  const learnedList = toArray(project.Enseignements || project.what_i_learned);
  const resultsList = toArray(project.Résultats || project.results);
  const stackList = toArray(project.Technologies || project.Stack || project.stack);

  return (
    <div className="min-h-screen bg-[#FAF7F8] text-[#2C1820] pt-8">
      {/* BANNIÈRE HERO */}
      <div className="relative w-full h-[380px] md:h-[450px] bg-gradient-to-br from-[#FAF4F7] to-[#FCE7F3] overflow-hidden border-b border-[#F472B6]/20">
        {project.Image && (
          <img
            src={project.Image}
            alt={project.Titre || 'Projet'}
            className="w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F8] via-[#FAF7F8]/40 to-transparent" />
        <div className="absolute bottom-8 left-8 md:left-16 right-8 max-w-5xl mx-auto space-y-2">
          {project.Catégorie && (
            <span className="inline-block bg-white/90 backdrop-blur-md text-[#BE185D] border border-[#F472B6]/30 text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm">
              {project.Catégorie}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-serif text-[#2C1820] font-extrabold tracking-tight">
            {project.Titre || project.title}
            <span className="text-[#EC4899]">.</span>
          </h1>
        </div>
      </div>

      {/* CONTENU PRINCIPAL & SIDEBAR */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* BOUTON RETOUR REDIRIGEANT VERS /projects */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] hover:text-[#EC4899] border border-[#F472B6]/30 rounded-xl px-4 py-2.5 transition-all bg-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
          >
            ← Retour aux projets
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* COLONNE DE GAUCHE : DÉTAILS TEXTUELS */}
          <div className="lg:col-span-2 space-y-8">
            {project.short_description && (
              <p className="text-lg text-[#5C404E] leading-relaxed font-light">
                {project.short_description}
              </p>
            )}

            {contextText && (
              <div className="pt-6 border-t border-[#F472B6]/20 space-y-2">
                <h3 className="text-xl font-serif text-[#2C1820] font-bold">
                  Contexte
                </h3>
                <p className="text-[#5C404E] leading-relaxed text-sm sm:text-base">
                  {contextText}
                </p>
              </div>
            )}

            {problemText && (
              <div className="pt-6 border-t border-[#F472B6]/20 space-y-2">
                <h3 className="text-xl font-serif text-[#2C1820] font-bold">
                  Le Problème
                </h3>
                <p className="text-[#5C404E] leading-relaxed text-sm sm:text-base">
                  {problemText}
                </p>
              </div>
            )}

            {solutionText && (
              <div className="pt-6 border-t border-[#F472B6]/20 space-y-2">
                <h3 className="text-xl font-serif text-[#2C1820] font-bold">
                  La Solution
                </h3>
                <p className="text-[#5C404E] leading-relaxed text-sm sm:text-base">
                  {solutionText}
                </p>
              </div>
            )}

            {roleText && (
              <div className="pt-6 border-t border-[#F472B6]/20 space-y-2">
                <h3 className="text-xl font-serif text-[#2C1820] font-bold">
                  Mon Rôle
                </h3>
                <p className="text-[#5C404E] leading-relaxed text-sm sm:text-base">
                  {roleText}
                </p>
              </div>
            )}

            {challengesList.length > 0 && (
              <div className="pt-6 border-t border-[#F472B6]/20 space-y-4">
                <h3 className="text-xl font-serif text-[#2C1820] font-bold">
                  Défis
                </h3>
                <ul className="space-y-3">
                  {challengesList.map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-[#5C404E] text-sm sm:text-base">
                      <span className="text-[#EC4899] font-bold">→</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {learnedList.length > 0 && (
              <div className="pt-6 border-t border-[#F472B6]/20 space-y-4">
                <h3 className="text-xl font-serif text-[#2C1820] font-bold">
                  Ce que j'ai appris
                </h3>
                <div className="flex flex-wrap gap-2">
                  {learnedList.map((item: string, index: number) => (
                    <span
                      key={index}
                      className="bg-[#FCE7F3]/60 text-[#BE185D] border border-[#F472B6]/30 text-xs font-mono font-medium px-4 py-2 rounded-xl"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resultsList.length > 0 && (
              <div className="pt-6 border-t border-[#F472B6]/20 space-y-4">
                <h3 className="text-xl font-serif text-[#2C1820] font-bold">
                  Résultats
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resultsList.map((result: string, index: number) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-2xl text-sm font-medium text-[#2C1820] border border-[#F472B6]/30 shadow-sm"
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
              <div className="bg-white p-6 rounded-3xl border border-[#F472B6]/30 shadow-sm space-y-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-[#F472B6]/40 text-[#BE185D] hover:bg-[#FAF4F7] font-mono font-bold text-xs py-3 rounded-xl transition-all shadow-sm"
                  >
                    GitHub ↗
                  </a>
                )}
                {(project.demo_url || project.live_url) && (
                  <a
                    href={project.demo_url || project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:from-[#DB2777] hover:to-[#7C3AED] text-white font-mono font-bold text-xs py-3 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    Démo en direct ↗
                  </a>
                )}
              </div>
            )}

            <div className="bg-white p-6 rounded-3xl border border-[#F472B6]/30 shadow-sm space-y-4">
              <h4 className="text-xs font-mono tracking-widest text-[#BE185D] uppercase font-bold">
                DÉTAILS
              </h4>
              {project.Catégorie && (
                <div className="flex justify-between items-center text-sm border-b border-[#F472B6]/10 pb-3">
                  <span className="text-[#8C5873]">Catégorie</span>
                  <span className="font-semibold text-[#2C1820]">{project.Catégorie}</span>
                </div>
              )}
              {project.Statut && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#8C5873]">Statut</span>
                  <span className="font-semibold text-[#BE185D]">{project.Statut}</span>
                </div>
              )}
            </div>

            {stackList.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-[#F472B6]/30 shadow-sm space-y-4">
                <h4 className="text-xs font-mono tracking-widest text-[#BE185D] uppercase font-bold">
                  STACK / TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {stackList.map((tech: string) => (
                    <span
                      key={tech}
                      className="bg-[#FCE7F3]/60 text-[#BE185D] text-xs px-3 py-1.5 rounded-lg font-mono border border-[#F472B6]/30 font-medium"
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