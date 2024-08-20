import team from "@/data/team"
import Image from "next/image"
import Link from "next/link"

export default function Team() {
  return (
    <section
      id="team"
      className="flex flex-col justify-center items-center px-5 md:px-10 py-20 gap-10"
    >
      <h2 className="w-full max-w-[400px] md:max-w-[912px] font-dela-gothic-one text-4xl lg:text-5xl md:text-center !leading-none tracking-normal pb-2 text-transparent bg-primary bg-clip-text">
        Meet the amazing team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-10 w-full max-w-[400px] md:max-w-[912px]">
        {team.map((member) => {
          const { name, jobTitle, image, linkedInProfile } = member
          return (
            <div
              key={name}
              className="flex flex-col gap-3 lg:gap-5"
            >
              <div className="flex-none relative w-full h-[280px] md:h-[240px]">
                <Image
                  className="rounded-2xl lg:rounded-3xl object-cover object-center"
                  src={image}
                  alt={name}
                  fill={true}
                />
                <Link
                  href={linkedInProfile}
                  target="_blank"
                >
                  <svg
                    className="absolute right-5 top-5 hover:fill-[#0072B1]"
                    aria-label={`Link to ${name}'s LinkedIn profile`}
                    width="32"
                    height="32"
                    viewBox="0 0 25 25"
                    fill="010101"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9_3834)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.7345 0.336914C23.3529 0.336914 24.6667 1.65082 24.6667 3.26913V21.4047C24.6667 23.023 23.3528 24.3369 21.7345 24.3369H3.59897C1.98065 24.3369 0.666748 23.023 0.666748 21.4047V3.26913C0.666748 1.65082 1.98061 0.336914 3.59897 0.336914L21.7345 0.336914ZM8.18836 20.1781V9.59759H4.67086V20.1781H8.18836ZM20.8699 20.1781V14.1106C20.8699 10.8606 19.1347 9.34877 16.8208 9.34877C14.955 9.34877 14.1192 10.3749 13.6512 11.0956V9.59759H10.1346C10.1812 10.5904 10.1346 20.1781 10.1346 20.1781H13.6512V14.2692C13.6512 13.9529 13.674 13.6368 13.7671 13.4107C14.0209 12.779 14.6 12.1247 15.5715 12.1247C16.8435 12.1247 17.3531 13.0954 17.3531 14.5171V20.1781H20.8699ZM6.45337 4.49576C5.2499 4.49576 4.46362 5.28696 4.46362 6.32398C4.46362 7.3392 5.226 8.15219 6.40683 8.15219H6.42951C7.656 8.15219 8.41945 7.3392 8.41945 6.32398C8.39672 5.28841 7.65815 4.49801 6.45337 4.49576Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9_3834">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.666748 0.336914)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>

              <div className="flex-non h-fit flex flex-col gap-1">
                <h3 className="lg:mt-5 capitalize font-dela-gothic-one text-xl lg:text-2xl text-white !leading-none tracking-normal">
                  {name}
                </h3>
                <p className="mt-1 capitalize font-manrope font-medium text-base lg:text-lg !leading-normal tracking-[.02em] text-off-white">
                  {jobTitle}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
