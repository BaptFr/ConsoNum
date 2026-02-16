import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#16a34a",
              foreground: "#FFFFFF",
            },
             secondary: {
              DEFAULT: "#0d9488",
              foreground: "#FFFFFF",
            },
            background: "#FFFFFF",
            foreground: "#FFFFFF",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#22c55e",
              foreground: "#FFFFFF",
            },
              background: "#072C27",
              foreground: "#ECEDEE",
          }
        }
      }
    }),
  ],
};
export default config;
