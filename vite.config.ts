import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  optimizeDeps: {
    needsInterop: ['react-use']
  },
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      customViteReactPlugin: true,
      target: 'static',
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          outputPath: 'index.html',
        },
      }
    }),
    viteReact(),
  ],
})
