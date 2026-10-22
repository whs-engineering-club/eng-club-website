import { club } from '../data.js'
import NextMeeting from './NextMeeting.jsx'
import TrussDrawing from './TrussDrawing.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="label intro" style={{ '--d': '0ms' }}>
            <span className="dot" aria-hidden="true" />{club.name} · {club.year}
          </p>
          <h1>
            <span className="line"><span style={{ '--d': '90ms' }}>Engineering,</span></span>
            <span className="line"><span className="soft" style={{ '--d': '190ms' }}>learned by building.</span></span>
          </h1>
          <p className="lede intro" style={{ '--d': '420ms' }}>
            We design circuits, model parts in CAD, take on build challenges and test what we make.
            Open to every student. No experience needed.
          </p>
          <div className="cta-row intro" style={{ '--d': '520ms' }}>
            <a className="btn primary" href="#join">Join the club <span className="arr" aria-hidden="true">→</span></a>
            <a className="btn ghost" href="#projects">See current projects</a>
          </div>
        </div>
        <TrussDrawing />
      </div>
      <div className="container intro" style={{ '--d': '700ms' }}>
        <NextMeeting />
      </div>
    </section>
  )
}
