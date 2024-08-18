import levels from "@/data/levels"

export default function Levels() {
  return (
    <section className="flex flex-col justify-center items-center px-5 md:px-10 py-20 gap-5 md:gap-10 bg-noisy-card">
      <h2 className="font-dela-gothic-one text-4xl lg:text-5xl !leading[100%] pb-2 text-black">
        Difficulty Levels
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-3 md:gap-5 w-full max-w-[1000px]">
        {levels.map((level, i) => {
          const isEven = (i + 1) % 2 === 0
          return (
            <div
              key={level.heading}
              className={`border ${
                isEven ? "border-blue" : "border-pink"
              } flex flex-col gap-3 lg:gap-5 p-5 lg:p-10 rounded-xl lg:rounded-2xl bg-[#111111]`}
            >
              <h3
                className={`${
                  isEven ? "bg-blue-gradient" : "bg-pink-gradient"
                } font-dela-gothic-one text-xl lg:text-2xl !leading-[110% bg-clip-text text-transparent`}
              >
                {level.heading}
              </h3>
              <p className="font-manrope font-medium text-base !leading-normal tracking-[.02em] text-off-white">
                {level.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
