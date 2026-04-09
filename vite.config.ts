import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'src/renderer',
  plugins: [react()],
  server: {
    port: 5173,
    watch: {
      usePolling: false,
    },
  },
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
