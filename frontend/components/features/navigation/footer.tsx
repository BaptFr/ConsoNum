'use client'
import NextLink from "next/link";
import { Link } from "@heroui/react";

export const Footer = () => {
  return (
    <footer className="z-2 w-full border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-8">
        
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          <Link 
            as={NextLink} 
            href="/legal/cgv" 
            className="text-sm text-gray-400 hover:text-white"
          >
            Conditions Générales de Vente
          </Link>
          
          <Link 
            as={NextLink} 
            href="/legal/cgu" 
            className="text-sm text-gray-400 hover:text-white"
          >
            Conditions d&apos;utilisation
          </Link>
          
          <Link 
            as={NextLink} 
            href="/legal/privacy-policy" 
            className="text-sm text-gray-400 hover:text-white"
          >
            Politique de confidentialité
          </Link>
          
          <Link 
            as={NextLink} 
            href="/legal/mentions" 
            className="text-sm text-gray-400 hover:text-white"
          >
            Mentions Légales
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ConsoNum - Tous droits réservés 

          </p>
        </div>
      </div>
    </footer>
  );
};