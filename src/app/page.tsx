import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Types TypeScript pour nos données Supabase
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
  // Récupération dynamique depuis Supabase
  const { data: skills } = await supabase.from("skills").select("*").order("name");
  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 space-y-24">
      {/* SECTION HERO */}
      <section className="flex flex-col items-start gap-6 pt-8 md:pt-16">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 ring-1 ring-inset ring-blue-600/20">
          Étudiante en Bachelor Informatique @ Epitech
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Développeuse Full-Stack & Passionnée d'IA.
        </h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Bienvenue sur mon portfolio. Je conçois des applications web modernes, robustes et évolutives, en explorant l'ingénierie logicielle et la science des données.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="#projects"
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
          >
            Voir mes projets
          </Link>
          <Link
            href="#contact"
            className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
          >
            Me contacter
          </Link>
        </div>
      </section>

      {/* SECTION À PROPOS */}
      <section id="about" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
          À propos
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
          Passionnée par la résolution de problèmes complexes et les systèmes intelligents, je développe des solutions full-stack modulaires. Mon objectif est d'allier rigueur logicielle et technologies émergentes pour bâtir des produits digitaux performants.
        </p>
      </section>

      {/* SECTION EXPÉRIENCES */}
      <section id="experiences" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
          Expériences
        </h2>
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-gray-200 p-6 shadow-xs">
            <span className="text-xs font-medium text-blue-600">Stage • 2026</span>
            <h3 className="mt-1 text-lg font-semibold text-gray-900">
              Développeuse Full-Stack / Backend
            </h3>
            <p className="text-sm text-gray-500">LAS (Limak-AIBD-Summa)</p>
            <p className="mt-3 text-sm text-gray-600">
              Développement d'APIs REST, gestion et optimisation de bases de données MySQL/Node.js et tests d'intégration.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION PROJETS (DYNAMIQUE) */}
      <section id="projects" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
          Projets
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project: Project) => (
              <div
                key={project.id}
                className="rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {project.description}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-gray-500">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="bg-gray-100 px-2.5 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Aucun projet trouvé.</p>
          )}
        </div>
      </section>

      {/* SECTION COMPÉTENCES (DYNAMIQUE) */}
      <section id="skills" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
          Compétences
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {skills && skills.length > 0 ? (
            skills.map((skill: Skill) => (
              <span
                key={skill.id}
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
              >
                {skill.name}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">Aucune compétence trouvée.</p>
          )}
        </div>
      </section>

     {/* SECTION CONTACT */}
<section id="contact" className="scroll-mt-20 rounded-2xl bg-gray-50 p-8 text-center">
  <h2 className="text-2xl font-bold text-gray-900">
    Travaillons ensemble !
  </h2>
  <p className="mt-2 text-gray-600">
    Une question, un projet ou une opportunité ? Laisse-moi un message ci-dessous.
  </p>
  <ContactForm />
</section>
    </main>
  );
}