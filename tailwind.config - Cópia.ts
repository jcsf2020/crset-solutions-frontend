import type { Config } from "tailwindcss";
import tokensPreset from "./tailwind.tokens.preset";
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  presets: [tokensPreset],
  theme: { extend: {} },
  plugins: [],
};
export default config;
