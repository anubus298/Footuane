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
        "primary-lime-green": "#181818",
        "primary-first": "#1f3248",
        "primary-second": "#fd3546",
        "primary-bg": "#311D3F",
        "white": "#F1F2EB",
        "primary-purple": "#a66cff",
        "primary-white": "#ebe9e9",
      },
      fontFamily: {
        Oswald: ["var(--font-Oswald)"],
      },
    },
  },
  plugins: []
};
export default config;
