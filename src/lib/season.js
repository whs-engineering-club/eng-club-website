// Pairs the season plan with real meeting dates. See the note above `plan` in data.js.
import { club, plan } from '../data.js'

const DAY_MS = 86400000
const m = club.meetings
const start = (n) => { const [y, mo, d] = m.firstDate.split('-').map(Number); return new Date(y, mo - 1, d + n * m.everyDays, m.hour, m.minute) }
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/**
 * Pairs the plan with real meeting dates. Meetings that already ended (and weren't skipped)
 * count as held; each upcoming meeting date takes the next activity in order.
 * Returns every plan item with a status of 'done' | 'next' | 'upcoming' and, for the rest,
 * its planned date.
 */
export function seasonAt(now) {
  let held = 0
  const upcoming = []
  for (let n = 0; n < 200 && upcoming.length < plan.length; n++) {
    const s = start(n)
    if (m.skip.includes(iso(s))) continue
    const end = new Date(s.getTime() + m.durationMinutes * 60000)
    if (end <= now) held++
    else upcoming.push(s)
  }
  const items = plan.map((p, i) => {
    const k = i - held
    const date = k >= 0 ? upcoming[k] : null
    return {
      ...p,
      index: i,
      status: i < held ? 'done' : i === held ? 'next' : 'upcoming',
      date,
      inMeetings: k,
      inDays: date ? Math.round((new Date(date).setHours(0, 0, 0, 0) - new Date(now).setHours(0, 0, 0, 0)) / DAY_MS) : null,
    }
  })
  return { items, held, next: items[held] || null, done: held >= plan.length }
}
