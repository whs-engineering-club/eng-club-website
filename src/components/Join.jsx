import { steps } from '../data.js'
import { useScrollProgress } from '../lib/hooks.js'

// A line draws down the steps as the section scrolls through the screen.
export default function Join() {
  const ref = useScrollProgress({ mode: 'pass' })
  return (
    <section className="block join" id="join" ref={ref}>
      <div className="block-head">
        <p className="label">How to join</p>
        <h2>It takes one meeting.</h2>
      </div>
      <ol className="steps" style={{ '--n': steps.length }}>
        <span className="steps-line" aria-hidden="true"><i /></span>
        {steps.map((s, i) => (
          <li key={s.title} style={{ '--i': i }}>
            <span className="dot" aria-hidden="true" />
            <h3>{s.title}</h3>
            <p className="muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
