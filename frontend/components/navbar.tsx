'use client';

import { isAuthenticated, logout } from "@/lib/auth";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button
} from "@heroui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";


export const Navbar = () => {
const { isAuthenticated, logout } = useAuth();


  return (
    <HeroNavbar maxWidth="xl" position="sticky" className="w-full p-5 bg-white/20">
      <NavbarBrand>
        <NextLink href="/" className="font-bold text-inherit">
          CONSONUM
        </NextLink>
      </NavbarBrand>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            <NavbarItem>
              <NextLink href="/dashboard">
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
        <NavbarItem>
          <NextLink color="foreground" href="/calculateur">
            Calculateur
          </NextLink>
        </NavbarItem>
         <NextLink href="/login">
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
