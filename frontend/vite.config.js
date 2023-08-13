import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react';`
  },
  resolve: {
    alias: [
      {
        find: '@Components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@Pages',
        replacement: path.resolve(__dirname, 'src/Pages'),
      },
      {
        find: '@redux',
        replacement: path.resolve(__dirname, 'src/redux'),
      },
    ],
  },
})
