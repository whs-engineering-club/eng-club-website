import { club } from '../data.js'
import { Logo } from './Nav.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="brand"><Logo />{club.name}</span>
          <span>{club.year}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
