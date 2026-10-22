import { useRef, useState } from 'react'
import { club, whereabouts } from '../data.js'
import Reveal from './Reveal.jsx'

function CopyEmail() {
  const ref = useRef(null)
  const [label, setLabel] = useState('Copy')
  const flash = (msg) => {
    setLabel(msg)
    setTimeout(() => setLabel('Copy'), 1600)
  }
  const selectText = () => {
    const r = document.createRange()
    r.selectNodeContents(ref.current)
    const s = window.getSelection()
    s.removeAllRanges()
    s.addRange(r)
    flash('Selected')
  }
  const copy = () => {
    try {
      navigator.clipboard.writeText(club.email).then(() => flash('Copied'), selectText)
    } catch {
      selectText()
    }
  }
  return (
    <div className="email">
      <a href={`mailto:${club.email}`} ref={ref}>{club.email}</a>
      <button type="button" className="btn ghost small" onClick={copy}>{label}</button>
    </div>
  )
}

export default function Contact() {
  return (
    <section className="section" id="contact">
      <Reveal className="cta">
        <div className="cta-copy">
          <p className="eyebrow"><span className="code">07</span>Contact</p>
          <h2>Come build with us.</h2>
          <p className="section-sub">Questions about meetings, projects or sponsoring a build? The officers check this inbox every week.</p>
          <CopyEmail />
          <a className="btn ghost small social" href={club.instagram} target="_blank" rel="noopener noreferrer">Follow us on Instagram ↗</a>
        </div>
        <dl className="where">
          {whereabouts.map((w) => (
            <div key={w.k}>
              <dt>{w.k}</dt>
              <dd>{w.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
