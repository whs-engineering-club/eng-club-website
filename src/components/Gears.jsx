// Three meshing spur gears drawn as line art. Rotation is driven by the
// parent's --p scroll variable; each gear's ratio and phase keep the teeth meshed.

function gearPath(teeth, r, cx, cy) {
  const ro = r * 1.12
  const ri = r * 0.88
  const step = (Math.PI * 2) / teeth
  const pts = []
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    for (const [rad, k] of [[ri, -0.5], [ri, -0.27], [ro, -0.14], [ro, 0.14], [ri, 0.27]]) {
      const th = a + step * k
      pts.push(`${(cx + Math.cos(th) * rad).toFixed(2)},${(cy + Math.sin(th) * rad).toFixed(2)}`)
    }
  }
  return `M${pts.join('L')}Z`
}

// Module 10: pitch radius = 10 * teeth / 2, so center distances equal the sum of radii.
// Phases: for gear B meshing with A along angle θ, φB = θ + 180° − 180°/tB − (φA − θ)·tA/tB.
const GEARS = [
  { t: 24, x: 230, y: 250, ratio: 1, phase: 0 },
  { t: 12, x: 410, y: 250, ratio: -2, phase: 165 },
  { t: 16, x: 480, y: 128.76, ratio: 1.5, phase: -60 },
]

export default function Gears() {
  return (
    <svg className="gears" viewBox="0 0 600 440" aria-hidden="true">
      {GEARS.map((g, i) => {
        const r = (10 * g.t) / 2
        return (
          <g
            key={g.t}
            className="gear"
            style={{ '--ratio': g.ratio, '--phase': `${g.phase}deg`, transformOrigin: `${g.x}px ${g.y}px` }}
          >
            <path className="outline" d={gearPath(g.t, r, g.x, g.y)} pathLength="1" style={{ '--d': `${i * 0.15}s` }} />
            <circle className="pitch" cx={g.x} cy={g.y} r={r} />
            <circle className="hub" cx={g.x} cy={g.y} r={r * 0.2} />
            <line className="mark" x1={g.x} y1={g.y} x2={g.x + r * 0.62} y2={g.y} />
          </g>
        )
      })}
    </svg>
  )
}
