import { useEffect, useRef } from 'react'
import { motion, useTransform } from 'motion/react'

// One gear's SVG paths. `api.current` receives { walls, cap } for the renderer.
export function GearG({ gear, api, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const g = ref.current
    api.current = { walls: [...g.querySelectorAll('.gk-wall')], cap: g.querySelector('.gk-cap') }
  }, [api])
  return (
    <g ref={ref} className={`gk ${className}`}>
      <g>{Array.from({ length: gear.wallCount }, (_, i) => <path key={i} className="gk-wall" pathLength="1" />)}</g>
      <path className="gk-cap" pathLength="1" fillRule="evenodd" />
    </g>
  )
}

// Redraws on the next frame whenever any motion value changes or the window resizes.
export function useDrawLoop(draw, values, deps = []) {
  useEffect(() => {
    let raf = 0
    const run = () => { raf = 0; draw() }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    const offs = values.map((v) => v.on('change', schedule))
    window.addEventListener('resize', schedule)
    return () => { offs.forEach((o) => o()); window.removeEventListener('resize', schedule); cancelAnimationFrame(raf) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export const clamp = (v) => Math.min(1, Math.max(0, v))
export const deg = (d) => (d * Math.PI) / 180

// A caption that fades and rises through its slice of the pinned scroll.
export function Caption({ progress, at, title, text, className = '' }) {
  const holds = at.length === 3
  const opacity = useTransform(progress, at, holds ? [0, 1, 1] : [0, 1, 1, 0])
  const y = useTransform(progress, at, holds ? [24, 0, 0] : [24, 0, 0, -24])
  return (
    <motion.div className={`gk-caption ${className}`} style={{ opacity, y }}>
      <h2>{title}</h2>
      <p>{text}</p>
    </motion.div>
  )
}

export const PHASES = [
  { at: [0.1, 0.16, 0.34, 0.4], title: 'Sketch it.', text: 'Every project starts on paper. A sketch, a few dimensions, a plan you can argue about.' },
  { at: [0.36, 0.42, 0.58, 0.64], title: 'Model it.', text: 'Then into CAD. Onshape is free with a school account, and it runs on a Chromebook.' },
  { at: [0.62, 0.68, 1], title: 'Build it.', text: 'Then teams build it from popsicle sticks, string and cardboard, and test it until it breaks.' },
]
