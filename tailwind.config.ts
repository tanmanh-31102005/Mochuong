import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        moss: {
          DEFAULT: "#59683A",
          dark: "#43502E",
          light: "#7F8F58",
        },
        terracotta: {
          DEFAULT: "#A94F35",
          dark: "#8E3F2A",
          light: "#C9785F",
        },
        beige: "#F0EAE0",
        ink: {
          DEFAULT: "#4A4A4A",
          muted: "#62625B",
          dark: "#262626",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-nunito)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(74, 74, 74, 0.06)",
        card: "0 8px 30px rgba(0, 0, 0, 0.05)",
        floating: "0 20px 40px -10px rgba(138, 154, 91, 0.2)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
