"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("messages").insert([formData]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-xs focus:border-blue-500 focus:outline-hidden"
          placeholder="Ton nom"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-xs focus:border-blue-500 focus:outline-hidden"
          placeholder="ton.email@exemple.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-xs focus:border-blue-500 focus:outline-hidden"
          placeholder="Ton message..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 transition-all disabled:opacity-50"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-green-600 text-center">
          Message envoyé avec succès ! Merci.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600 text-center">
          Une erreur est survenue. Réessaie plus tard.
        </p>
      )}
    </form>
  );
}