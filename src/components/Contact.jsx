import { useRef, useState } from 'react'
import { club, whereabouts } from '../data.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

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
      <button type="button" className="btn outline small" onClick={copy}>{label}</button>
    </div>
  )
}

export default function Contact() {
  return (
    <Section
      id="contact"
      index="07"
      label="Contact"
      title="Come build with us."
      sub="Questions about meetings, projects or sponsoring a build? The officers check this inbox every week."
      className="dark"
    >
      <Reveal className="contact">
        <CopyEmail />
        <dl className="where">
          {whereabouts.map((w) => (
            <div key={w.k}>
              <dt>{w.k}</dt>
              <dd>{w.v}</dd>
            </div>
          ))}
          <div>
            <dt>Instagram</dt>
            <dd><a href={club.instagram} target="_blank" rel="noopener noreferrer">@engineeringclub_westlake</a></dd>
          </div>
        </dl>
      </Reveal>
    </Section>
  )
}
