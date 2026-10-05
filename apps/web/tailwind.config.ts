import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("@redcity/ui/tailwind-preset")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        gurmukhi: ["var(--font-gurmukhi)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
