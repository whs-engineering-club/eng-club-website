import Reveal from './Reveal.jsx'

// Numbered section: a hairline that draws across, a heading column that stays pinned
// beside the content on wide screens, and the content itself.
export default function Section({ id, index, label, title, sub, className = '', children }) {
  return (
    <section className={`section ${className}`} id={id}>
      <div className="container">
        <Reveal className="rule" />
        <div className="section-inner">
          <Reveal className="section-head">
            <p className="label"><span className="idx">{index}</span>{label}</p>
            <h2><span className="mask"><span>{title}</span></span></h2>
            {sub && <p className="section-sub">{sub}</p>}
          </Reveal>
          <div className="section-body">{children}</div>
        </div>
      </div>
    </section>
  )
}
