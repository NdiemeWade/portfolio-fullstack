import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio | Ndiémé Wade',
  description: 'Développeuse Full-Stack & Passionnée d IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-[#FAF4F7] text-[#2C1820] antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}