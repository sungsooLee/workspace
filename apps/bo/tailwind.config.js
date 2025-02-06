const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const tailwindPreset = require('../../libs/config/src/lib/style/tailwind.preset');
const tailwindShadcnPreset = require('../../libs/config/src/lib/style/tailwind.shadcn.preset');

const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  presets: [tailwindShadcnPreset, tailwindPreset],
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html,js}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  blocklist: ['outline'],
  plugins: [
    require('./src/assets/tailwind-plugins/typo.plugin'),
    function ({ addComponents }) {
      const baseTitle = {
        letterSpacing: '-0.3px',
        lineHeight: '140%',
      };

      addComponents({
        // title class add
        '.title_1_b': {
          ...baseTitle,
          fontSize: '2.2rem',
          fontWeight: '600',
        },
        // lable title class add
        '.label_1_b': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '600',
        },
      });
    },
  ],
};
