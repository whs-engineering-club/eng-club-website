import { club } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="label">{club.name} · {club.year}</span>
      <a className="label" href="#top">Back to top</a>
    </footer>
  )
}
