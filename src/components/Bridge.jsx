import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/hooks.js'
import { builders } from '../lib/bridges.js'

// An engineering drawing between two sections that animates with scroll: p is 0 as the band enters the
// bottom of the screen and 1 as it leaves the top. Drawings live in lib/bridges.js.
export default function Bridge({ kind, dark }) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    const update = builders[kind](root.querySelector('svg'))
    const reduce = prefersReducedMotion()
    let raf = 0
    let first = true

    const run = () => {
      raf = 0
      const r = root.getBoundingClientRect()
      const vh = window.innerHeight
      if (!first && (r.bottom < 0 || r.top > vh)) return
      first = false
      const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height)))
      root.style.setProperty('--axis', Math.min(1, p * 4))
      update(p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }

    run()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      root.querySelector('svg').replaceChildren()
    }
  }, [kind])

  return (
    <div className={`bridge container${dark ? ' on-dark' : ''}`} ref={ref} aria-hidden="true">
      <svg viewBox="0 0 1000 260" preserveAspectRatio="xMidYMid meet" />
    </div>
  )
}
