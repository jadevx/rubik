import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base: ruta del repo en GitHub Pages (https://<user>.github.io/rubik/)
export default defineConfig({
  base: '/rubik/',
  plugins: [react(), tailwindcss()],
})
