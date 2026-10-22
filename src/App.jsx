import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Disciplines from './components/Disciplines.jsx'
import Projects from './components/Projects.jsx'
import Schedule from './components/Schedule.jsx'
import Join from './components/Join.jsx'
import Faq from './components/Faq.jsx'
import Sponsors from './components/Sponsors.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Bridge from './components/Bridge.jsx'

export default function App() {
  // The page renders after load, so the browser can't jump to a #section link on its own.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Bridge kind="gears" />
        <Disciplines />
        <Bridge kind="piston" />
        <Projects />
        <Bridge kind="caliper" />
        <Schedule />
        <Bridge kind="linkage" />
        <Join />
        <Bridge kind="scope" />
        <Faq />
        <Bridge kind="printer" />
        <Sponsors />
        <Bridge kind="connector" dark />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
