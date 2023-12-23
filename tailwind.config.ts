import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ffffff",
        secondary: "#999999",
        "midnight-black": "#111217",
        "dark-gray": "#141414",
        "darker-gray": "#101010",
        "carcoal-gray": "#363a43",
        "steel-gray": "#888989",
        blue: "#2059EA",
        orange: "#E67E22",
        pink: "#E91E63",
        "slate-blue": "#546E7A",
        green: "#20E300",
        purple: "#A855F7",
        "light-blue": "#5eaeeb",
        yellow: "#ffca4f",
      },
    },
    fontFamily: {
      sans: ["Inter", ...fontFamily.sans],
    },
  },
  plugins: [],
};
export default config;
