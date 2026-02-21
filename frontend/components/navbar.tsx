'use client';

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from "@heroui/react";
import NextLink from "next/link";

export const Navbar = () => {
  return (
    <HeroNavbar maxWidth="xl" position="sticky" className="w-full p-5 bg-white/20">
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
          <Link as={NextLink} href="/register">S'inscrire</Link>
        </NavbarItem>

      </NavbarContent>
    </HeroNavbar>
  );
};
