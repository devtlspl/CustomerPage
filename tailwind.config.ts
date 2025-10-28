import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-porcelain": "#F6F7FB",
        "surface-glass": "rgba(255,255,255,0.82)",
        "glass-border": "rgba(255,255,255,0.24)",
        "accent-primary": "#2F7BFE",
        "accent-secondary": "#38D7CF",
        "accent-tertiary": "#7B46FF",
        "text-primary": "#1C2340",
        "text-secondary": "#5B6380",
        success: "#2AD39E",
        warning: "#FFB444",
        danger: "#FF5C7A",
        "dark-bg": "#0F162C",
        "dark-surface": "rgba(23,33,66,0.7)"
      },
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"]
      },
      borderRadius: {
        xl: "18px",
        "2xl": "24px"
      },
      boxShadow: {
        glass: "0 20px 40px -25px rgba(44,63,146,0.35)",
        "glass-sm": "0 10px 20px -10px rgba(44,63,146,0.25)"
      },
      backdropBlur: {
        22: "22px"
      },
      spacing: {
        13: "3.25rem"
      }
    }
  },
  plugins: []
};

export default config;
