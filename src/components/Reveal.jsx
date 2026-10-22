import { RevealContext, useReveal } from '../lib/hooks.js'

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const { ref, pre } = useReveal()
  const cls = [className, 'reveal', pre && 'pre'].filter(Boolean).join(' ')
  return (
    <RevealContext.Provider value={!pre}>
      <Tag ref={ref} className={cls} style={{ ...style, '--delay': `${delay}ms` }} {...rest}>
        {children}
      </Tag>
    </RevealContext.Provider>
  )
}
