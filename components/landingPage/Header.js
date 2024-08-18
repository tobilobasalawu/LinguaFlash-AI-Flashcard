"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useContext } from "react"
import { AppContext } from "@/contexts/Appcontext"

export default function Header() {
  const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = useState(false)
  const { viewport } = useContext(AppContext)
  const canShowNav = isMobileNavMenuOpen || viewport.isPc

  function toggleMobileNavMenuVisibility() {
    if (viewport.isPc) return
    setIsMobileNavMenuOpen((prevValue) => !prevValue)
  }
  return (
    <header className="fixed w-full bg-black z-[999] flex justify-between items-center gap-5 px-5 md:px-10 py-3 lg:py-5 border-b border-dark-gray">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          width={182}
          height={48}
          alt="LinguaFlash logo"
          fetchPriority="high"
          sizes="(max-width: 640px) 120px, 
         (max-width: 1024px) 160px, 
         182px"
        />
      </Link>

      {canShowNav && (
        <nav className="absolute right-5 md:right-10 top-[calc(100%_+_12px)] lg:static bg-dark-gray/50 lg:bg-transparent backdrop-blur-[2px] rounded-lg border border-blue lg:border-none">
          <ul className="flex flex-col lg:flex-row lg:gap-8 w-32 lg:w-fit overflow-hidden">
            <li className="hover:bg-pink/40 lg:hover:bg-transparent lg:hover:border-b lg:hover:border-pink pb-[2px]">
              <Link
                href="./#levels"
                className="block w-full h-fit p-3 lg:w-fit lg:p-0 font-manrope text-base text-white font-medium leading-none"
              >
                Levels
              </Link>
            </li>
            <li className="hover:bg-pink/40 lg:hover:bg-transparent lg:hover:border-b lg:hover:border-pink pb-[2px]">
              <Link
                href="./#team"
                className="block w-full h-fit p-3 lg:w-fit lg:p-0 font-manrope text-base text-white font-medium leading-none border-t border-blue lg:border-t-0"
              >
                Team
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <Link
        href="/sign-in"
        className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-2 px-4 lg:py-[12px] lg:px-6 ml-auto lg:ml-0"
      >
        Login
      </Link>

      <button
        type="button"
        className="flex flex-col gap-[5px] lg:hidden"
        onClick={toggleMobileNavMenuVisibility}
        aria-label="Navigation menu button"
      >
        <span className="w-5 h-[3px] bg-off-white rounded"></span>
        <span className="w-5 h-[3px] bg-off-white rounded"></span>
        <span className="w-5 h-[3px] bg-off-white rounded"></span>
      </button>
    </header>
  )
}
