/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Brand tokens only — default Tailwind blue/gray palettes are intentionally
    // not extended here so every color in the site maps to a named brand token.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      navy: {
        900: '#0B1F3A', // primary brand: text, nav, buttons, headlines
        700: '#16365C', // secondary navy for gradients / depth
      },
      spray: '#4A90D9', // water/motion accent: trail, icons, links
      cloud: '#F6F8FB', // off-white section background
      white: '#FFFFFF',
      ignition: '#FF7A33', // the ONE warm accent — CTAs + micro-highlights only
      slate: {
        600: '#5B6B7F', // body text on light backgrounds
        200: '#E2E8F0', // borders, dividers
      },
    },
    fontFamily: {
      display: ['"Clash Display"', 'sans-serif'],
      sans: ['"General Sans"', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
    extend: {
      letterSpacing: {
        display: '-0.02em',
        label: '0.08em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 31, 58, 0.06), 0 4px 12px rgba(11, 31, 58, 0.06)',
        'card-hover': '0 2px 4px rgba(11, 31, 58, 0.08), 0 12px 28px rgba(11, 31, 58, 0.12)',
        'cta-glow': '0 0 0 4px rgba(255, 122, 51, 0.18), 0 8px 24px rgba(255, 122, 51, 0.35)',
      },
    },
  },
  plugins: [],
}
