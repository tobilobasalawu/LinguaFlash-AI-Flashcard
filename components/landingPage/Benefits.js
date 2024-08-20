import benefits from "@/data/benefits"

export default function Benefits() {
  return (
    <section className="flex flex-col gap-20 lg:gap-40 px-5 md:px-10 py-20 lg:py-20">
      {benefits.map((benefit, i) => {
        const { heading, description, illustration } = benefit
        const isEven = (i + 1) % 2 === 0
        return (
          <div
            key={heading}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-0"
          >
            <div
              className={`illustration ${
                isEven ? "md:order-2" : "md:order-1"
              } flex justify-center items-center w-full md:w-1/2`}
            >
              {illustration}
            </div>
            <div
              className={`${
                isEven ? "md:order-1" : "md:order-2"
              } grid place-content-center w-full md:w-1/2`}
            >
              <div className="flex flex-col gap-3 lg:gap-5 max-w-[500px]">
                <h2 className="font-dela-gothic-one text-4xl lg:text-5xl !leading-none tracking-normal pb-2 text-transparent bg-primary bg-clip-text">
                  {heading}
                </h2>
                <p className="font-manrope font-medium text-base lg:text-lg !leading-normal tracking-[.02em] text-off-white">
                  {description}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
