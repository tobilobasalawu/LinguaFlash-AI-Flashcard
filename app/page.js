import Header from "@/components/landingPage/Header"
import Hero from "@/components/landingPage/Hero"
import LearnSlider from "@/components/landingPage/LearnSlider"
import Benefits from "@/components/landingPage/Benefits"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LearnSlider />
        <Benefits />
      </main>
    </>
  )
}
