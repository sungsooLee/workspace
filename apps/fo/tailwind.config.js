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
        '.scrollbar': {
          '&::-webkit-scrollbar': {
            height: '64px',
            width: '12px',
            backgroundColor: '#fff',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '9999px',
            borderWidth: '4px',
            borderStyle: 'solid',
            borderColor: 'transparent',
            backgroundColor: 'var(--gray4)',
            backgroundClip: 'padding-box',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#fff',
          },
          '.scroll-smooth': {
            scrollBehavior: 'smooth',
          },
        },
        // title class add
        '.title_4_b': {
          ...baseTitle,
          fontSize: '2.4rem',
          fontWeight: '600',
        },
        '.body_1_b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '600',
        },
        '.body_2_b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '600',
        },
        '.body_3_b': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '600',
        },
        '.body_3_r': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },
        '.body_4_b': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '600',
        },
        '.body_4_r': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '400',
        },
        '.input_3_r': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },
      });
    },
  ],

  theme: {
    extend: {
      screens: {
        mobile: '360px',
        pc: '1920px',
      },
    },
  },
};
