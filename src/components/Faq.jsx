import { faq } from '../data.js'
import View from './View.jsx'
import Reveal from './Reveal.jsx'

export default function Faq() {
  return (
    <View id="faq" tag="E" title="Questions" callout="View E · FAQ">
      <Reveal className="faq">
        {faq.map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <span className="pm" aria-hidden="true" />
            </summary>
            <div className="ans"><div><p>{f.a}</p></div></div>
          </details>
        ))}
      </Reveal>
    </View>
  )
}
