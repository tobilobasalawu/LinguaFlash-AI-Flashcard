"use client"

export default function Header() {
  return (
    <header className="fixed w-full max-w-[1536px] bg-black z-[999] flex justify-between items-center gap-5 px-5 md:px-10 py-3 lg:py-5 border-b border-dark-gray">
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

      <Link
        href="/sign-in"
        className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-2 px-4 lg:py-[12px] lg:px-6 ml-auto lg:ml-0"
      >
        Sign
      </Link>
    </header>
  )
}
