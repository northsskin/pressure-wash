import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` must match the GitHub Pages URL path.
// Deployed at https://<user>.github.io/pressure-wash/ — if you rename the repo
// or move to a custom domain, update (or remove) `base` accordingly.
export default defineConfig({
  plugins: [react()],
  base: '/pressure-wash/',
})
