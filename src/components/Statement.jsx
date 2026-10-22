import { statement } from '../data.js'
import { useScrollProgress } from '../lib/hooks.js'

// Words fill in from faint to solid as the section scrolls past.
export default function Statement() {
  const ref = useScrollProgress()
  const words = statement.split(' ')
  return (
    <section className="statement" ref={ref} aria-label="About the club">
      <div className="pin">
        <p className="words" style={{ '--n': words.length }}>
          {words.map((w, i) => (
            <span key={i} style={{ '--i': i }}>{w} </span>
          ))}
        </p>
      </div>
    </section>
  )
}
