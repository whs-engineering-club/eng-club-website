import { club, stats } from '../data.js'
import CircuitCanvas from './CircuitCanvas.jsx'
import NextMeeting from './NextMeeting.jsx'
import Reveal from './Reveal.jsx'
import CountUp from './CountUp.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <CircuitCanvas />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><span className="code">{club.year}</span>{club.name}</p>
          <h1>
            Build robots.<br />
            Design circuits.<br />
            <span className="glow">Break things on purpose.</span>
          </h1>
          <p className="lede">
            We're the students who stay after school to make things move, light up and occasionally catch fire
            (safely). Robotics, electronics, CAD and design challenges. Open to every major.
          </p>
          <div className="cta-row">
            <a className="btn primary" href="#join">Join the club</a>
            <a className="btn ghost" href="#projects">See projects</a>
          </div>
        </div>
        <NextMeeting />
      </div>
      <Reveal className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <b>{s.prefix}<CountUp value={s.value} /></b>
            <span>{s.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
