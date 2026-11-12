// Shared helpers for components: derived club values, asset paths, and small React hooks.
import { useEffect, useState } from 'react'
import { club, sponsors, tiers } from '../data.js'
import { upcomingMeetings } from './meetings.js'

export const BASE = import.meta.env.BASE_URL
export const asset = (path) => `${BASE}${path}`
export const logoSrc = asset('logo.png')

export const sponsorMailto = `mailto:${club.email}?subject=${encodeURIComponent('Sponsoring the Engineering Club')}`
export const mailto = `mailto:${club.email}`
export const instagramHandle = '@' + club.instagram.replace(/\/$/, '').split('/').pop()

const tierRank = Object.fromEntries(tiers.map((t, i) => [t.id, i]))
export const sponsorWall = [...sponsors].sort((a, b) => tierRank[a.tier] - tierRank[b.tier])

export function useNow(ms = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), ms)
    return () => clearInterval(id)
  }, [ms])
  return now
}

const DAY_MS = 86400000
const pad = (n) => String(n).padStart(2, '0')

function dayDiff(now, date) {
  const a = new Date(now); a.setHours(0, 0, 0, 0)
  const b = new Date(date); b.setHours(0, 0, 0, 0)
  return Math.round((b - a) / DAY_MS)
}


// The next meeting with a live countdown.
export function useNextMeeting(tick = 1000) {
  const now = useNow(tick)
  const [m] = upcomingMeetings(now, 1)
  if (!m) return null
  const live = m.start <= now
  const ms = Math.max(0, m.start - now)
  const parts = {
    d: Math.floor(ms / DAY_MS),
    h: Math.floor((ms % DAY_MS) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
  }
  return {
    ...m,
    live,
    parts,
    padded: { d: pad(parts.d), h: pad(parts.h), m: pad(parts.m), s: pad(parts.s) },
    dateLabel: m.start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    longDate: m.start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    timeLabel: m.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    inDays: dayDiff(now, m.start),
  }
}


// Copy the club email, with a short-lived confirmation state.
export function useCopy() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(id)
  }, [copied])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(club.email)
      setCopied(true)
    } catch {
      window.location.href = mailto
    }
  }
  return [copied, copy]
}
