import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { mergeConfig } from 'vite';

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
