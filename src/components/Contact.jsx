import { useState } from 'react'
import Reveal, { SectionHeading } from './Reveal.jsx'
import SocialIcons from './SocialIcons.jsx'
import {
  PHONE_NUMBER,
  SMS_LINK,
  FORMSPREE_ENDPOINT,
  isFormspreeConfigured,
} from '../config/business.js'

const SERVICE_TYPES = ['Driveway', 'Walkway', 'Patio', 'Deck', 'Fence', 'Trash Cans', 'Other']

const inputClasses =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-navy-900 placeholder:text-slate-600/60 focus:border-spray focus:outline-none focus:ring-2 focus:ring-spray/30'

function Field({ label, optional, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
        {optional && <span className="font-normal text-slate-600"> (optional)</span>}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | unconfigured

  async function handleSubmit(e) {
    e.preventDefault()

    // Until the Formspree endpoint in src/config/business.js is set, steer
    // people to the channel that actually works today: texting.
    if (!isFormspreeConfigured()) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        e.target.reset()
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-cloud py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Ready for liftoff?"
          title="Get a free quote, usually within the hour."
        />
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1fr_20rem] lg:grid-cols-[1fr_24rem]">
          <Reveal delay={1}>
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-card md:p-8"
              noValidate={false}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input id="name" name="name" type="text" required autoComplete="name" className={inputClasses} />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputClasses} />
                </Field>
              </div>
              <Field label="Email" htmlFor="email" optional>
                <input id="email" name="email" type="email" autoComplete="email" className={inputClasses} />
              </Field>
              <Field label="Service Type" htmlFor="service">
                <select id="service" name="service" required defaultValue="" className={inputClasses}>
                  <option value="" disabled>
                    Choose a surface…
                  </option>
                  {SERVICE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Notes" htmlFor="notes">
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  className={inputClasses}
                  placeholder="Anything we should know — size of the area, stains, access…"
                />
              </Field>
              <Field label="Photo of the area" htmlFor="photo" optional>
                {/* Note: Formspree's free tier doesn't accept file uploads — the
                    field degrades gracefully (Formspree ignores it), and texted
                    photos remain the fastest way to a quote. */}
                <input id="photo" name="photo" type="file" accept="image/*" className="w-full text-sm file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-navy-900 file:px-4 file:py-2.5 file:font-medium file:text-white" />
              </Field>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-1 rounded-full bg-ignition px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-[1.03] hover:shadow-cta-glow active:scale-[0.97] disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send It'}
              </button>

              <div aria-live="polite">
                {status === 'sent' && (
                  <p className="font-medium text-navy-900">
                    Got it — we'll text you back with a price, usually within the hour.
                  </p>
                )}
                {status === 'error' && (
                  <p className="font-medium text-navy-900">
                    Something went wrong sending that. Texting works every time:{' '}
                    <a href={SMS_LINK} className="text-spray underline underline-offset-4">
                      {PHONE_NUMBER}
                    </a>
                  </p>
                )}
                {status === 'unconfigured' && (
                  <p className="font-medium text-navy-900">
                    The form isn't hooked up quite yet — text us instead at{' '}
                    <a href={SMS_LINK} className="text-spray underline underline-offset-4">
                      {PHONE_NUMBER}
                    </a>{' '}
                    and we'll get right back to you.
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal delay={2} className="flex flex-col gap-6 md:pt-2">
            <div className="rounded-2xl bg-navy-900 p-6 text-cloud md:p-8">
              <p className="eyebrow text-spray">Prefer to text?</p>
              <a
                href={SMS_LINK}
                className="mt-3 block font-mono text-2xl font-medium text-white underline-offset-8 hover:underline"
              >
                {PHONE_NUMBER}
              </a>
              <p className="mt-3 leading-relaxed text-cloud/80">
                Photos welcome — a quick shot of the driveway or patio is usually all we
                need to price the job.
              </p>
            </div>
            <div className="flex items-center gap-4 px-1">
              <span className="text-sm font-medium text-slate-600">Follow along:</span>
              <SocialIcons className="text-navy-900" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
