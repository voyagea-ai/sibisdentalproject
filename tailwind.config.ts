import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury medical design system
        bg: {
          dark: "#101314",
          light: "#F7F5F0",
        },
        ivory: "#EEEAE1",
        charcoal: "#151819",
        text: {
          dark: "#151819",
          light: "#F8F8F6",
        },
        muted: "#8E9698",
        dental: "#A9CAD2",
        champagne: "#C8B38A",
        aluminium: "#B7BCBD",
        mint: "#CFE3DE",
      },
      fontFamily: {
        serif: ["var(--font-instrument)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 9vw, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.4rem, 6vw, 5.5rem)", { lineHeight: "1.0", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(2rem, 4.5vw, 3.6rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      borderColor: {
        "hair-light": "rgba(255,255,255,0.12)",
        "hair-dark": "rgba(21,24,25,0.12)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "soft": "cubic-bezier(0.22, 1, 0.36, 1)",
        "smooth": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "pulse-ring": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.12)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "shimmer": "shimmer 2.2s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
