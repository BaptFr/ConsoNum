"use client";

import { useState, FormEvent } from "react";

export default function DataRequestPage() {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("access");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type, message }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8">
      <h1 className="text-3xl font-bold border-b pb-4">
        Demande relative à vos données personnelles
      </h1>

      {status === "success" ? (
        <p className="text-success">
          Votre demande a bien été envoyée. Nous vous répondrons dans les meilleurs délais.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Adresse email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md border border-gray-500 bg-transparent"
              placeholder="email@exemple.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Type de demande</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 rounded-md border border-gray-500 bg-gray-900"
            >
              <option value="access">Accès à mes données</option>
              <option value="deletion">Suppression de mon compte</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Message (optionnel)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 rounded-md border border-gray-500 bg-transparent"
              rows={4}
              placeholder="Précisez votre demande si nécessaire"
            />
          </div>

          {status === "error" && (
            <p className="text-danger text-sm">Une erreur est survenue. Veuillez réessayer.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="p-3 border-2 border-gray-500 rounded-2xl bg-white/20 hover:bg-white/70 hover:text-black font-bold"
          >
            {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
        </form>
      )}
    </div>
  );
}
