import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/hooks.js'

// A wire runs down the left edge of the page and taps into every section. It draws as you scroll:
//   - each section's number chip lights when the wire reaches it
//   - card grids (disciplines, projects, FAQ) get a bus along the top with one branch per card
//   - the schedule gets a timeline rail with a node per meeting
//   - the join steps, sponsors conveyor and contact panel each get their own tap
// Geometry is measured from the DOM (layout positions, so reveal transforms don't matter) and rebuilt
// whenever the page resizes. Anything the wire reaches gets data-lit, which the CSS reacts to.

const NS = 'http://www.w3.org/2000/svg'
const CHAMFER = 6 // PCB-style 45° corners
const TAP_SPAN = 70 // scroll px a short tap takes to finish drawing
const BUS_SPAN = 240
const RAIL_SPAN = 320

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

function box(el, root) {
  let x = 0
  let y = 0
  for (let n = el; n && n !== root; n = n.offsetParent) {
    x += n.offsetLeft
    y += n.offsetTop
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

function svgEl(tag, attrs, parent) {
  const n = document.createElementNS(NS, tag)
  for (const k in attrs) n.setAttribute(k, attrs[k])
  parent.appendChild(n)
  return n
}

// Polyline through pts with each interior corner cut at 45°.
function chamfer(pts, r) {
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1]
    const [x, y] = pts[i]
    const [nx, ny] = pts[i + 1]
    const l1 = Math.hypot(x - px, y - py)
    const l2 = Math.hypot(nx - x, ny - y)
    const a = Math.min(r, l1 / 2)
    const b = Math.min(r, l2 / 2)
    d += ` L${x - ((x - px) / l1) * a} ${y - ((y - py) / l1) * a} L${x + ((nx - x) / l2) * b} ${y + ((ny - y) / l2) * b}`
  }
  const last = pts[pts.length - 1]
  return `${d} L${last[0]} ${last[1]}`
}

const setOn = (n, on) => n.toggleAttribute('data-on', on)

// Measures the page and draws the wire. Returns update(front): front is the page y the signal has reached.
function build(main, svg) {
  svg.replaceChildren()
  const W = main.offsetWidth
  const H = main.offsetHeight
  svg.setAttribute('width', W)
  svg.setAttribute('height', H)
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`)

  const section = main.querySelector('.section')
  const chips = [...main.querySelectorAll('.eyebrow .code')].filter((c) => !c.closest('.cta'))
  const cta = main.querySelector('.cta')
  if (!section || !chips.length) return () => {}

  const contentLeft = section.offsetLeft + parseFloat(getComputedStyle(section).paddingLeft)
  const T = contentLeft - Math.min(contentLeft - 8, 34) // trunk x
  const center = (b) => b.y + b.h / 2

  const first = box(chips[0], main)
  const yStart = center(first)
  const yEnd = cta ? center(box(cta, main)) : center(box(chips[chips.length - 1], main))

  // Trunk
  const trunkD = `M${T} ${yStart} L${T} ${yEnd}`
  const trunkLen = yEnd - yStart
  svgEl('path', { d: trunkD, class: 'sg-base' }, svg)
  const glow = svgEl('path', { d: trunkD, class: 'sg-glow', 'stroke-dasharray': trunkLen }, svg)
  const trunk = svgEl('path', { d: trunkD, class: 'sg-lit', 'stroke-dasharray': trunkLen }, svg)
  const startPad = svgEl('circle', { cx: T, cy: yStart, r: 5, class: 'sg-pad' }, svg)
  const endPad = svgEl('circle', { cx: T, cy: yEnd, r: 5, class: 'sg-pad' }, svg)

  // Branches. Each leaves the trunk at (T, y0), steps out at 45°, and ends in a pad.
  const groups = []
  function group(span) {
    const g = { span, items: [], speed: 1 }
    groups.push(g)
    return g
  }
  function branch(g, pts, { target, flow } = {}) {
    const d = chamfer(pts, CHAMFER)
    svgEl('path', { d, class: 'sg-base' }, svg)
    const lit = svgEl('path', { d, class: 'sg-lit' }, svg)
    const len = lit.getTotalLength()
    lit.setAttribute('stroke-dasharray', len)
    const flowPath = flow ? svgEl('path', { d, class: 'sg-flow' }, svg) : null
    const jct = svgEl('circle', { cx: pts[0][0], cy: pts[0][1], r: 2.5, class: 'sg-pad' }, svg)
    const end = pts[pts.length - 1]
    const pad = svgEl('circle', { cx: end[0], cy: end[1], r: 3, class: 'sg-pad' }, svg)
    g.items.push({ lit, len, y0: pts[0][1], jct, pad, target, flowPath, last: -1 })
  }
  // A straight tap from the trunk out to x at height y.
  const tap = (g, y, x, opts) => branch(g, [[T, y], [x, y]], opts)

  // Section number chips
  chips.forEach((chip) => {
    const b = box(chip, main)
    tap(group(TAP_SPAN), center(b), b.x - 5, { target: chip })
  })

  // Card grids: a bus above each row, one drop per card.
  const rows = []
  for (const e of main.querySelectorAll('[data-port]')) {
    const b = box(e, main)
    const row = rows.find((r) => Math.abs(r.y - b.y) < 6)
    if (row) row.items.push({ e, b })
    else rows.push({ y: b.y, items: [{ e, b }] })
  }
  for (const row of rows) {
    const busY = row.y - 11
    const g = group(BUS_SPAN)
    for (const { e, b } of row.items) {
      const cx = b.x + b.w / 2
      branch(g, [[T, busY - 10], [T + 10, busY], [cx, busY], [cx, row.y - 4]], { target: e })
    }
  }

  // Schedule: tap into the card, then a node per meeting down the rail inside it.
  const lis = [...main.querySelectorAll('.events li')]
  const upcoming = main.querySelector('.upcoming')
  const liYs = lis.map((li) => center(box(li, main)))
  if (upcoming && lis.length) tap(group(TAP_SPAN), liYs[0], box(upcoming, main).x - 6)

  // Join: tap into the first step node; the steps' own trace carries on from there.
  const node = main.querySelector('.steps .node')
  if (node) {
    const b = box(node, main)
    tap(group(TAP_SPAN), center(b), b.x)
  }

  // Sponsors: rails above and below the conveyor, with signal flowing along them.
  const marquee = main.querySelector('.marquee')
  if (marquee) {
    const b = box(marquee, main)
    for (const y of [b.y - 12, b.y + b.h + 12]) {
      branch(group(RAIL_SPAN), [[T, y - 10], [T + 10, y], [W - 16, y]], { flow: true })
    }
  }

  // Contact: the wire ends by plugging into the panel.
  if (cta) {
    const b = box(cta, main)
    tap(group(TAP_SPAN), center(b), b.x - 6, { target: cta })
  }

  for (const g of groups) {
    const longest = Math.max(...g.items.map((i) => i.len))
    g.speed = Math.max(longest, 1) / g.span
  }

  const head = svgEl('circle', { cx: T, cy: yStart, r: 9, class: 'sg-halo' }, svg)
  const dot = svgEl('circle', { cx: T, cy: yStart, r: 3.5, class: 'sg-head' }, svg)

  return (front) => {
    const drawn = clamp(front - yStart, 0, trunkLen)
    const off = trunkLen - drawn
    trunk.style.strokeDashoffset = off
    glow.style.strokeDashoffset = off
    setOn(startPad, front >= yStart)
    setOn(endPad, drawn >= trunkLen)
    const hy = clamp(front, yStart, yEnd)
    head.setAttribute('cy', hy)
    dot.setAttribute('cy', hy)
    const live = front > yStart && front < yEnd
    head.style.opacity = live ? '' : 0
    dot.style.opacity = live ? '' : 0

    for (const g of groups) {
      for (const it of g.items) {
        const d = clamp((front - it.y0) * g.speed, 0, it.len)
        if (d !== it.last) {
          it.last = d
          it.lit.style.strokeDashoffset = it.len - d
        }
        const done = d >= it.len - 0.5
        setOn(it.jct, front >= it.y0)
        setOn(it.pad, done)
        if (it.flowPath) setOn(it.flowPath, done)
        if (it.target) it.target.toggleAttribute('data-lit', done)
      }
    }

    // Schedule rail: node per meeting, segment fill between them.
    lis.forEach((li, i) => {
      li.toggleAttribute('data-lit', front >= liYs[i])
      if (i < lis.length - 1) {
        const seg = clamp((front - liYs[i]) / (liYs[i + 1] - liYs[i]), 0, 1)
        li.style.setProperty('--seg', seg.toFixed(3))
      }
    })
  }
}

export default function SignalLine() {
  const ref = useRef(null)

  useEffect(() => {
    const svg = ref.current
    const main = svg.parentElement
    const reduce = prefersReducedMotion()
    main.classList.add('signal-on')
    // Normalise icon strokes so CSS can draw them on.
    main.querySelectorAll('.disc-icon > *').forEach((n) => n.setAttribute('pathLength', '1'))

    let apply = () => {}
    let top = 0
    let target = 0
    let cur = 0
    let raf = 0
    let rebuildRaf = 0

    // The page y the signal has reached: a little below mid-screen, sliding to the bottom by the end of the page.
    const frontNow = () => {
      if (reduce) return Infinity
      const vh = window.innerHeight
      const max = document.documentElement.scrollHeight - vh
      const page = max > 0 ? clamp(window.scrollY / max, 0, 1) : 1
      return window.scrollY + vh * (0.55 + 0.35 * page) - top
    }
    const frame = () => {
      raf = 0
      cur += (target - cur) * 0.2
      if (Math.abs(target - cur) < 0.5) cur = target
      apply(cur)
      if (cur !== target) raf = requestAnimationFrame(frame)
    }
    const onScroll = () => {
      target = frontNow()
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const rebuild = () => {
      rebuildRaf = 0
      top = main.getBoundingClientRect().top + window.scrollY
      apply = build(main, svg)
      target = frontNow()
      if (reduce || cur > target) cur = target
      apply(cur)
      if (cur !== target && !raf) raf = requestAnimationFrame(frame)
    }
    const schedule = () => {
      if (!rebuildRaf) rebuildRaf = requestAnimationFrame(rebuild)
    }

    const ro = new ResizeObserver(schedule)
    ro.observe(main)
    window.addEventListener('load', schedule)
    document.fonts?.ready.then(schedule)
    if (!reduce) window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(rebuildRaf)
      ro.disconnect()
      window.removeEventListener('load', schedule)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', schedule)
      main.classList.remove('signal-on')
      main.querySelectorAll('[data-lit]').forEach((n) => n.removeAttribute('data-lit'))
      svg.replaceChildren()
    }
  }, [])

  return <svg className="signal" ref={ref} aria-hidden="true" />
}
