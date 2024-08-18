import { useState, useEffect } from "react"

export default function useViewport() {
  const [viewport, setViewport] = useState({
    isPc: window.innerWidth >= 1024,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isMobile: window.innerWidth < 768,
  })

  useEffect(() => {
    function updateViewport() {
      const width = window.innerWidth
      const newViewport = {
        isPc: width >= 1024,
        isTablet: width >= 768 && width < 1024,
        isMobile: width < 768,
      }
      setViewport((prevViewport) =>
        prevViewport.isPc !== newViewport.isPc ||
        prevViewport.isTablet !== newViewport.isTablet ||
        prevViewport.isMobile !== newViewport.isMobile
          ? newViewport
          : prevViewport
      )
    }
    window.addEventListener("resize", updateViewport)
    updateViewport()
    return () => window.removeEventListener("resize", updateViewport)
  }, [])
  return [viewport]
}
