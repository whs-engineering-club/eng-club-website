// "A different field every meeting": the 11 fields around a dial. Each field shows its blurb and
// its meetings from the season plan, with dates that follow cancellations.
import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { Reveal } from '../lib/boot.jsx'
import { fields, opportunities, plan } from '../data.js'
import { useSeason } from './Sections.jsx'

const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
const when = (it) => (it.status === 'done' ? 'Done' : it.status === 'next' ? `Next meeting · ${fmt(it.date)}` : it.date ? `~ ${fmt(it.date)}` : 'Later')

function useFields() {
  const { items } = useSeason()
  return fields.map((f) => ({ ...f, acts: f.activities.map((a) => items[plan.indexOf(a)]) }))
}

function ActCard({ it }) {
  return (
    <li className={it.status}>
      <span className="bn-fa-meta">Meeting {it.index + 1} · {when(it)}</span>
      <b>{it.title}</b>
      <p>{it.text}</p>
      <dl>
        <div><dt>Materials</dt><dd>{it.materials}</dd></div>
        <div><dt>Est. cost</dt><dd>{it.cost}</dd></div>
      </dl>
    </li>
  )
}

function Beyond() {
  return (
    <div className="bn-beyond">
      {opportunities.map((o) => (
        <Reveal key={o.name} className="bn-beyond-item"><h3>{o.name}</h3><p>{o.text}</p></Reveal>
      ))}
    </div>
  )
}

function Shell({ children, className = '' }) {
  return (
    <section className={`bn-sec ${className}`} id="what">
      <div className="bn-wrap">
        <h2 className="bn-h2">A different field every meeting.</h2>
        {children}
        <Beyond />
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------------------------
   Dial: the fields sit around a gear. Click a code or drag the dial; on release the dial carries
   your velocity, projects where it would coast to (Apple's decay projection) and settles on the
   nearest field with a spring. Labels counter-rotate so they always read upright.
--------------------------------------------------------------------------------------------- */
const N = fields.length
const STEP = 360 / N
const project = (v, d = 0.99) => ((v / 1000) * d) / (1 - d)

function DialLabel({ k, angle, f, selected, onPick, tabRef }) {
  const counter = useTransform(angle, (a) => -a)
  const rad = (k * STEP * Math.PI) / 180
  return (
    <div className="fx-tooth" style={{ left: `${50 + Math.sin(rad) * 41}%`, top: `${50 - Math.cos(rad) * 41}%` }}>
      <motion.button
        ref={tabRef} type="button" role="tab" aria-selected={selected} tabIndex={selected ? 0 : -1}
        aria-label={f.name} data-k={k} onClick={() => onPick(k)} style={{ rotate: counter }}
      >
        {f.code}
      </motion.button>
    </div>
  )
}

export default function FieldsDial() {
  const data = useFields()
  const reduce = useReducedMotion()
  const [sel, setSel] = useState(0)
  const angle = useMotionValue(0)
  const dialRef = useRef(null)
  const tabs = useRef([])
  const drag = useRef(null)
  const live = useRef(null)
  const f = data[sel]

  const nearest = (a) => ((Math.round(-a / STEP) % N) + N) % N
  const settle = (k, velocity = 0) => {
    const cur = angle.get()
    let target = -k * STEP
    target += Math.round((cur - target) / 360) * 360 // shortest way round
    setSel(k)
    animate(angle, target, reduce ? { duration: 0 } : { type: 'spring', duration: 0.6, bounce: velocity ? 0.2 : 0, velocity })
  }

  useEffect(() => angle.on('change', (a) => { if (live.current) live.current.textContent = data[nearest(a)].code }), [angle, data])

  const onPointerDown = (e) => {
    const r = dialRef.current.getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    const at = (ev) => (Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180) / Math.PI
    angle.stop()
    drag.current = { cx, cy, at, last: at(e), start: { x: e.clientX, y: e.clientY }, moved: false, hist: [{ t: performance.now(), a: angle.get() }] }
    dialRef.current.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    if (!d.moved && Math.hypot(e.clientX - d.start.x, e.clientY - d.start.y) < 6) return
    d.moved = true
    const now = d.at(e)
    let delta = now - d.last
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    d.last = now
    angle.set(angle.get() + delta)
    d.hist.push({ t: performance.now(), a: angle.get() })
    if (d.hist.length > 6) d.hist.shift()
  }
  const onPointerUp = (e) => {
    const d = drag.current
    drag.current = null
    if (!d) return
    if (!d.moved) {
      const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-k]')
      if (hit) settle(Number(hit.dataset.k))
      return
    }
    const a = d.hist[0], b = d.hist[d.hist.length - 1]
    const v = b.t > a.t ? ((b.a - a.a) / (b.t - a.t)) * 1000 : 0 // deg/s
    settle(nearest(angle.get() + project(v)), v)
  }
  const onKey = (e) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const k = (sel + step + N) % N
    settle(k)
    tabs.current[k]?.focus()
  }

  return (
    <Shell className="fx-dial-sec">
      <div className="fx-dial-wrap">
        <div className="fx-dial-stage">
          <span className="fx-pointer" aria-hidden="true" />
          <motion.div
            ref={dialRef} className="fx-dial" role="tablist" aria-label="Fields of engineering" onKeyDown={onKey}
            onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
            style={{ rotate: angle }}
          >
            <svg viewBox="-100 -100 200 200" className="fx-ring" aria-hidden="true">
              <circle r="71" className="fx-ring-outer" />
              <circle r="52" className="fx-ring-inner" />
              {data.map((x, k) => {
                const a = ((k * STEP - 90) * Math.PI) / 180
                return <line key={x.name} x1={Math.cos(a) * 64} y1={Math.sin(a) * 64} x2={Math.cos(a) * 71} y2={Math.sin(a) * 71} />
              })}
            </svg>
            {data.map((x, k) => (
              <DialLabel key={x.name} k={k} f={x} angle={angle} selected={k === sel} onPick={settle} tabRef={(el) => { tabs.current[k] = el }} />
            ))}
          </motion.div>
          <div className="fx-hub" aria-hidden="true">
            <b ref={live}>{f.code}</b>
            <small>Drag or pick</small>
          </div>
        </div>
        <div className="fx-dial-panel" role="tabpanel" aria-label={f.name} key={f.name}>
          <h3>{f.name}</h3>
          <p>{f.text}</p>
          <ol className="bn-field-acts">{f.acts.map((it) => <ActCard key={it.title} it={it} />)}</ol>
        </div>
      </div>
    </Shell>
  )
}
