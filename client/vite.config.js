import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  css: {
    postcss: {
      plugins: [autoprefixer, postcssNesting]
    },
  },
})
