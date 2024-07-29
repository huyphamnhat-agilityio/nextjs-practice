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
        2.5: "0.625rem",
        3.75: "0.9375rem",
        4.5: "1.125rem",
        4.75: "1.1875rem",
        5.5: "1.375rem",
        7.5: "1.875rem",
        5.625: "1.40625rem",
        6.25: "1.5625rem",
        8.75: "2.1875rem",
        21: "5.25rem",
        22: "5.5rem",
        25: "6.25rem",
        26: "6.5rem",
      },
      width: {
        12.5: "3.125rem",
        23.5: "5.875rem",
        82: "20.5rem",
        95.25: "23.8125rem",
      },
      maxWidth: {
        84.5: "21.125rem",
        xl: "37.5rem",
        "5xl": "65.5rem",
        "6xl": "67.5rem",
        "8xl": "90rem",
      },
      height: {
        0.5: "0.125rem",
        1.75: "0.4375rem",
      },
      backgroundImage: {
        "hero-block": "url('/hero-background-block.svg')",
      },
      screens: {
        lg: "992px",
        "2xl": "1440px",
      },
      lineHeight: {
        5.5: "1.375rem",
        7.5: "1.875rem",
        12.5: "3.125rem",
        20: "5rem",
      },
      fontSize: {
        "5xl": "40px",
        "6xl": "58px",
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
            secondary: "#2435A1",
            default: "#FFC652",
            foreground: {
              DEFAULT: "#252B42",
              100: "#737373",
            },
          },
        },
        dark: {
          colors: {
            primary: "#ff6551",
            secondary: "#2435A1",
            default: "#FFC652",
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
