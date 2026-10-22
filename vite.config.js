import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base matches the GitHub Pages path: https://whs-engineering-club.github.io/eng-club-website/
export default defineConfig({
  plugins: [react()],
  base: '/eng-club-website/',
})
