import Reveal, { SectionHeading } from './Reveal.jsx'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Simple line icons, one per surface — drawn inline so they stay on-brand.
const ICONS = {
  driveway: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <path d="M11 27 L15 5 h2 L21 27 Z" />
      <path d="M16 9v3M16 16v3M16 23v2" strokeDasharray="0.1 4.5" />
      <path d="M4 27h24" />
    </svg>
  ),
  walkway: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <path d="M4 27h8v-6h6v-6h6v-6h4" />
      <path d="M8 27v-3M14 21v-3M20 15v-3" />
    </svg>
  ),
  patio: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <path d="M16 4v18M16 22l-6 6M16 22l6 6" />
      <path d="M5 13a11 6.5 0 0 1 22 0Z" />
      <path d="M16 4a4 9 0 0 0-4 9M16 4a4 9 0 0 1 4 9" />
    </svg>
  ),
  deck: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <path d="M4 14h24M4 19h24M4 24h24" />
      <path d="M7 14v13M25 14v13M7 14 16 6l9 8" />
    </svg>
  ),
  fence: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <path d="M7 27V9l2.5-3L12 9v18ZM20 27V9l2.5-3L25 9v18Z" />
      <path d="M12 14h8M12 21h8" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <path d="M8 10h16l-1.5 17h-13Z" />
      <path d="M6 10h20M13 10V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
      <path d="M13 15v7M19 15v7" />
    </svg>
  ),
}

const SERVICES = [
  {
    icon: 'driveway',
    name: 'Driveways',
    blurb: 'Oil stains, tire marks, and years of buildup, lifted in under an hour.',
    price: '$60–$150',
    priceNote: 'depending on size',
  },
  {
    icon: 'walkway',
    name: 'Walkways & Steps',
    blurb: 'The first thing your guests see, finally moss- and grime-free.',
    price: 'From $30',
  },
  {
    icon: 'patio',
    name: 'Patios',
    blurb: 'Bring back the surface you actually want to sit on.',
    price: '$60–$100',
  },
  {
    icon: 'deck',
    name: 'Decks',
    blurb: 'Wood or composite, cleaned carefully without damaging the finish.',
    price: '$75–$150',
  },
  {
    icon: 'fence',
    name: 'Fences',
    blurb: 'Strip away mildew and gray buildup, panel by panel.',
    price: '$1–$2',
    priceNote: 'per linear foot',
  },
  {
    icon: 'trash',
    name: 'Trash Cans',
    blurb: 'Because nobody wants to open a bin that smells like last August.',
    price: '$10–$15',
    priceNote: 'each',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-cloud py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="What we clean" title="Pick your surface. We'll handle the rest." />
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="h-10 w-10 text-spray">{ICONS[s.icon]}</div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-display text-navy-900 md:text-2xl">
                  {s.name}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed">{s.blurb}</p>
                <p className="mt-5 border-t border-slate-200 pt-4 font-mono text-sm text-navy-900">
                  <span className="font-medium">{s.price}</span>
                  {s.priceNote && <span className="text-slate-600"> · {s.priceNote}</span>}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
