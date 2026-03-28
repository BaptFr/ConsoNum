'use client'
import NextLink from "next/link";  
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
     <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background-3.webp"
          alt="Nature et technologie"
          fill
          className="object-cover brightness-50"
          priority
          quality={90}
        />
      </div>


      <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-900/70 via-emerald-900/60 to-black/80" />

      <main className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        

        <div className="mb-8">
          <Image
            src="/logos/icon.png"
            alt="ConsoNum Logo"
            width={120}
            height={120}
            className="drop-shadow-2xl rounded-2xl"
          />
        </div>

        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
          Mesurez votre{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            empreinte numérique
          </span>
        </h1>

        <p className="mb-12 max-w-2xl text-lg text-gray-200 md:text-xl">
          Découvrez l&apos;impact environnemental de vos habitudes digitales
          en quelques minutes et adoptez un comportement plus responsable.
        </p>


        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Button
            as={NextLink}
            href="/register"
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-green-500/50 rounded-xl"
          >
           Commencer le test
          </Button>

          <Button
            as={NextLink}
            href="/login"
            size="lg"
            variant="bordered"
            className="border-2 border-white/30 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-green-400 hover:bg-white/10 rounded-xl"
          >
            J&apos;ai déjà un compte
          </Button>
        </div>


        <div className="mt-16 flex justify-center items-center gap-20">
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400">5 min</p>
            <p className="text-sm text-gray-300">Durée du test</p>
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold text-green-400">🌍</p>
            <p className="text-sm text-gray-300">Écoresponsable</p>
          </div>
        </div>
      </main>


      <section className="relative z-20 bg-black/50 px-6 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Comment ça fonctionne ?
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Créez votre compte
              </h3>
              <p className="text-gray-300">
                Inscription rapide et sécurisée en quelques secondes
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Répondez au questionnaire
              </h3>
              <p className="text-gray-300">
                Questions simples sur vos usages numériques quotidiens
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Obtenez votre score
              </h3>
              <p className="text-gray-300">
                Analyse détaillée et conseils personnalisés
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
