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
        0.75: "0.1875rem",
        1.25: "0.3125rem",
        2.5: "0.625rem",
        3.75: "0.9375rem",
        4.5: "1.125rem",
        4.75: "1.1875rem",
        5.5: "1.375rem",
        5.625: "1.40625rem",
        7.5: "1.875rem",
        6.25: "1.5625rem",
        8.75: "2.1875rem",
        12.5: "3.125rem",
        21: "5.25rem",
        22: "5.5rem",
        25: "6.25rem",
        26: "6.5rem",
        32.5: "8.125rem",
        50: "12.5rem",
      },
      borderRadius: {
        0.75: "0.1875rem",
        1.25: "0.3125rem",
        2.5: "0.625rem",
      },
      width: {
        12.5: "3.125rem",
        23.5: "5.875rem",
        82: "20.5rem",
        95.25: "23.8125rem",
      },
      minWidth: {
        38: "9.5rem",
      },
      maxWidth: {
        80.25: "20.0625rem",
        82: "20.5rem",
        84.5: "21.125rem",
        87: "21.75rem",
        xl: "37.5rem",
        172: "43rem",
        "5xl": "65.5rem",
        "6xl": "67.5rem",
        "8xl": "90rem",
      },
      height: {
        0.5: "0.125rem",
        1.75: "0.4375rem",
        75: "18.75rem",
      },
      maxHeight: {
        75: "300px",
      },
      minHeight: {
        75: "300px",
      },
      backgroundImage: {
        "hero-block": "url('/hero-background-block.svg')",
      },
      screens: {
        mobile: "375px",
        base: "832px",
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
      backgroundColor: {
        "dark-blue": "#26335d",
        "dull-orange": "#e77c40",
        danger: "#e74040",
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
            secondary: {
              DEFAULT: "#2435a1",
              50: "#0d4172",
              100: "#ffc652",
            },

            foreground: {
              DEFAULT: "#252b42",
              50: "#bdbdbd",
              100: "#737373",
              200: "#f9f9f9",
              300: "#E6E6E6",
              400: "#FAFAFA",
            },
            success: "#2dc071",
          },
        },
        dark: {
          colors: {
            primary: "#ff6551",
            secondary: {
              DEFAULT: "#2435a1",
              50: "#8ec2f2",
              100: "#ffc652",
            },

            foreground: {
              DEFAULT: "#Adb5d1",
              50: "#bdbdbd",
              100: "#b3b3b3",
              200: "#18181b",
              300: "#424242",
              400: "#424242",
            },
            success: "#2dc071",
          },
        },
      },
    }),
  ],
} satisfies Config;
