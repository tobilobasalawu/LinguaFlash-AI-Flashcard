"use client"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="flex flex-col items-start md:flex-row md:justify-between md:items-center gap-5 px-5 py-3 lg:py-5 border-t border-dark-gray">
      <Image
        className="block w-fit flex-none"
        src="/images/logo.svg"
        width={182}
        height={48}
        alt="LinguaFlash logo"
        sizes="(max-width: 640px) 120px, 
         (max-width: 1024px) 160px, 
         182px"
      />

      <div className="flex items-center gap-1">
        <Image
          src="/images/icons/heart.png"
          width={28}
          height={28}
          alt="Heart icon"
        />
        <Link
          href="/"
          className="font-manrope text-base text-white font-medium leading-none hover:border-b border-pink hover:border-blue pb-[2px]"
        >
          Support us
        </Link>
      </div>

      <p className="font-manrope text-sm text-white font-normal leading-none">
        © Copyright 2024. All Rights Reserved.
      </p>
    </footer>
  )
}
