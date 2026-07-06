# Blast Off Cleaning — Website

Single-page marketing site for Blast Off Cleaning, a local pressure washing
business. The entire site is **one file** — [`index.html`](index.html) — with
all styles and scripts inline. No build step, no dependencies.

## Before launch — the owner's checklist

Open [`index.html`](index.html) and find the **`BUSINESS CONFIG`** block near
the bottom (inside the `<script>` tag). Replace each `[bracketed]` placeholder:

1. **`PHONE_NUMBER`** — the real number. All text/call links derive from it automatically.
2. **`SERVICE_AREA`** — the town, e.g. `"Scarsdale, NY"`.
3. **`INSTAGRAM_HANDLE`** and **`FACEBOOK_URL`** — social profiles.
4. **`FORMSPREE_ENDPOINT`** — create a free form at [formspree.io](https://formspree.io)
   and paste the endpoint. Until then the contact form politely redirects
   visitors to texting.
5. **Real before/after photos** — drop them in `assets/gallery/` with the
   filenames listed in the `GALLERY_PAIRS` config (same block). Until they
   exist, the Results section shows an honest "real photos in progress"
   state — no stock or fake photos, ever.

## Editing

It's one HTML file. Colors and fonts are defined as CSS variables at the top of
the `<style>` block; every section is labeled with a `═══ SECTION ═══` comment.
Edit, push, done.

## Deployment

Pushes to the default branch deploy automatically via GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) — the workflow
just uploads the repo to GitHub Pages, nothing to compile.

Live at: **https://northsskin.github.io/pressure-wash/**

If the repo is renamed or moved to a custom domain, update the Open Graph
`og:image` / `og:url` tags near the top of `index.html`.
