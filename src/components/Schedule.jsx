import { club, events } from '../data.js'
import { useNow, useScrollProgress } from '../lib/hooks.js'
import { upcomingMeetings } from '../lib/meetings.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

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

// Every-other-Wednesday meeting dates, each with whatever is planned for it. The line
// down the left fills in as you scroll through the list.
export default function Schedule() {
  const now = useNow(60000)
  const meetings = upcomingMeetings(now, 6)
  const ref = useScrollProgress()
  return (
    <Section
      id="schedule"
      title="Every other Wednesday."
      sub={`${club.meetings.time} in ${club.meetings.where}. Here's what's coming up.`}
    >
      <div className="timeline" ref={ref}>
        <span className="tl-track" aria-hidden="true"><span className="tl-fill" /></span>
        <ol>
          {meetings.map((m, i) => {
            const ev = events.find((e) => e.date === m.iso)
            return (
              <Reveal as="li" key={m.iso} className={i === 0 ? 'tl-item next' : 'tl-item'} data-step="">
                <span className="tl-node" aria-hidden="true" />
                <div className="tl-date">
                  <b>{m.start.getDate()}</b>
                  <span>{MONTHS[m.start.getMonth()]} · {DAYS[m.start.getDay()]}</span>
                </div>
                <div className="tl-main">
                  {i === 0 && <span className="tl-next">Next · {soonLabel(daysBetween(now, m.start))}</span>}
                  <h3>{ev ? ev.title : 'Club meeting'}</h3>
                  <p>{ev ? ev.note : 'Project work time and planning. Agenda posted closer to the date.'}</p>
                </div>
                <span className="tl-kind">{ev ? ev.kind : 'Meeting'}</span>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
