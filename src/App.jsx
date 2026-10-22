import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
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
      <main>
        <Hero />
        <Disciplines />
        <Projects />
        <Schedule />
        <Join />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
