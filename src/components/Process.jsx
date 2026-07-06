import Reveal, { SectionHeading } from './Reveal.jsx'
import RocketIcon from './RocketIcon.jsx'

const STEPS = [
  {
    label: 'T-MINUS 3',
    title: 'Send a Photo, Get a Price.',
    body: "Text a photo of the area and we'll send back a flat price, usually within the hour. No in-person estimate needed for most jobs.",
  },
  {
    label: 'T-MINUS 2',
    title: 'We Show Up and Clean.',
    body: 'We bring the pressure washer, surface cleaner, and everything else. All we need from you is access to an outside spigot.',
  },
  {
    label: 'LIFTOFF',
    title: 'You Get the Reveal.',
    body: "Stains, moss, and grime are gone. We walk the area with you before we leave to make sure you're happy.",
    liftoff: true,
  },
]

export default function Process() {
  return (
    <section id="how-it-works" className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="The process" title="Three steps to liftoff." />
        <ol className="relative mt-10 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {/* connecting countdown line */}
          <div
            aria-hidden="true"
            className="absolute left-[1.35rem] top-2 h-[calc(100%-2rem)] w-px border-l-2 border-dashed border-slate-200 md:left-0 md:top-[1.35rem] md:h-px md:w-full md:border-l-0 md:border-t-2"
          />
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.label} delay={i} className="relative pl-16 md:pl-0 md:pt-16">
              <div
                className={`absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white md:left-0 ${
                  step.liftoff ? 'border-ignition' : 'border-spray'
                }`}
              >
                {step.liftoff ? (
                  <RocketIcon className="h-6 w-6 text-ignition" />
                ) : (
                  <span className="font-mono text-sm font-bold text-spray">{3 - i}</span>
                )}
              </div>
              <p
                className={`eyebrow ${step.liftoff ? 'text-ignition' : 'text-spray'}`}
              >
                {step.label}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-display text-navy-900 md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
