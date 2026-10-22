import { useEffect, useState } from 'react'
import { useRevealed } from '../lib/hooks.js'

// Counts up to `value` when its Reveal parent scrolls into view.
export default function CountUp({ value }) {
  const revealed = useRevealed()
  const [n, setN] = useState(value)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (!revealed) {
      setArmed(true)
      return
    }
    if (!armed) return
    let raf
    let t0
    const step = (t) => {
      t0 ??= t
      const p = Math.min((t - t0) / 1100, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [revealed, armed, value])

  return n
}
