"use client"
import useViewport from "@/hooks/useViewport"
import { createContext } from "react"

export const AppContext = createContext(null)

export default function AppContextProvider({ children }) {
  const [viewport] = useViewport()

  return (
    <AppContext.Provider value={{ viewport: viewport }}>
      {children}
    </AppContext.Provider>
  )
}
