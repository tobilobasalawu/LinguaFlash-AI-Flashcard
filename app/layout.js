"use client"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import AppContextProvider from "@/contexts/Appcontext"
import Footer from "@/components/Footer"

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
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
          <body className="flex justify-center bg-black">
            <div className="flex-none w-full max-w-[1536px]">
              {children}
              <Footer />
            </div>
          </body>
        </AppContextProvider>
      </html>
    </ClerkProvider>
  )
}
