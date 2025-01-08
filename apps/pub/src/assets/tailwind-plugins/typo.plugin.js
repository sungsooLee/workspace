const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ matchUtilities, theme }) {
  // Title Typo
  const typoConfig = {
    title: {
      size: { 1: '40px', 2: '34px', 3: '26px', 4: '24px', 5: '20px', 6: '16px' },
      lineHeight: { 1: '56px', 2: '47.6px', 3: '36.4px', 4: '33.6px', 5: '28px', 6: '22.4px' },
      weight: { B: '600', R: '400' },
    },
    body: {
      size: {
        1: '18px',
        2: '16px',
        3: '14px',
        4: '12px',
      },
      lineHeight: { 1: '30.6px', 2: '25.6px', 3: '22.4px', 4: '19.2px' },
      weight: { B: '600', R: '400' },
    },
    input: {
      size: {
        1: '20px',
        2: '16px',
        3: '14px',
      },
      lineHeight: { 1: '20px', 2: '16px', 3: '14px' },
      weight: { B: '600', R: '400' },
    },
    button: {
      size: {
        1: '18px',
        2: '16px',
        3: '14px',
        4: '13px',
        5: '12px',
      },
      lineHeight: { 1: '25.2px', 2: '22.4px', 3: '19.6px', 4: '13px', 5: '12px' },
      weight: { B: '700', R: '400' },
    },
    label: {
      size: {
        1: '16px',
        2: '13px',
      },
      lineHeight: { 1: '16px', 2: '13px' },
      weight: { B: '600', R: '400' },
    },
  };

  const typo = {
    'typo-title': (value) => {
      const values = value.split('-');
      const size = typoConfig.title.size[values[0] || '3'];
      const weight = typoConfig.title.weight[values[1] || 'R'];

      return {
        fontSize: size,
        lineHeight: typoConfig.title.lineHeight[size],
        fontWeight: weight, //theme('fontWeight.normal'),
      };
    },
    'typo-body': (value) => {
      const values = value.split('-');
      const size = typoConfig.body.size[values[0] || '3'];
      const weight = typoConfig.body.weight[values[1] || 'R'];

      return {
        fontSize: size,
        lineHeight: typoConfig.title.lineHeight[size],
        fontWeight: weight, //theme('fontWeight.normal'),
      };
    },
    'typo-input': (value) => {
      const values = value.split('-');
      const size = typoConfig.input.size[values[0] || '3'];
      const weight = typoConfig.title.weight[values[1] || 'R'];

      return {
        fontSize: size,
        lineHeight: typoConfig.title.lineHeight[size],
        fontWeight: weight, //theme('fontWeight.normal'),
      };
    },
    'typo-button': (value) => {
      const values = value.split('-');
      const size = typoConfig.button.size[values[0] || '3'];
      const weight = typoConfig.button.weight[values[1] || 'R'];

      return {
        fontSize: size,
        lineHeight: typoConfig.button.lineHeight[size],
        fontWeight: weight, //theme('fontWeight.normal'),
      };
    },
    'typo-label': (value) => {
      const values = value.split('-');
      const size = typoConfig.label.size[values[0] || '3'];
      const weight = typoConfig.label.weight[values[1] || 'R'];

      return {
        fontSize: size,
        lineHeight: typoConfig.label.lineHeight[size],
        fontWeight: weight, //theme('fontWeight.normal'),
      };
    },
  };

  matchUtilities(typo);
});
