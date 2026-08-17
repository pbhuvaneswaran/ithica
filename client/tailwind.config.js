/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        bg: {
          DEFAULT: '#0A0C12',
          alt: '#0E1119'
        },
        surface: {
          DEFAULT: '#12151E',
          dim: '#0D0F17'
        },
        line: {
          DEFAULT: '#232838',
          soft: '#1B2030'
        },
        ink: {
          DEFAULT: '#F3F5F9',
          soft: '#A6AFC0',
          faint: '#6C7486'
        },
        accent: {
          a: '#5D6CFA',
          b: '#38D6C8',
          DEFAULT: '#7C89FF',
          deep: '#4453D8',
          soft: 'rgba(93,108,250,.14)'
        }
      }
    }
  },
  plugins: []
};
