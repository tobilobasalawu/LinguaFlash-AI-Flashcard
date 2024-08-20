"use client"

import { createTheme } from "@mui/material"
import ManropeTtf500 from "@/public/fonts/manrope-v15-latin-500.ttf"
import ManropeWoff2500 from "@/public/fonts/manrope-v15-latin-500.woff2"
import ManropeTtf600 from "@/public/fonts/manrope-v15-latin-600.ttf"
import ManropeWoff2600 from "@/public/fonts/manrope-v15-latin-600.woff2"
import ManropeTtf700 from "@/public/fonts/manrope-v15-latin-700.ttf"
import ManropeWoff2700 from "@/public/fonts/manrope-v15-latin-700.woff2"
import ManropeTtf from "@/public/fonts/manrope-v15-latin-regular.ttf"
import ManropeWoff2 from "@/public/fonts/manrope-v15-latin-regular.woff2"

export const themeOverride = createTheme({
  typography: {
    fontFamily:
      "Manrope, system-ui, apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-display: swap;
          font-family: "Manrope";
          font-style: normal;
          font-weight: 400;
          src: url(${ManropeWoff2}) format('woff2'),
               url(${ManropeTtf}) format("truetype");
        }
        
        @font-face {
          font-display: swap;
          font-family: "Manrope";
          font-style: normal;
          font-weight: 500;
          src: url(${ManropeWoff2500}) format('woff2'),
               url(${ManropeTtf500}) format("truetype");
        }
        
        @font-face {
          font-display: swap;
          font-family: "Manrope";
          font-style: normal;
          font-weight: 600;
          src: url(${ManropeWoff2600}) format('woff2'),
               url(${ManropeTtf600}) format("truetype");
        }
        
        @font-face {
          font-display: swap;
          font-family: "Manrope";
          font-style: normal;
          font-weight: 700;
          src: url(${ManropeWoff2700}) format('woff2'),
               url(${ManropeTtf700}) format("truetype");
        }
      `,
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  palette: {
    primary: {
      main: "#A385FF",
    },
    secondary: {
      main: "#D668AA",
    },
  },
  root: {
    "& .MuiInputLabel-root": {
      color: "#A385FF", // Color of the label text
    },
    "& .MuiInputBase-input": {
      color: "#F1F1F1",
    },
  },
})
