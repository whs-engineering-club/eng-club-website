// CAD-style "renders" of three season builds, as extruded profiles for makeSolid().
// Each part carries anchors (for callouts) and notes drawn from the meeting plan.
import { circle, makeSolid } from './gear.js'

// Shrink a triangle toward its incenter so each opening leaves a member of thickness t.
function insetTriangle([a, b, c], t) {
  const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1])
  const la = d(b, c), lb = d(a, c), lc = d(a, b)
  const per = la + lb + lc
  const I = [(la * a[0] + lb * b[0] + lc * c[0]) / per, (la * a[1] + lb * b[1] + lc * c[1]) / per]
  const area = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2
  const r = (2 * area) / per
  const k = Math.max(0.05, (r - t) / r)
  return [a, b, c].map((p) => [I[0] + (p[0] - I[0]) * k, I[1] + (p[1] - I[1]) * k])
}

// Popsicle-stick bridge: a Warren truss, 5 panels, parallel chords.
function truss() {
  const L = 1.4, H = 0.3, n = 5, p = (2 * L) / n, t = 0.055
  const B = Array.from({ length: n + 1 }, (_, i) => [-L + i * p, -H])
  const T = Array.from({ length: n }, (_, i) => [-L + p / 2 + i * p, H])
  const tris = []
  for (let i = 0; i < n; i++) tris.push([B[i], B[i + 1], T[i]])
  for (let i = 0; i < n - 1; i++) tris.push([T[i], B[i + 1], T[i + 1]])
  tris.push([B[0], T[0], [-L, H]], [B[n], [L, H], T[n - 1]])
  return makeSolid({
    outer: [[-L, -H], [L, -H], [L, H], [-L, H]],
    holes: tris.map((tr) => insetTriangle(tr, t)),
    depth: 0.14,
    anchors: { left: [-L, -H], right: [L, -H], top: [0, H], node: T[2], member: B[2] },
  })
}

// Prosthetic hand: palm, four fingers and a thumb, with knuckle pin holes for the tendons.
function hand() {
  const fingers = [[0.27, 0.5, 0.66], [0.02, 0.25, 0.9], [-0.23, 0.0, 0.96], [-0.48, -0.25, 0.76]]
  const base = 0.06
  const pts = [[-0.4, -1.0], [0.4, -1.0], [0.52, -0.3], [0.5, base]]
  fingers.forEach(([a, b, h]) => { pts.push([b, base], [b, h], [(a + b) / 2, h + 0.07], [a, h], [a, base]) })
  pts.push([-0.52, -0.08], [-0.88, 0.22], [-0.97, 0.12], [-0.66, -0.42])
  const pins = fingers.map(([a, b]) => circle(0.04, 12, 0, (a + b) / 2, 0.2))
  return makeSolid({
    outer: pts,
    holes: [...pins, circle(0.05, 12, 0, 0, -0.55)],
    depth: 0.26,
    anchors: { tip: [-0.115, 1.03], pin: [0.135, 0.2], thumb: [-0.95, 0.15], wrist: [0.4, -1.0] },
  })
}

// Bottle rocket: a side-profile cutout with nose cone and two fins.
function rocket() {
  return makeSolid({
    outer: [[-0.18, -0.8], [0.18, -0.8], [0.62, -1.0], [0.18, -0.36], [0.18, 0.55], [0, 1.0], [-0.18, 0.55], [-0.18, -0.36], [-0.62, -1.0]],
    holes: [circle(0.075, 14, 0, 0, 0.22)],
    depth: 0.36,
    anchors: { nose: [0, 1.0], fin: [0.62, -1.0], body: [0.18, 0.1], base: [-0.18, -0.8] },
  })
}

// Keyed by the activity title in the season plan (data.js). Notes come from its materials lists.
export const PARTS = {
  'Popsicle Stick Bridge Build & Load Test': {
    solid: truss(),
    file: 'popsicle_bridge.dxf',
    notes: [
      { at: 'member', label: 'Popsicle sticks', sub: 'Wood glue or hot glue' },
      { at: 'top', label: 'Load point', sub: 'Books and water bottles' },
      { at: 'right', label: 'Most weight held wins', sub: 'Teams compete' },
    ],
  },
  'Bottle Rocket Launch': {
    solid: rocket(),
    file: 'bottle_rocket.step',
    notes: [
      { at: 'nose', label: 'Recycled 2-liter bottle', sub: 'Pressurized with a pump' },
      { at: 'fin', label: 'Cardboard fins', sub: 'Keep the flight straight' },
      { at: 'base', label: 'Measure the altitude', sub: 'Cork and pump launcher' },
    ],
  },
  'Prosthetic Hand Build': {
    solid: hand(),
    file: 'prosthetic_hand.step',
    notes: [
      { at: 'tip', label: 'String tendons', sub: 'Pull to curl a finger' },
      { at: 'pin', label: 'Straw joints', sub: 'One per knuckle' },
      { at: 'wrist', label: 'Cardboard palm', sub: 'Straws, string, tape' },
    ],
  },
}
