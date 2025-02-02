import type { Preview } from '@storybook/react';

//import '../../../libs/config/src/lib/style/font.css';
//import '../../../libs/config/src/lib/style/theme.css';
//import '../../config/src/lib/style/font.css';

import '../src/index';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    // Sorting stories
    options: {
      storySort: (a, b) =>
        a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
  },
};

export default preview;
