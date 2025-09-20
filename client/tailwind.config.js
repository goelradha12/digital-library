/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        gradientMove: 'gradientMove 8s linear infinite',
        fadeIn: 'fadeIn 1.5s ease-in',
      },
      keyframes: {
        gradientMove: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Roboto"', 'sans-serif'], // You can add other fonts here
      },
      colors: {
        'dusty-rose': '#A56F6E',
        'dusty-rose-dark': '#8F5B5A',
      },
    },
  },
  plugins: [],
};