import { club } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <span>{club.name} · {club.year}</span>
      <span className="footer-status"><span className="led on" aria-hidden="true" />All systems go</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}
