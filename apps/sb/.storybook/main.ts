import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { mergeConfig } from 'vite';
import postcss from 'postcss';
import { fileURLToPath } from 'url';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)', // src 디렉토리 아래의 모든 스토리 파일
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implements: require.resolve('postcss'),
          // implementation: postcss, // require.resolve 대신 직접 모듈 사용
        },
      },
    },
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@libs/ui': path.resolve(__dirname, '../../libs/ui/src/index.ts'),
          '@libs/editor': path.resolve(__dirname, '../../libs/editor/src/index.ts'),
          '@libs/shared': path.resolve(__dirname, '../../libs/shared/src/index.ts'),
          '@libs/hooks': path.resolve(__dirname, '../../libs/hooks/src/index.ts'),
        },
      },
    });
  },
};

export default config;

// Nx와 Storybook의 모듈 시스템 충돌로 인해 발생. main.ts 파일을 CommonJS 형식으로 변경
// const path = require('path');
// const { mergeConfig } = require('vite');

// /** @type { import('@storybook/react-vite').StorybookConfig } */
// const config = {
//   stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
//   addons: [
//     '@storybook/addon-links',
//     '@storybook/addon-essentials',
//     '@storybook/addon-interactions',
//     {
//       name: '@storybook/addon-styling',
//       options: {
//         postCss: true,
//       },
//     },
//   ],
//   core: {
//     builder: '@storybook/builder-vite',
//   },
//   framework: {
//     name: '@storybook/react-vite',
//     options: {
//       builder: {
//         viteConfigPath: 'vite.config.ts',
//       },
//     },
//   },
//   viteFinal: async (config) => {
//     return mergeConfig(config, {
//       resolve: {
//         alias: {
//           '@libs/ui': path.resolve(__dirname, '../../libs/ui/src/index.ts'),
//           '@libs/editor': path.resolve(__dirname, '../../libs/editor/src/index.ts'),
//           '@libs/shared': path.resolve(__dirname, '../../libs/shared/src/index.ts'),
//           '@libs/hooks': path.resolve(__dirname, '../../libs/hooks/src/index.ts'),
//         },
//       },
//     });
//   },
// };

// module.exports = config;
