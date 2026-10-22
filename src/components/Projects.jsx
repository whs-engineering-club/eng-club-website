import { projects } from '../data.js'
import View from './View.jsx'
import Reveal from './Reveal.jsx'
import CountUp from './CountUp.jsx'

function onSpotlight(e) {
  const card = e.currentTarget
  const r = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${e.clientX - r.left}px`)
  card.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Projects() {
  return (
    <View id="projects" tag="B" title="Current projects" callout="View B · Fall 2026 build season">
      <div className="projects">
        {projects.map((p, i) => (
          <Reveal as="article" className="proj" key={p.title} delay={(i % 2) * 110} onPointerMove={onSpotlight}>
            <i className="c tl" />
            <i className="c tr" />
            <i className="c bl" />
            <i className="c br" />
            <div className="meta">
              <span>{p.area}</span>
              <span className={p.active ? 'status active' : 'status'}>{p.status}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <div className="progress">
              <div className="lab">
                <span>{p.progress.label}</span>
                <span>{p.progress.value}</span>
              </div>
              <div className="bar" style={{ '--p': p.progress.p }}><i /></div>
            </div>
            <div className="specs">
              {p.specs.map((s) => (
                <div className="spec" key={s.label}>
                  <b>{typeof s.value === 'number' ? <CountUp value={s.value} /> : s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </View>
  )
}
