import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/sections/Hero'
import { ProofStrip } from '@/components/sections/ProofStrip'
import { Projects } from '@/components/sections/Projects'
import { WhyUs } from '@/components/sections/WhyUs'
import { Services } from '@/components/sections/Services'
import { Founders } from '@/components/sections/Founders'
import { Pricing } from '@/components/sections/Pricing'
import { Process } from '@/components/sections/Process'
import { Manifesto } from '@/components/sections/Manifesto'
import { Contact } from '@/components/sections/Contact'
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProofStrip />
        <Founders />
        <Services />
        <Projects />
        <WhyUs />
        <Pricing />
        <Process />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
