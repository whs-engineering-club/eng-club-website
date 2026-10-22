import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/hooks.js'

// Animated circuit board: PCB-style traces (45° turns, pads at the ends) with
// glowing pulses running along them. Traces near the pointer light up.

const GRID = 24
const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]

function makeTraces(W, H) {
  const cols = Math.ceil(W / GRID)
  const rows = Math.ceil(H / GRID)
  const count = Math.max(18, Math.round((W * H) / 16000))
  const traces = []
  for (let k = 0; k < count; k++) {
    let x = Math.floor(Math.random() * cols)
    let y = Math.floor(Math.random() * rows)
    let dir = [0, 2, 4, 6][Math.floor(Math.random() * 4)]
    const pts = [[x * GRID, y * GRID]]
    const segs = 2 + Math.floor(Math.random() * 3)
    for (let s = 0; s < segs; s++) {
      const len = 2 + Math.floor(Math.random() * 6)
      x += DIRS[dir][0] * len
      y += DIRS[dir][1] * len
      pts.push([x * GRID, y * GRID])
      dir = (dir + (Math.random() < 0.5 ? 1 : 7)) % 8
    }
    const lens = []
    let total = 0
    for (let i = 1; i < pts.length; i++) {
      const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
      lens.push(l)
      total += l
    }
    traces.push({ pts, lens, total, glow: 0 })
  }
  return traces
}

function pointAt(tr, d) {
  let rest = Math.max(0, Math.min(d, tr.total))
  for (let i = 0; i < tr.lens.length; i++) {
    if (rest <= tr.lens[i]) {
      const t = rest / tr.lens[i]
      const [x0, y0] = tr.pts[i]
      const [x1, y1] = tr.pts[i + 1]
      return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]
    }
    rest -= tr.lens[i]
  }
  return tr.pts[tr.pts.length - 1]
}

export default function CircuitCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const css = getComputedStyle(document.documentElement)
    const ACCENT = css.getPropertyValue('--accent').trim()
    const TRACE = css.getPropertyValue('--trace').trim()
    const reduce = prefersReducedMotion()
    let W = 0
    let H = 0
    let traces = []
    let pulses = []
    let mouse = null
    let raf = 0
    let visible = true

    const resize = () => {
      const r = cv.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width
      H = r.height
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      traces = makeTraces(W, H)
      pulses = []
      if (reduce) draw()
    }

    const spawn = (tr) => {
      pulses.push({ tr: tr ?? traces[Math.floor(Math.random() * traces.length)], d: 0, speed: 1.6 + Math.random() * 2.4 })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (const tr of traces) {
        if (mouse) {
          const near = tr.pts.some(([x, y]) => Math.hypot(x - mouse.x, y - mouse.y) < 140)
          tr.glow += ((near ? 1 : 0) - tr.glow) * 0.08
        } else {
          tr.glow *= 0.92
        }
        ctx.strokeStyle = TRACE
        ctx.lineWidth = 1.25
        ctx.globalAlpha = 0.55 + tr.glow * 0.45
        ctx.beginPath()
        tr.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
        ctx.stroke()
        if (tr.glow > 0.02) {
          ctx.strokeStyle = ACCENT
          ctx.globalAlpha = tr.glow * 0.5
          ctx.stroke()
        }
        // pads
        ctx.globalAlpha = 0.7 + tr.glow * 0.3
        for (const [x, y] of [tr.pts[0], tr.pts[tr.pts.length - 1]]) {
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.strokeStyle = tr.glow > 0.3 ? ACCENT : TRACE
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1

      // pulses with a short fading tail
      ctx.shadowColor = ACCENT
      ctx.shadowBlur = 12
      for (const p of pulses) {
        const steps = 10
        for (let s = steps; s >= 0; s--) {
          const [x, y] = pointAt(p.tr, p.d - s * 5)
          ctx.globalAlpha = (1 - s / steps) * 0.9
          ctx.fillStyle = ACCENT
          ctx.beginPath()
          ctx.arc(x, y, s === 0 ? 2.4 : 1.6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    }

    const tick = () => {
      raf = 0
      if (!visible) return
      if (pulses.length < Math.max(6, traces.length / 4) && Math.random() < 0.15) spawn()
      for (const p of pulses) p.d += p.speed
      pulses = pulses.filter((p) => p.d - 50 < p.tr.total)
      draw()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const r = cv.getBoundingClientRect()
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
      if (reduce) draw()
      else if (Math.random() < 0.08) {
        const near = traces.find((tr) => Math.hypot(tr.pts[0][0] - mouse.x, tr.pts[0][1] - mouse.y) < 160)
        if (near) spawn(near)
      }
    }
    const onLeave = () => {
      mouse = null
      if (reduce) draw()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    const host = cv.parentElement
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !reduce && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(cv)
    if (!reduce) raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas className="circuit" ref={ref} aria-hidden="true" />
}
