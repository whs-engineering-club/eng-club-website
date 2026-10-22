import { club } from '../data.js'
import { useNow } from '../lib/hooks.js'
import { upcomingMeetings } from '../lib/meetings.js'

function pad(n) {
  return String(n).padStart(2, '0')
}

// Spec strip under the hero: when and where the next meeting is, with a live countdown.
export default function NextMeeting() {
  const now = useNow(1000)
  const [m] = upcomingMeetings(now, 1)
  if (!m) return null
  const live = m.start <= now
  const ms = Math.max(0, m.start - now)
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const min = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const date = m.start.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  const time = m.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  return (
    <dl className="strip">
      <div>
        <dt>Next meeting</dt>
        <dd>{date} · {time}</dd>
      </div>
      <div>
        <dt>Location</dt>
        <dd>{m.where}</dd>
      </div>
      <div>
        <dt>{live ? 'Status' : 'Starts in'}</dt>
        {live ? (
          <dd className="live"><span className="dot" aria-hidden="true" />Happening now. Walk in.</dd>
        ) : (
          <dd className="count" aria-label={`${d} days ${h} hours ${min} minutes`}>
            {pad(d)}<i>d</i> {pad(h)}<i>h</i> {pad(min)}<i>m</i> {pad(s)}<i>s</i>
          </dd>
        )}
      </div>
      <div>
        <dt>Dues</dt>
        <dd>{club.dues}. Every other Wednesday.</dd>
      </div>
    </dl>
  )
}
