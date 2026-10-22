import { tools } from '../data.js'

export default function Marquee() {
  // The list is doubled so the loop is seamless.
  const items = [...tools, ...tools]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {items.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  )
}
