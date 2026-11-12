// A small orthographic renderer for extruded parts (a spur gear, a truss, an enclosure...), drawn
// into existing SVG <path>s. No layout work: it only rewrites `d` and colors, so it can run per frame.

const TAU = Math.PI * 2

export function gearProfile(teeth = 12, rOut = 1, rRoot = 0.8) {
  const w = TAU / teeth
  const pts = []
  for (let i = 0; i < teeth; i++) {
    const a = i * w
    pts.push([rRoot, a - w * 0.5], [rRoot, a - w * 0.25], [rOut, a - w * 0.13], [rOut, a + w * 0.13], [rRoot, a + w * 0.25])
  }
  return pts.map(([r, a]) => [Math.cos(a) * r, Math.sin(a) * r])
}

export function circle(r, n = 28, phase = 0, cx = 0, cy = 0) {
  return Array.from({ length: n }, (_, i) => {
    const a = phase + (i / n) * TAU
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]
  })
}

// Loops must wind counter-clockwise; this fixes any that don't.
function ccw(pts) {
  let a = 0
  for (let i = 0; i < pts.length; i++) { const [x1, y1] = pts[i]; const [x2, y2] = pts[(i + 1) % pts.length]; a += x1 * y2 - x2 * y1 }
  return a < 0 ? [...pts].reverse() : pts
}

// Spin about the part's own axis (z), shift within its plane, then tilt about x and y.
function xform([x, y, z], spin, ox, oy, tx, ty) {
  let c = Math.cos(spin), s = Math.sin(spin)
  ;[x, y] = [x * c - y * s + ox, x * s + y * c + oy]
  c = Math.cos(tx); s = Math.sin(tx)
  ;[y, z] = [y * c - z * s, y * s + z * c]
  c = Math.cos(ty); s = Math.sin(ty)
  ;[x, z] = [x * c + z * s, -x * s + z * c]
  return [x, y, z]
}

const norm = (v) => { const l = Math.hypot(...v) || 1; return v.map((n) => n / l) }
const LIGHT = norm([-0.35, 0.5, 0.8])
const HALF = norm([LIGHT[0], LIGHT[1], LIGHT[2] + 1])

/**
 * Builds a renderer for a profile extruded to `depth`. `paths` must hold at least `wallCount`
 * elements; `cap` is a separate path placed after them, so it always sits in front of every wall.
 * `anchors` are named points on the profile whose screen positions `render` returns (for callouts).
 */
export function makeSolid({ outer, holes = [], depth = 0.26, anchors = {} }) {
  const loops = [{ pts: ccw(outer), inner: false }, ...holes.map((pts) => ({ pts: ccw(pts), inner: true }))]
  const wallCount = loops.reduce((n, l) => n + l.pts.length, 0)

  function render(paths, cap, {
    spin, tiltX, tiltY, size, cx, cy, ox = 0, oy = 0,
    fillOpacity, lightTone, darkTone, mix = 0, metal = 0, stroke, strokeOpacity,
  }) {
    const h = depth / 2
    const P = (x, y, z) => xform([x, y, z], spin, ox, oy, tiltX, tiltY)
    const N = (x, y, z) => xform([x, y, z], spin, 0, 0, tiltX, tiltY)
    const capN = N(0, 0, 1)
    const capZ = capN[2] >= 0 ? h : -h
    const sx = (x) => cx + x * size
    const sy = (y) => cy - y * size
    const proj = ([x, y]) => `${sx(x).toFixed(1)},${sy(y).toFixed(1)}`
    const walls = []
    for (const { pts, inner } of loops) {
      for (let i = 0; i < pts.length; i++) {
        const [x1, y1] = pts[i]
        const [x2, y2] = pts[(i + 1) % pts.length]
        let nx = y2 - y1, ny = -(x2 - x1)
        const len = Math.hypot(nx, ny) || 1
        nx /= len; ny /= len
        if (inner) { nx = -nx; ny = -ny }
        const n = N(nx, ny, 0)
        if (n[2] <= 0.001) continue
        const q = [P(x1, y1, h), P(x2, y2, h), P(x2, y2, -h), P(x1, y1, -h)]
        walls.push({ q, z: (q[0][2] + q[1][2] + q[2][2] + q[3][2]) / 4, n })
      }
    }
    walls.sort((a, b) => a.z - b.z)
    const shade = (n) => {
      const lam = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2])
      const t = 0.25 + 0.75 * lam
      const lo = lightTone[0] + (lightTone[1] - lightTone[0]) * t
      const dk = darkTone[0] + (darkTone[1] - darkTone[0]) * t
      let g = lo + (dk - lo) * mix
      if (metal) {
        const spec = Math.pow(Math.max(0, n[0] * HALF[0] + n[1] * HALF[1] + n[2] * HALF[2]), 18)
        g = g * (1 - metal * 0.5) + spec * 290 * metal
      }
      g = Math.round(Math.min(255, Math.max(0, g)))
      return `rgb(${g},${g},${Math.min(255, g + Math.round(metal * 6))})`
    }
    let k = 0
    for (const w of walls) {
      const el = paths[k++]
      if (!el) break
      el.setAttribute('d', `M${w.q.map(proj).join('L')}Z`)
      el.setAttribute('fill', shade(w.n))
    }
    cap.setAttribute('d', loops.map(({ pts }) => `M${pts.map(([x, y]) => proj(P(x, y, capZ))).join('L')}Z`).join(''))
    cap.setAttribute('fill', shade(capN[2] >= 0 ? capN : capN.map((v) => -v)))
    for (; k < paths.length; k++) paths[k].setAttribute('d', '')
    for (const el of [...paths, cap]) {
      el.setAttribute('fill-opacity', fillOpacity.toFixed(3))
      el.setAttribute('stroke', stroke)
      el.setAttribute('stroke-opacity', strokeOpacity.toFixed(3))
    }
    const out = {}
    for (const [name, [x, y]] of Object.entries(anchors)) {
      const [px, py] = P(x, y, capZ)
      out[name] = [sx(px), sy(py)]
    }
    return out
  }

  return { render, wallCount }
}

export function makeGear({ teeth = 12, depth = 0.26, hole = 0.3, bolts = 4, boltRadius = 0.56 } = {}) {
  const holes = [circle(hole, 28)]
  const boltCenters = []
  for (let i = 0; i < bolts; i++) {
    const a = (i / bolts) * TAU + Math.PI / 4
    boltCenters.push([Math.cos(a) * boltRadius, Math.sin(a) * boltRadius])
    holes.push(circle(0.09, 14, 0, Math.cos(a) * boltRadius, Math.sin(a) * boltRadius))
  }
  const solid = makeSolid({
    outer: gearProfile(teeth),
    holes,
    depth,
    anchors: {
      center: [0, 0],
      tip: [1, 0],
      root: [0.8 * Math.cos(Math.PI / teeth), 0.8 * Math.sin(Math.PI / teeth)],
      bore: [hole, 0],
      bolt: boltCenters[0] || [0, 0],
      rim: [-1, 0],
    },
  })
  return { ...solid, teeth, hole }
}
