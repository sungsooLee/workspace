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
            height: '12px',
            width: '12px',
            backgroundColor: 'transparent',
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
            backgroundColor: 'transparent',
          },
          '.scroll-smooth': {
            scrollBehavior: 'smooth',
          },
        },

        // title class add (FO)
        '.title_1_b': {
          ...baseTitle,
          fontSize: '4rem',
          fontWeight: '600',
        },
        '.title_1_r': {
          ...baseTitle,
          fontSize: '4rem',
          fontWeight: '400',
        },
        '.title_2_b': {
          ...baseTitle,
          fontSize: '3.4rem',
          fontWeight: '600',
        },
        '.title_2_r': {
          ...baseTitle,
          fontSize: '3.4rem',
          fontWeight: '600',
        },
        '.title_3_b': {
          ...baseTitle,
          fontSize: '2.6rem',
          fontWeight: '600',
        },
        '.title_3_r': {
          ...baseTitle,
          fontSize: '2.6rem',
          fontWeight: '400',
        },
        '.title_4_b': {
          ...baseTitle,
          fontSize: '2.2rem',
          fontWeight: '600',
        },
        '.title_4_r': {
          ...baseTitle,
          fontSize: '2.2rem',
          fontWeight: '400',
        },
        '.title_5_b': {
          ...baseTitle,
          fontSize: '2rem',
          fontWeight: '600',
        },
        '.title_5_r': {
          ...baseTitle,
          fontSize: '2rem',
          fontWeight: '400',
        },
        '.title_6_r': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '400',
        },
        '.title_6_b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '600',
        },
        '.body_1_b': {
          ...baseTitle,
          fontSize: '1.8rem',
          fontWeight: '600',
        },
        '.body_1_r': {
          ...baseTitle,
          fontSize: '1.8rem',
          fontWeight: '400',
        },
        '.body_2_b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '600',
        },
        '.body_2_r': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '400',
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
        '.input_1_b': {
          ...baseTitle,
          fontSize: '2rem',
          fontWeight: '600',
        },
        '.input_1_r': {
          ...baseTitle,
          fontSize: '2rem',
          fontWeight: '600',
        },
        '.input_2_b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '600',
        },
        '.input_2_r': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '600',
        },
        '.input_3_r': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },
        '.button_1_b': {
          ...baseTitle,
          fontSize: '1.8rem',
          fontWeight: '700',
        },
        '.button_2_b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '700',
        },
        '.button_2_r': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '400',
        },
        '.button_3_b': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '700',
        },
        '.button_3_r': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },
        '.button_4_b': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '700',
        },
        '.button_4_r': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '400',
        },
        '.button_5_r': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '400',
        },
        '.label_1_b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '600',
        },
        '.label_1_r': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '400',
        },
        '.label_2_r': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '400',
        },
        '.label_3_r': {
          ...baseTitle,
          fontSize: '1.1rem',
          fontWeight: '400',
        },
        '.label_12_500': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '500',
        },

        // title class add (BO)
        '.title_bo_1_b': {
          ...baseTitle,
          fontSize: '2.2rem',
          fontWeight: '700',
        },
        '.title_bo_1_r': {
          ...baseTitle,
          fontSize: '2.2rem',
          fontWeight: '400',
        },
        '.title_bo_2_b': {
          ...baseTitle,
          fontSize: '2rem',
          fontWeight: '700',
        },
        '.title_bo_2_r': {
          ...baseTitle,
          fontSize: '2rem',
          fontWeight: '400',
        },
        '.title_bo_3_b': {
          ...baseTitle,
          fontSize: '1.8rem',
          fontWeight: '700',
        },
        '.title_bo_4_b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '700',
        },
        '.title_bo_4_r': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '400',
        },
        '.body_bo_1_b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '700',
        },
        '.body_bo_1_r': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '400',
        },
        '.body_bo_2_b': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '700',
        },
        '.body_bo_2_r': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },
        '.body_bo_3_b': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '700',
        },
        '.body_bo_3_r': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '400',
        },
        '.body_bo_4_b': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '700',
        },
        '.body_bo_4_r': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '400',
        },
        '.input_bo_1_r': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },
        '.input_bo_2_r': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '400',
        },
        '.button_bo_1_b': {
          ...baseTitle,
          fontSize: '2rem',
          fontWeight: '700',
        },
        '.button_bo_2_b': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '700',
        },
        '.button_bo_2_r': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },
        '.button_bo_3_b': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '700',
        },
        '.button_bo_3_r': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '400',
        },
        '.button_bo_4_r': {
          ...baseTitle,
          fontSize: '1rem',
          fontWeight: '400',
        },
        '.label_bo_1_b': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '700',
        },
        '.label_bo_1_r': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '400',
        },
        '.label_bo_2_b': {
          ...baseTitle,
          fontSize: '1rem',
          fontWeight: '700',
        },

        '.ellipsis': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      });
    },
  ],
};
