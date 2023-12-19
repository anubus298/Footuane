import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-lime-green": "#d0f500",
        "primary-purple": "#a66cff",
        "primary-white": "#ebe9e9",
      },
      fontFamily : {
        Oswald: ['var(--font-Oswald)'],
      }
    },
  },
  plugins: [],
};
export default config;
