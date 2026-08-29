export const revalidate = 0;

import ExperienceTimeline from '@/components/ExperienceTimeline';

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-[#F9F9FB] text-neutral-800 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-3xl font-serif font-medium text-neutral-900">Expériences</h1>
          <p className="text-neutral-500 text-sm mt-1">Mon parcours professionnel et académique</p>
        </div>

        <ExperienceTimeline />
      </div>
    </div>
  );
}