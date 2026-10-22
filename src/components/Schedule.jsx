import { events, weekly } from '../data.js'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
  return (
    <section className="block" id="schedule">
      <div className="block-head">
        <p className="label">Schedule</p>
        <h2>When we meet</h2>
      </div>
      <dl className="weekly">
        {weekly.map((w) => (
          <div key={w.day}>
            <dt>{w.day}</dt>
            <dd className="label">{w.time}</dd>
            <dd className="muted">{w.text}</dd>
          </div>
        ))}
      </dl>
      <ul className="events">
        {events.map((e, i) => {
          const d = toDate(e.date)
          const days = daysUntil(e.date)
          return (
            <li key={e.date + e.title} className={days < 0 ? 'past' : undefined}>
              <span className="ev-date label">{MONTHS[d.getMonth()]} {d.getDate()} · {DAYS[d.getDay()]}</span>
              <span className="ev-main">
                <span className="ev-title">{e.title}</span>
                <span className="muted">{e.note}</span>
              </span>
              <span className="ev-kind label">
                {i === nextIndex ? <b>{soonLabel(days)}</b> : e.kind}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
