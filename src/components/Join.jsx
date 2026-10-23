import { club, steps } from '../data.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

// Steps joined by a line that draws across when the row scrolls into view.
export default function Join() {
  return (
    <Section id="join" title="It takes one meeting.">
      <Reveal as="ol" className="steps">
        {steps.map((s, i) => (
          <li key={s.title} style={{ '--i': i }}>
            <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </Reveal>
      <Reveal className="join-cta">
        <a className="btn primary" href={club.interestForm} target="_blank" rel="noopener noreferrer">
          Fill out the interest form <span className="arr" aria-hidden="true">↗</span>
        </a>
        <p>Takes a minute. You can also just show up to a meeting.</p>
      </Reveal>
    </Section>
  )
}
