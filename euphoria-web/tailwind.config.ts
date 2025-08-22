import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "core-sans-c": "var(--font-core-sans-c)",
        causten: "var(--font-causten)",
      },
    },
  },
  plugins: [],
} satisfies Config;
