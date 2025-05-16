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
      !isTest && TanStackRouterVite({ autoCodeSplitting: true }),
      viteReact(),
      svgr(),
    ],
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
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    // base: process.env.NODE_ENV === 'local' ? '' : '/bo',
    base: basePath,
    build: {
      outDir: '../../dist/apps/bo',
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
    test: {
      watch: true,
      globals: true,
      environment: 'jsdom',
      include: ['__tests__/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        all: true, // 테스트된 파일만 포함
        reportsDirectory: '../../coverage/apps/bo',
        provider: 'istanbul',
        setupFiles: './setupTests.ts', // 테스트 실행 전 실행할 파일
        include: ['src/pages/**/*.tsx', 'src/features/**/*.tsx', 'src/widgets/**/*.tsx'],
        exclude: ['node_modules/', 'dist/', 'coverage/', 'src/app', '__tests__', 'src/pages/*.tsx'],
        thresholds: {
          statements: 35, // 전체 statement 커버리지 기준
          branches: 25, // 조건문 커버리지 기준
          functions: 0, // 함수 커버리지 기준,
          lines: 0, // 라인 커버리지 기준
        },
      },
    },
  };
});
