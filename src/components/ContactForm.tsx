'use client'

import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Erreur lors de l’envoi.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Une erreur réseau est survenue. Réessaie ultérieurement.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto text-left space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-chic-900 dark:text-chic-100 mb-1">
          Nom complet
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ton nom"
          className="w-full px-4 py-2.5 rounded-xl border border-chic-200 dark:border-chic-700 bg-white dark:bg-chic-900 text-chic-900 dark:text-chic-50 focus:outline-none focus:ring-2 focus:ring-chic-500 transition-all text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-chic-900 dark:text-chic-100 mb-1">
          Adresse e-mail
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="ton.email@exemple.com"
          className="w-full px-4 py-2.5 rounded-xl border border-chic-200 dark:border-chic-700 bg-white dark:bg-chic-900 text-chic-900 dark:text-chic-50 focus:outline-none focus:ring-2 focus:ring-chic-500 transition-all text-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-chic-900 dark:text-chic-100 mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Bonjour Ndiémé, j'aimerais échanger sur..."
          className="w-full px-4 py-2.5 rounded-xl border border-chic-200 dark:border-chic-700 bg-white dark:bg-chic-900 text-chic-900 dark:text-chic-50 focus:outline-none focus:ring-2 focus:ring-chic-500 transition-all text-sm resize-none"
        />
      </div>

      {status === 'success' && (
        <div className="flex items-center space-x-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Message envoyé avec succès ! Je te répondrai très vite.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center space-x-2 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-chic-600 hover:bg-chic-500 dark:bg-chic-500 dark:hover:bg-chic-600 text-white font-medium shadow-sm transition-all disabled:opacity-50"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Envoi en cours...</span>
          </>
        ) : (
          <>
            <span>Envoyer le message</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}