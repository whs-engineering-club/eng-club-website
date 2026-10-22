import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base matches the GitHub Pages path: https://rahil-desai.github.io/engineering-club/
export default defineConfig({
  plugins: [react()],
  base: '/engineering-club/',
})
