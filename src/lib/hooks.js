import { createContext, useContext, useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Reveal on scroll. Elements already on screen at load stay put; elements below the
// fold start slightly lowered and faded, then animate in when they scroll into view.
export const RevealContext = createContext(true)
export const useRevealed = () => useContext(RevealContext)

export function useReveal() {
  const ref = useRef(null)
  const [pre, setPre] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return
    setPre(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setPre(false)
        io.disconnect()
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, pre }
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
      root.classList.toggle('scrolled', window.scrollY > 12)
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

// Current time, refreshed every `ms` milliseconds.
export function useNow(ms = 30000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), ms)
    return () => clearInterval(id)
  }, [ms])
  return now
}

// Sets --mx / --my on the element under the pointer, for hover glows.
export function trackPointer(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
