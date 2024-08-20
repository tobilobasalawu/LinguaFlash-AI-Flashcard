"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useClerk } from "@clerk/nextjs"
import Image from "next/image"

export default function Header() {
  const { signOut } = useClerk()

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

      <div className="flex gap-3">
        <SignedOut>
          <Link
            href="/sign-in"
            className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-2 px-4 lg:py-[12px] lg:px-6 ml-auto lg:ml-0"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-2 px-4 lg:py-[12px] lg:px-6 ml-auto lg:ml-0"
          >
            Sign Up
          </Link>
        </SignedOut>

        <SignedIn>
          {isNew ? (
            <Link
              className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-2 px-4 lg:py-[12px] lg:px-6 ml-auto lg:ml-0"
              href="/flashcards"
            >
              View Saved Flashcards
            </Link>
          ) : (
            <Link
              className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-2 px-4 lg:py-[12px] lg:px-6 ml-auto lg:ml-0"
              href="/new"
            >
              New +
            </Link>
          )}

          <button
            className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-2 px-4 lg:py-[12px] lg:px-6 ml-auto lg:ml-0"
            onClick={handleSignOut}
          >
            Sign Out
          </button>

          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
