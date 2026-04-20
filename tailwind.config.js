/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    screens: {
      xs: '375px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'orange-700': '#ee8927',
      'gray-300': '#E6E6E6',
      'gray-500': '#CCCCCC',
      'gray-600': '#B3B3B3',
      'gray-700': '#999999',
      'gray-800': '#808080',
      'gray-900': '#666666',
      'gray-1000': '#4D4D4D',
      'gray-1100': '#333333',
    },
    extend: {
      boxShadow: {
        floating: '0 0 8px rgba(0, 0, 0, 0.35)',
      },
      fontSize: {
        'body-2': ['14px', { lineHeight: '1.25' }],
        'body-3': ['16px', { lineHeight: '1.25' }],
        'body-5': ['24px', { lineHeight: '1.25' }],
      },
      fontWeight: {
        regular: '400',
        bold: '700',
      },
    },
  },
  plugins: [],
};
