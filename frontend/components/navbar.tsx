'use client';

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from "@heroui/react";
import NextLink from "next/link"; // Pour la navigation SPA performante

export const Navbar = () => {
  return (
    <HeroNavbar maxWidth="xl" position="sticky">
      <NavbarBrand>
        <NextLink href="/" className="font-bold text-inherit">
          CONSONUM
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link as={NextLink} color="foreground" href="/calculateur">
            Calculateur
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} color="foreground" href="/conseils">
            Conseils
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link as={NextLink} href="/login">Connexion</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={NextLink} href="/register" color="primary" variant="flat">
            S'inscrire
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
};
