import { club, sponsors, tiers } from '../data.js'

const mailto = `mailto:${club.email}?subject=${encodeURIComponent('Sponsoring the Engineering Club')}`

const tierRank = Object.fromEntries(tiers.map((t, i) => [t.id, i]))
const tierName = Object.fromEntries(tiers.map((t) => [t.id, t.name]))
const wall = [...sponsors].sort((a, b) => tierRank[a.tier] - tierRank[b.tier])

function SponsorTile({ s }) {
  const inner = (
    <>
      {s.logo ? <img src={`${import.meta.env.BASE_URL}${s.logo}`} alt={s.name} /> : <span className="sponsor-name">{s.name}</span>}
      <span className="label sponsor-tier">{tierName[s.tier]}</span>
    </>
  )
  const cls = `sponsor ${s.tier}`
  return s.url ? (
    <a className={cls} href={s.url} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

export default function Sponsors() {
  return (
    <section className="block" id="sponsors">
      <div className="block-head">
        <p className="label">Sponsors</p>
        <h2>Thank you.</h2>
        <p className="muted lede">
          Sponsors pay for the parts, filament and tools behind every project here. Thank you to the
          businesses and families who keep the club free to join.
        </p>
      </div>

      <div className="wall">
        {wall.length > 0
          ? wall.map((s) => <SponsorTile s={s} key={s.name} />)
          : <a className="sponsor open label" href={mailto}>Your name here</a>}
      </div>

      <div className="tiers-head">
        <p className="label">Sponsorship levels</p>
      </div>
      <div className="tiers">
        {tiers.map((t) => (
          <article className="tier" key={t.id}>
            <h3>{t.name}</h3>
            <p className="label price">{t.price}</p>
            <ul className="muted">
              {t.perks.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <div className="sponsor-cta">
        <a className="cta-btn" href={mailto}>Become a sponsor →</a>
        <p className="muted">Email us and we'll send the details.</p>
      </div>
    </section>
  )
}
