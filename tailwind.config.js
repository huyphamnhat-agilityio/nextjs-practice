import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        1.25: "0.3125rem",
        3.75: "0.9375rem",
        4.75: "1.1875rem",
        5.5: "1.375rem",
        5.625: "1.40625rem",
        6.25: "1.5625rem",
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
            primary: "#850F00",
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
};
