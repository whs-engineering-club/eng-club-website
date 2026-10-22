import { steps } from '../data.js'
import View from './View.jsx'
import Reveal from './Reveal.jsx'

export default function Join() {
  return (
    <View id="join" tag="D" title="How to join" callout="View D · Takes one meeting">
      <Reveal as="ol" className="steps">
        {steps.map((s) => (
          <li key={s.title}>
            <span className="num" aria-hidden="true" />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </Reveal>
    </View>
  )
}
