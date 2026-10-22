import { club, events } from '../data.js'
import { useNow } from '../lib/hooks.js'
import { upcomingMeetings } from '../lib/meetings.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_MS = 86400000

function daysBetween(now, date) {
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)
  const day = new Date(date)
  day.setHours(0, 0, 0, 0)
  return Math.round((day - today) / DAY_MS)
}

function soonLabel(days) {
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  return `In ${days} days`
}

// Every-other-Wednesday meeting dates, each with whatever is planned for it.
export default function Schedule() {
  const now = useNow(60000)
  const meetings = upcomingMeetings(now, 6)
  return (
    <section className="section" id="schedule">
      <SectionHead code="03" title="Schedule">
        <h2>Every other Wednesday.</h2>
        <p className="section-sub">{club.meetings.time} in {club.meetings.where}. Here's what's coming up.</p>
      </SectionHead>
      <Reveal className="card upcoming">
        <ul className="events">
          {meetings.map((m, i) => {
            const ev = events.find((e) => e.date === m.iso)
            const days = daysBetween(now, m.start)
            return (
              <li key={m.iso} className={i === 0 ? 'next' : undefined}>
                <div className="ev-date">
                  <b>{String(m.start.getDate()).padStart(2, '0')}</b>
                  <span>{MONTHS[m.start.getMonth()]} · {DAYS[m.start.getDay()]}</span>
                </div>
                <div className="ev-main">
                  <span className="ev-title">{ev ? ev.title : 'Club meeting'}</span>
                  <span className="ev-note">{ev ? ev.note : 'Project work time and planning. Agenda posted closer to the date.'}</span>
                </div>
                <span className={ev?.kind === 'Competition' ? 'chip hot' : 'chip'}>
                  {i === 0 ? soonLabel(days) : ev ? ev.kind : 'Meeting'}
                </span>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </section>
  )
}
