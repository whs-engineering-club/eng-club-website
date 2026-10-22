import { club } from '../data.js'
import GearDrawing from './GearDrawing.jsx'

const titleBlock = [
  [['Meets', club.meets], ['Time', club.time], ['Dues', club.dues]],
  [['Location', club.location], ['Dwg no.', club.drawingNo], ['Ratio', `1 : ${(24 / 12).toFixed(1)}`]],
]

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <div className="eyebrow">Now meeting · Fall 2026</div>
        <h1>
          <span className="line"><span className="w">We build</span></span>
          <span className="line">
            <span className="w">
              <span className="hl">things<span className="dimline" aria-hidden="true" /></span>
            </span>
          </span>
          <span className="line"><span className="w">that work.</span></span>
        </h1>
        <p className="lede">
          {club.name} is where students design, prototype, break and rebuild real hardware and software.
          Bring an idea or borrow one of ours. We have the tools, the parts bin, and people who will help you figure it out.
        </p>
        <div className="cta-row">
          <a className="btn primary" href="#join">Join the club <span className="arrow" aria-hidden="true">→</span></a>
          <a className="btn" href="#schedule">See the schedule</a>
        </div>
      </div>

      <figure className="drawing" style={{ margin: 0 }} aria-label="Animated drawing of a three-gear train, with club details below">
        <GearDrawing />
        <div className="tb">
          {titleBlock.map((row, i) => (
            <div className="row" key={i}>
              {row.map(([k, v]) => (
                <div className="cell" key={k}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </figure>
    </section>
  )
}
