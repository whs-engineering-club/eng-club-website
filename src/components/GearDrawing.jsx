import { useEffect, useRef, useState } from 'react'
import { readColors, drawGear, label, dimension } from '../lib/gears.js'
import { prefersReducedMotion, useThemeVersion } from '../lib/hooks.js'

const TEETH = [24, 12, 18]
const MM_PER_PX = 0.4

// Three meshing gears. Cursor position sets the drive speed.
export default function GearDrawing() {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const state = useRef({ speed: 0.35, target: 0.35, angle: 0, mouse: null, W: 0, H: 0, gears: [], C: {} })
  const [coords, setCoords] = useState('X 000.0 · Y 000.0 mm')
  const themeVersion = useThemeVersion()

  useEffect(() => {
    state.current.C = readColors()
  }, [themeVersion])

  useEffect(() => {
    const stage = stageRef.current
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    const s = state.current
    const reduce = prefersReducedMotion()
    s.C = readColors()
    let raf

    const layout = () => {
      const r = stage.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      s.W = r.width
      s.H = r.height
      cv.width = Math.round(s.W * dpr)
      cv.height = Math.round(s.H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // pitch radius = module * teeth / 2, so the gears mesh
      const m = Math.min(s.W / 52, s.H / 40)
      const [t1, t2, t3] = TEETH
      const r1 = (m * t1) / 2
      const r2 = (m * t2) / 2
      const r3 = (m * t3) / 2
      const g1 = { x: s.W * 0.36, y: s.H * 0.52, t: t1, r: r1 }
      const g2 = { x: g1.x + r1 + r2, y: g1.y, t: t2, r: r2 }
      const a3 = -Math.PI * 0.33
      const g3 = { x: g2.x + Math.cos(a3) * (r2 + r3), y: g2.y + Math.sin(a3) * (r2 + r3), t: t3, r: r3 }
      s.gears = [g1, g2, g3]
    }

    const draw = () => {
      const { C, W, H } = s
      const [g1, g2, g3] = s.gears
      s.speed += (s.target - s.speed) * 0.05
      s.angle += s.speed * 0.016
      ctx.clearRect(0, 0, W, H)
      const a1 = s.angle
      const a2 = (-s.angle * g1.t) / g2.t + Math.PI / g2.t
      const a3 = (s.angle * g1.t) / g3.t + (Math.PI / g3.t) * 0.5
      drawGear(ctx, C, g1, a1, true)
      drawGear(ctx, C, g3, a3, false)
      drawGear(ctx, C, g2, a2, false)
      const dy = g1.y + g1.r * 1.35 + 6
      if (dy < H - 16) dimension(ctx, C, g1.x, dy, g2.x, `C ${g1.t + g2.t}.0`)
      label(ctx, C, `Z=${g1.t}`, g1.x - g1.r * 0.95, g1.y - g1.r - 14)
      label(ctx, C, `Z=${g2.t}`, g2.x + g2.r * 0.5, g2.y + g2.r + 18)
      label(ctx, C, `Z=${g3.t}`, g3.x + g3.r + 10, g3.y - g3.r * 0.6)
      const rpm = Math.round(((s.speed * 60) / (Math.PI * 2)) * 10)
      label(ctx, C, `RPM ${String(rpm).padStart(3, '0')}`, W - 12, 16, 'right')
      if (s.mouse) {
        ctx.strokeStyle = C.accent
        ctx.lineWidth = 0.75
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(s.mouse.x, 0)
        ctx.lineTo(s.mouse.x, H)
        ctx.moveTo(0, s.mouse.y)
        ctx.lineTo(W, s.mouse.y)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.arc(s.mouse.x, s.mouse.y, 5, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const r = stage.getBoundingClientRect()
      s.mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
      s.target = 0.35 + (s.mouse.x / s.W) * 3.2
      const f = (v) => (v * MM_PER_PX).toFixed(1).padStart(5, '0')
      setCoords(`X ${f(s.mouse.x)} · Y ${f(s.mouse.y)} mm`)
      if (reduce) draw()
    }
    const onLeave = () => {
      s.mouse = null
      s.target = 0.35
      if (reduce) draw()
    }

    layout()
    if (reduce) draw()
    else loop()
    const ro = new ResizeObserver(() => {
      layout()
      if (reduce) draw()
    })
    ro.observe(stage)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    document.fonts?.ready.then(() => reduce && draw())

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="stage" ref={stageRef}>
      <canvas ref={canvasRef} />
      <div className="coords">{coords}</div>
      <div className="hint">Move cursor to drive</div>
    </div>
  )
}
