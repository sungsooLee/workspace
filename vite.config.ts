import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['msw/node'],
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/cms-module': {
        target: 'http://localhost:8073',
      },
      '/portal-module': 'http://localhost:8082',
      '/auth-module': 'http://localhost:8081',
      '/file-module': 'http://localhost:8084',
      '/encoding-module': 'http://localhost:8085',
      '/hls': 'http://localhost:8070',
    },
  },
});
