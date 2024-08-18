"use client"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import AppContextProvider from "@/contexts/Appcontext"

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
          <body className="bg-black">{children}</body>
        </AppContextProvider>
      </html>
    </ClerkProvider>
  )
}
