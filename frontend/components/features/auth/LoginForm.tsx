'use client';

import { Input, Button, Link } from "@heroui/react";
import { useState } from "react";
import NextLink from "next/link";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // API Simul  TODO
    setTimeout(() => setIsLoading(false), 2000);
    console.log("Submit Login");
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
        classNames={{
          inputWrapper: "bg-transparent bg-default p-2 rounded-md",
        }}
      />

      <div className="flex justify-end">
        <Link as={NextLink} href="/forgot-password" size="sm" color="primary" className="text-xs text-gray-900">
          Mot de passe oublié ?
        </Link>
      </div>

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
