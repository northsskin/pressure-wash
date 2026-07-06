import { useCallback, useRef, useState } from 'react'
import Reveal, { SectionHeading } from './Reveal.jsx'
import { GALLERY_PAIRS } from '../config/gallery.js'
import { SMS_LINK } from '../config/business.js'

// Draggable divider handle, styled as a water droplet (pointing left, i.e. the
// "before" side it's wiping away).
function DropletHandle() {
  return (
    <div className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
      <svg viewBox="0 0 48 48" className="h-12 w-12 drop-shadow-lg">
        <path
          d="M24 4 C33 14 40 20.5 40 28 a16 16 0 0 1-32 0 C8 20.5 15 14 24 4 Z"
          fill="#FFFFFF"
          stroke="#4A90D9"
          strokeWidth="2.5"
        />
        <path d="M19 25l-4 4 4 4M29 25l4 4-4 4" fill="none" stroke="#0B1F3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function BeforeAfterSlider({ pair }) {
  const containerRef = useRef(null)
  const [pos, setPos] = useState(50) // divider position, % from left
  const [dragging, setDragging] = useState(false)
  const [broken, setBroken] = useState(false)

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(98, Math.max(2, pct)))
  }, [])

  const onPointerDown = (e) => {
    e.preventDefault()
    setDragging(true)
    containerRef.current?.setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e) => {
    if (dragging) updateFromClientX(e.clientX)
  }
  const stopDragging = () => setDragging(false)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(2, p - 4))
    if (e.key === 'ArrowRight') setPos((p) => Math.min(98, p + 4))
    if (e.key === 'Home') setPos(2)
    if (e.key === 'End') setPos(98)
  }

  // The gallery image files are intentionally absent until real job photos
  // exist (see src/config/gallery.js) — show an honest placeholder instead of
  // a broken slider.
  if (broken) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center md:py-20">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-spray" aria-hidden="true">
          <path
            d="M12 3 C15.5 8 18 11.5 18 15 a6 6 0 0 1-12 0 C6 11.5 8.5 8 12 3 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <p className="eyebrow text-spray">Real photos in progress</p>
        <p className="max-w-md leading-relaxed">
          We're a brand-new business, and we only show real results — no stock photos, no
          fakes. Before-and-after shots from our first jobs will land here soon.
        </p>
        <a
          href={SMS_LINK}
          className="mt-1 font-medium text-navy-900 underline decoration-spray decoration-2 underline-offset-4 transition-colors hover:text-spray"
        >
          Want yours to be one of them? Text us.
        </a>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] touch-none select-none overflow-hidden rounded-2xl shadow-card md:aspect-[16/9]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <img
        src={`${import.meta.env.BASE_URL}${pair.before}`}
        alt={`${pair.label} before cleaning`}
        loading="lazy"
        onError={() => setBroken(true)}
        className="absolute inset-0 h-full w-full object-cover"
        draggable="false"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img
          src={`${import.meta.env.BASE_URL}${pair.after}`}
          alt={`${pair.label} after cleaning`}
          loading="lazy"
          onError={() => setBroken(true)}
          className="absolute inset-0 h-full w-full object-cover"
          draggable="false"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-navy-900/80 px-3 py-1 font-mono text-xs uppercase tracking-label text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-spray/90 px-3 py-1 font-mono text-xs uppercase tracking-label text-white">
        After
      </span>

      {/* divider + droplet handle (keyboard operable) */}
      <div
        role="slider"
        aria-label={`Reveal after photo for ${pair.label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 w-1 -translate-x-1/2 cursor-ew-resize bg-white/90"
        style={{ left: `${pos}%` }}
      >
        <DropletHandle />
      </div>
    </div>
  )
}

export default function Results() {
  const [active, setActive] = useState(0)
  const pair = GALLERY_PAIRS[active]

  return (
    <section id="results" className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="See it for yourself" title="Before & after." />
        <Reveal delay={1} className="mt-8 md:mt-12">
          <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Job photos">
            {GALLERY_PAIRS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  i === active
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-spray hover:text-navy-900'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <BeforeAfterSlider key={pair.id} pair={pair} />
        </Reveal>
      </div>
    </section>
  )
}
