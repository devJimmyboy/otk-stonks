import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/streamers': {
        target: 'http://localhost:5000',
      },
      '/chatters': {
        target: 'http://localhost:5000',
      },
    },
  },
  build: {
    emptyOutDir: true,
  },
})
