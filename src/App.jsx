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
import SignalLine from './components/SignalLine.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <SignalLine />
        <Hero />
        <Disciplines />
        <Projects />
        <Schedule />
        <Join />
        <Faq />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
