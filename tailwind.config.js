/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#010101",
        "dark-gray": "#222222",
        "light-gray": "#b3b3b3",
        white: "#F1F1F1",
        "off-white": "#E1E1E1",
        pink: "#D668AA",
        blue: "#A385FF",
      },
      fontFamily: {
        "tiro-devanagari-hindi": "Tiro Devanagari Hindi",
        "dela-gothic-one": "Dela Gothic One",
        manrope: "Manrope",
        caramel: "Caramel",
      },
      backgroundImage: {
        pink: "linear-gradient(90deg, #D668AA, #FFC2E7)",
        blue: "linear-gradient(90deg, #A385FF, #C2AEFF)",
        "noisy-card":
          "url(/images/noise/noise.svg), linear-gradient(-125deg, #8864F4 14%, #D668AA 100%), linear-gradient(#A385FF, #D0C1FC)",
      },
    },
  },
  plugins: [],
}
