"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-500 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-300 text-center sm:text-left">
        Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement de l&apos;authentification.
        Aucun cookie de tracking ou publicitaire n&apos;est utilisé.{" "}
        <Link href="/privacy-policy" className="underline hover:text-white">
          En savoir plus
        </Link>
      </p>
      <button
        onClick={handleAccept}
        className="px-4 py-2 text-sm bg-white text-black rounded-xl hover:bg-gray-200 font-bold shrink-0"
      >
        J&apos;ai compris
      </button>
    </div>
  );
}