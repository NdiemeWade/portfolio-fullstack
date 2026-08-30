'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ type: 'success', msg: 'Message envoyé avec succès !' });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({ type: 'error', msg: data.error || "Erreur lors de l'envoi du message." });
      }
    } catch {
      setStatus({ type: 'error', msg: "Erreur réseau ou serveur." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Nom complet</label>
          <input required name="name" type="text" placeholder="Ton nom" className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Adresse email</label>
          <input required name="email" type="email" placeholder="ton.email@exemple.com" className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Sujet</label>
        <input name="subject" type="text" placeholder="Objet de ton message..." className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
        <textarea required name="message" rows={5} placeholder="Ton message..." className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600" />
      </div>

      {status && (
        <p className={`text-xs font-semibold ${status.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
          {status.msg}
        </p>
      )}

      <button
        disabled={loading}
        type="submit"
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer le message →'}
      </button>
    </form>
  );
}