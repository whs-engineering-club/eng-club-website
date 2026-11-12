import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

// Mounts the app. The `js` class lets CSS hide reveal targets only when script is running.
export function boot(App) {
  document.documentElement.classList.add('js')
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

// Marks an element `data-shown` the first time it scrolls into view. The CSS decides what the
// hidden and shown states look like (and drops the motion for reduced motion).
export function Reveal({ as: Tag = 'div', delay, style, children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.setAttribute('data-shown', '')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.setAttribute('data-shown', '')
        io.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const s = delay != null ? { ...style, '--d': `${delay}ms` } : style
  return (
    <Tag ref={ref} data-reveal="" style={s} {...rest}>
      {children}
    </Tag>
  )
}
