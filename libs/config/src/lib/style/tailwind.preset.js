const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      screens: {
        mobile: { max: '767px' },
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          1: 'var(--primary1)',
          2: 'var(--primary2)',
          3: 'var(--primary3)',
          4: 'var(--primary4)',
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
        status: {
          1: '#ff4646',
          2: '#ffb902',
          3: '#3eb838',
          4: '#C8D2E5',
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
          10: '#131416', // default
          25: '#33363D',
          35: '#4D525C',
          50: '#6B7280',
          65: '#959BA7',
          75: '#B7BBC3',
          85: '#D3D5DA',
          90: '#DEDFE3',
          92: '#E6E7EA',
          95: '#EFF0F1',
          98: '#F9FAFA',
        },
        blue: {
          blue10: '#000E29',
          blue25: '#00287A',
          blue35: '#003CB2',
          blue50: '#0056FF', // default
          blue65: '#4D88FF',
          blue75: '#80AAFF',
          blue85: '#E5EEFF',
          blue95: '#F5F8FF',
        },
        red: {
          10: '#2E0700',
          25: '#ffb902',
          35: '#3eb838',
          50: '#C8D2E5', // default
          65: '#F05638',
          75: '#F58B75',
          85: '#FBBEB2',
          95: '#FCD2CA',
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
        letterSpacing: '0',
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
        '.title_7_r': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },
        '.title_7_b': {
          ...baseTitle,
          fontSize: '1.4rem',
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
        '.button_5_b': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '700',
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

        // FO 최신가이드
        // Display
        '.display1': {
          ...baseTitle,
          fontSize: '4rem',
          fontWeight: '400',
          '@screen mobile': {
            fontSize: '2.2rem',
          },
        },

        '.display1-b': {
          ...baseTitle,
          fontSize: '4rem',
          fontWeight: '600',
          '@screen mobile': {
            fontSize: '2.2rem',
          },
        },

        '.headline1': {
          ...baseTitle,
          fontSize: '2.2rem',
          fontWeight: '400',
        },

        '.headline1-b': {
          ...baseTitle,
          fontSize: '2.2rem',
          fontWeight: '600',
        },

        '.headline2': {
          ...baseTitle,
          fontSize: '2.4rem',
          fontWeight: '400',
        },

        '.headline2-b': {
          ...baseTitle,
          fontSize: '2.4rem',
          fontWeight: '600',
        },

        '.headline3': {
          ...baseTitle,
          fontSize: '2.8rem',
          fontWeight: '400',
        },

        '.headline3-b': {
          ...baseTitle,
          fontSize: '2.8rem',
          fontWeight: '600',
        },

        '.headline4': {
          ...baseTitle,
          fontSize: '3.2rem',
          fontWeight: '400',
        },

        '.headline4-b': {
          ...baseTitle,
          fontSize: '3.2rem',
          fontWeight: '600',
        },

        '.ellipsis': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },

        '.title1': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '400',
        },

        '.title1-b': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '600',
        },

        '.title2': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },

        '.title2-b': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '600',
        },

        '.title3': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '400',
        },

        '.title3-b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '600',
        },

        '.title4': {
          ...baseTitle,
          fontSize: '1.8rem',
          fontWeight: '400',
        },

        '.title4-b': {
          ...baseTitle,
          fontSize: '1.8rem',
          fontWeight: '600',
        },

        '.title5': {
          ...baseTitle,
          fontSize: '2rem',
          fontWeight: '400',
        },

        '.title5-b': {
          ...baseTitle,
          fontSize: '2rem',
          fontWeight: '600',
        },

        '.body-lg': {
          ...baseTitle,
          fontSize: '1.8rem',
          fontWeight: '400',
        },

        '.body-lg-b': {
          ...baseTitle,
          fontSize: '1.8rem',
          fontWeight: '600',
        },

        '.body-md': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '400',
        },

        '.body-md-b': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '600',
        },

        '.body-sm': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '400',
        },

        '.body-sm-b': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '600',
        },

        '.body-xsm': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '400',
        },

        '.body-xsm-b': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '600',
        },

        '.label-xl': {
          ...baseTitle,
          fontSize: '1.6rem',
          fontWeight: '400',
        },

        '.label-xl-b': {
          ...baseTitle,
          fontSize: '1.4rem',
          fontWeight: '600',
        },

        '.label-md': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '400',
        },

        '.label-md-b': {
          ...baseTitle,
          fontSize: '1.3rem',
          fontWeight: '600',
        },

        '.label-sm': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '400',
        },

        '.label-sm-b': {
          ...baseTitle,
          fontSize: '1.2rem',
          fontWeight: '600',
        },

        '.label-xs': {
          ...baseTitle,
          fontSize: '1.1rem',
          fontWeight: '400',
        },

        '.label-xs-b': {
          ...baseTitle,
          fontSize: '1.1rem',
          fontWeight: '600',
        },

        '.min-w-auto': {
          minWidth: 'auto !important',
        },
      });
    },
  ],
};
