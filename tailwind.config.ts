import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#1e1e2d",
          medium: "#1a1a27",
          dark: "#151521",
          "dark-light": "#1b1b28",
          light: "#4c4e6f",
          blue: "#3699ff",
        },

        neutral: {
          gray: "#9899ac",
          "gray-secondary": "#cdcdde",
          "gray-tertiary": "#565674",
          "gray-quaternary": "#474761",
          "gray-quinary": "#6d6d80",
          "gray-senary": "#323248",
          "gray-blue": "#494b74",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
