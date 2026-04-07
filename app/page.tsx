import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/sections/Hero'
import { FounderBar } from '@/components/sections/FounderBar'
import { ProblemSolution } from '@/components/sections/ProblemSolution'
import { Projects } from '@/components/sections/Projects'
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
        <Projects />
        <Services />
        <Process />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
