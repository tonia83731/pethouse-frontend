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
        "noto-san": ["Noto Sans", "sans-serif"],
      },
      screens: {
        xs: "",
      },
      colors: {
        dark: "#0B0014",
        "dark-60": "rgb(11, 0, 20, .6)",
        "dark-40": "rgb(11, 0, 20, .4)",
        taro: "#BCAFC9",
        skin: "#F5E9E2",
        "skin-40": "rgb(245, 233, 226, .4)",
        "milk-tea": "#E3B5A4",
        heart: "#D44D5C",
        wine: "#773344",
        "wine-20": "rgb(119, 51, 68, .2)",
        dirt: "#D9D9D9",
        "white-75": "rgb(255, 255, 255, .75)",
        female: "#B73377",
        male: "#2EA9D9",
        check: "#29C242",
      },
      backgroundImage: {
        mobileHomeHero: "url('/images/home_hero_mobile.png')",
        homeHero: "url('/images/home_hero.png')",
      },
      gridTemplateColumns: {
        6: "repeat(6, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
        17: "repeat(17, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        19: "repeat(19, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
        21: "repeat(21, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
