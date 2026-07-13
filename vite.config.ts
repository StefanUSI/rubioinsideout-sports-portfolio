/**
 * Vite Configuration — rubioinsideout sports portfolio
 *
 * Key decisions:
 *  - @tailwindcss/vite is used instead of PostCSS for faster HMR with Tailwind v4.
 *  - The `@` path alias maps to `src/` so imports stay clean across the
 *    deeply nested feature-based folder structure.
 *  - HMR can be toggled off via DISABLE_HMR env var; this prevents UI
 *    flickering when an AI coding agent writes files in a hot-reload loop.
 */
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
