const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const tailwindPreset = require('../../libs/config/src/lib/style/tailwind.preset');
const tailwindShadcnPreset = require('../../libs/config/src/lib/style/tailwind.shadcn.preset');

const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindShadcnPreset, tailwindPreset],
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html,js}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-spinner': {
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          '&[type="number"]': {
            '-moz-appearance': 'textfield',
          },
        },
      });
    },
  ],
};
