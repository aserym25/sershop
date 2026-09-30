import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const hasSupabaseConfig = env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                displayName: true,
                fileName: true,
                pure: true,
                ssr: false,
              },
            ],
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) {
              return 'motion-vendor'
            }

            if (hasSupabaseConfig && /node_modules[\\/]@supabase[\\/]/.test(id)) {
              return 'vendor-supabase'
            }

            if (/node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
              return 'vendor-react'
            }

            if (id.includes('node_modules')) {
              return 'vendor-core'
            }
          },
        },
      },
    },
  }
})
