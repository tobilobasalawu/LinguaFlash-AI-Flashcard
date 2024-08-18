"use client"
import Link from "next/link"

export default function Cta() {
  return (
    <section className="flex flex-col justify-center items-center px-5 md:px-10 pb-20 md:pt-20">
      <div className="flex flex-col items-center gap-8 lg:gap-12 w-full max-w-[1440px] p-5 py-20 lg:p-20 bg-noisy-card rounded-2xl lg:rounded-3xl">
        <h2 className="font-dela-gothic-one text-4xl lg:text-5xl !leading[110%] pb-2 text-black max-w-[700px] text-center">
          Ready to ace a new language?
        </h2>
        <Link
          href="/sign-up"
          className="font-manrope font-bold -tracking-[.02em] text-lg lg:text-xl !leading-none text-black bg-white rounded-xl lg:rounded-2xl py-4 px-6 lg:py-[18px] lg:px-9 hover:bg-none hover:bg-black hover:text-white transition-colors duration-100"
        >
          Let&apos;s go 🚀
        </Link>
      </div>
    </section>
  )
}
