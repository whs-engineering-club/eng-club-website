import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Disciplines from './components/Disciplines.jsx'
import Projects from './components/Projects.jsx'
import Schedule from './components/Schedule.jsx'
import Join from './components/Join.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main className="wrap" id="top">
        <Hero />
        <Marquee />
        <Disciplines />
        <Projects />
        <Schedule />
        <Join />
        <Faq />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
