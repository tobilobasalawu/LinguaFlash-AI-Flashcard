"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useClerk } from "@clerk/nextjs"
import Image from "next/image"
import { useState } from "react"
import { useContext } from "react"
import { AppContext } from "@/contexts/Appcontext"

export default function Header() {
  const { signOut } = useClerk()
  const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = useState(false)
  const { viewport } = useContext(AppContext)
  const canShowNav = isMobileNavMenuOpen || viewport.isPc

  function toggleMobileNavMenuVisibility() {
    if (viewport.isPc) return
    setIsMobileNavMenuOpen((prevValue) => !prevValue)
  }

  const handleSignOut = () => signOut()

  const pathname = usePathname()
  const isNew = pathname === "/new"

  return (
    <header className="fixed top-0 left-0 w-full max-w-[1536px] bg-black z-[999] flex justify-between items-center gap-5 px-5 md:px-10 py-3 lg:py-5 border-b border-dark-gray">
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
      <div className="flex items-center gap-5">
        {canShowNav && (
          <nav className="absolute right-5 md:right-10 top-[calc(100%_+_12px)] lg:static bg-dark-gray/50 lg:bg-transparent backdrop-blur-[2px] rounded-lg border border-blue lg:border-none">
            <ul className="flex flex-col lg:flex-row items-center lg:gap-3 w-fit h-fit overflow-hidden">
              <SignedOut>
                <li className="h-fit hover:bg-pink/40 lg:hover:bg-transparent">
                  <Link
                    href="/sign-in"
                    className="block w-full p-3 py-4 lg:p-0 font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white lg:border lg:border-pink lg:rounded-lg px-4 lg:py-[12px] lg:px-6"
                  >
                    Login
                  </Link>
                </li>
                <li className="h-fit hover:bg-pink/40 lg:hover:bg-transparent">
                  <Link
                    href="/sign-up"
                    className="block p-3 py-4 lg:p-0 font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border-t border-blue lg:border lg:border-pink lg:rounded-lg px-4 lg:py-[12px] lg:px-6"
                  >
                    Sign Up
                  </Link>
                </li>
              </SignedOut>

              <SignedIn>
                {isNew ? (
                  <li className="h-fit hover:bg-pink/40 lg:hover:bg-transparent">
                    <Link
                      className="block w-full p-3 py-4 lg:p-0 font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white lg:border lg:border-pink lg:rounded-lg px-4 lg:py-[12px] lg:px-6"
                      href="/flashcards"
                    >
                      View Saved Flashcards
                    </Link>
                  </li>
                ) : (
                  <li className="h-fit w-full lg:w-fit hover:bg-pink/40 lg:hover:bg-transparent">
                    <Link
                      className="block w-full p-3 py-4 lg:p-0 font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white lg:border lg:border-pink lg:rounded-lg px-4 lg:py-[12px] lg:px-6"
                      href="/new"
                    >
                      New +
                    </Link>
                  </li>
                )}

                <button
                  className="w-full lg:w-fit h-fit hover:bg-pink/40 lg:hover:bg-transparent block p-3 py-4 lg:p-0 font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border-t border-blue lg:border lg:border-pink lg:rounded-lg px-4 lg:py-[12px] lg:px-6"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </SignedIn>
            </ul>
          </nav>
        )}
        <UserButton />
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
      </div>
    </header>
  )
}
