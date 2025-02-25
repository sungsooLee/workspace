/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import svgr from '@svgr/rollup';
import path from 'path';
import viteReact from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

// vitest automatically sets NODE_ENV to 'test' when running tests
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_BO_BASE_PATH || '';

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/bo',
    server: {
      port: 4200,
      host: 'localhost',
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      !isTest && TanStackRouterVite(),
      viteReact(),
      svgr(),
    ],
    resolve: {
      alias: { find: '@/', replacement: path.resolve(__dirname, 'src') },
    },
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    // base: process.env.NODE_ENV === 'local' ? '' : '/bo',
    base: basePath,
    build: {
      outDir: '../../dist/apps/bo',
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
  };
});
