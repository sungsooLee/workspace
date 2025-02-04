const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'var(--primary-foreground)',
          1: 'hsl(var(--primary-1))',
          2: 'hsl(var(--primary-2))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'var(--secondary-foreground)',
          1: 'hsl(var(--secondary-1))',
          2: 'var(--secondary-2)',
          3: 'var(--secondary-3)',
          4: 'var(--secondary-4)',
          5: 'var(--secondary-5)',
          6: 'var(--secondary-6)',
          7: 'var(--secondary-7)',
          8: 'var(--secondary-8)',
          9: 'var(--secondary-9)',
          10: 'var(--secondary-10)',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'var(--danger-foreground)',
        },
        gray: {
          1: '#F4F8FF',
          2: '#EAF1FA',
          3: '#DEE7F3',
          4: '#C8D2E5',
          5: '#B5C2D7',
          6: '#8C97AE',
          7: '#747D91',
          8: '#5C636E',
          9: '#3E4550',
          10: '#16181A',
        },
        status: {
          error: 'var(--status-error)',
          warning: 'var(--status-warning)',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
      });
    }),
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
      });
    },
  ],
};
