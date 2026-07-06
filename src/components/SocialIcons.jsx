import { INSTAGRAM_URL, FACEBOOK_URL, INSTAGRAM_HANDLE } from '../config/business.js'

export default function SocialIcons({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram: ${INSTAGRAM_HANDLE}`}
        className="transition-colors hover:text-spray"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook page"
        className="transition-colors hover:text-spray"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M13.5 21v-7h2.4l.5-3h-2.9V9.1c0-.9.3-1.6 1.7-1.6h1.3V4.8c-.6-.1-1.4-.2-2.3-.2-2.4 0-4 1.4-4 4V11H7.5v3h2.7v7h3.3Z" />
        </svg>
      </a>
    </div>
  )
}
