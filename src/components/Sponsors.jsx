import { club, sponsors, tiers } from '../data.js'

const mailto = `mailto:${club.email}?subject=${encodeURIComponent('Sponsoring the Engineering Club')}`

function SponsorTile({ s }) {
  const inner = s.logo ? (
    <img src={`${import.meta.env.BASE_URL}${s.logo}`} alt={s.name} />
  ) : (
    <span>{s.name}</span>
  )
  return s.url ? (
    <a className="sponsor" href={s.url} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div className="sponsor">{inner}</div>
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
      <div className="tiers">
        {tiers.map((t) => {
          const list = sponsors.filter((s) => s.tier === t.id)
          return (
            <article className={`tier ${t.id}`} key={t.id}>
              <div className="tier-info">
                <h3>{t.name}</h3>
                <p className="label price">{t.price}</p>
                <ul className="muted">
                  {t.perks.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
              <div className="tier-sponsors">
                {list.length > 0
                  ? list.map((s) => <SponsorTile s={s} key={s.name} />)
                  : <a className="sponsor open label" href={mailto}>Your name here</a>}
              </div>
            </article>
          )
        })}
      </div>
      <p className="sponsor-cta">
        <span className="muted">Interested in sponsoring? Email us and we'll send the details.</span>
        <a className="cta-link" href={mailto}>Become a sponsor →</a>
      </p>
    </section>
  )
}
