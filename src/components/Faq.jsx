import { faq } from '../data.js'

export default function Faq() {
  return (
    <section className="block" id="faq">
      <div className="block-head">
        <p className="label">Questions</p>
        <h2>Good to know</h2>
      </div>
      <div className="faq">
        {faq.map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <span className="plus" aria-hidden="true" />
            </summary>
            <p className="muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
