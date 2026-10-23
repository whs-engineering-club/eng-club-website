import { club, sponsors, tiers } from '../data.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

const mailto = `mailto:${club.email}?subject=${encodeURIComponent('Sponsoring the Engineering Club')}`

const tierRank = Object.fromEntries(tiers.map((t, i) => [t.id, i]))
const wall = [...sponsors].sort((a, b) => tierRank[a.tier] - tierRank[b.tier])
// Repeated so one group is wider than a wide screen; the track then shows two copies of the group.
const group = Array.from({ length: Math.max(1, Math.ceil(8 / Math.max(1, wall.length))) }, () => wall).flat()

function SponsorTile({ s, copy }) {
  const inner = s.logo
    ? <img src={`${import.meta.env.BASE_URL}${s.logo}`} alt={s.name} />
    : <span className="sponsor-name">{s.name}</span>
  const hidden = copy ? { 'aria-hidden': true, tabIndex: -1 } : {}
  return s.url ? (
    <a className="sponsor" href={s.url} target="_blank" rel="noopener noreferrer" {...hidden}>{inner}</a>
  ) : (
    <div className="sponsor" {...(copy ? { 'aria-hidden': true } : {})}>{inner}</div>
  )
}

export default function Sponsors() {
  return (
    <Section
      id="sponsors"
      title="Thank you."
      sub="Sponsors pay for the parts, filament and tools behind every project here. Thank you to the businesses and families who keep the club free to join."
      className="dark"
    >
      {wall.length > 0 ? (
        <Reveal className="marquee" aria-label="Our sponsors">
          <div className="marquee-track">
            {[false, true].map((copy) => (
              <div className="marquee-group" key={copy ? 'b' : 'a'} aria-hidden={copy || undefined}>
                {group.map((s, i) => <SponsorTile s={s} copy={copy || i >= wall.length} key={`${s.name}-${i}`} />)}
              </div>
            ))}
          </div>
        </Reveal>
      ) : (
        <Reveal>
          <a className="sponsor open" href={mailto}>Your name here</a>
        </Reveal>
      )}
      <Reveal className="sponsor-cta">
        <a className="btn light" href={mailto}>Become a sponsor <span className="arr" aria-hidden="true">→</span></a>
        <p>Email us and we'll send the details.</p>
      </Reveal>
    </Section>
  )
}
