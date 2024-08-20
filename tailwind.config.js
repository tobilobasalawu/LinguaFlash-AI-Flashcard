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
        "dela-gothic-one": [
          "var(--font-dela-gothic-one)",
          "system-ui",
          "apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        caramel: [
          "var(--font-caramel)",
          "system-ui",
          "apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        manrope: [
          "var(--font-manrope)",
          "system-ui",
          "apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "pink-gradient": "linear-gradient(90deg, #D668AA, #FFC2E7)",
        "blue-gradient": "linear-gradient(90deg, #A385FF, #C2AEFF)",
        "noisy-card":
          "url(/images/noise/noise.svg), linear-gradient(-125deg, #8864F4 14%, #D668AA 100%), linear-gradient(#A385FF, #D0C1FC)",
        primary:
          "linear-gradient(-125deg, #8864F4 14%, #D668AA 100%), linear-gradient(#A385FF, #D0C1FC)",
      },
    },
  },
  plugins: [],
}
