import { club, nav } from '../data.js'
import { usePageProgress } from '../lib/hooks.js'

export default function Nav() {
  usePageProgress()
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top">{club.name}</a>
        <nav aria-label="Sections">
          <ul>
            {nav.map((n) => (
              <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <span className="nav-progress" aria-hidden="true" />
    </header>
  )
}
