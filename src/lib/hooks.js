import { useEffect, useRef } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clamp = (v) => Math.min(1, Math.max(0, v))

// Writes how far the page has scrolled through an element to its --p CSS variable (0 to 1).
// mode 'pin':  for tall sections with a sticky child. 0 when the top reaches the top of the
//              screen, 1 when the bottom reaches the bottom.
// mode 'pass': 0 when the top enters at the bottom of the screen, 1 when the bottom leaves at the top.
// With reduced motion, --p is fixed at 1 so everything shows in its finished state.
export function useScrollProgress({ mode = 'pin', onChange } = {}) {
  const ref = useRef(null)
  const cb = useRef(onChange)
  cb.current = onChange

  useEffect(() => {
    const el = ref.current
    let raf = 0
    let last = -1
    const set = (p) => {
      if (p === last) return
      last = p
      el.style.setProperty('--p', p.toFixed(4))
      cb.current?.(p)
    }
    if (prefersReducedMotion()) {
      set(1)
      return
    }
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      set(mode === 'pin'
        ? clamp(-r.top / Math.max(1, r.height - vh))
        : clamp((vh - r.top) / (vh + r.height)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [mode])

  return ref
}

// Page-level scroll progress, written to --page on <html>.
export function usePageProgress() {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    const update = () => {
      raf = 0
      const h = root.scrollHeight - window.innerHeight
      root.style.setProperty('--page', h > 0 ? (window.scrollY / h).toFixed(4) : '0')
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
}
