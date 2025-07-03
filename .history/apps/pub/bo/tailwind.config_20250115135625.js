const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const tailwindPreset = require('../../../libs/config/src/lib/style/tailwind.preset');
const tailwindShadcnPreset = require('../../../libs/config/src/lib/style/tailwind.shadcn.preset');

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
  plugins: [require('./src/assets/tailwind-plugins/typo.plugin')],
  safelist: ['h-[32px]'],
};
