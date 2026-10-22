import { events, weekly } from '../data.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const toDate = (iso) => new Date(`${iso}T00:00:00`)

function daysUntil(iso) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((toDate(iso) - today) / 86400000)
}

function soonLabel(days) {
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  return `In ${days} days`
}

export default function Schedule() {
  const nextIndex = events.findIndex((e) => daysUntil(e.date) >= 0)
  const todayShort = DAYS[new Date().getDay()]
  return (
    <section className="section" id="schedule">
      <SectionHead code="03" title="Schedule">
        <h2>Three sessions a week.</h2>
      </SectionHead>
      <div className="sched">
        <Reveal className="card week">
          <p className="mono-label">Weekly</p>
          <div className="week-grid">
            {WEEK.map((day) => {
              const slot = weekly.find((w) => w.short === day)
              return (
                <div key={day} className={day === todayShort ? 'week-day today' : 'week-day'}>
                  <span className="week-name">{day}</span>
                  {slot ? (
                    <div className="slot">
                      <b>{slot.what}</b>
                      {slot.time.split(' · ').map((part) => <span key={part}>{part}</span>)}
                    </div>
                  ) : (
                    <div className="slot empty" aria-label="No meeting" />
                  )}
                </div>
              )
            })}
          </div>
        </Reveal>
        <Reveal className="card upcoming" delay={120}>
          <p className="mono-label">Upcoming</p>
          <ul className="events">
            {events.map((e, i) => {
              const d = toDate(e.date)
              const days = daysUntil(e.date)
              return (
                <li key={e.date + e.title} className={[days < 0 && 'past', i === nextIndex && 'next'].filter(Boolean).join(' ') || undefined}>
                  <div className="ev-date">
                    <b>{String(d.getDate()).padStart(2, '0')}</b>
                    <span>{MONTHS[d.getMonth()]} · {DAYS[d.getDay()]}</span>
                  </div>
                  <div className="ev-main">
                    <span className="ev-title">{e.title}</span>
                    <span className="ev-note">{e.note}</span>
                  </div>
                  <span className={e.kind === 'Competition' ? 'chip hot' : 'chip'}>
                    {i === nextIndex ? soonLabel(days) : e.kind}
                  </span>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
