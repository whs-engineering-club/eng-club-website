import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import Intro from './components/Intro.jsx'
import Hero from './components/Hero.jsx'
import FieldsDial from './components/FieldsDial.jsx'
import BuildsTrack from './components/BuildsTrack.jsx'
import { Contact, Countdown, Faq, Join, Nav, Season, Sponsors, Stats } from './components/Sections.jsx'

// A visitor arriving on a section link (…/#schedule) skips the intro and lands on that section.
const deepLink = typeof window !== 'undefined' && window.location.hash.length > 1

export default function App() {
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)

  // The page renders after load, so the browser can't jump to a #section link on its own.
  useEffect(() => {
    if (!deepLink) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [])

  return (
    <>
      <Intro onDone={() => setReady(true)} skip={deepLink} />
      <Nav />
      <main>
        <Hero introDelay={reduce || deepLink ? 0 : ready ? 0.1 : 1.9} />
        <Countdown />
        <Stats />
        <FieldsDial />
        <BuildsTrack />
        <Season />
        <Join />
        <Faq />
        <Sponsors />
      </main>
      <Contact />
    </>
  )
}
