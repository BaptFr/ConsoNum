'use client';

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button
} from "@heroui/react";
import NextLink from "next/link";
import { useAuth } from "@/contexts/AuthContext";


export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();


  return (
    <HeroNavbar maxWidth="xl" position="sticky" className="w-full p-5 bg-green-500/5">
      <NavbarBrand>
        <NextLink href="/" className="font-bold text-inherit">
          CONSONUM
        </NextLink>
      </NavbarBrand>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            <NavbarItem>
              <NextLink href="/calculator" className="text-foreground">
                Questionnaire
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink href="/history" className="text-foreground">
                Historique
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink href="/dashboard" className="text-foreground">
                Profil
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="danger"
                variant="flat"
                size="sm"
                onPress={logout}
              >
                Déconnexion
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            
            <NextLink href="/login" className="text-foreground">
              Connexion
            </NextLink>
            <NavbarItem>
              <Button
                as={NextLink}
                href="/register"
                color="primary"
                variant="flat"
                size="sm"
              >
                Inscription
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </HeroNavbar>
  );
};
