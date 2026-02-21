"use client";

import { useState, FormEvent } from "react";
import { Input, Button, Card, CardBody, CardHeader,  Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validations client
    if (!email || !password || !confirmPassword) {
      setError("Tous les champs sont requis.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors de l'inscription.");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md p-5 border-gray-500 border-2 rounded-2xl bg-gray-900/60">
        <CardHeader className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold border-b">Créer un compte</h1>
          <p className="text-default-500 text-sm text-center">
            Rejoignez ConsoNum et mesurez votre empreinte numérique
          </p>
        </CardHeader>

        <CardBody>
          <Form onSubmit={handleSubmit} className="flex flex-col gap-6" >
            <Input
                size="md"
                label="Email"
                type="email"
                placeholder="email@exemple.com"
                value={email}
                onValueChange={setEmail}
                isRequired
                variant="bordered"
                labelPlacement="outside-top"
                classNames={{
                    inputWrapper: "p-2 border-gray-500 border-2 rounded-md",
                    input: [
                        "bg-transparent",
                        "focus:bg-transparent",
                        "focus:outline-none"
                    ]
                }}
            />

            <Input
                size="md"
                label="Mot de passe"
                type="password"
                placeholder="6 caractères minimum"
                value={password}
                onValueChange={setPassword}
                isRequired
                labelPlacement="outside-top"
               classNames={{
                    inputWrapper: "p-2 border-gray-500 border-2 rounded-md",
                    input: [
                        "bg-transparent",
                        "focus:bg-transparent",
                        "focus:outline-none"
                    ]
                }}
            />

            <Input
                size="md"
                label="Confirmer le mot de passe"
                type="password"
                placeholder="Répétez le mot de passe"
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                isRequired
                variant="underlined"
                labelPlacement="outside-top"
                classNames={{
                    inputWrapper: "p-2 border-gray-500 border-2 rounded-md",
                    input: [
                        "bg-transparent",
                        "focus:bg-transparent",
                        "focus:outline-none"
                    ]
                }}

            />

            {error && (
              <p className="text-danger text-sm text-center">{error}</p>
            )}

            <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                className="p-3 border-2 border-gray-500 rounded-2xl bg-white/20 hover:bg-white/70 hover:text-black text-xl font-bold"
            >
              S&apos;inscrire
            </Button>

            <div className="flex justify-center gap-2 items-center ">
                <p className="text-center text-sm ">
                    Déjà un compte ?{" "}
                </p>
                <Link href="/login" className="font-bold color-white hover:text-gray-300">
                    Se connecter
                </Link>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}