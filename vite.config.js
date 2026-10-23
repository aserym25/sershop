import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { geoHandler } from './geo.js'

const geoPlugin = {
  name: 'geo-api',
  configureServer(s) { s.middlewares.use(geoHandler) },
  configurePreviewServer(s) { s.middlewares.use(geoHandler) },
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [geoPlugin, react()],
    resolve: { alias: { '@': '/src' } },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion-vendor'
            if (/node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'vendor-react'
            if (id.includes('node_modules')) return 'vendor-core'
          }
        }
      }
    }
  }
})