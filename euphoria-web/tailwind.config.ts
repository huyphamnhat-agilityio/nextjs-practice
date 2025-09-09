import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx}",
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
