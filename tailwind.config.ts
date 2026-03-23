import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "serif"],
        magical: ["Palatino Linotype", "Palatino", "Book Antiqua", "serif"],
      },
      colors: {
        brand: {
          purple: "#7C3AED",
          "purple-light": "#A78BFA",
          "purple-dark": "#4C1D95",
          blue: "#1D4ED8",
          "blue-light": "#60A5FA",
          "blue-dark": "#1E3A8A",
          green: "#84CC16",
        },
        dark: {
          900: "#020817",
          800: "#0A0F1E",
          700: "#0F172A",
          600: "#1E293B",
          500: "#334155",
        },
        gold: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse at top, #1a0533 0%, #020817 50%, #020817 100%)",
        "parchment":
          "linear-gradient(135deg, #1a1208 0%, #0d0b05 30%, #1a1208 60%, #0d0b05 100%)",
      },
      backgroundSize: {
        "grid-size": "50px 50px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "float-delay-2": "float 6s ease-in-out 4s infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "particle": "particle 8s linear infinite",
        "candle-flicker": "candleFlicker 3s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,58,237,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(124,58,237,0.8)" },
        },
        particle: {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100px) rotate(720deg)", opacity: "0" },
        },
        candleFlicker: {
          "0%, 100%": { transform: "scaleY(1) scaleX(1)", opacity: "1" },
          "25%": { transform: "scaleY(1.1) scaleX(0.9)", opacity: "0.9" },
          "50%": { transform: "scaleY(0.9) scaleX(1.1)", opacity: "0.95" },
          "75%": { transform: "scaleY(1.05) scaleX(0.95)", opacity: "0.85" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      boxShadow: {
        "glow-purple": "0 0 30px rgba(124,58,237,0.5)",
        "glow-gold": "0 0 30px rgba(251,191,36,0.5)",
        "glow-blue": "0 0 30px rgba(29,78,216,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
