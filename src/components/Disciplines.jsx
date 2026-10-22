import { useState } from 'react'
import { disciplines } from '../data.js'
import { useScrollProgress } from '../lib/hooks.js'

// Pinned section that steps through the disciplines one at a time as you scroll.
export default function Disciplines() {
  const [active, setActive] = useState(0)
  const ref = useScrollProgress({
    onChange: (p) => setActive(Math.min(disciplines.length - 1, Math.floor(p * disciplines.length))),
  })
  return (
    <section className="disciplines" id="what" ref={ref} style={{ '--count': disciplines.length }}>
      <div className="pin">
        <div className="disc-head">
          <p className="label">What we do</p>
          <p className="label count">{active + 1} / {disciplines.length}</p>
        </div>
        <div className="disc-body">
          <ul className="disc-names">
            {disciplines.map((d, i) => (
              <li key={d.name} className={i === active ? 'on' : undefined}>{d.name}</li>
            ))}
          </ul>
          <div className="disc-text">
            {disciplines.map((d, i) => (
              <p key={d.name} className={i === active ? 'on' : undefined}>
                <span className="disc-name-sm">{d.name}</span>
                {d.text}
              </p>
            ))}
          </div>
        </div>
        <div className="disc-bar" aria-hidden="true"><i /></div>
      </div>
    </section>
  )
}
