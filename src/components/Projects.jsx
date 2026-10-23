import { projects } from '../data.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Fall 2026 build season."
      sub="Three teams, one shop. Sit in with any of them at a meeting."
    >
      <div className="projects">
        {projects.map((p, i) => (
          <Reveal as="article" className="proj" key={p.title} delay={i * 60}>
            <div className="proj-copy">
              <div className="proj-top">
                <span className="label">{p.area}</span>
                <span className={p.active ? 'status live' : 'status'}>
                  <span className="dot" aria-hidden="true" />{p.status}
                </span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
            <div className="proj-data">
              <div className="meter">
                <div className="meter-lab"><span>{p.progress.label}</span><span>{p.progress.value}</span></div>
                <div className="bar"><i style={{ '--v': p.progress.p }} /></div>
              </div>
              <dl className="specs">
                {p.specs.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
