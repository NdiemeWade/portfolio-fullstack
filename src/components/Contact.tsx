'use client'

import { useState } from 'react'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const formData = new FormData(e.currentTarget)
    const body = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus({ type: 'success', msg: 'Message envoyé avec succès !' })
        ;(e.target as HTMLFormElement).reset()
      } else {
        // Affiche l'erreur exacte renvoyée par l'API
        const details = data.error ? JSON.stringify(data.error) : `Statut HTTP : ${res.status}`
        setStatus({ type: 'error', msg: `Erreur API : ${details}` })
      }
    } catch (err: any) {
      setStatus({ type: 'error', msg: `Erreur réseau : ${err?.message || 'Inconnue'}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="w-full bg-white border-t border-pink-200/60 py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600 block">
            PRENONS CONTACT
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#231118]">
            Contact<span className="text-pink-600">.</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#5C424E] leading-relaxed">
            Une idée de projet, une opportunité ou simplement envie d’échanger ? N’hésite pas à me laisser un message.
          </p>
          
          <div className="space-y-3 pt-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border-2 border-pink-200 shadow-xs">
              <span className="text-pink-600 font-bold block mb-0.5">Email</span>
              <span className="text-[#231118] font-bold">ndieme.wade@epitech.eu</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border-2 border-pink-200 shadow-xs">
              <span className="text-pink-600 font-bold block mb-0.5">Localisation</span>
              <span className="text-[#231118] font-bold">Nancy, France</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#FAF8F5] rounded-3xl p-8 border-2 border-pink-200 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#231118] mb-1">Nom complet</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Ton nom"
                className="w-full px-4 py-3 rounded-xl bg-white border border-pink-200 text-xs font-mono text-[#231118] focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-[#231118] mb-1">Adresse email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="ton.email@exemple.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-pink-200 text-xs font-mono text-[#231118] focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-[#231118] mb-1">Message</label>
              <textarea
                rows={4}
                name="message"
                required
                placeholder="Ton message..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-pink-200 text-xs font-mono text-[#231118] focus:outline-none focus:border-pink-500 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-mono text-xs font-bold shadow-md hover:from-pink-700 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer le message →'}
            </button>

            {status && (
              <p className={`text-xs font-mono font-bold text-center pt-2 ${status.type === 'success' ? 'text-emerald-700' : 'text-red-600'}`}>
                {status.type === 'success' ? '✓ ' : '✕ '} {status.msg}
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  )
}