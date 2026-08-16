import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Sparkles, ArrowRight, Code2, Database, Brain } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
}

export default async function HomePage() {
  const { data: skills } = await supabase.from("skills").select("*").order("name");
  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 space-y-24">
      {/* SECTION HERO */}
      <section className="flex flex-col items-start gap-6 pt-8 md:pt-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-chic-100 dark:bg-chic-800 border border-chic-200 dark:border-chic-700 text-chic-900 dark:text-chic-100 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-chic-600 dark:text-chic-400" />
          <span>Étudiante en Bachelor Informatique @ Epitech Nancy</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-chic-950 dark:text-chic-50 tracking-tight leading-tight">
          Développeuse Full-Stack & Passionnée d'IA<span className="text-chic-600 dark:text-chic-400">.</span>
        </h1>

        <p className="max-w-2xl text-lg text-chic-900 dark:text-chic-100 font-medium leading-relaxed">
          Bienvenue sur mon portfolio. Je conçois des applications web modernes, robustes et évolutives, en explorant l'ingénierie logicielle et la science des données.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="#projects"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-chic-600 hover:bg-chic-700 dark:bg-chic-500 dark:hover:bg-chic-600 text-white font-medium shadow-md transition-all"
          >
            <span>Voir mes projets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#contact"
            className="px-6 py-3 rounded-full bg-chic-100 dark:bg-chic-800 hover:bg-chic-200 dark:hover:bg-chic-700 text-chic-950 dark:text-chic-50 font-medium border border-chic-300 dark:border-chic-700 transition-all"
          >
            Me contacter
          </Link>
        </div>

        {/* Quick Skill Tags */}
        <div className="pt-6 border-t border-chic-200 dark:border-chic-800 flex flex-wrap gap-6 text-sm font-semibold text-chic-900 dark:text-chic-200">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-chic-600 dark:text-chic-400" />
            <span>Full-Stack Web</span>
          </div>
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-chic-600 dark:text-chic-400" />
            <span>Data & Supabase</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-chic-600 dark:text-chic-400" />
            <span>Intelligence Artificielle</span>
          </div>
        </div>
      </section>

      {/* SECTION À PROPOS */}
      <section id="about" className="scroll-mt-24">
        <h2 className="text-2xl font-serif font-bold text-chic-950 dark:text-chic-50 border-b border-chic-200 dark:border-chic-800 pb-3">
          À propos
        </h2>
        <p className="mt-4 text-chic-900 dark:text-chic-100 font-medium leading-relaxed max-w-3xl">
          Passionnée par la résolution de problèmes complexes et les systèmes intelligents, je développe des solutions full-stack modulaires. Mon objectif est d'allier rigueur logicielle et technologies émergentes pour bâtir des produits digitaux performants.
        </p>
      </section>

      {/* SECTION EXPÉRIENCES */}
      <section id="experiences" className="scroll-mt-24">
        <h2 className="text-2xl font-serif font-bold text-chic-950 dark:text-chic-50 border-b border-chic-200 dark:border-chic-800 pb-3">
          Expériences
        </h2>
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-chic-200 dark:border-chic-800 bg-chic-100/50 dark:bg-chic-800/40 p-6 shadow-sm">
            <span className="text-xs font-bold text-chic-600 dark:text-chic-400">Stage • 2026</span>
            <h3 className="mt-1 text-lg font-bold text-chic-950 dark:text-chic-50">
              Développeuse Full-Stack / Backend
            </h3>
            <p className="text-sm font-semibold text-chic-800 dark:text-chic-300">LAS (Limak-AIBD-Summa)</p>
            <p className="mt-3 text-sm text-chic-900 dark:text-chic-200 font-medium">
              Développement d'APIs REST, gestion et optimisation de bases de données MySQL/Node.js et tests d'intégration.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION PROJETS */}
      <section id="projects" className="scroll-mt-24">
        <h2 className="text-2xl font-serif font-bold text-chic-950 dark:text-chic-50 border-b border-chic-200 dark:border-chic-800 pb-3">
          Projets
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project: Project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-chic-200 dark:border-chic-800 bg-chic-100/40 dark:bg-chic-800/30 p-6 shadow-sm flex flex-col justify-between hover:border-chic-500/50 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-bold text-chic-950 dark:text-chic-50">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-chic-900 dark:text-chic-200 font-medium">
                    {project.description}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-chic-700 dark:text-chic-300">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="bg-chic-200/80 dark:bg-chic-800 px-2.5 py-1 rounded-full text-chic-950 dark:text-chic-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-chic-800 dark:text-chic-300">Aucun projet trouvé.</p>
          )}
        </div>
      </section>

      {/* SECTION COMPÉTENCES */}
      <section id="skills" className="scroll-mt-24">
        <h2 className="text-2xl font-serif font-bold text-chic-950 dark:text-chic-50 border-b border-chic-200 dark:border-chic-800 pb-3">
          Compétences
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {skills && skills.length > 0 ? (
            skills.map((skill: Skill) => (
              <span
                key={skill.id}
                className="rounded-full border border-chic-200 dark:border-chic-800 bg-chic-100 dark:bg-chic-800 px-4 py-2 text-sm font-semibold text-chic-950 dark:text-chic-50 shadow-sm"
              >
                {skill.name}
              </span>
            ))
          ) : (
            <p className="text-sm text-chic-800 dark:text-chic-300">Aucune compétence trouvée.</p>
          )}
        </div>
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" className="scroll-mt-24 rounded-3xl bg-chic-100/60 dark:bg-chic-800/50 border border-chic-200 dark:border-chic-800 p-8 text-center">
        <h2 className="text-2xl font-serif font-bold text-chic-950 dark:text-chic-50">
          Travaillons ensemble !
        </h2>
        <p className="mt-2 text-chic-900 dark:text-chic-200 font-medium">
          Une question, un projet ou une opportunité ? Laisse-moi un message ci-dessous.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}