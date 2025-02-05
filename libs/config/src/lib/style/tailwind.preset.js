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

  plugins: [require('./tailwind-plugins/util.plugin')],
};
