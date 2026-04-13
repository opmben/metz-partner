import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/sections/Hero'
import { FounderBar } from '@/components/sections/FounderBar'
import { ProblemSolution } from '@/components/sections/ProblemSolution'
import { Projects } from '@/components/sections/Projects'
import { StatsStrip } from '@/components/sections/StatsStrip'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { Manifesto } from '@/components/sections/Manifesto'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <FounderBar />
        <ProblemSolution />
        {/* Projects: renders null if fewer than 2 real projects exist */}
        <Projects />
        <StatsStrip />
        <Services />
        <Process />
        <Manifesto />
        <Contact />
        {/* Testimonials: nicht gebaut bis echte Kundenstimmen vorliegen */}
      </main>
      <Footer />
    </>
  )
}
