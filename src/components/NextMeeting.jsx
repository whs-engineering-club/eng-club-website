import { useNow } from '../lib/hooks.js'
import { upcomingMeetings } from '../lib/meetings.js'

function pad(n) {
  return String(n).padStart(2, '0')
}

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
  const date = m.start.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })
  const time = m.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="panel next">
      <div className="panel-top">
        <span className="mono-label">{live ? 'Meeting in progress' : 'Next meeting'}</span>
        <span className={live ? 'led on' : 'led'} aria-hidden="true" />
      </div>
      {live ? (
        <p className="next-live">Happening now in {m.where}. Walk in.</p>
      ) : (
        <div className="countdown" aria-label={`Starts in ${d} days ${h} hours ${min} minutes`}>
          {[[d, 'days'], [h, 'hrs'], [min, 'min'], [s, 'sec']].map(([v, u]) => (
            <div key={u}><b>{pad(v)}</b><span>{u}</span></div>
          ))}
        </div>
      )}
      <div className="next-meta">
        <span>{date} · {time}</span>
        <span>{m.where}</span>
      </div>
    </div>
  )
}
