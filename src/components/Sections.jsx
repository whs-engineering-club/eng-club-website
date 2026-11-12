// The page below the hero. Content comes from the season plan in data.js: one hands-on
// build per meeting, each in a different field of engineering, every other Wednesday.
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import NumberFlow from '@number-flow/react'
import { Reveal } from '../lib/boot.jsx'
import { asset, instagramHandle, logoSrc, mailto, sponsorMailto, sponsorWall, useCopy, useNextMeeting, useNow } from '../lib/content.js'
import { seasonAt } from '../lib/season.js'
import { cancelFaq, club, clubNumbers, faq, fields, joinSteps, plan } from '../data.js'

const fmtDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

export function useSeason() {
  const now = useNow(60000)
  return seasonAt(now)
}

export function Nav({ blend = false }) {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`bn-nav${blend ? ' blend' : solid ? ' solid' : ''}`}>
      <a href="#top" className="bn-brand"><img src={logoSrc} alt="" /> WHS Engineering Club</a>
      <nav aria-label="Sections">
        <a href="#what">What we do</a><a href="#projects">Builds</a><a href="#schedule">Season</a><a href="#sponsors">Sponsors</a><a href="#contact">Contact</a>
      </nav>
      <a href="#join" className="bn-pill">Join</a>
    </header>
  )
}

export function HeroCopy({ style }) {
  return (
    <motion.div className="bn-copy" style={style}>
      <h1>Engineering,<br /><span>learned by building.</span></h1>
      <p>Every other Wednesday we take on a different kind of engineering: circuits, bridges, rockets, code, chemistry. Materials are on the club and no experience is needed.</p>
      <div className="bn-ctas">
        <a className="bn-btn" href="#join">Join the club</a>
        <a className="bn-btn ghost" href="#schedule">See the season</a>
      </div>
    </motion.div>
  )
}

export function Countdown() {
  const m = useNextMeeting()
  const { next, done } = useSeason()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  if (!m) return null
  const p = inView ? m.parts : { d: 0, h: 0, m: 0, s: 0 }
  return (
    <section className="bn-count" ref={ref} aria-label="Next meeting">
      <div className="bn-wrap bn-count-grid">
        <div className="bn-count-label">
          <small>{m.live ? 'Happening now' : 'Next meeting'} · {next && !done ? next.field : 'Season wrap-up'}</small>
          <strong>{next && !done ? next.title : 'Club meeting'}</strong>
          <span>{m.longDate} · {m.timeLabel} · {m.where}</span>
        </div>
        {m.live ? (
          <p className="bn-live"><i /> Walk in. We're in {m.where}.</p>
        ) : (
          <div className="bn-digits" aria-label={`${m.parts.d} days ${m.parts.h} hours ${m.parts.m} minutes`}>
            {[['d', 'Days'], ['h', 'Hours'], ['m', 'Minutes'], ['s', 'Seconds']].map(([k, label]) => (
              <div key={k}>
                <NumberFlow value={p[k]} format={{ minimumIntegerDigits: 2 }} className="bn-flow" />
                <small>{label}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const stats = [
    { v: 0, prefix: '$', k: 'Dues to join' },
    { v: clubNumbers.members, suffix: '+', k: 'Members' },
    { v: fields.length, k: 'Fields of engineering' },
    { v: clubNumbers.opportunities, suffix: '+', k: 'STEM opportunities found' },
  ]
  return (
    <section className="bn-stats" ref={ref}>
      <div className="bn-wrap bn-stats-grid">
        {stats.map((s) => (
          <div key={s.k}>
            <NumberFlow value={inView ? s.v : 0} prefix={s.prefix} suffix={s.suffix} className="bn-stat-n" />
            <small>{s.k}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

function SeasonRow({ it }) {
  return (
    <li className={`bn-srow ${it.status}${it.buffer ? ' buffer' : ''}`}>
      <span className="bn-snum">{String(it.index + 1).padStart(2, '0')}</span>
      <span className="bn-sfield">{it.field}</span>
      <span className="bn-stitle"><strong>{it.title}</strong><small>{it.text}</small></span>
      <span className="bn-swhen">
        {it.status === 'done' ? 'Done' : it.status === 'next' ? (it.inDays <= 0 ? 'Today' : it.inDays === 1 ? 'Tomorrow' : `Next · ${fmtDate(it.date)}`) : it.date ? `~ ${fmtDate(it.date)}` : 'TBD'}
      </span>
    </li>
  )
}

export function Season() {
  const { items, held } = useSeason()
  const [all, setAll] = useState(false)
  const shown = all ? items : items.slice(held, held + 5)
  return (
    <section className="bn-sec" id="schedule">
      <div className="bn-wrap bn-two">
        <div>
          <h2 className="bn-h2">The season.</h2>
          <p className="bn-sub">{plan.length} meetings, every other Wednesday, {club.meetings.time} in {club.meetings.where}.</p>
          <p className="bn-sub">Not every meeting happens. When one is cancelled, the plan slides to the next date, and two buffer days keep the season on track. Dates marked ~ move with it.</p>
        </div>
        <div>
          <ol className="bn-season">{shown.map((it) => <SeasonRow key={it.index} it={it} />)}</ol>
          <button type="button" className="bn-more" aria-expanded={all} onClick={() => setAll(!all)}>
            {all ? 'Show less' : `Show the full season (${plan.length} meetings)`}
          </button>
        </div>
      </div>
    </section>
  )
}

export function Join() {
  return (
    <section className="bn-sec" id="join">
      <div className="bn-wrap">
        <h2 className="bn-h2">It takes one meeting.</h2>
        <ol className="bn-steps">
          {joinSteps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <a className="bn-btn" href={club.interestForm} target="_blank" rel="noopener noreferrer">Fill out the interest form</a>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section className="bn-sec" id="faq">
      <div className="bn-wrap bn-two">
        <h2 className="bn-h2">Good to know.</h2>
        <div className="bn-faq">
          {[...faq, cancelFaq].map((f) => (
            <details key={f.q}><summary>{f.q}<i aria-hidden="true" /></summary><p>{f.a}</p></details>
          ))}
        </div>
      </div>
    </section>
  )
}

// Infinite marquee: two identical groups translate -50% on a linear loop, so the seam never
// shows. Pauses under a fine pointer; wraps into a static row for reduced motion.
export function Sponsors() {
  const row = [...sponsorWall, ...sponsorWall]
  return (
    <section className="bn-sponsors" id="sponsors">
      <div className="bn-wrap bn-sponsors-head">
        <h2 className="bn-h2">Backed by people who build.</h2>
        <a className="bn-btn ghost" href={sponsorMailto}>Become a sponsor</a>
      </div>
      <div className="bn-marquee" aria-label="Our sponsors">
        <div className="bn-track">
          {[0, 1].map((c) => (
            <div key={c} className="bn-group" aria-hidden={c === 1 || undefined}>
              {row.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" tabIndex={c || i >= sponsorWall.length ? -1 : undefined}>
                  {s.logo ? <img src={asset(s.logo)} alt={s.name} /> : <span>{s.name}</span>}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const [copied, copy] = useCopy()
  return (
    <footer className="bn-contact" id="contact">
      <div className="bn-wrap">
        <div className="bn-contact-top">
          <h2>Your next build starts on a Wednesday.</h2>
          <div>
            <p>Questions about meetings, the season plan or sponsoring a build? The officers check this inbox every week.</p>
            <div className="bn-mail">
              <a href={mailto}>{club.email}</a>
              <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
            </div>
          </div>
        </div>
        <div className="bn-foot">
          <span className="bn-brand"><img src={logoSrc} alt="" /> WHS Engineering Club</span>
          <span>{club.meetings.where}<br />Every other Wednesday, {club.meetings.time}</span>
          <span><a href={club.instagram} target="_blank" rel="noopener noreferrer">{instagramHandle}</a><br />{club.year}</span>
        </div>
      </div>
    </footer>
  )
}
