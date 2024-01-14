import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      colors: {
        gray: {
          ...colors.zinc,
          DEFAULT: colors.zinc[500],
        },
        primary: {
          ...colors.amber,
          DEFAULT: colors.amber[500],
        },
      },
    },
  },
  plugins: [],
};
export default config;
