import { disciplines } from '../data.js'
import View from './View.jsx'
import Reveal from './Reveal.jsx'

const icons = {
  robot: (
    <>
      <rect x="6" y="14" width="28" height="18" rx="2" />
      <circle cx="14" cy="23" r="4" />
      <circle cx="26" cy="23" r="4" />
      <path d="M14 14V8h12v6" />
      <path d="M20 8V4" />
    </>
  ),
  chip: (
    <>
      <rect x="10" y="10" width="20" height="20" rx="1" />
      <path d="M14 10V5M20 10V5M26 10V5M14 35v-5M20 35v-5M26 35v-5M10 14H5M10 20H5M10 26H5M35 14h-5M35 20h-5M35 26h-5" />
    </>
  ),
  house: (
    <>
      <path d="M6 32h28" />
      <path d="M12 32V18l8-10 8 10v14" />
      <path d="M16 32v-8h8v8" />
    </>
  ),
  graph: (
    <>
      <path d="M5 30l8-8 6 6 9-12 7 7" />
      <path d="M5 35h30M5 5v30" />
    </>
  ),
}

export default function Disciplines() {
  return (
    <View id="what" tag="A" title="What we do" callout="View A · Four disciplines">
      <Reveal className="disciplines">
        {disciplines.map((d, i) => (
          <div className="disc" key={d.name}>
            <span className="n">A.{i + 1}</span>
            <div className="ico">
              <svg viewBox="0 0 40 40" aria-hidden="true">{icons[d.icon]}</svg>
            </div>
            <h3>{d.name}</h3>
            <p>{d.text}</p>
          </div>
        ))}
      </Reveal>
    </View>
  )
}
