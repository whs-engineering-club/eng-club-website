import { club, nav } from '../data.js'
import { useActiveSection, usePageProgress } from '../lib/hooks.js'

const ids = nav.map((n) => n.id)

export function Logo() {
  return <img className="logo" src={`${import.meta.env.BASE_URL}logo.png`} alt="" width="583" height="494" />
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
