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
        "dark-60": "rgb(11, 0, 20, .6)",
        "dark-40": "rgb(11, 0, 20, .4)",
        taro: "#BCAFC9",
        skin: "#F5E9E2",
        "milk-tea": "#E3B5A4",
        heart: "#D44D5C",
        wine: "#773344",
        "wine-20": "rgb(119, 51, 68, .2)",
        dirt: "#D9D9D9",
      },
      backgroundImage: {
        mobileHomeHero: "url('/images/home_hero_mobile.png')",
        homeHero: "url('/images/home_hero.png')",
      },
    },
  },
  plugins: [],
};
export default config;
