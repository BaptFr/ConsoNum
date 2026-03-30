'use client';

import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button, Link, Spinner } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";


export const LoginForm = () => {
  const router = useRouter()
  const { login } = useAuth(); 


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Tous les champs sont requis.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Identifiants incorrects.");
      }

      const data = await res.json();
      login(data.token);  
      router.push("/");

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur survenue");
    } finally {
      setIsLoading(false);
    }
  };
    

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
      <Input
        type="email"
        label="Email"
        isRequired
        placeholder="votre@email.com"
        labelPlacement="outside-top"
        radius="sm"
        value={email}
        onValueChange={setEmail}
        classNames={{
          inputWrapper: "bg-transparent bg-default  p-2 rounded-md ",
          label: "text-black"
        }}
      />

      <Input
        type="password"
        isRequired
        label="Mot de passe"
        placeholder="*********"
        labelPlacement="outside-top"
        radius="md"
        value={password}
        onValueChange={setPassword}
        classNames={{
          inputWrapper: "bg-transparent bg-default p-2 rounded-md",
          label: "text-black"
        }}
      />

      <div className="flex justify-end">
        <Link as={NextLink} href="/forgot-password" size="sm" color="primary" className="text-xs text-gray-900">
          Mot de passe oublié ?
        </Link>
      </div>

      {error && (
        <p className="text-danger text-sm text-center">{error}</p>
      )}
     {isLoading && (
      <div className="flex justify-center items-center gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary"></div>
        <span className="text-sm text-black">Connexion en cours...</span>
      </div>
    )}

      <Button
        type="submit"
        color="primary"
        isDisabled={isLoading}
        className="w-full h-10 font-semibold mt-2 text-gray-700 hover:text-gray-900 text-lg"
        radius="sm"
      >
        Se connecter
      </Button>
    </form>
  );
};
