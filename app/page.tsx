import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/sections/Hero'
import { ProofStrip } from '@/components/sections/ProofStrip'
import { MarqueeStrip } from '@/components/shared/MarqueeStrip'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { FAQ } from '@/components/sections/FAQ'
import { Manifesto } from '@/components/sections/Manifesto'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProofStrip />
        <MarqueeStrip />
        <Projects />
        <SectionDivider glow="accent" />
        <Services />
        <SectionDivider glow="warm" />
        <WhyUs />
        <SectionDivider glow="subtle" />
        <Process />
        <SectionDivider glow="accent" />
        <FAQ />
        <Manifesto />
        <SectionDivider glow="accent" height={80} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
