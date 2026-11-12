import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import Intro from './components/Intro.jsx'
import Hero from './components/Hero.jsx'
import FieldsDial from './components/FieldsDial.jsx'
import BuildsTrack from './components/BuildsTrack.jsx'
import { Contact, Countdown, Faq, Join, Nav, Season, Sponsors, Stats } from './components/Sections.jsx'

// Sections alternate black and bone: each declares a tone, and the page's color tokens (registered
// with @property in styles/theme.css) cross-fade when that section reaches the middle of the screen.
const TONES = [
  ['#top', 'dark'], ['.bn-count', 'dark'], ['.bn-stats', 'dark'],
  ['#what', 'light'], ['#projects', 'dark'], ['#schedule', 'light'],
  ['#join', 'dark'], ['#faq', 'light'], ['#sponsors', 'light'], ['#contact', 'dark'],
]

function useToneShift() {
  useEffect(() => {
    const root = document.documentElement
    const els = TONES.map(([sel, tone]) => { const el = document.querySelector(sel); el?.setAttribute('data-tone', tone); return el }).filter(Boolean)
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) root.dataset.tone = e.target.dataset.tone }), { rootMargin: '-50% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// A visitor arriving on a section link (…/#schedule) skips the intro and lands on that section.
const deepLink = typeof window !== 'undefined' && window.location.hash.length > 1

export default function App() {
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)
  useToneShift()

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
