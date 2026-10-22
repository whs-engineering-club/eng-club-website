import { club } from '../data.js'

export default function Footer() {
  return (
    <footer>
      <span>{club.name} · {club.year}</span>
      <span>Measure twice, cut once</span>
      <a className="totop" href="#top">Back to top ↑</a>
    </footer>
  )
}
