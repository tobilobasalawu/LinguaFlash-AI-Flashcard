"use client"

import { createTheme } from "@mui/material"
import { Manrope } from "next/font/google"
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
})

export const themeOverride = createTheme({
  typography: {
    fontFamily:
      manrope.style.fontFamily +
      ", system-ui, apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif",
  },
  components: {
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
