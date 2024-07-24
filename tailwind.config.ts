import { nextui } from "@nextui-org/react";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        1.25: "0.3125rem",
        3.75: "0.9375rem",
        4.75: "1.1875rem",
        5.5: "1.375rem",
        6.25: "1.5625rem",
      },
      colors: {
        orange: {
          550: "#ff6551",
        },
        gray: {
          250: "#bdbdbd",
          450: "#737373",
          850: "#252B42",
        },
        "dark-blue": {
          400: "#2435A1",
          500: "#26335d",
        },
        amber: {
          350: "#ffc652",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};
export default config;
