// Inline SVG rocket drawn to match the logo mark — used for the hero launch
// sequence and small brand accents, so it can be tinted and animated freely.

// Raw paths in a 100×100 box, nose pointing up. Fills use currentColor so the
// parent decides the tint; the window keeps a white face like the logo.
export function RocketPaths() {
  return (
    <>
      {/* body */}
      <path d="M50 4 C62 18 67 40 62.5 63 L37.5 63 C33 40 38 18 50 4 Z" fill="currentColor" />
      {/* window */}
      <circle cx="50" cy="33" r="8.5" fill="#FFFFFF" />
      <circle cx="50" cy="33" r="8.5" fill="none" stroke="currentColor" strokeWidth="3" />
      {/* fins */}
      <path d="M37.5 48 C29 54 25 65 25.5 77 L38.5 64 Z" fill="currentColor" />
      <path d="M62.5 48 C71 54 75 65 74.5 77 L61.5 64 Z" fill="currentColor" />
      {/* nozzle */}
      <path d="M41 63 L59 63 L55 73 L45 73 Z" fill="currentColor" />
      {/* spray droplets */}
      <circle cx="50" cy="81" r="3.4" fill="currentColor" opacity="0.9" />
      <circle cx="42" cy="88" r="2.4" fill="currentColor" opacity="0.7" />
      <circle cx="58" cy="89" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="50" cy="95" r="1.6" fill="currentColor" opacity="0.45" />
    </>
  )
}

export default function RocketIcon({ className, title }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      {title && <title>{title}</title>}
      <RocketPaths />
    </svg>
  )
}
