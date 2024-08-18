import Header from "@/components/landingPage/Header"
import Hero from "@/components/landingPage/Hero"
import LearnSlider from "@/components/landingPage/LearnSlider"
import Benefits from "@/components/landingPage/Benefits"
import Levels from "@/components/landingPage/Levels"
import Team from "@/components/landingPage/Team"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LearnSlider />
        <Benefits />
        <Levels />
        <Team />
      </main>
    </>
  )
}
