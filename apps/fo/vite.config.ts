/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import svgr from '@svgr/rollup';
import path from 'path';
import viteReact from '@vitejs/plugin-react';

// vitest automatically sets NODE_ENV to 'test' when running tests
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_FO_BASE_PATH || '';
  const isProduction = mode === 'production';

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/fo',
    server: {
      port: 4300,
      host: 'localhost',
      hmr: {
        overlay: false,
      },
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
    // optimizeDeps: {
    //   exclude: ['@tanstack/router-devtools', '@tanstack/react-query-devtools'],
    // },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      !isTest &&
        TanStackRouterVite({
          autoCodeSplitting: true,
          generatedRouteTree: './src/routeTree.gen.ts',
        }),
      viteReact(),
      svgr({
        include: '**/*.svg',
        icon: true,
        titleProp: false,
        descProp: false,
      }),
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

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
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    base: basePath,
    build: {
      outDir: '../../dist/apps/fo',
      assetsDir: 'assets',
      emptyOutDir: true,
      reportCompressedSize: true,
      sourcemap: false,
      minify: 'esbuild',
      target: 'es2020',
      cssCodeSplit: true,
      // commonjsOptions: {
      //   transformMixedEsModules: true,
      // },
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          // assetFileNames: 'assets/[name].[hash][extname]',
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.names?.[0] || assetInfo.originalFileName || 'asset';
            const info = fileName.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name].[hash].[ext]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name].[hash].[ext]`;
            }
            return `assets/[name].[hash].[ext]`;
          },
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: [
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-select',
            ],
            tanstack: ['@tanstack/react-query', '@tanstack/react-router', '@tanstack/react-table'],
            utils: ['lodash', 'lodash-es', 'dayjs', 'date-fns'],
          },
        },
        external: [],
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
