import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Ndiémé Wade | Software Engineering & AI Student',
  description: 'Portfolio de Ndiémé Wade, élève ingénieure en informatique à Epitech Nancy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased bg-[#FAF3F0] text-[#2C1820] selection:bg-[#C86D7D] selection:text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}