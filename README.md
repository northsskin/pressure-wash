# Blast Off Cleaning — Website

Single-page marketing site for Blast Off Cleaning, a local pressure washing
business. Built with React + Vite, Tailwind CSS, and Framer Motion, deployed to
GitHub Pages.

## Before launch — the owner's checklist

Every business-specific value lives in **one file**: [`src/config/business.js`](src/config/business.js).
Replace each `[bracketed]` placeholder there:

1. **`PHONE_NUMBER`** — the real number. All `sms:`/`tel:` links derive from it automatically.
2. **`SERVICE_AREA`** — the town, e.g. `"Scarsdale, NY"`.
3. **`INSTAGRAM_HANDLE`** and **`FACEBOOK_URL`** — social profiles.
4. **`FORMSPREE_ENDPOINT`** — create a free form at [formspree.io](https://formspree.io)
   and paste the endpoint. Until then the contact form politely redirects
   visitors to texting.
5. **Real before/after photos** — drop them in `public/assets/gallery/` with the
   filenames listed in [`src/config/gallery.js`](src/config/gallery.js). Until
   they exist, the Results section shows an honest "real photos in progress"
   state — no stock or fake photos, ever.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deployment

Pushes to `main` deploy automatically via GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

One-time setup: in the repo's **Settings → Pages**, set **Source** to
**GitHub Actions**.

The site is served at `https://<user>.github.io/pressure-wash/`. If the repo is
renamed or moved to a custom domain, update `base` in `vite.config.js` and the
Open Graph URLs in `index.html`.
