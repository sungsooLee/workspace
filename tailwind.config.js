/** @type {import('tailwindcss').Config} */
const pxToRem = (px, base = 16) => `${px / base}rem`;

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      head: ['SansHeadKRRegular', 'SansHeadKRBold'],
      sans: ['SansTextKRRegular', 'Pretendard', 'sans-serif'],
    },
    extend: {
      image: {
        gnbLogo: "url('/logo/logo_hiway.png')",
      },
      colors: {
        gnb: '#000',
        lnb: '#666666',
        body: '#D9D9D9',
        // footer: '#343333',
        'hae-white-60': 'rgba(255, 255, 255, 0.60)', // fallback color
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        point: {
          blue: '#003469',
          light_blue: '#00AFD5',
          red: '#FF0000',
          yellow: '#FFB902',
        },
        info: {
          lightBg: '#F1F7FC', // Light mode 배경색
          lightText: '#1472CE', // Light mode 글씨색
          // darkBg: '#1472CE', // Dark mode 배경색
          // darkText: '#FFFFFF', // Dark mode 글씨색
        },
        grayScale: {
          0: '#FFFFFF',
          6: '#EBEBEB',
          7: '#DDDDDD',
          8: '#767676',
          9: '#000000',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          1: '#F6F8FD',
          2: '#F2F5FB',
          3: '#EDF0F7',
          4: '#E3E9EF',
          5: '#E3E6EC',
          6: '#CFD3DD',
          7: '#6F798B',
          8: '#4C515E',
          9: '#1F2023',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // gnb: {
        //   DEFAULT: 'hsl(var(--gnb))',
        //   foreground: 'hsl(var(--gnb-foreground))',
        // },
        lnb: {
          DEFAULT: 'hsl(var(--lnb))',
        },
        body: {
          DEFAULT: 'var(--body)',
        },
        primaryT: {
          DEFAULT: 'var(--primaryT)',
        },
        footer: {
          DEFAULT: 'var(--footer)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      transitionDuration: {
        5000: '5000ms',
      },
      borderRadius: {
        ...Array.from({ length: 20 }, (_, index) => index + 1).reduce(
          (acc, px) => {
            acc[`${px}pxr`] = pxToRem(px);
            return acc;
          },
          {}
        ),
      },
      fontSize: {
        ...Array.from({ length: 100 }, (_, index) => index + 1).reduce(
          (acc, px) => {
            acc[`${px}pxr`] = pxToRem(px);
            return acc;
          },
          {}
        ),
      },
      lineHeight: {
        ...Array.from({ length: 100 }, (_, index) => index + 1).reduce(
          (acc, px) => {
            acc[`${px}pxr`] = pxToRem(px);
            return acc;
          },
          {}
        ),
      },
      spacing: {
        ...Array.from({ length: 350 }, (_, index) => index + 1).reduce(
          (acc, px) => {
            acc[`${px}pxr`] = pxToRem(px);
            return acc;
          },
          {}
        ),
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
