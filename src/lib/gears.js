// Canvas drawing for the gear-train illustration, in technical-drawing style.

export function readColors() {
  const s = getComputedStyle(document.documentElement)
  const c = {}
  for (const k of ['ink', 'ink-soft', 'line', 'accent', 'sheet', 'paper']) {
    c[k] = s.getPropertyValue('--' + k).trim()
  }
  return c
}

function gearPath(ctx, cx, cy, teeth, r, angle) {
  const ro = r + r * 0.13
  const ri = r - r * 0.14
  const step = (Math.PI * 2) / teeth
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a = angle + i * step
    const pts = [
      [ri, a - step * 0.5], [ri, a - step * 0.28], [ro, a - step * 0.15],
      [ro, a + step * 0.15], [ri, a + step * 0.28],
    ]
    pts.forEach(([rad, th], j) => {
      const x = cx + Math.cos(th) * rad
      const y = cy + Math.sin(th) * rad
      if (i === 0 && j === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
  }
  ctx.closePath()
}

export function drawGear(ctx, C, g, angle, strong) {
  ctx.save()
  gearPath(ctx, g.x, g.y, g.t, g.r, angle)
  ctx.fillStyle = C.sheet
  ctx.fill()
  ctx.lineWidth = strong ? 2 : 1.5
  ctx.strokeStyle = C.ink
  ctx.stroke()

  // pitch circle, dash-dot like a drawing centerline
  ctx.setLineDash([10, 3, 2, 3])
  ctx.lineWidth = 1
  ctx.strokeStyle = C.accent
  ctx.beginPath()
  ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])

  // hub and spokes
  ctx.strokeStyle = C.ink
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.arc(g.x, g.y, g.r * 0.22, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(g.x, g.y, g.r * 0.08, 0, Math.PI * 2)
  ctx.fillStyle = C.accent
  ctx.fill()
  for (let k = 0; k < 4; k++) {
    const a = angle + (k * Math.PI) / 2
    ctx.beginPath()
    ctx.moveTo(g.x + Math.cos(a) * g.r * 0.22, g.y + Math.sin(a) * g.r * 0.22)
    ctx.lineTo(g.x + Math.cos(a) * g.r * 0.62, g.y + Math.sin(a) * g.r * 0.62)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.arc(g.x, g.y, g.r * 0.62, 0, Math.PI * 2)
  ctx.stroke()

  // center cross
  ctx.strokeStyle = C['ink-soft']
  ctx.lineWidth = 0.75
  const e = g.r * 1.3
  ctx.setLineDash([12, 3, 2, 3])
  ctx.beginPath()
  ctx.moveTo(g.x - e, g.y)
  ctx.lineTo(g.x + e, g.y)
  ctx.moveTo(g.x, g.y - e)
  ctx.lineTo(g.x, g.y + e)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.restore()
}

export function label(ctx, C, txt, x, y, align = 'left') {
  ctx.font = '500 11px "IBM Plex Mono", ui-monospace, monospace'
  ctx.fillStyle = C['ink-soft']
  ctx.textAlign = align
  ctx.textBaseline = 'middle'
  ctx.fillText(txt, x, y)
}

export function dimension(ctx, C, x1, y, x2, txt) {
  ctx.strokeStyle = C['ink-soft']
  ctx.fillStyle = C['ink-soft']
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x1, y)
  ctx.lineTo(x2, y)
  ctx.stroke()
  for (const [x, dir] of [[x1, 1], [x2, -1]]) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 7 * dir, y - 3)
    ctx.lineTo(x + 7 * dir, y + 3)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(x, y - 8)
    ctx.lineTo(x, y + 8)
    ctx.stroke()
  }
  const mx = (x1 + x2) / 2
  ctx.font = '500 11px "IBM Plex Mono", ui-monospace, monospace'
  const w = ctx.measureText(txt).width + 10
  ctx.fillStyle = C.sheet
  ctx.fillRect(mx - w / 2, y - 8, w, 16)
  label(ctx, C, txt, mx, y, 'center')
}
