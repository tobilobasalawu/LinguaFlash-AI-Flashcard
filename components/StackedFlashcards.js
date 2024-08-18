export default function StackedFlashCards() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 auto-rows-auto">
      <div className="col-start-1 col-end-2 row-start-1 row-end-1 -rotate-[1.8deg] opacity-30 bg-blue w-[425px] h-[240px] rounded-3xl"></div>
      <div className="col-start-1 col-end-2 row-start-1 row-end-1 -rotate-[1.5deg] opacity-30 bg-blue w-[425px] h-[240px] rounded-3xl"></div>
      <div
        className="hero-card-2 relative grid place-content-center col-start-1 col-end-2 row-start-1 row-end-1 rotate-[1.5deg] bg-noisy-card w-[425px] h-[240px] rounded-3xl
                before:absolute before:z-50 before:grid before:inset-0 before:place-content-center before:text-center before:font-dela-gothic-one 
                before:text-black before:tracking-[.02em] before:!leading-none before:text-[40px]"
      ></div>
      <div
        className="hero-card relative grid place-content-center col-start-1 col-end-2 row-start-1 row-end-1 rotate-[1.5deg] bg-noisy-card w-[425px] h-[240px] rounded-3xl
                before:absolute before:z-50 before:grid before:inset-0 before:place-content-center before:text-center before:font-dela-gothic-one 
                before:text-black before:tracking-[.02em] before:!leading-none before:text-[40px]"
      ></div>
    </div>
  )
}
