import { createContext, useContext, useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Theme tokens for canvas code; re-read when the OS theme or data-theme changes.
export function useThemeVersion() {
  const [v, setV] = useState(0)
  useEffect(() => {
    const bump = () => setV((n) => n + 1)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', bump)
    const mo = new MutationObserver(bump)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      mq.removeEventListener('change', bump)
      mo.disconnect()
    }
  }, [])
  return v
}

// Reveal: content is visible at rest. Elements that start below the fold get a
// "pre" offset and settle into place when they scroll into view.
export const RevealContext = createContext(true)
export const useRevealed = () => useContext(RevealContext)

export function useReveal(delay = 0) {
  const ref = useRef(null)
  const [pre, setPre] = useState(false)
  const [revealed, setRevealed] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    setPre(true)
    setRevealed(false)
    let timer
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        timer = setTimeout(() => {
          setPre(false)
          setRevealed(true)
        }, delay)
        io.disconnect()
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(timer)
    }
  }, [delay])

  return { ref, pre, revealed }
}

export function useScrollSpy(ids) {
  const [active, setActive] = useState(-1)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? window.scrollY / h : 0)
      let cur = -1
      ids.forEach((id, i) => {
        const s = document.getElementById(id)
        if (s && s.getBoundingClientRect().top < window.innerHeight * 0.35) cur = i
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return { active, progress }
}
