import { projects } from '../data.js'
import { trackPointer } from '../lib/hooks.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function Projects() {
  return (
    <section className="section" id="projects">
      <SectionHead code="02" title="Current projects">
        <h2>Fall 2026 build season.</h2>
        <p className="section-sub">Three teams, one shop. Sit in with any of them at a meeting.</p>
      </SectionHead>
      <div className="proj-grid">
        {projects.map((p, i) => (
          <Reveal as="article" className="card proj glow-card" key={p.title} delay={i * 90} onPointerMove={trackPointer}>
            <div className="proj-top">
              <span className="mono-label">{p.area}</span>
              <span className={p.active ? 'status live' : 'status'}>
                <span className={p.active ? 'led on' : 'led amber'} aria-hidden="true" />
                {p.status}
              </span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <div className="meter">
              <div className="meter-lab"><span>{p.progress.label}</span><span>{p.progress.value}</span></div>
              <div className="meter-bar"><i style={{ '--v': p.progress.p }} /></div>
            </div>
            <dl className="specs">
              {p.specs.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
