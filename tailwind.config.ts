import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        "nunito-san": ["Nunito Sans", "sans-serif"],
      },
      colors: {
        dark: "#0B0014",
        "dark-80": "rgb(11, 0, 20, .8)",
        taro: "#BCAFC9",
        skin: "#F5E9E2",
        "milk-tea": "#E3B5A4",
        heart: "#D44D5C",
        wine: "#773344",
      },
    },
  },
  plugins: [],
};
export default config;
