import { createContext, useContext, useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Reveal on scroll. Elements already on screen at load stay put; elements below the
// fold start in their `pre` state, then animate in when they scroll into view.
export const RevealContext = createContext(true)
export const useRevealed = () => useContext(RevealContext)

export function useReveal() {
  const ref = useRef(null)
  const [pre, setPre] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
    setPre(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setPre(false)
        io.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, pre }
}

// Page scroll, written to <html>: --page (0–1 progress) and --sy (pixels scrolled). Also flags
// `nav-dark` once the dark band at the end of the page reaches the nav.
export function usePageProgress() {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    const update = () => {
      raf = 0
      const h = root.scrollHeight - window.innerHeight
      root.style.setProperty('--page', h > 0 ? (window.scrollY / h).toFixed(4) : '0')
      root.style.setProperty('--sy', String(Math.round(window.scrollY)))
      root.classList.toggle('scrolled', window.scrollY > 8)
      const dark = document.querySelector('.section.dark')
      root.classList.toggle('nav-dark', !!dark && dark.getBoundingClientRect().top <= 64)
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

// How far the reading line (60% down the viewport) has moved through an element, as --p (0–1).
// Children marked [data-step] get a `passed` class once the reading line reaches them.
export function useScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.6
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (line - r.top) / r.height))
      el.style.setProperty('--p', p.toFixed(4))
      el.querySelectorAll('[data-step]').forEach((s) => {
        s.classList.toggle('passed', s.getBoundingClientRect().top + 12 < line)
      })
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
  return ref
}

// The id of the section currently in the middle of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
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
