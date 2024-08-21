"use client"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import AppContextProvider from "@/contexts/Appcontext"
import Footer from "@/components/Footer"
import { usePathname } from "next/navigation"
import { appearance } from "@/config/clerk"
import { ThemeProvider } from "@mui/material"
import { themeOverride } from "@/config/theme"
import { Manrope, Caramel, Dela_Gothic_One } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})
const delaGothicOne = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-dela-gothic-one",
})

const caramel = Caramel({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-caramel",
})

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const canShowFooter = pathname !== "/sign-in" && pathname !== "/sign-up"

  return (
    <ClerkProvider appearance={appearance}>
      <html lang="en">
        <AppContextProvider>
          <head>
            <meta
              name="description"
              content="Master languages faster with AI-generated flashcards tailored for your learning needs for free!"
            />
            <meta
              name="robots"
              content="index, follow"
            />
            <meta
              name="author"
              content="Oyelola Victoria, Anushka Narssima, Oluwatobi Salawu"
            />
            <meta
              name="keywords"
              content="LinguaFlash AI, Flashcards, AI generated flashcards, language learning, learn a language, learn Spanish, learn French, learn German, language study, AI flashcard app, custom flashcards"
            />

            <meta
              property="og:title"
              content="LinguaFlash AI"
            />
            <meta
              property="og:description"
              content="Master languages faster with AI-generated flashcards tailored for your learning needs for free!"
            />
            <meta
              property="og:image"
              content="https://linguaflashai.vercel.app/images/seo.png"
            />
            <meta
              property="og:url"
              content="https://linguaflashai.vercel.app"
            />
            <meta
              property="og:type"
              content="website"
            />

            <meta
              name="twitter:card"
              content="summary_large_image"
            />
            <meta
              name="twitter:title"
              content="LinguaFlash AI"
            />
            <meta
              name="twitter:description"
              content="Master languages faster with AI-generated flashcards tailored for your learning needs for free!"
            />
            <meta
              name="twitter:image"
              content="https://linguaflashai.vercel.app/images/seo.png"
            />
            <title>LinguaFlash AI</title>
            <link
              rel="preload"
              fetchPriority="high"
              href="/images/noise/noise.svg"
              as="image"
              type="image/svg+xml"
            />
          </head>
          <body
            className={`flex justify-center bg-black overflow-x-hidden ${manrope.variable} ${caramel.variable} ${delaGothicOne.variable}`}
          >
            <div className="flex-none w-full max-w-[1536px]">
              <ThemeProvider theme={themeOverride}>{children}</ThemeProvider>
              {canShowFooter && <Footer />}
            </div>
          </body>
        </AppContextProvider>
      </html>
    </ClerkProvider>
  )
}
