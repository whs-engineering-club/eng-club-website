import Reveal from './Reveal.jsx'

export default function SectionHead({ code, title, children }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow"><span className="code">{code}</span>{title}</p>
      {children}
    </Reveal>
  )
}
