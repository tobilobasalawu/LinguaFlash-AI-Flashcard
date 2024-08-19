"use client"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import AppContextProvider from "@/contexts/Appcontext"
import Footer from "@/components/Footer"
import { usePathname } from "next/navigation"
import { appearance } from "@/config/clerk"

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
              content="Master languages faster with AI-generated flashcards tailored for
            your learning needs for free!"
            />
            <title>LinguaFlash</title>
          </head>
          <body className="flex justify-center bg-black overflow-x-hidden">
            <div className="flex-none w-full max-w-[1536px]">
              {children}
              {canShowFooter && <Footer />}
            </div>
          </body>
        </AppContextProvider>
      </html>
    </ClerkProvider>
  )
}
