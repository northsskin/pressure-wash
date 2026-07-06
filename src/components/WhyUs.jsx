import Reveal, { SectionHeading } from './Reveal.jsx'

const POINTS = [
  {
    title: 'You talk to the person doing the work.',
    body: 'No call center, no subcontractors — just direct texts and calls with the person actually cleaning your property.',
  },
  {
    title: 'Pricing before we start.',
    body: "You'll know the price upfront. No surprise add-ons once the job is done.",
  },
  {
    title: 'Flexible scheduling.',
    body: 'Evening and weekend appointments built around your week, not ours.',
  },
  {
    title: "We don't leave until you're happy.",
    body: "If something's not right, tell us before we pack up and we'll fix it on the spot.",
  },
]

// A small water-droplet bullet — the brand accent doing the pointing.
function Droplet() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-spray" aria-hidden="true">
      <path
        d="M12 3 C15.5 8 18 11.5 18 15 a6 6 0 0 1-12 0 C6 11.5 8.5 8 12 3 Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M12 3 C15.5 8 18 11.5 18 15 a6 6 0 0 1-12 0 C6 11.5 8.5 8 12 3 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-cloud py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="Why Blast Off" title="A new local business, run the right way." />
        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:mt-14 md:grid-cols-2">
          {POINTS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i} className="flex gap-4">
              <Droplet />
              <div>
                <h3 className="font-display text-xl font-semibold tracking-display text-navy-900">
                  {p.title}
                </h3>
                <p className="mt-2 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
