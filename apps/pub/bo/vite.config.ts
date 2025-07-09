/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import svgr from '@svgr/rollup';
import path from 'path';

// vitest automatically sets NODE_ENV to 'test' when running tests
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/pub/bo',
  server: {
    port: 4500,
    host: 'localhost',
    proxy: {
      '/pms-module': {
        target: 'http://localhost:8072',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    !isTest && TanStackRouterVite(),
    svgr(),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  resolve: {
    alias: [
      { find: '@/', replacement: path.resolve(__dirname, '../../bo/src') },
      { find: '@app', replacement: path.resolve(__dirname, '../../bo/src/app') },
      { find: '@assets', replacement: path.resolve(__dirname, '../../bo/src/assets') },
      { find: '@entities', replacement: path.resolve(__dirname, '../../bo/src/entities') },
      { find: '@features', replacement: path.resolve(__dirname, '../../bo/src/features') },
      { find: '@pages', replacement: path.resolve(__dirname, '../../bo/src/pages') },
      { find: '@shared', replacement: path.resolve(__dirname, '../../bo/src/shared') },
      { find: '@types', replacement: path.resolve(__dirname, '../../bo/src/types') },
      { find: '@widgets', replacement: path.resolve(__dirname, '../../bo/src/widgets') },
    ],
  },
  base: '/pb-bo',
  build: {
    outDir: '../../../dist/apps/pb-bo',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
});
