import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/todos-jugamos/',
  publicDir: 'public',
  assetsInclude: ['**/*.json'],
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
