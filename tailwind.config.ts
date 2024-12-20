import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-80": "rgb(255, 255, 255, .8)",
        "white-60": "rgb(255, 255, 255, .6)",
        "white-40": "rgb(255, 255, 255, .4)",
        "wine-60": "rgb(119, 51, 68, .6)",
        wine: "#773344",
        heart: "#d44d5c",
        skin: "#e3b5a4",
        "skin-40": "rgb(227, 181, 164, .4)",
        "skin-60": "rgb(227, 181, 164, .6)",
        dark: "#0b0014",
        "dark-60": "rgb(11, 0, 20, .6)",
        "dark-40": "rgb(11, 0, 20, .4)",
        "dark-5": "rgb(11, 0, 20, .05)",
        light: "#f5e9e2",

        sky: "#2ea9d9",
        berry: "#b73377",
        neutral: "#29c242",
        taro: "#BCAFC9",
      },
      fontFamily: {
        noto_sans: ["var(--font-noto-sans)"],
        nunito: ["var(--font-nunito)"],
      },
      backgroundImage: {
        "application-mobile": "url('/images/hero/application_mobile.png')",
        "application-desktop": "url('/images/hero/application_desktop.png')",
        "partner-mobile": "url('/images/partner-mobile.jpg')",
        "partner-desktop": "url('/images/partner-desktop.jpg')",
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
        "14": "repeat(14, minmax(0, 1fr))",
        "15": "repeat(15, minmax(0, 1fr))",
        "16": "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
} satisfies Config;
