// Scroll-scrubbed engineering drawings that sit between sections. Each builder draws into a 1000x260
// viewBox and returns update(p), where p runs 0 -> 1 as the band travels up through the screen.
// Ink lines are the structure; the accent (br-hot) marks the one moving part that carries the motion.

const NS = 'http://www.w3.org/2000/svg'
const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))
const lerp = (a, b, t) => a + (b - a) * t
const ease = (t) => t * t * (3 - 2 * t)
const seg = (p, a, b) => clamp((p - a) / (b - a))

function el(parent, tag, attrs = {}, cls) {
  const n = document.createElementNS(NS, tag)
  if (cls) n.setAttribute('class', cls)
  for (const k in attrs) n.setAttribute(k, attrs[k])
  parent.appendChild(n)
  return n
}
const set = (n, attrs) => {
  for (const k in attrs) n.setAttribute(k, attrs[k])
}
const polar = (r, a) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`

// ---------------------------------------------------------------------------------------------
// 1. Gear train. Teeth phases are solved each frame so neighbouring gears always mesh.
function gears(svg) {
  const m = 6 // module: pitch radius = teeth * m / 2
  const defs = [18, 26, 14, 22]
  const radii = defs.map((n) => (n * m) / 2)
  let x = 0
  const xs = radii.map((r, i) => {
    if (i) x += radii[i - 1] + r
    return x
  })
  const span = xs[xs.length - 1] + radii[radii.length - 1] + radii[0]
  const x0 = 500 - span / 2 + radii[0]

  const rots = defs.map((n, i) => {
    const r = radii[i]
    const p = (2 * Math.PI) / n
    const ro = r + m * 0.85
    const rr = r - m * 1.05
    let d = ''
    for (let k = 0; k < n; k++) {
      const a = k * p
      const pts = [[rr, a - 0.3 * p], [ro, a - 0.15 * p], [ro, a + 0.15 * p], [rr, a + 0.3 * p]]
      pts.forEach(([rad, ang], j) => {
        d += `${k === 0 && j === 0 ? 'M' : 'L'}${polar(rad, ang)} `
      })
    }
    const g = el(svg, 'g', { transform: `translate(${x0 + xs[i]} 130)` })
    const rot = el(g, 'g')
    el(rot, 'path', { d: `${d}Z` }, 'br-line br-fill')
    el(rot, 'circle', { r: r * 0.6 }, 'br-line br-dim')
    el(rot, 'circle', { r: r * 0.2 }, 'br-line br-fill')
    el(rot, 'line', { x1: r * 0.2, y1: 0, x2: r * 0.6, y2: 0 }, 'br-line br-hot')
    return rot
  })

  return (p) => {
    const pitch = defs.map((n) => (2 * Math.PI) / n)
    let R = p * 5
    rots.forEach((rot, i) => {
      // Meshing: this gear's tooth phase is the complement of its left neighbour's, and it turns
      // the opposite way by the tooth-count ratio.
      if (i) R = Math.PI + 0.5 * pitch[i] - R * (pitch[i] / pitch[i - 1])
      rot.setAttribute('transform', `rotate(${((R * 180) / Math.PI).toFixed(2)})`)
    })
  }
}

// ---------------------------------------------------------------------------------------------
// 2. Crank and piston.
function piston(svg) {
  const cx = 300
  const cy = 130
  const R = 38
  const L = 190
  el(svg, 'line', { x1: 410, y1: 96, x2: 690, y2: 96 }, 'br-line')
  el(svg, 'line', { x1: 410, y1: 164, x2: 690, y2: 164 }, 'br-line')
  el(svg, 'line', { x1: 690, y1: 96, x2: 690, y2: 164 }, 'br-line')
  el(svg, 'line', { x1: 700, y1: 96, x2: 700, y2: 164 }, 'br-line br-dim')
  const fly = el(svg, 'g', { transform: `translate(${cx} ${cy})` })
  el(fly, 'circle', { r: 70 }, 'br-line br-fill')
  el(fly, 'circle', { r: 58 }, 'br-line br-dim')
  const spin = el(fly, 'g')
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    el(spin, 'line', { x1: 58 * Math.cos(a), y1: 58 * Math.sin(a), x2: 70 * Math.cos(a), y2: 70 * Math.sin(a) }, 'br-line br-dim')
  }
  const arm = el(svg, 'line', {}, 'br-line br-hot')
  const rod = el(svg, 'line', {}, 'br-line br-hot')
  const head = el(svg, 'rect', { y: cy - 32, width: 54, height: 64 }, 'br-line br-fill')
  const pin = el(svg, 'circle', { r: 6 }, 'br-line br-fill br-hot')
  const wrist = el(svg, 'circle', { r: 4 }, 'br-line br-fill')
  el(svg, 'circle', { cx, cy, r: 9 }, 'br-line br-fill')

  return (p) => {
    const t = p * Math.PI * 6
    const px = cx + R * Math.cos(t)
    const py = cy + R * Math.sin(t)
    const wx = cx + R * Math.cos(t) + Math.sqrt(L * L - (R * Math.sin(t)) ** 2)
    set(arm, { x1: cx, y1: cy, x2: px, y2: py })
    set(rod, { x1: px, y1: py, x2: wx, y2: cy })
    set(head, { x: wx - 27 })
    set(pin, { cx: px, cy: py })
    set(wrist, { cx: wx, cy })
    spin.setAttribute('transform', `rotate(${((t * 180) / Math.PI).toFixed(2)})`)
  }
}

// ---------------------------------------------------------------------------------------------
// 3. Vernier caliper closing on a part, with a dimension line.
function caliper(svg) {
  const left = 182
  el(svg, 'rect', { x: 150, y: 118, width: 690, height: 24 }, 'br-line br-fill')
  for (let i = 0; i <= 62; i++) {
    el(svg, 'line', { x1: left + i * 10, y1: 142, x2: left + i * 10, y2: 142 + (i % 5 === 0 ? 14 : 7) }, 'br-line br-dim')
  }
  el(svg, 'rect', { x: 170, y: 64, width: 12, height: 136 }, 'br-line br-fill')
  el(svg, 'rect', { x: left, y: 150, width: 300, height: 50 }, 'br-line br-fill')
  el(svg, 'circle', { cx: left + 150, cy: 175, r: 14 }, 'br-line br-dim')
  const slider = el(svg, 'g')
  el(slider, 'rect', { x: 0, y: 64, width: 12, height: 136 }, 'br-line br-fill')
  el(slider, 'rect', { x: 0, y: 100, width: 120, height: 56 }, 'br-line br-fill')
  el(slider, 'rect', { x: 14, y: 110, width: 90, height: 22 }, 'br-line br-dim')
  const readout = el(slider, 'text', { x: 20, y: 127 }, 'br-text br-hot-text')
  const dim = el(svg, 'line', { y1: 40, y2: 40 }, 'br-line br-hot')
  el(svg, 'line', { x1: left, y1: 34, x2: left, y2: 62 }, 'br-line br-dim')
  const extR = el(svg, 'line', { y1: 34, y2: 62 }, 'br-line br-dim')
  const arrowL = el(svg, 'path', {}, 'br-line br-hot')
  const arrowR = el(svg, 'path', {}, 'br-line br-hot')
  const label = el(svg, 'text', { y: 28, 'text-anchor': 'middle' }, 'br-text')

  return (p) => {
    const jaw = lerp(790, left + 300, ease(seg(p, 0.1, 0.8)))
    const mm = ((jaw - left) / 10).toFixed(2)
    slider.setAttribute('transform', `translate(${jaw} 0)`)
    readout.textContent = mm
    set(dim, { x1: left, x2: jaw })
    set(extR, { x1: jaw, x2: jaw })
    set(arrowL, { d: `M${left + 9} 36 L${left} 40 L${left + 9} 44` })
    set(arrowR, { d: `M${jaw - 9} 36 L${jaw} 40 L${jaw - 9} 44` })
    set(label, { x: (left + jaw) / 2 })
    label.textContent = mm
  }
}

// ---------------------------------------------------------------------------------------------
// 4. Four-bar linkage. The crank turns, the rocker swings, and the coupler point traces its curve.
function linkage(svg) {
  const A = [330, 200]
  const D = [630, 200]
  const a = 62 // crank
  const c = 250 // coupler
  const r = 140 // rocker
  const off = [0.5, -70] // coupler point: fraction along the coupler, and offset normal to it

  const pose = (t) => {
    const B = [A[0] + a * Math.cos(t), A[1] + a * Math.sin(t)]
    const dx = D[0] - B[0]
    const dy = D[1] - B[1]
    const d = Math.hypot(dx, dy)
    const l = (c * c - r * r + d * d) / (2 * d)
    const h = Math.sqrt(Math.max(0, c * c - l * l))
    const C = [B[0] + (l * dx) / d + (h * dy) / d, B[1] + (l * dy) / d - (h * dx) / d]
    const ux = (C[0] - B[0]) / c
    const uy = (C[1] - B[1]) / c
    const P = [B[0] + ux * c * off[0] - uy * off[1], B[1] + uy * c * off[0] + ux * off[1]]
    return { B, C, P }
  }

  let path = ''
  for (let i = 0; i <= 120; i++) {
    const { P } = pose((i / 120) * Math.PI * 2)
    path += `${i ? 'L' : 'M'}${P[0].toFixed(1)} ${P[1].toFixed(1)} `
  }
  el(svg, 'path', { d: `${path}Z` }, 'br-line br-dim')
  el(svg, 'line', { x1: A[0] - 40, y1: 226, x2: D[0] + 40, y2: 226 }, 'br-line br-dim')
  for (const [x] of [A, D]) el(svg, 'path', { d: `M${x} 204 L${x - 14} 226 L${x + 14} 226 Z` }, 'br-line br-fill')

  const crank = el(svg, 'line', {}, 'br-line br-hot br-thick')
  const coupler = el(svg, 'path', {}, 'br-line br-fill')
  const rocker = el(svg, 'line', {}, 'br-line br-thick')
  const joints = [A, D, A, A, A].map(() => el(svg, 'circle', { r: 6 }, 'br-line br-fill'))
  const dot = el(svg, 'circle', { r: 4.5 }, 'br-dot')

  return (p) => {
    const { B, C, P } = pose(p * Math.PI * 2 * 1.5)
    set(crank, { x1: A[0], y1: A[1], x2: B[0], y2: B[1] })
    set(coupler, { d: `M${B[0]} ${B[1]} L${C[0]} ${C[1]} L${P[0]} ${P[1]} Z` })
    set(rocker, { x1: D[0], y1: D[1], x2: C[0], y2: C[1] })
    ;[A, D, B, C].forEach((j, i) => set(joints[i], { cx: j[0], cy: j[1] }))
    set(dot, { cx: P[0], cy: P[1] })
  }
}

// ---------------------------------------------------------------------------------------------
// 5. Oscilloscope. Two channels, frequency sweeps as you scroll.
function scope(svg) {
  const x0 = 190
  const w = 620
  el(svg, 'rect', { x: x0, y: 20, width: w, height: 220 }, 'br-line br-fill')
  for (let i = 1; i < 10; i++) el(svg, 'line', { x1: x0 + (i * w) / 10, y1: 20, x2: x0 + (i * w) / 10, y2: 240 }, i === 5 ? 'br-line br-dim' : 'br-line br-faint')
  for (let i = 1; i < 5; i++) el(svg, 'line', { x1: x0, y1: 20 + i * 44, x2: x0 + w, y2: 20 + i * 44 }, i === 2 ? 'br-line br-dim' : 'br-line br-faint')
  const ch2 = el(svg, 'path', {}, 'br-line br-dim')
  const ch1 = el(svg, 'path', {}, 'br-line br-hot br-thick')
  el(svg, 'path', { d: 'M174 122 L186 130 L174 138 Z' }, 'br-line br-fill')
  const readout = el(svg, 'text', { x: x0 + 14, y: 44 }, 'br-text')

  return (p) => {
    const k = 0.012 + 0.03 * p
    const phase = p * 25
    let d1 = ''
    let d2 = ''
    for (let x = 0; x <= w; x += 4) {
      const y1 = 130 + 70 * Math.sin(k * x + phase)
      const y2 = 130 + 26 * Math.sin(2.3 * k * x + 1.7 - phase * 0.6)
      d1 += `${x ? 'L' : 'M'}${(x0 + x).toFixed(1)} ${y1.toFixed(1)} `
      d2 += `${x ? 'L' : 'M'}${(x0 + x).toFixed(1)} ${y2.toFixed(1)} `
    }
    set(ch1, { d: d1 })
    set(ch2, { d: d2 })
    readout.textContent = `${(0.5 + 2.5 * p).toFixed(2)}`
  }
}

// ---------------------------------------------------------------------------------------------
// 6. 3D printer laying down a vase layer by layer.
function printer(svg) {
  const N = 34
  const h = 4
  const floor = 225
  el(svg, 'line', { x1: 290, y1: floor, x2: 710, y2: floor }, 'br-line br-thick')
  el(svg, 'line', { x1: 290, y1: floor + 6, x2: 710, y2: floor + 6 }, 'br-line br-dim')
  const layers = Array.from({ length: N }, (_, i) => {
    const w = 120 + 90 * Math.sin((Math.PI * (i + 3)) / (N + 6))
    return { w, r: el(svg, 'rect', { x: 500 - w / 2, y: floor - h * (i + 1), width: 0, height: h }, 'br-line br-fill') }
  })
  const gantry = el(svg, 'line', { x1: 250, x2: 750 }, 'br-line br-dim')
  const post1 = el(svg, 'line', { x1: 250, y1: floor + 6, x2: 250 }, 'br-line br-dim')
  const post2 = el(svg, 'line', { x1: 750, y1: floor + 6, x2: 750 }, 'br-line br-dim')
  const head = el(svg, 'g')
  el(head, 'rect', { x: -16, y: -52, width: 32, height: 26 }, 'br-line br-fill')
  el(head, 'path', { d: 'M-9 -26 L9 -26 L3 -2 L-3 -2 Z' }, 'br-line br-fill br-hot')
  el(head, 'line', { x1: 0, y1: -52, x2: 0, y2: -58 }, 'br-line')

  return (p) => {
    const L = clamp(p * 1.1, 0, 1) * N
    const done = Math.min(N, Math.floor(L))
    layers.forEach(({ w, r }, i) => {
      const f = i < done ? 1 : i === done ? L - done : 0
      set(r, { width: w * f, opacity: f > 0 ? 1 : 0 })
    })
    const cur = layers[Math.min(done, N - 1)]
    const f = done >= N ? 1 : L - done
    const top = floor - h * (Math.min(done, N - 1) + (done >= N ? 1 : 0))
    const x = 500 - cur.w / 2 + cur.w * f
    head.setAttribute('transform', `translate(${x.toFixed(1)} ${top})`)
    const gy = top - 62
    set(gantry, { y1: gy, y2: gy })
    set(post1, { y2: gy })
    set(post2, { y2: gy })
  }
}

// ---------------------------------------------------------------------------------------------
// 7. Header plug sliding into a socket; the LED comes on when it seats.
function connector(svg) {
  const pinsY = [94, 118, 142, 166]
  const wiresL = pinsY.map((y) => el(svg, 'line', { x1: 0, y1: y, y2: y }, 'br-line br-dim'))
  const wiresR = pinsY.map((y) => el(svg, 'line', { x2: 1000, y1: y, y2: y }, 'br-line br-dim'))
  const plug = el(svg, 'g')
  pinsY.forEach((y) => {
    el(plug, 'line', { x1: 120, y1: y, x2: 172, y2: y }, 'br-line br-thick')
  })
  el(plug, 'rect', { x: 0, y: 64, width: 120, height: 132 }, 'br-line br-fill')
  pinsY.forEach((y) => el(plug, 'circle', { cx: 60, cy: y, r: 3 }, 'br-line'))
  const sock = el(svg, 'g')
  el(sock, 'rect', { x: 0, y: 64, width: 120, height: 132 }, 'br-line br-fill')
  pinsY.forEach((y) => el(sock, 'rect', { x: 0, y: y - 4, width: 10, height: 8 }, 'br-line br-dim'))
  el(sock, 'rect', { x: 36, y: 52, width: 48, height: 12 }, 'br-line br-fill')
  el(sock, 'circle', { cx: 100, cy: 80, r: 12 }, 'br-line br-dim')
  const led = el(sock, 'circle', { cx: 100, cy: 80, r: 6 }, 'br-led')

  return (p) => {
    const gap = 190 * (1 - ease(seg(p, 0.1, 0.72)))
    const lx = 380 - gap
    const rx = 500 + gap
    plug.setAttribute('transform', `translate(${lx} 0)`)
    sock.setAttribute('transform', `translate(${rx} 0)`)
    wiresL.forEach((w) => set(w, { x2: lx }))
    wiresR.forEach((w) => set(w, { x1: rx + 120 }))
    led.toggleAttribute('data-on', p > 0.78)
  }
}

export const builders = { gears, piston, caliper, linkage, scope, printer, connector }
