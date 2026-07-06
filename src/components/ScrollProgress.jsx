import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

// The hero trail "settles" into this thin line on the left edge — the brand's
// signature visual doing real work as the page's scroll-progress indicator.
export default function ScrollProgress({ visible }) {
  const { scrollYProgress } = useScroll()
  const reducedMotion = useReducedMotion()
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-screen w-[3px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.8 }}
    >
      <div className="absolute inset-0 bg-slate-200/60" />
      <motion.div
        className="absolute inset-0 origin-top bg-ignition"
        style={{ scaleY: reducedMotion ? scrollYProgress : smoothed }}
      />
    </motion.div>
  )
}
