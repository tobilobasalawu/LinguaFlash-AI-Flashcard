"use client"
import Image from "next/image"
import StackedFlashCards from "../StackedFlashcards"

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row gap-24 px-5 pt-[153px] lg:pt-[169px] pb-20 md:px-10">
      {/* LEFT */}
      <div className="flex flex-col gap-6 ld:gap-10 w-full md:w-1/2">
        <div className="flex flex-col gap-4 lg:gap-6">
          <h1 className="font-dela-gothic-one text-6xl lg:text-[80px] text-white !leading-none -tracking-[.02em]">
            Learn new languages in a{" "}
            <span className="relative font-caramel text-[80px] lg:text-[120px]">
              flash
              <svg
                className="absolute top-[22%] left-[-10%] w-[120px] h-[62px] lg:w-[190px] lg:h-[92px]"
                aria-hidden="true"
                width="190"
                height="92"
                viewBox="0 0 210 102"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M199.499 29.8895C200.993 31.4601 202.189 32.7165 203.384 34.13C211.155 43.0823 212.052 54.3904 206.224 64.7562C203.384 69.782 199.499 73.7084 195.165 77.1637C185.152 85.0165 173.944 90.1994 161.989 93.4976C124.03 104.02 85.7725 104.492 47.3656 96.4817C37.2035 94.44 27.3402 91.1418 18.0747 85.8018C12.9937 82.8177 8.36094 79.3625 4.92374 74.3367C-0.904539 66.1697 -1.50231 57.5316 2.83154 48.4222C5.67096 42.297 10.1543 37.5853 15.2353 33.3448C24.2019 25.806 34.0652 20.152 44.6756 15.7544C83.0825 -0.736629 122.685 -3.87777 163.184 4.44625C174.243 6.64505 184.704 10.5715 194.268 17.1679C196.211 18.5814 198.154 19.9949 199.947 21.7225C203.534 25.0207 203.384 26.1201 199.499 29.8895ZM163.483 12.7703C163.483 12.6132 163.483 12.4562 163.483 12.1421C161.092 11.6709 158.85 11.0427 156.459 10.5715C124.628 4.91743 93.2447 6.64505 62.3099 16.5397C48.86 20.7802 35.8585 26.5913 24.3514 35.2294C20.0175 38.5276 15.6837 42.14 12.2465 46.3805C4.32597 56.2751 5.22263 66.3267 14.9364 74.3367C19.1208 77.7919 24.0525 80.4619 28.9841 82.8177C39.5946 87.6865 50.8028 90.0424 62.1605 91.77C89.3591 95.6964 116.558 95.3823 143.607 90.5135C158.103 87.8436 172.151 83.446 185.003 75.4361C190.233 72.1379 195.165 68.3685 198.752 63.1856C204.879 54.5475 204.281 45.4382 196.958 37.8994C194.717 35.5436 192.176 33.5018 189.486 31.6171C176.933 22.979 163.035 19.3667 148.24 19.6808C145.101 19.6808 141.814 19.9949 138.675 20.152C136.733 20.152 135.089 19.3667 134.939 17.1679C134.79 15.2832 136.135 14.0267 137.928 13.8697C141.066 13.3985 144.205 12.6132 147.343 12.4562C152.723 12.2991 158.103 12.6132 163.483 12.7703Z"
                  fill="url(#paint0_linear_15_4141)"
                />
                <path
                  d="M199.499 29.8895C200.993 31.4601 202.189 32.7165 203.384 34.13C211.155 43.0823 212.052 54.3904 206.224 64.7562C203.384 69.782 199.499 73.7084 195.165 77.1637C185.152 85.0165 173.944 90.1994 161.989 93.4976C124.03 104.02 85.7725 104.492 47.3656 96.4817C37.2035 94.44 27.3402 91.1418 18.0747 85.8018C12.9937 82.8177 8.36094 79.3625 4.92374 74.3367C-0.904539 66.1697 -1.50231 57.5316 2.83154 48.4222C5.67096 42.297 10.1543 37.5853 15.2353 33.3448C24.2019 25.806 34.0652 20.152 44.6756 15.7544C83.0825 -0.736629 122.685 -3.87777 163.184 4.44625C174.243 6.64505 184.704 10.5715 194.268 17.1679C196.211 18.5814 198.154 19.9949 199.947 21.7225C203.534 25.0207 203.384 26.1201 199.499 29.8895ZM163.483 12.7703C163.483 12.6132 163.483 12.4562 163.483 12.1421C161.092 11.6709 158.85 11.0427 156.459 10.5715C124.628 4.91743 93.2447 6.64505 62.3099 16.5397C48.86 20.7802 35.8585 26.5913 24.3514 35.2294C20.0175 38.5276 15.6837 42.14 12.2465 46.3805C4.32597 56.2751 5.22263 66.3267 14.9364 74.3367C19.1208 77.7919 24.0525 80.4619 28.9841 82.8177C39.5946 87.6865 50.8028 90.0424 62.1605 91.77C89.3591 95.6964 116.558 95.3823 143.607 90.5135C158.103 87.8436 172.151 83.446 185.003 75.4361C190.233 72.1379 195.165 68.3685 198.752 63.1856C204.879 54.5475 204.281 45.4382 196.958 37.8994C194.717 35.5436 192.176 33.5018 189.486 31.6171C176.933 22.979 163.035 19.3667 148.24 19.6808C145.101 19.6808 141.814 19.9949 138.675 20.152C136.733 20.152 135.089 19.3667 134.939 17.1679C134.79 15.2832 136.135 14.0267 137.928 13.8697C141.066 13.3985 144.205 12.6132 147.343 12.4562C152.723 12.2991 158.103 12.6132 163.483 12.7703Z"
                  fill="url(#paint1_linear_15_4141)"
                  fillOpacity="0.2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_15_4141"
                    x1="210"
                    y1="6.02936"
                    x2="13.7162"
                    y2="119.663"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.142702"
                      stopColor="#8864F4"
                    />
                    <stop
                      offset="1"
                      stopColor="#D668AA"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_15_4141"
                    x1="105"
                    y1="0"
                    x2="105"
                    y2="102"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#A385FF" />
                    <stop
                      offset="1"
                      stopColor="#D0C1FC"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <p className="font-manrope font-medium text-base lg:text-lg text-off-white !leading-normal">
            Master languages faster with AI-generated flashcards tailored for
            your learning needs for free!
          </p>
        </div>

        <div className="flex items-end gap-6 lg:gap-10">
          <div>
            <div className="flex">
              <Image
                src="/images/icons/bolt.svg"
                width={24}
                height={24}
                alt="Ligtning bolt"
                fetchPriority="high"
              />
              <p className="font-dela-gothic-one text-white text-xl lg:text-[24px] -tracking-[-.02em] !leading-none">
                50 +
              </p>
            </div>
            <p className="mt-1 font-manrope text-off-white text-base lg:text-lg leading-none tracking-[.01em]">
              Languages
            </p>
          </div>
          <button className="font-manrope font-bold -tracking-[.02em] text-base lg:text-lg !leading-none text-black bg-pink rounded-xl lg:rounded-2xl py-4 px-6 lg:py-[18px] lg:px-9 hover:bg-none hover:bg-fuchsia-400 transition-colors duration-100">
            Get started
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="grid place-content-start md:place-content-center w-full md:w-1/2">
        <StackedFlashCards />
      </div>
    </section>
  )
}
