import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'motion/react'
import { gearProfile } from '../lib/gear.js'

// Opening sequence: the gear outline draws while a counter runs to 100, then the overlay lifts
// like a sheet of drafting film. Skipped by any key, wheel, touch or the Skip button, and never
// shown with reduced motion or when the visitor arrives on a section link (`skip`).
const INTRO_MS = 1500
const outline = (() => {
  const pts = gearProfile(14).map(([x, y]) => [60 + x * 46, 60 - y * 46])
  return `M${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L')}Z`
})()

export default function Intro({ onDone, skip = false }) {
  const off = useReducedMotion() || skip
  const ref = useRef(null)
  const countRef = useRef(null)
  const pathRef = useRef(null)
  const skipRef = useRef(() => {})
  const [gone, setGone] = useState(off)

  useEffect(() => {
    if (off) { onDone(); return }
    const root = document.documentElement
    root.style.overflow = 'hidden'
    let finished = false
    let counter = null
    const finish = (fast) => {
      if (finished) return
      finished = true
      counter?.stop()
      root.style.overflow = ''
      onDone()
      // A curtain is on-screen movement: strong ease-in-out, shorter when the visitor skips.
      animate(ref.current, { clipPath: ['inset(0 0 0% 0)', 'inset(0 0 100% 0)'] }, { duration: fast ? 0.45 : 0.75, ease: [0.77, 0, 0.175, 1] })
        .then(() => setGone(true))
    }
    skipRef.current = () => finish(true)
    counter = animate(0, 100, {
      duration: INTRO_MS / 1000, ease: [0.23, 1, 0.32, 1],
      onUpdate: (n) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(n)).padStart(3, '0')
        if (pathRef.current) pathRef.current.style.strokeDashoffset = String(1 - n / 100)
      },
      onComplete: () => setTimeout(() => finish(false), 180),
    })
    const skipNow = () => finish(true)
    window.addEventListener('keydown', skipNow)
    window.addEventListener('wheel', skipNow, { passive: true })
    window.addEventListener('touchstart', skipNow, { passive: true })
    return () => {
      counter.stop()
      root.style.overflow = ''
      window.removeEventListener('keydown', skipNow)
      window.removeEventListener('wheel', skipNow)
      window.removeEventListener('touchstart', skipNow)
    }
    // Runs once per page load; onDone is stable for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (gone) return null
  return (
    <div className="df-intro" ref={ref} role="presentation">
      <div className="df-intro-in">
        <svg viewBox="0 0 120 120" className="df-intro-gear" aria-hidden="true">
          <circle cx="60" cy="60" r="13" />
          <path ref={pathRef} d={outline} pathLength="1" />
        </svg>
        <div className="df-intro-meta">
          <span>WHS Engineering Club</span>
          <span>Loading spur_gear_14T.step</span>
        </div>
        <span className="df-count" ref={countRef} aria-hidden="true">000</span>
      </div>
      <button type="button" className="df-skip" onClick={() => skipRef.current()}>Skip intro</button>
    </div>
  )
}
