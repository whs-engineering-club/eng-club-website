import { events, weekly } from '../data.js'
import View from './View.jsx'
import Reveal from './Reveal.jsx'

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
  return `Next up · in ${days} days`
}

export default function Schedule() {
  const nextIndex = events.findIndex((e) => daysUntil(e.date) >= 0)
  return (
    <View id="schedule" tag="C" title="Schedule" callout="View C · Weekly + upcoming">
      <Reveal className="weekly">
        {weekly.map((w) => (
          <div className="slot" key={w.day}>
            <div className="day">{w.day}</div>
            <div className="time">{w.time}</div>
            <p>{w.text}</p>
          </div>
        ))}
      </Reveal>
      <Reveal as="ul" className="events">
        {events.map((e, i) => {
          const d = toDate(e.date)
          const days = daysUntil(e.date)
          return (
            <li className="ev" key={e.date + e.title} style={days < 0 ? { opacity: 0.5 } : undefined}>
              <div className="date">
                <b>{String(d.getDate()).padStart(2, '0')}</b>
                {MONTHS[d.getMonth()]} · {DAYS[d.getDay()]}
              </div>
              <div>
                <div className="what">{e.title}</div>
                <div className="note">{e.note}</div>
                {i === nextIndex && <span className="soon">{soonLabel(days)}</span>}
              </div>
              <span className={e.kind === 'Competition' ? 'kind comp' : 'kind'}>{e.kind}</span>
            </li>
          )
        })}
      </Reveal>
    </View>
  )
}
