'use client';

import { Link } from "@heroui/react";
import { LoginForm } from "@/components/features/auth/LoginForm";
import LoginCard from "@/components/ui/LoginCard";
import NextLink from "next/link";


export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 shadow-lg ">

      <LoginCard
        title="Connexion"
        subtitle="Accédez à votre profil ConsoNum"
        footerContent={
          <p className="text-small text-gray-600">
            Pas encore de compte ?{" "}
            <Link as={NextLink} href="/register" size="sm" color="secondary" className="font-semibold">
              Créer un compte
            </Link>
          </p>
        }
      >
        <LoginForm />
      </LoginCard>

    </div>
  );
}
