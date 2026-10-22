import { faq } from '../data.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function Faq() {
  return (
    <section className="section" id="faq">
      <SectionHead code="05" title="FAQ">
        <h2>Good to know.</h2>
      </SectionHead>
      <div className="faq">
        {faq.map((f, i) => (
          <Reveal as="details" className="card faq-item" key={f.q} delay={(i % 2) * 90}>
            <summary>
              {f.q}
              <span className="plus" aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
