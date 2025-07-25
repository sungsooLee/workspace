/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import svgr from '@svgr/rollup';
import path from 'path';

// vitest automatically sets NODE_ENV to 'test' when running tests
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_FO_BASE_PATH || '';

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/fo',
    server: {
      port: 4300,
      host: 'localhost',
      proxy: {
        '/juso-api': {
          target: 'https://business.juso.go.kr',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/juso-api/, ''),
        },
        '/public': {
          target:
            'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com',
          changeOrigin: true,
          secure: false,
        },
        '/upload': {
          target:
            'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com',
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
      !isTest &&
        TanStackRouterVite({
          autoCodeSplitting: false,
          generatedRouteTree: './src/routeTree.gen.ts',
        }),
      react(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      svgr(),
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    base: basePath,
    resolve: {
      alias: [
        { find: '@/', replacement: path.resolve(__dirname, 'src') },
        { find: '@app', replacement: path.resolve(__dirname, 'src/app') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
        { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
        { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
        { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
        { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
        { find: '@widgets', replacement: path.resolve(__dirname, 'src/widgets') },
      ],
    },
    build: {
      outDir: '../../dist/apps/fo',
      assetsDir: 'assets',
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
