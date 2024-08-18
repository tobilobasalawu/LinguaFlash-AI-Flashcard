"use client"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import AppContextProvider from "@/contexts/Appcontext"

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <AppContextProvider>
          <body className="bg-black">{children}</body>
        </AppContextProvider>
      </html>
    </ClerkProvider>
  )
}
