import Link from 'next/link'
import SkillsSection from '@/components/SkillsSection'

export const metadata = {
  title: 'Compétences | Ndiémé Wade',
}

export default function SkillsPage() {
  return (
    <main className="bg-[#FAF4F7] min-h-screen pt-28 pb-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* BOUTON RETOUR */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#BE185D] border border-[#F472B6]/30 rounded-xl px-4 py-2 bg-white hover:bg-[#FCE7F3]/40 transition-colors shadow-2xs"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <SkillsSection />
        
      </div>
    </main>
  )
}