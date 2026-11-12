import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { makeGear } from '../lib/gear.js'
import { useNextMeeting } from '../lib/content.js'
import { Caption, GearG, PHASES, clamp, deg, useDrawLoop } from './gearkit.jsx'
import { HeroCopy } from './Sections.jsx'
import { cssVar, placeCallout } from './callout.js'

// The Callouts hero: a CAD inspector. Leader lines are anchored to points the renderer projects
// every frame, so they follow the real geometry as the gear turns from 0° to 240°.
// Every color comes from tokens (--hero-*, --accent); `light` flips the solid to a dark part.
const gear = makeGear({ teeth: 14, depth: 0.24, hole: 0.28, bolts: 5 })

const NOTES = [
  { id: 'tip', from: 0.0, dx: 120, dy: -90, label: 'Tip Ø 2.00', sub: '14 teeth · module 0.14' },
  { id: 'bore', from: 0.36, dx: -230, dy: -30, label: 'Bore Ø 0.56', sub: 'Press fit, 0.2 mm tolerance' },
  { id: 'bolt', from: 0.42, dx: -170, dy: 90, label: '5 × M3', sub: 'Bolt circle Ø 1.12' },
  { id: 'rim', from: 0.66, dx: -60, dy: 130, label: 'Modeled in Onshape', sub: 'Free education account' },
]

export default function CalloutHero({ light = false, phases = PHASES, introDelay = 0.2 }) {
  const ref = useRef(null)
  const svgRef = useRef(null)
  const lines = useRef({})
  const labels = useRef({})
  const dim = useRef(null)
  const dimLabel = useRef(null)
  const angleOut = useRef(null)
  const api = useRef(null)
  const ink = useRef('#F2F4F5')
  const reduce = useReducedMotion()
  const meeting = useNextMeeting()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const intro = useMotionValue(reduce ? 1 : 0)
  const copyOpacity = useTransform(scrollYProgress, [0, 0.09], [1, 0])
  const copyY = useTransform(scrollYProgress, [0, 0.09], [0, -32])

  useEffect(() => { ink.current = cssVar('--hero-ink', light ? '#141414' : '#F2F4F5') }, [light])

  useEffect(() => {
    if (reduce) return
    const c = animate(intro, 1, { duration: 1.6, ease: [0.23, 1, 0.32, 1], delay: introDelay })
    return () => c.stop()
  }, [reduce, intro, introDelay])

  useDrawLoop(() => {
    const svg = svgRef.current
    if (!svg || !api.current) return
    const p = reduce ? 0.7 : scrollYProgress.get()
    const r = svg.getBoundingClientRect()
    const narrow = r.width < 720
    const model = clamp((p - 0.3) / 0.2)
    const build = clamp((p - 0.62) / 0.16)
    const angle = p * 240
    const pts = gear.render(api.current.walls, api.current.cap, {
      spin: deg(angle), tiltX: deg(52 - p * 16), tiltY: deg(-20 + p * 34),
      size: Math.min(r.width * (narrow ? 0.28 : 0.19), r.height * (narrow ? 0.16 : 0.26)),
      cx: r.width * (narrow ? 0.5 : 0.6), cy: r.height * (narrow ? 0.76 : 0.5),
      fillOpacity: model * 0.94,
      lightTone: light ? [150, 235] : [60, 220], darkTone: [28, 110], mix: light ? 0.55 : 0,
      metal: build * (light ? 0.4 : 0.8),
      stroke: ink.current, strokeOpacity: 0.16 + (1 - model) * 0.7,
    })
    svg.style.setProperty('--drawn', String(1 - intro.get()))
    const show = (from) => (reduce ? 1 : clamp((p - from) / 0.06) * intro.get())
    for (const n of NOTES) {
      placeCallout({
        line: lines.current[n.id], label: labels.current[n.id], anchor: pts[n.id],
        offset: narrow ? [n.dx * 0.45, n.dy * 0.5] : [n.dx, n.dy], opacity: show(n.from), bounds: r,
      })
    }
    const [x1, y1] = pts.rim, [x2, y2] = pts.tip
    const o = show(0.12)
    dim.current?.setAttribute('x1', x1.toFixed(1)); dim.current?.setAttribute('y1', y1.toFixed(1))
    dim.current?.setAttribute('x2', x2.toFixed(1)); dim.current?.setAttribute('y2', y2.toFixed(1))
    dim.current?.setAttribute('opacity', o.toFixed(3))
    if (dimLabel.current) {
      dimLabel.current.style.opacity = o.toFixed(3)
      dimLabel.current.style.transform = `translate3d(${((x1 + x2) / 2).toFixed(1)}px, ${((y1 + y2) / 2).toFixed(1)}px, 0) translate(-50%, -150%)`
    }
    if (angleOut.current) angleOut.current.textContent = String(Math.round(angle)).padStart(3, '0') + '°'
  }, [scrollYProgress, intro], [reduce, light])

  return (
    <section className={`bn-hero${reduce ? ' still' : ''}`} ref={ref} id="top">
      <div className="bn-stage">
        <div className="bn-gridbg co-grid" aria-hidden="true" />
        <svg ref={svgRef} className="bn-gear" aria-hidden="true">
          <GearG gear={gear} api={api} />
          <g className="co-lines">
            <line ref={dim} className="co-dim" markerStart="url(#co-tick)" markerEnd="url(#co-tick)" />
            {NOTES.map((n) => <polyline key={n.id} ref={(el) => { lines.current[n.id] = el }} />)}
          </g>
          <defs>
            <marker id="co-tick" className="co-tick" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M5 0V10" strokeWidth="1.5" />
            </marker>
          </defs>
        </svg>
        <div className="co-labels" aria-hidden="true">
          <div ref={dimLabel} className="co-label dim"><b>Ø 2.00</b></div>
          {NOTES.map((n) => (
            <div key={n.id} ref={(el) => { labels.current[n.id] = el }} className="co-label">
              <b>{n.label}</b><small>{n.sub}</small>
            </div>
          ))}
        </div>
        <HeroCopy style={reduce ? undefined : { opacity: copyOpacity, y: copyY }} />
        {!reduce && phases.map((ph) => <Caption key={ph.title} progress={scrollYProgress} {...ph} />)}
        <div className="co-panel" aria-hidden="true">
          <div><small>Part</small><span>spur_gear_14T.step</span></div>
          <div><small>Rotation</small><span ref={angleOut}>000°</span></div>
          <div><small>Units</small><span>in</span></div>
        </div>
        {meeting && (
          <motion.dl className="bn-strip" style={reduce ? undefined : { opacity: copyOpacity }}>
            <div><dt>Next meeting</dt><dd>{meeting.dateLabel} · {meeting.timeLabel}</dd></div>
            <div><dt>Where</dt><dd>{meeting.where}</dd></div>
          </motion.dl>
        )}
      </div>
    </section>
  )
}
