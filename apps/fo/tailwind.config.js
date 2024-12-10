const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const sharedTailwindPreset = require('../../libs/config/src/lib/style/tailwind.preset');
const TailwindConfig = require('../../libs/ui/tailwind.config');

const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [TailwindConfig, sharedTailwindPreset],
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html,js}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
      });
    }),
  ],
};
