import { RevealContext, useReveal } from '../lib/hooks.js'

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const { ref, pre, revealed } = useReveal(delay)
  const cls = [className, 'reveal', pre && 'pre'].filter(Boolean).join(' ')
  return (
    <RevealContext.Provider value={revealed}>
      <Tag ref={ref} className={cls} {...rest}>
        {children}
      </Tag>
    </RevealContext.Provider>
  )
}
