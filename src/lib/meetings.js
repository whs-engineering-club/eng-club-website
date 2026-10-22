import { club } from '../data.js'

const m = club.meetings
const DAY_MS = 86400000

// Start time of the n-th meeting (n = 0 is firstDate), in local time.
function meetingStart(n) {
  const [y, mo, d] = m.firstDate.split('-').map(Number)
  return new Date(y, mo - 1, d + n * m.everyDays, m.hour, m.minute)
}

const isoDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

// The next `count` meetings that haven't ended yet, skipping dates in `skip`.
export function upcomingMeetings(now, count) {
  const out = []
  const first = meetingStart(0)
  let n = Math.max(0, Math.floor((now - first) / (m.everyDays * DAY_MS)) - 1)
  while (out.length < count && n < 1000) {
    const start = meetingStart(n++)
    const end = new Date(start.getTime() + m.durationMinutes * 60000)
    if (end <= now || m.skip.includes(isoDate(start))) continue
    out.push({ start, end, iso: isoDate(start), where: m.where })
  }
  return out
}

export { isoDate }
