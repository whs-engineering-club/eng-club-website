import { club, sponsors, tiers } from '../data.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const mailto = `mailto:${club.email}?subject=${encodeURIComponent('Sponsoring the Engineering Club')}`

const tierRank = Object.fromEntries(tiers.map((t, i) => [t.id, i]))
const tierName = Object.fromEntries(tiers.map((t) => [t.id, t.name]))
const wall = [...sponsors].sort((a, b) => tierRank[a.tier] - tierRank[b.tier])

function SponsorTile({ s }) {
  const inner = (
    <>
      {s.logo ? <img src={`${import.meta.env.BASE_URL}${s.logo}`} alt={s.name} /> : <span className="sponsor-name">{s.name}</span>}
      <span className="mono-label sponsor-tier">{tierName[s.tier]}</span>
    </>
  )
  const cls = `card sponsor ${s.tier}`
  return s.url ? (
    <a className={cls} href={s.url} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

export default function Sponsors() {
  return (
    <section className="section" id="sponsors">
      <SectionHead code="06" title="Sponsors">
        <h2>Thank you.</h2>
        <p className="section-sub">
          Sponsors pay for the parts, filament and tools behind every project here. Thank you to the
          businesses and families who keep the club free to join.
        </p>
      </SectionHead>

      <Reveal className="wall">
        {wall.length > 0
          ? wall.map((s) => <SponsorTile s={s} key={s.name} />)
          : <a className="card sponsor open mono-label" href={mailto}>Your name here</a>}
      </Reveal>

      <div className="tiers-head">
        <p className="mono-label">Sponsorship levels</p>
      </div>
      <div className="tiers">
        {tiers.map((t, i) => (
          <Reveal as="article" className={`card tier ${t.id}`} key={t.id} delay={i * 80}>
            <h3>{t.name}</h3>
            <p className="price">{t.price}</p>
            <ul>
              {t.perks.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="sponsor-cta">
        <a className="btn primary" href={mailto}>Become a sponsor →</a>
        <p>Email us and we'll send the details.</p>
      </div>
    </section>
  )
}
