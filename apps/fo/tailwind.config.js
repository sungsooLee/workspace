const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const sharedTailwindPreset = require('../../libs/tailwind-preset/tailwind.preset');
const TailwindConfig = require('../../libs/component/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...TailwindConfig,
  presets: [sharedTailwindPreset],
  content: [
    ...TailwindConfig.content,
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html,js}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};
