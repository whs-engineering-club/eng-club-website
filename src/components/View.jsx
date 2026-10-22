import Reveal from './Reveal.jsx'

// A page section framed like a lettered view on an engineering drawing.
export default function View({ id, tag, title, callout, children }) {
  return (
    <section className="view" id={id}>
      <Reveal className="view-head">
        <span className="tag">{tag}</span>
        <h2>{title}</h2>
        <span className="callout">{callout}</span>
      </Reveal>
      {children}
    </section>
  )
}
