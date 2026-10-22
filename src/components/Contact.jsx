import { useRef, useState } from 'react'
import { club, whereabouts } from '../data.js'

function CopyEmail() {
  const codeRef = useRef(null)
  const [label, setLabel] = useState('Copy')
  const flash = (msg) => {
    setLabel(msg)
    setTimeout(() => setLabel('Copy'), 1600)
  }
  const selectText = () => {
    const r = document.createRange()
    r.selectNodeContents(codeRef.current)
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
      <a href={`mailto:${club.email}`} ref={codeRef}>{club.email}</a>
      <button type="button" onClick={copy}>{label}</button>
    </div>
  )
}

export default function Contact() {
  return (
    <section className="block" id="contact">
      <div className="block-head">
        <p className="label">Contact</p>
        <h2>Questions? Email us.</h2>
      </div>
      <CopyEmail />
      <dl className="where">
        {whereabouts.map((w) => (
          <div key={w.k}>
            <dt className="label">{w.k}</dt>
            <dd>{w.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
