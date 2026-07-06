import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import WhyUs from './components/WhyUs.jsx'
import Results from './components/Results.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const reducedMotion = useReducedMotion()
  // The scroll-progress line is the hero trail's landing spot: it appears once
  // the launch finishes (or immediately when motion is reduced).
  const [launched, setLaunched] = useState(false)
  const showProgress = reducedMotion || launched

  return (
    <>
      <ScrollProgress visible={showProgress} />
      <Nav />
      <main>
        <Hero onLaunchComplete={() => setLaunched(true)} />
        <Services />
        <Process />
        <WhyUs />
        <Results />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
