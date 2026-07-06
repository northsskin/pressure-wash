import { useEffect, useState } from 'react'
import { SMS_LINK } from '../config/business.js'

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#results', label: 'Results' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const light = !scrolled && !open // over the navy hero → light-on-dark nav

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        light ? 'bg-transparent' : 'bg-white/95 shadow-card backdrop-blur'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8"
      >
        <a href="#top" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Blast Off Cleaning"
            className={`h-11 w-auto md:h-12 ${light ? 'brightness-0 invert' : ''}`}
          />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-[0.95rem] font-medium transition-colors ${
                  light ? 'text-white/85 hover:text-white' : 'text-navy-900 hover:text-spray'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={SMS_LINK}
            className="hidden rounded-full bg-ignition px-5 py-2.5 text-[0.95rem] font-semibold text-white transition-transform hover:scale-[1.03] hover:shadow-cta-glow active:scale-[0.97] sm:inline-block"
          >
            Get a Quote
          </a>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg md:hidden ${
              light ? 'text-white' : 'text-navy-900'
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-lg font-medium text-navy-900 hover:bg-cloud"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={SMS_LINK}
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-ignition px-5 py-3.5 text-center font-semibold text-white active:scale-[0.97]"
          >
            Get a Quote
          </a>
        </div>
      )}
    </header>
  )
}
