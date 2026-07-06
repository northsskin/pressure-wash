// ─────────────────────────────────────────────────────────────────────────────
// BUSINESS CONFIG — the ONE place to edit business-specific values.
//
// Everything in [brackets] below is a placeholder. Replace each bracketed
// value with the real one before launch. Nothing else in the codebase
// hardcodes these — every component imports from this file.
// ─────────────────────────────────────────────────────────────────────────────

// Display format — shown to visitors exactly as written here.
// The sms:/tel: links below strip non-digits automatically, so once you
// replace this with the real number everything else just works.
export const PHONE_NUMBER = '[914-640-9773]'

// Town / area served, e.g. "Scarsdale, NY"
export const SERVICE_AREA = '[Scarsdale]'

// Social profiles
export const INSTAGRAM_HANDLE = '[your-instagram-handle]'
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`
export const FACEBOOK_URL = '[https://facebook.com/your-page]'

// Formspree: create a free form at https://formspree.io, then paste the
// endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
// Until this is set, the contact form politely redirects people to text instead.
export const FORMSPREE_ENDPOINT = '[https://formspree.io/f/YOUR_FORM_ID]'

export const CURRENT_YEAR = new Date().getFullYear()

// ─── Derived links (no need to edit below this line) ─────────────────────────

const digits = PHONE_NUMBER.replace(/\D/g, '')
const e164 = digits.length === 10 ? `+1${digits}` : `+${digits}`

export const SMS_BODY = "Hi, I'd like a quote for pressure washing at..."

// `?&body=` is the cross-platform form that both iOS and Android honor.
export const SMS_LINK = `sms:${e164}?&body=${encodeURIComponent(SMS_BODY)}`
export const TEL_LINK = `tel:${e164}`

export const isFormspreeConfigured = () => !FORMSPREE_ENDPOINT.includes('[')
