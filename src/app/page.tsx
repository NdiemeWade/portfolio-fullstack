'use client'

import Hero from '@/components/Hero'
import About from '@/components/About'
import ProjectsSection from '@/components/ProjectsSection'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ProjectsSection />
      <Experience />
      <Skills />
      <ContactForm />
      <Footer />
    </main>
  )
}