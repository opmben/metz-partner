import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/sections/Hero'
import { ProofStrip } from '@/components/sections/ProofStrip'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProofStrip />
        <Projects />
        <Services />
        <WhyUs />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
