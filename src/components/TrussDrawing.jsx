// Elevation drawing of a Pratt truss (the balsa build-off bridge). Members draw in on load,
// then nodes, supports, dimensions and the load arrow follow.
const members = [
  'M40 200H520',
  'M120 100H440',
  'M40 200L120 100',
  'M520 200L440 100',
  'M120 100V200',
  'M200 100V200',
  'M280 100V200',
  'M360 100V200',
  'M440 100V200',
  'M120 100L200 200',
  'M200 100L280 200',
  'M440 100L360 200',
  'M360 100L280 200',
]

const nodes = [
  [40, 200], [120, 200], [200, 200], [280, 200], [360, 200], [440, 200], [520, 200],
  [120, 100], [200, 100], [280, 100], [360, 100], [440, 100],
]

export default function TrussDrawing() {
  return (
    <figure className="drawing" aria-label="Technical drawing of a Pratt truss bridge, 300 mm span">
      <svg viewBox="0 0 600 330" role="img" aria-hidden="true">
        <path className="centerline" d="M280 50V236" />

        <g className="members">
          {members.map((d, i) => (
            <path key={d} d={d} pathLength="1" style={{ '--i': i }} />
          ))}
        </g>

        <g className="nodes">
          {nodes.map(([x, y], i) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" style={{ '--i': i }} />
          ))}
        </g>

        <g className="annot">
          <path d="M40 200L29 218H51Z" />
          <path d="M22 223H58" />
          <path d="M520 200L510 214H530Z" />
          <circle cx="514" cy="219" r="3" />
          <circle cx="526" cy="219" r="3" />
          <path d="M504 225H536" />

          <path className="thin" d="M40 232V276M520 232V276M40 266H520M35 271L45 261M515 271L525 261" />
          <text x="280" y="258" textAnchor="middle">SPAN 300</text>

          <path className="thin" d="M450 100H570M540 200H570M562 100V200M557 105L567 95M557 205L567 195" />
          <text x="580" y="146" textAnchor="middle" transform="rotate(-90 580 150)">60</text>

          <path className="load" d="M280 24V90M273 80L280 92L287 80" />
          <text x="292" y="36">P</text>
        </g>

        <text className="caption" x="40" y="318">FIG. 01   PRATT TRUSS · BALSA BUILD-OFF · UNITS: MM</text>
      </svg>
    </figure>
  )
}
