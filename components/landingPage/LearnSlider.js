"use client"
import Image from "next/image"
import learnSlider from "@/data/learnSlider"
import { useEffect, useRef } from "react"

export default function LearnSlider() {
  const sliderRef = useRef(null)

  useEffect(() => {
    function setSliderAnimation() {
      const sliderEl = sliderRef.current
      if (!sliderEl) return

      const existingStyle = document.getElementById("learn-slider")
      if (existingStyle) {
        existingStyle.remove()
      }

      const style = document.createElement("style")
      style.type = "text/css"
      style.id = "learn-slider"

      const scrollDistance = sliderEl.scrollWidth - sliderEl.offsetWidth || 0

      const sliderKeyframes = `
              @keyframes benefitsSlider {
                  0% { transform: translateX(4svw) }
                  100% { transform: translateX(-${scrollDistance}px) }
              }`

      style.innerHTML = sliderKeyframes
      document.head.appendChild(style)

      sliderEl.style.animation = "benefitsSlider 20s linear infinite"
    }

    setSliderAnimation()
    window.addEventListener("resize", setSliderAnimation)

    return () => {
      window.removeEventListener("resize", setSliderAnimation)
      const existingStyle = document.getElementById("learn-slider")
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  return (
    <section className="overflow-hidden">
      <div
        ref={sliderRef}
        className="flex gap-12 lg:gap-20 px-5 md:px-10 py-2 md:p-3"
      >
        {learnSlider.map((data) => {
          return (
            <div
              key={data.text}
              className="flex items-center gap-2"
            >
              <Image
                className="mt-3"
                src={`${data.flag}`}
                alt={`${data.flagName}`}
                width={28}
                height={20}
              />
              <h2 className="font-dela-gothic-one text-xl lg:text-2xl text-white tracking-normal !leading-none whitespace-nowrap">
                {data.text}
              </h2>
            </div>
          )
        })}
      </div>
    </section>
  )
}
