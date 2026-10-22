import { club, nav } from '../data.js'
import { usePageProgress } from '../lib/hooks.js'

function Logo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2l12 7v14l-12 7-12-7V9z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 16h4l2-4 2 8 2-4h2" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  usePageProgress()
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top"><Logo />{club.name}</a>
        <nav aria-label="Sections">
          <ul>
            {nav.filter((n) => n.id !== 'join').map((n) => (
              <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <a className="btn primary small" href="#join">Join</a>
      </div>
      <span className="nav-progress" aria-hidden="true" />
    </header>
  )
}
