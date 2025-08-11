import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    tsConfigPaths({projects: ['./tsconfig.json']}),
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
  ],
})
