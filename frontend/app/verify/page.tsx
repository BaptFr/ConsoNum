"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token manquant ou invalide.");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/verify/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.error || "Une erreur est survenue.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      });
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 border-gray-500 border-2 rounded-2xl bg-gray-900/60 flex flex-col items-center gap-6 text-center">
        <h1 className="text-2xl font-bold border-b pb-4 w-full">
          Confirmation de votre compte
        </h1>

        {status === "loading" && (
          <p className="text-default-500">Vérification en cours...</p>
        )}

        {status === "success" && (
          <>
            <p className="text-success">{message}</p>
            <Link
              href="/login"
              className="p-3 border-2 border-gray-500 rounded-2xl bg-white/20 hover:bg-white/70 hover:text-black font-bold"
            >
              Se connecter
            </Link>
          </>
        )}

        {status === "error" && (
          <p className="text-danger">{message}</p>
        )}
      </div>
    </div>
  );
}
