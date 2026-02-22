'use client';

import { Input, Button, Link } from "@heroui/react";
import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter()

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
    //TODO URL
    try {
      const res = await fetch(`http://localhost:8000/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Identifiants incorrects.");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      router.push("/");

    } catch (err: any) {
      setError(err.message);
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
        labelPlacement="outside"
        radius="sm"
        value={email}
        onValueChange={setEmail}
        classNames={{
          inputWrapper: "bg-transparent bg-default  p-2 rounded-md ",
        }}
      />

      <Input
        type="password"
        isRequired
        label="Mot de passe"
        placeholder="*********"
        labelPlacement="outside"
        radius="md"
        value={password}
        onValueChange={setPassword}
        classNames={{
          inputWrapper: "bg-transparent bg-default p-2 rounded-md",
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

      <Button
        type="submit"
        color="primary"
        isLoading={isLoading}
        className="w-full font-semibold mt-2 text-gray-700 hover:text-gray-900 text-lg"
        radius="sm"
      >
        Se connecter
      </Button>
    </form>
  );
};
