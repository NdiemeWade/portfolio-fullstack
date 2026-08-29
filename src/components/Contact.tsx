'use client'

import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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
                required
                placeholder="Ton nom"
                className="w-full px-4 py-3 rounded-xl bg-white border border-pink-200 text-xs font-mono text-[#231118] focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-[#231118] mb-1">Adresse email</label>
              <input
                type="email"
                required
                placeholder="ton.email@exemple.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-pink-200 text-xs font-mono text-[#231118] focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-[#231118] mb-1">Message</label>
              <textarea
                rows={4}
                required
                placeholder="Ton message..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-pink-200 text-xs font-mono text-[#231118] focus:outline-none focus:border-pink-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-mono text-xs font-bold shadow-md hover:from-pink-700 hover:to-purple-700 transition-all"
            >
              Envoyer le message →
            </button>

            {submitted && (
              <p className="text-xs font-mono text-emerald-700 font-bold text-center pt-2">
                ✓ Message envoyé avec succès !
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  )
}