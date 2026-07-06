import { useEffect, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { RocketPaths } from './RocketIcon.jsx'
import { SMS_LINK } from '../config/business.js'

// Launch timing (seconds): rest beat → flight → trail settles into the
// scroll-progress line on the left edge.
const LAUNCH_DELAY = 0.6
const LAUNCH_DURATION = 1.9
const LAUNCH_END = LAUNCH_DELAY + LAUNCH_DURATION

// The flight path, in the hero SVG's 800×1000 coordinate space (the viewBox is
// bottom-anchored, so the launch pad stays in frame at every viewport size).
const FLIGHT_PATH =
  'M 470 920 C 500 780 430 620 480 470 C 520 350 570 210 660 -80'

// Initial path tangent ≈ -78°; combined with the icon's nose-up orientation
// (+90°) this keeps the resting rocket aligned with its first direction of travel.
const ROCKET_LOCAL = 'rotate(90) scale(1.15) translate(-50 -50)'
const ROCKET_REST = 'translate(470 920) rotate(12) scale(1.15) translate(-50 -50)'

// Deterministic star field (seeded LCG so the sky never reshuffles on render).
function makeStars(count) {
  let seed = 42
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    r: 0.6 + rand() * 1.3,
    o: 0.25 + rand() * 0.5,
  }))
}

export default function Hero({ onLaunchComplete }) {
  const reducedMotion = useReducedMotion()
  const stars = useMemo(() => makeStars(70), [])

  useEffect(() => {
    if (reducedMotion) return
    const t = setTimeout(() => onLaunchComplete?.(), LAUNCH_END * 1000)
    return () => clearTimeout(t)
  }, [reducedMotion, onLaunchComplete])

  const contentAnim = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 1.1, ease: [0.21, 0.6, 0.35, 1] },
      }

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-900"
    >
      {/* Navy depth gradient + soft horizon glow — the hero alone gets this treatment */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0B1F3A 0%, #16365C 78%, #1d4370 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-72"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 100%, rgba(74,144,217,0.28) 0%, rgba(74,144,217,0) 70%)',
        }}
      />

      {/* Star field */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {stars.map((s) => (
          <circle
            key={s.id}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="#F6F8FB"
            opacity={s.o * 0.6}
          />
        ))}
      </svg>

      {/* The launch sequence — skipped entirely under prefers-reduced-motion */}
      {!reducedMotion && (
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 800 1000"
          preserveAspectRatio="xMidYMax slice"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: LAUNCH_END + 0.3, duration: 0.9 }}
        >
          <defs>
            <path id="flight-path" d={FLIGHT_PATH} />
          </defs>

          {/* Water-spray trail: soft glow pass + crisp pass, drawn via stroke-dashoffset */}
          {[
            { width: 16, opacity: 0.14 },
            { width: 5.5, opacity: 0.85 },
          ].map((pass) => (
            <path
              key={pass.width}
              d={FLIGHT_PATH}
              pathLength="1"
              fill="none"
              stroke="#4A90D9"
              strokeWidth={pass.width}
              strokeLinecap="round"
              strokeOpacity={pass.opacity}
              strokeDasharray="1"
              strokeDashoffset="1"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                begin={`${LAUNCH_DELAY}s`}
                dur={`${LAUNCH_DURATION}s`}
                calcMode="spline"
                keySplines="0.45 0 0.25 1"
                keyTimes="0;1"
                fill="freeze"
              />
            </path>
          ))}

          {/* Droplet particles breaking off the trail as the rocket climbs */}
          {[
            { cx: 480, cy: 800, dx: -26, dy: 40, r: 5, delay: 0.9 },
            { cx: 455, cy: 660, dx: 22, dy: 36, r: 4, delay: 1.2 },
            { cx: 470, cy: 520, dx: -30, dy: 30, r: 6, delay: 1.5 },
            { cx: 505, cy: 400, dx: 24, dy: 28, r: 3.5, delay: 1.8 },
            { cx: 560, cy: 260, dx: -18, dy: 34, r: 4.5, delay: 2.1 },
          ].map((p, i) => (
            <motion.circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill="#4A90D9"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.9, 0], x: p.dx, y: p.dy, scale: 1 }}
              transition={{ delay: p.delay, duration: 1.1, ease: 'easeOut' }}
            />
          ))}

          {/* Pre-launch: the rocket rests on the pad for the opening beat, then
              hands off to the animated twin the moment the motion begins. */}
          <g transform={ROCKET_REST} className="text-cloud">
            <RocketPaths />
            <set attributeName="opacity" to="0" begin={`${LAUNCH_DELAY}s`} fill="freeze" />
          </g>

          {/* The rocket rides the same path (SMIL animateMotion keeps it perfectly
              in sync with the trail draw). Inner transform centers the icon and
              points its nose along the direction of travel. */}
          <g opacity="0">
            <set attributeName="opacity" to="1" begin={`${LAUNCH_DELAY}s`} fill="freeze" />
            <g transform={ROCKET_LOCAL} className="text-cloud">
              <RocketPaths />
            </g>
            <animateMotion
              begin={`${LAUNCH_DELAY}s`}
              dur={`${LAUNCH_DURATION}s`}
              calcMode="spline"
              keySplines="0.45 0 0.25 1"
              keyTimes="0;1"
              keyPoints="0;1"
              rotate="auto"
              fill="freeze"
            >
              <mpath href="#flight-path" />
            </animateMotion>
          </g>
        </motion.svg>
      )}

      {/* Hero content */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32 md:px-8 md:pb-24 md:pt-36">
        <motion.div {...contentAnim} className="max-w-2xl">
          <p className="eyebrow text-spray">Now booking — fall season</p>
          <h1 className="mt-5 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-display text-white md:text-[4.5rem]">
            Liftoff for your driveway.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cloud/85 md:text-lg">
            Blast Off Cleaning is a local pressure washing service for driveways, patios,
            decks, walkways, and fences. We bring the equipment — you bring the water
            spigot — and an hour later it looks brand new.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={SMS_LINK}
              className="rounded-full bg-ignition px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-[1.03] hover:shadow-cta-glow active:scale-[0.97]"
            >
              Get a Free Quote
            </a>
            <a
              href="#results"
              className="px-2 py-2 text-base font-medium text-cloud/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              See the difference ↓
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
