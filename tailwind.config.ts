import { nextui } from "@nextui-org/theme";

import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./themes/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        0: "0rem",
        1.25: "0.3125rem",
        3.75: "0.9375rem",
        4.5: "1.125rem",
        4.75: "1.1875rem",
        5.5: "1.375rem",
        5.625: "1.40625rem",
        6.25: "1.5625rem",
        22: "5.5rem",
        25: "6.25rem",
        26: "6.5rem",
      },
      maxWidth: {
        "6xl": "67.5rem",
        "8xl": "90rem",
      },
      backgroundImage: {
        "hero-block": "url('/hero-background-block.svg')",
      },
      screens: {
        "2xl": "1440px",
      },
      lineHeight: {
        "5.5": "1.375rem",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: "#ff6551",
            foreground: {
              DEFAULT: "#252B42",
              100: "#737373",
            },
          },
        },
        dark: {
          colors: {
            primary: "#ff6551",
            foreground: {
              DEFAULT: "#ADB5D1",
              100: "#B3B3B3",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
