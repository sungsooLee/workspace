/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import svgr from '@svgr/rollup';

// vitest automatically sets NODE_ENV to 'test' when running tests
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isTest = process.env.NODE_ENV === 'test';
  const isDev = mode === 'development';

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/fo',
    base: isDev ? '/fo/' : '/', // 개발 환경에서 path 기반 라우팅
    server: {
      port: 4300,
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
    build: {
      outDir: '../../dist/apps/fo',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            tanstack: ['@tanstack/react-router'],
          },
        },
      },
    },
    define: {
      'process.env.BASE_PATH': JSON.stringify(isDev ? '/fo' : '/'),
    },
  };
});

// export default defineConfig({
//   root: __dirname,
//   cacheDir: '../../node_modules/.vite/apps/fo',
//   server: {
//     port: 4300,
//     host: 'localhost',
//     proxy: {
//       '/pms-module': {
//         target: 'http://localhost:8072',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
//   preview: {
//     port: 4300,
//     host: 'localhost',
//   },
//   plugins: [
//     react(),
//     nxViteTsPaths(),
//     nxCopyAssetsPlugin(['*.md']),
//     !isTest && TanStackRouterVite(),
//     svgr(),
//   ],
//   // Uncomment this if you are using workers.
//   // worker: {
//   //  plugins: [ nxViteTsPaths() ],
//   // },
//   build: {
//     outDir: '../../dist/apps/fo',
//     emptyOutDir: true,
//     reportCompressedSize: true,
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//   },
// });
