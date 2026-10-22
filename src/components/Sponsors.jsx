import { club, sponsors, tiers } from '../data.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

const mailto = `mailto:${club.email}?subject=${encodeURIComponent('Sponsoring the Engineering Club')}`

const tierRank = Object.fromEntries(tiers.map((t, i) => [t.id, i]))
const tierName = Object.fromEntries(tiers.map((t) => [t.id, t.name]))
const wall = [...sponsors].sort((a, b) => tierRank[a.tier] - tierRank[b.tier])

function SponsorTile({ s, i }) {
  const inner = (
    <>
      <span className="sponsor-tier">{tierName[s.tier]}</span>
      {s.logo
        ? <img src={`${import.meta.env.BASE_URL}${s.logo}`} alt={s.name} />
        : <span className="sponsor-name">{s.name}</span>}
    </>
  )
  const props = { className: `sponsor ${s.tier}`, style: { '--i': i } }
  return s.url ? (
    <a {...props} href={s.url} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div {...props}>{inner}</div>
  )
}

export default function Sponsors() {
  return (
    <Section
      id="sponsors"
      index="06"
      label="Sponsors"
      title="Thank you."
      sub="Sponsors pay for the parts, filament and tools behind every project here. Thank you to the businesses and families who keep the club free to join."
      className="dark"
    >
      <Reveal className="wall">
        {wall.length > 0
          ? wall.map((s, i) => <SponsorTile s={s} i={i} key={s.name} />)
          : <a className="sponsor open" href={mailto}>Your name here</a>}
      </Reveal>
      <Reveal className="sponsor-cta">
        <a className="btn light" href={mailto}>Become a sponsor <span className="arr" aria-hidden="true">→</span></a>
        <p>Email us and we'll send the details.</p>
      </Reveal>
    </Section>
  )
}
