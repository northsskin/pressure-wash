import SocialIcons from './SocialIcons.jsx'
import { SERVICE_AREA, CURRENT_YEAR } from '../config/business.js'

export default function Footer() {
  return (
    <footer className="bg-navy-900 py-12 text-cloud/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center md:flex-row md:justify-between md:px-8 md:text-left">
        <a href="#top" className="shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Blast Off Cleaning"
            className="h-14 w-auto brightness-0 invert"
            loading="lazy"
          />
        </a>
        <div className="text-sm leading-relaxed">
          <p>Serving {SERVICE_AREA} and surrounding areas</p>
          <p className="mt-1 font-mono text-xs text-cloud/60">
            © {CURRENT_YEAR} Blast Off Cleaning
          </p>
        </div>
        <SocialIcons className="text-cloud/80" />
      </div>
    </footer>
  )
}
