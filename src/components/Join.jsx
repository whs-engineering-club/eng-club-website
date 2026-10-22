import { steps } from '../data.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

// Steps connected by a trace that draws across when the row scrolls into view.
export default function Join() {
  return (
    <section className="section" id="join">
      <SectionHead code="04" title="How to join">
        <h2>It takes one meeting.</h2>
      </SectionHead>
      <Reveal as="ol" className="steps">
        <span className="steps-trace" aria-hidden="true" />
        {steps.map((s, i) => (
          <li key={s.title} style={{ '--i': i }}>
            <span className="node" aria-hidden="true">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </Reveal>
    </section>
  )
}
