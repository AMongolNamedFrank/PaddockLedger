import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#191322",
        asphalt: "#fff7fb",
        pit: "#ffffff",
        signal: "#ff4d7b",
        mint: "#00a878",
        champagne: "#ff9f1c",
        aqua: "#14a6ff",
        limepop: "#a3ff12",
        lilac: "#8f6aff"
      },
      boxShadow: {
        glow: "0 1px 0 rgba(255,255,255,0.88) inset, 0 16px 44px rgba(96,50,109,0.13)"
      }
    }
  },
  plugins: []
};

export default config;
