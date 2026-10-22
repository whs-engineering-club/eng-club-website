import { Fragment, useEffect, useRef, useState } from 'react'
import { club, whereabouts } from '../data.js'
import { drawGear, readColors } from '../lib/gears.js'
import { prefersReducedMotion, useThemeVersion } from '../lib/hooks.js'
import View from './View.jsx'
import Reveal from './Reveal.jsx'

function SpinningGear() {
  const ref = useRef(null)
  const themeVersion = useThemeVersion()
  useEffect(() => {
    const ctx = ref.current.getContext('2d')
    const c = readColors()
    const colors = { ...c, sheet: 'transparent', ink: c.paper }
    const reduce = prefersReducedMotion()
    let a = 0
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, 480, 480)
      drawGear(ctx, colors, { x: 240, y: 240, t: 20, r: 180 }, a, true)
      a += 0.003
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [themeVersion])
  return <canvas ref={ref} width="480" height="480" aria-hidden="true" />
}

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
    <div className="copy-line">
      <code ref={codeRef}>{club.email}</code>
      <button type="button" onClick={copy}>{label}</button>
    </div>
  )
}

export default function Contact() {
  return (
    <View id="contact" tag="F" title="Get in touch" callout="View F · Contact">
      <Reveal className="contact">
        <div className="contact-card">
          <SpinningGear />
          <h3>Questions? Email us.</h3>
          <p>The officers check this inbox every week. Ask about meetings, projects, or sponsoring a build.</p>
          <CopyEmail />
        </div>
        <div className="where">
          <dl>
            {whereabouts.map((w) => (
              <Fragment key={w.k}>
                <dt>{w.k}</dt>
                <dd>{w.v}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </Reveal>
    </View>
  )
}
