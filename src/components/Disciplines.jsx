import { disciplines, opportunities } from '../data.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

const icons = [
  <>
    <rect x="11" y="11" width="18" height="18" rx="1" />
    <path d="M15 11V5M20 11V5M25 11V5M15 35v-6M20 35v-6M25 35v-6M11 15H5M11 20H5M11 25H5M35 15h-6M35 20h-6M35 25h-6" />
  </>,
  <>
    <path d="M20 5l13 7.5v15L20 35 7 27.5v-15z" />
    <path d="M7 12.5L20 20l13-7.5M20 20v15" />
  </>,
  <>
    <path d="M4 30h32M8 30l6-12h12l6 12M14 18l6 12 6-12" />
    <path d="M20 6v6" />
  </>,
  <>
    <path d="M12 7h16v9a8 8 0 0 1-16 0zM12 10H6v3a5 5 0 0 0 6 5M28 10h6v3a5 5 0 0 1-6 5M20 24v6M14 34h12M16 30h8" />
  </>,
  <>
    <path d="M20 33S6 25 6 15a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 10-14 18-14 18z" />
  </>,
]

function Rows({ items, offset = 0 }) {
  return (
    <ul className="rows">
      {items.map((d, i) => (
        <Reveal as="li" className="row" key={d.name} delay={i * 80}>
          <svg className="row-icon" viewBox="0 0 40 40" aria-hidden="true">{icons[offset + i]}</svg>
          <div className="row-name">
            <h3>{d.name}</h3>
            <ul className="tags">
              {d.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <p>{d.text}</p>
        </Reveal>
      ))}
    </ul>
  )
}

export default function Disciplines() {
  return (
    <Section id="what" index="01" label="What we do" title="Build things, compete, give back.">
      <Rows items={disciplines} />
      <Reveal as="p" className="label rows-label">Beyond the shop</Reveal>
      <Rows items={opportunities} offset={disciplines.length} />
    </Section>
  )
}
