import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        navy: {
          950: "#070C18",
          900: "#0B1220",
          800: "#101A2E",
          700: "#182645",
          600: "#213563",
        },
        cyan: {
          400: "#3FD8D4",
          500: "#22C0BC",
          600: "#149A96",
        },
        amber: {
          400: "#F7B84B",
          500: "#F0A423",
        },
        paper: "#F5F7FA",
        line: "#1E2C4C",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(63,216,212,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(63,216,212,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
    },
  },
  plugins: [],
};
export default config;
