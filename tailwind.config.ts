import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./node_modules/@/components/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Inter", ...fontFamily.sans],
        display: ["Poppins", ...fontFamily.sans],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },
      colors: {
        neon: {
          50: "#e9fff8",
          100: "#c7ffee",
          200: "#8bffd9",
          300: "#4cffc2",
          400: "#1fffb1",
          500: "#00e8a0",
          600: "#00bf84",
          700: "#009569",
          800: "#066e52",
          900: "#084f3b",
        },
        cyber: {
          400: "#6ee7ff",
          500: "#22d3ee",
          600: "#06b6d4",
        },
        // Modern vibrant gradients
        purple: {
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
        },
        pink: {
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
        },
        orange: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
      },
      backgroundImage: {
        grid: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.1) 1px, transparent 0)`,
        gridDark: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-vibrant': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'gradient-sunset': 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #06b6d4 100%)',
        'gradient-fire': 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      boxShadow: {
        neon: "0 0 24px 0 rgba(34, 211, 238, 0.35)",
        'glow-purple': '0 0 40px rgba(168, 85, 247, 0.4)',
        'glow-pink': '0 0 40px rgba(236, 72, 153, 0.4)',
        'glow-orange': '0 0 40px rgba(249, 115, 22, 0.4)',
        'xl-vibrant': '0 20px 50px -12px rgba(147, 51, 234, 0.25)',
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        glow: {
          "0%, 100%": { filter: "drop-shadow(0 0 0px #22d3ee)" },
          "50%": { filter: "drop-shadow(0 0 6px #22d3ee)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        scan: "scan 4s linear infinite",
        glow: "glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
