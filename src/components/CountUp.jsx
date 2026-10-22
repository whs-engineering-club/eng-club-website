import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, useRevealed } from '../lib/hooks.js'

// Counts up to `value` once its Reveal parent is on screen.
export default function CountUp({ value, duration = 1200 }) {
  const revealed = useRevealed()
  const [n, setN] = useState(value)
  const done = useRef(false)

  useEffect(() => {
    if (!revealed || done.current || prefersReducedMotion() || value === 0) return
    done.current = true
    let raf
    let t0
    const step = (t) => {
      t0 ??= t
      const p = Math.min((t - t0) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    setN(0)
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [revealed, value, duration])

  return n
}
