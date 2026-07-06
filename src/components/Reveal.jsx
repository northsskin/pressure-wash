import { motion, useReducedMotion } from 'framer-motion'

// Shared scroll-reveal: sections fade and rise 16px as they enter the
// viewport. Children can stagger by passing `delay` (in multiples of 80ms).
export default function Reveal({ children, delay = 0, className, as = 'div' }) {
  const reducedMotion = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: delay * 0.08, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, dark = false }) {
  return (
    <Reveal>
      <p className={`eyebrow ${dark ? 'text-spray' : 'text-spray'}`}>{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-[2rem] font-semibold leading-tight tracking-display md:text-[2.75rem] ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </h2>
    </Reveal>
  )
}
