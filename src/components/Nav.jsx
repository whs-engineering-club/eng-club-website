import { club, nav } from '../data.js'
import { useActiveSection, usePageProgress } from '../lib/hooks.js'

const ids = nav.map((n) => n.id)

export function Logo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 3v5M16 24v5M3 16h5M24 16h5M6.8 6.8l3.5 3.5M21.7 21.7l3.5 3.5M6.8 25.2l3.5-3.5M21.7 10.3l3.5-3.5" stroke="var(--accent)" strokeWidth="3" />
    </svg>
  )
}

export default function Nav() {
  usePageProgress()
  const active = useActiveSection(ids)
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#top"><Logo />{club.name}</a>
        <nav aria-label="Sections">
          <ul>
            {nav.filter((n) => n.id !== 'join').map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={active === n.id ? 'on' : undefined}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn primary small" href="#join">Join</a>
      </div>
      <span className="nav-progress" aria-hidden="true" />
    </header>
  )
}
