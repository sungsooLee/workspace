const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          1: 'var(--primary1)',
          2: 'var(--primary2)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          1: 'var(--secondary1)',
          2: 'var(--secondary2)',
          3: 'var(--secondary3)',
          4: 'var(--secondary4)',
          5: 'var(--secondary5)',
          6: 'var(--secondary6)',
          7: 'var(--secondary7)',
          8: 'var(--secondary8)',
          9: 'var(--secondary9)',
          10: 'var(--secondary10)',
        },
        gray: {
          1: '#f4f8ff',
          2: '#eaf1fa',
          3: '#dee7f3',
          4: '#c8d2e5',
          5: '#b5c2d7',
          6: '#8c97ae',
          7: '#747d91',
          8: '#5c636e',
          9: '#3e4550',
          10: '#131c30',
        },
        status: {
          1: '#ff4646',
          2: '#ffb902',
          3: '#3eb838',
          4: '#C8D2E5',
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
