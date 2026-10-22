import { disciplines } from '../data.js'
import { trackPointer } from '../lib/hooks.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const icons = [
  <>
    <rect x="6" y="14" width="28" height="18" rx="2" />
    <circle cx="14" cy="23" r="4" />
    <circle cx="26" cy="23" r="4" />
    <path d="M14 14V8h12v6M20 8V4" />
  </>,
  <>
    <rect x="11" y="11" width="18" height="18" rx="1" />
    <path d="M15 11V5M20 11V5M25 11V5M15 35v-6M20 35v-6M25 35v-6M11 15H5M11 20H5M11 25H5M35 15h-6M35 20h-6M35 25h-6" />
  </>,
  <>
    <path d="M20 5l13 7.5v15L20 35 7 27.5v-15z" />
    <path d="M7 12.5L20 20l13-7.5M20 20v15" />
  </>,
  <>
    <path d="M4 30h32M8 30l6-12h12l6 12M14 18l6 12 6-12" />
    <path d="M20 6v6" />
  </>,
]

export default function Disciplines() {
  return (
    <section className="section" id="what">
      <SectionHead code="01" title="What we do">
        <h2>Four ways to get your hands dirty.</h2>
      </SectionHead>
      <div className="disc-grid">
        {disciplines.map((d, i) => (
          <Reveal as="article" className="card disc glow-card" key={d.name} delay={i * 90} onPointerMove={trackPointer}>
            <svg className="disc-icon" viewBox="0 0 40 40" aria-hidden="true">{icons[i]}</svg>
            <h3>{d.name}</h3>
            <p>{d.text}</p>
            <ul className="tags">
              {d.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
