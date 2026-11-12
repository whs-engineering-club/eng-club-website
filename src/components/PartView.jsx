import { useEffect, useRef } from 'react'
import { useMotionValue } from 'motion/react'
import { GearG, clamp, deg, useDrawLoop } from './gearkit.jsx'
import { cssVar, placeCallout } from './callout.js'

/**
 * A project part on a turntable, with live callouts. Driven entirely by motion values:
 *   angle  - turntable angle in degrees
 *   solid  - 0 wireframe → 1 shaded solid
 *   reveal - 0..1 opacity of the callouts
 * Labels are pushed outward from the part's centre along the anchor direction, so they
 * never sit on top of the part and need no per-part layout.
 */
export default function PartView({ part, angle, solid, reveal, light = false, notes = true, className = '', compact = false }) {
  const fallbackAngle = useMotionValue(24)
  const fallbackSolid = useMotionValue(1)
  const a = angle || fallbackAngle
  const s = solid || fallbackSolid
  const rv = reveal || s
  const svgRef = useRef(null)
  const api = useRef(null)
  const lines = useRef([])
  const labels = useRef([])
  const ink = useRef('#F2F4F5')

  useEffect(() => { ink.current = cssVar('--part-ink', light ? '#141414' : '#F2F4F5') }, [light])

  useDrawLoop(() => {
    const svg = svgRef.current
    if (!svg || !api.current) return
    const r = svg.getBoundingClientRect()
    if (!r.width) return
    const k = s.get()
    const cx = r.width / 2, cy = r.height / 2
    const pts = part.solid.render(api.current.walls, api.current.cap, {
      spin: 0, tiltX: deg(18), tiltY: deg(a.get()),
      size: Math.min(r.width * (compact ? 0.33 : 0.27), r.height * 0.36), cx, cy,
      fillOpacity: k * 0.95,
      lightTone: light ? [150, 236] : [60, 222], darkTone: [28, 110], mix: light ? 0.55 : 0,
      metal: k * (light ? 0.3 : 0.6), stroke: ink.current, strokeOpacity: 0.16 + (1 - k) * 0.7,
    })
    if (!notes) return
    const o = clamp(rv.get())
    part.notes.forEach((n, i) => {
      const [ax, ay] = pts[n.at]
      let vx = ax - cx, vy = ay - cy
      const len = Math.hypot(vx, vy) || 1
      vx /= len; vy /= len
      const push = compact ? 56 : 96
      placeCallout({
        line: lines.current[i], label: labels.current[i], anchor: [ax, ay],
        offset: [vx * push + (vx < 0 ? -24 : 24), vy * push * 0.8], opacity: o, bounds: r,
      })
    })
  }, [a, s, rv], [part, light, notes, compact])

  return (
    <div className={`pv ${className}`}>
      <svg ref={svgRef} className="pv-svg" aria-hidden="true">
        <GearG gear={part.solid} api={api} />
        {notes && <g className="co-lines">{part.notes.map((n, i) => <polyline key={n.label} ref={(el) => { lines.current[i] = el }} />)}</g>}
      </svg>
      {notes && (
        <div className="co-labels" aria-hidden="true">
          {part.notes.map((n, i) => (
            <div key={n.label} ref={(el) => { labels.current[i] = el }} className="co-label">
              <b>{n.label}</b>{!compact && <small>{n.sub}</small>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
