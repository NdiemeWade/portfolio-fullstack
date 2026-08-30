import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

const toArray = (val: any): string[] => {
  if (!val) return []
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val)
      if (Array.isArray(parsed)) return parsed
    } catch {
      return val.split(',').map((s) => s.trim()).filter(Boolean)
    }
  }
  return []
}

export default async function AboutPage() {
  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .single()

  const headlineTitle = profile?.headline_title || 'Building the future,'
  const headlineSubtitle = profile?.headline_subtitle || 'one system at a time.'
  const bioP1 = profile?.bio_p1 || "Currently in my second year at Epitech Nancy, I'm deeply interested in how software and artificial intelligence can solve complex, real-world problems. My journey started with web development, but I've progressively moved toward data engineering and machine learning — areas where I see the most opportunity to create meaningful impact."
  const bioP2 = profile?.bio_p2 || "I thrive in environments that push me to learn continuously. Whether it's building a full-stack application, designing a data pipeline, or experimenting with a machine learning model, I approach every challenge with rigor and curiosity."
  const photoUrl = profile?.image_url || '/profile.png'
  
  const learningList = profile?.currently_learning 
    ? toArray(profile.currently_learning) 
    : ['Python ML', 'SQL Advanced', 'TypeScript', 'React', 'Node.js', 'Docker']

  const interestsList = profile?.professional_interests 
    ? toArray(profile.professional_interests) 
    : ['Artificial Intelligence', 'Data Engineering', 'Software Architecture', 'Open Source', 'Entrepreneurship']

  const location = profile?.location || 'Nancy, France'
  const email = profile?.email || 'ndieme.wade@epitech.eu'
  const status = profile?.status || 'Open to opportunities'

  const howIWorkCards = [
    {
      icon: '⚡',
      title: 'Bias toward action',
      description: 'I prefer building over planning. The best way to learn is to ship something and iterate.'
    },
    {
      icon: '🔬',
      title: 'First-principles thinking',
      description: 'I try to understand WHY before HOW. Good solutions start with a deep understanding of the problem.'
    },
    {
      icon: '📐',
      title: 'Clean systems',
      description: 'I care about code quality, documentation, and architecture — not just making it work.'
    },
    {
      icon: '🤝',
      title: 'Collaborative by default',
      description: 'I believe the best work happens at the intersection of different perspectives and disciplines.'
    }
  ]

  return (
    <main className="min-h-screen bg-[#FAF7F8] text-[#2C1820]">
      
      {/* SECTION PRINCIPALE / ABOUT HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 pb-20">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BE185D] block mb-4">
          ABOUT ME
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLONNE GAUCHE : Bio & Technologies */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl sm:text-6xl font-serif tracking-tight leading-tight text-[#2C1820]">
              {headlineTitle} <br />
              <span className="italic text-[#EC4899] font-normal">{headlineSubtitle}</span>
            </h1>

            <div className="space-y-6 text-[#5C404E] text-base sm:text-lg leading-relaxed font-normal">
              <p>{bioP1}</p>
              <p>{bioP2}</p>
            </div>

            {/* CURRENTLY LEARNING */}
            <div className="pt-4 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BE185D] block">
                CURRENTLY LEARNING
              </span>
              <div className="flex flex-wrap gap-2">
                {learningList.map((item, i) => (
                  <span
                    key={i}
                    className="bg-[#FCE7F3]/60 text-[#BE185D] border border-[#F472B6]/30 text-xs font-mono font-medium px-3.5 py-1.5 rounded-xl shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/projects"
                className="px-6 py-3 text-xs font-mono font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:from-[#DB2777] hover:to-[#7C3AED] rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
              >
                View my work
              </Link>
              <Link
                href="/#contact"
                className="px-6 py-3 text-xs font-mono font-bold text-[#BE185D] bg-white border border-[#F472B6]/40 hover:border-[#EC4899] rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* COLONNE DROITE : Photo & Infos Contact / Intérêts */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* PHOTO DE PROFIL ARRONDIE */}
            <div className="relative w-full aspect-[4/4] sm:aspect-[4/3] lg:aspect-[4/4] rounded-3xl overflow-hidden shadow-sm border border-[#F472B6]/30 bg-[#FCE7F3]">
              <Image
                src={photoUrl}
                alt="Profile picture"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* CARTE DETAILED INFO */}
            <div className="bg-white rounded-3xl p-6 border border-[#F472B6]/30 shadow-sm space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-[#F472B6]/10">
                <span className="text-[#8C5873]">Location</span>
                <span className="font-sans font-bold text-[#2C1820] text-sm">{location}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[#F472B6]/10">
                <span className="text-[#8C5873]">Email</span>
                <span className="font-sans font-bold text-[#2C1820] text-sm">{email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8C5873]">Status</span>
                <span className="font-sans font-bold text-emerald-600 text-sm">{status}</span>
              </div>
            </div>

            {/* CARTE PROFESSIONAL INTERESTS */}
            <div className="bg-white rounded-3xl p-6 border border-[#F472B6]/30 shadow-sm space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BE185D] block">
                PROFESSIONAL INTERESTS
              </span>
              <ul className="space-y-3">
                {interestsList.map((interest, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm font-semibold text-[#2C1820] pb-2 border-b border-[#F472B6]/10 last:border-0 last:pb-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]"></span>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION "HOW I WORK" EN BAS DE PAGE */}
      <section className="bg-[#FAF4F7] py-20 border-t border-[#F472B6]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          
          <h2 className="text-3xl sm:text-4xl font-serif text-center font-bold text-[#2C1820]">
            How I work<span className="text-[#EC4899]">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howIWorkCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#F472B6]/30 shadow-sm space-y-4 hover:shadow-md transition-all hover:scale-105"
              >
                <div className="text-2xl">{card.icon}</div>
                <h3 className="text-base font-bold text-[#2C1820]">
                  {card.title}
                </h3>
                <p className="text-xs text-[#5C404E] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}