import { club, nav } from '../data.js'
import { useScrollSpy } from '../lib/hooks.js'
import GearLogo from './GearLogo.jsx'

const ids = nav.map((n) => n.id)

export default function Nav() {
  const { active, progress } = useScrollSpy(ids)
  return (
    <>
      <div className="ruler" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
      <header className="nav">
        <div className="wrap">
          <a className="brand" href="#top" aria-label={`${club.name} home`}>
            <GearLogo />
            {club.name}
          </a>
          <nav aria-label="Sections">
            <ul>
              {nav.map((n, i) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className={i === active ? 'on' : undefined}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
