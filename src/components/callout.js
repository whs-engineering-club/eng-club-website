// Places one callout: a leader from the anchor, bending once, to a label kept inside the stage.
// Writes attributes and transforms directly; called from a draw loop, so no React state.
export function placeCallout({ line, label, anchor: [ax, ay], offset: [dx, dy], opacity, bounds }) {
  const w = label ? label.offsetWidth : 0
  const lx = dx < 0 ? Math.max(ax + dx, w + 12) : Math.min(ax + dx, bounds.width - w - 12)
  const ly = Math.min(Math.max(ay + dy, 72), bounds.height - 36)
  if (line) {
    line.setAttribute('points', `${ax.toFixed(1)},${ay.toFixed(1)} ${(ax + (lx - ax) * 0.6).toFixed(1)},${ly.toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)}`)
    line.setAttribute('opacity', opacity.toFixed(3))
  }
  if (label) {
    label.style.opacity = opacity.toFixed(3)
    label.style.transform = `translate3d(${lx.toFixed(1)}px, ${ly.toFixed(1)}px, 0) translate(${dx < 0 ? '-100%' : '0'}, -50%)`
  }
}

// Reads a CSS custom property from the root (cached by the caller; not per frame).
export const cssVar = (name, fallback) =>
  (typeof window !== 'undefined' && getComputedStyle(document.documentElement).getPropertyValue(name).trim()) || fallback
