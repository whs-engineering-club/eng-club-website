import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import PartView from './PartView.jsx'
import { useSeason } from './Sections.jsx'
import { PARTS } from '../lib/parts.js'
import { plan } from '../data.js'

// "Builds this season": three meetings from the plan on a horizontal track that vertical scroll
// drives. Each part turns through ±50° while its panel crosses the screen, never edge-on.
const BUILDS = Object.keys(PARTS)

const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
function whenLabel(it) {
  if (!it) return ''
  if (it.status === 'done') return 'Done this season'
  if (it.status === 'next') return `Next meeting · ${fmtDate(it.date)}`
  return it.date ? `In ${it.inMeetings} meetings · ~ ${fmtDate(it.date)}` : 'Later this season'
}

function Panel({ title, i, progress, item }) {
  const n = BUILDS.length + 2
  const angle = useTransform(progress, [i / n, (i + 2.5) / n], [-50, 50])
  return (
    <article className="df-panel df-proj">
      <div className="df-part"><PartView part={PARTS[title]} angle={angle} /></div>
      <small>{item.field} · Meeting {item.index + 1} · <b className={item.status === 'next' ? 'on' : ''}>{whenLabel(item)}</b></small>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <dl>
        <div><dt>Materials</dt><dd>{item.materials}</dd></div>
        <div><dt>Est. cost</dt><dd>{item.cost}</dd></div>
      </dl>
    </article>
  )
}

export default function BuildsTrack() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const reduce = useReducedMotion()
  const [dist, setDist] = useState(0)
  useLayoutEffect(() => {
    const measure = () => { const t = trackRef.current; if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth)) }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const { items } = useSeason()
  const rest = plan.length - BUILDS.length
  return (
    <section className={`df-track-sec${reduce ? ' flat' : ''}`} id="projects" ref={ref} style={reduce ? undefined : { height: `calc(100vh + ${dist}px)` }}>
      <div className="df-pin">
        <motion.div className="df-track" ref={trackRef} style={reduce ? undefined : { x }}>
          <div className="df-panel df-lead">
            <h2 className="bn-h2">Builds this season.</h2>
            <p>Three of the {plan.length} meetings: each one a team challenge built from cheap, everyday materials, then tested until something gives.</p>
            <span className="df-hint" aria-hidden="true">Scroll →</span>
          </div>
          {BUILDS.map((t, i) => <Panel key={t} title={t} i={i} progress={scrollYProgress} item={items.find((it) => it.title === t)} />)}
          <div className="df-panel df-end">
            <p>{rest} more meetings: circuits, code, chemistry, water filters, egg drops and foil boats.</p>
            <a className="bn-btn" href="#schedule">See the whole season</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
