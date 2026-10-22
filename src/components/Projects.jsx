import { useLayoutEffect, useRef } from 'react'
import { projects } from '../data.js'
import { prefersReducedMotion, useScrollProgress } from '../lib/hooks.js'

// Vertical scroll drives a horizontal track of project cards.
export default function Projects() {
  const ref = useScrollProgress()
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const section = ref.current
    const track = trackRef.current
    const measure = () => {
      const dist = Math.max(0, track.scrollWidth - window.innerWidth)
      section.style.setProperty('--dist', dist)
      // 1.6px of page scroll per 1px of sideways travel keeps the slide unhurried
      section.style.height = `${dist * 1.6 + window.innerHeight}px`
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [ref])

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="pin">
        <div className="track" ref={trackRef}>
          <div className="track-intro">
            <p className="label">Current projects</p>
            <h2>Fall 2026 build season</h2>
            <p className="muted">Four teams, one shop. Join any of them at a Tuesday meeting.</p>
          </div>
          {projects.map((p) => (
            <article className="card" key={p.title}>
              <div className="card-top">
                <span className="label">{p.area}</span>
                <span className={p.active ? 'label live' : 'label'}>{p.status}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="muted">{p.text}</p>
              <div className="meter">
                <div className="meter-lab label"><span>{p.progress.label}</span><span>{p.progress.value}</span></div>
                <div className="meter-bar"><i style={{ '--v': p.progress.p }} /></div>
              </div>
              <dl className="specs">
                {p.specs.map((s) => (
                  <div key={s.label}>
                    <dt className="label">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
