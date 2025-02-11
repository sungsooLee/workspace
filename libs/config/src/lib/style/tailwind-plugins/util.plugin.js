const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities, theme }) {
  const noSpinner = {
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
  };

  const scrollbar = {
    '.scrollbar': {
      '&::-webkit-scrollbar': {
        height: '12px',
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
  };

  addUtilities({
    ...noSpinner,
    ...scrollbar,
  });
});
