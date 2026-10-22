import { club } from '../data.js'
import { useScrollProgress } from '../lib/hooks.js'
import Gears from './Gears.jsx'

export default function Hero() {
  const ref = useScrollProgress()
  return (
    <section className="hero" ref={ref} id="top">
      <div className="pin">
        <div className="hero-copy">
          <p className="label">{club.name} · {club.year}</p>
          <h1>We build things that work.</h1>
          <p className="sub">Robotics, electronics, CAD and design challenges. Open to every major, no experience needed.</p>
        </div>
        <Gears />
        <p className="cue" aria-hidden="true"><span />Scroll</p>
      </div>
    </section>
  )
}
