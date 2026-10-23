import { useState } from 'react'
import { faq } from '../data.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

function Item({ f, i }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${i}`
  return (
    <Reveal className={open ? 'faq-item open' : 'faq-item'} delay={i * 60}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          {f.q}
          <span className="plus" aria-hidden="true" />
        </button>
      </h3>
      <div className="faq-a" id={id} role="region">
        <div><p>{f.a}</p></div>
      </div>
    </Reveal>
  )
}

export default function Faq() {
  return (
    <Section id="faq" title="Good to know.">
      <div className="faq">
        {faq.map((f, i) => <Item f={f} i={i} key={f.q} />)}
      </div>
    </Section>
  )
}
