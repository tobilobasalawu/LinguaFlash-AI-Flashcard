import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex justify-between items-center px-20 py-5 border-b border-dark-gray">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          width={182}
          height={48}
          alt="LinguaFlash logo"
          fetchPriority="high"
        />
      </Link>

      <nav>
        <ul className="flex gap-8">
          <li>
            <Link
              href="/"
              className="font-manrope text-base text-white font-medium leading-none"
            >
              Levels
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="font-manrope text-base text-white font-medium leading-none"
            >
              Team
            </Link>
          </li>
        </ul>
      </nav>

      <button className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-[12px] px-6">
        Login
      </button>
    </header>
  )
}
