/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2fcf5',
          100: '#e1f8e8',
          200: '#c3eed0',
          300: '#94e0ad',
          400: '#5dc886',
          500: '#36ac66',
          600: '#268a4e',
          700: '#236e41',
          800: '#215736',
          900: '#1c472f',
        },
        earth: {
          100: '#fdf6e9',
          200: '#f9eccf',
          800: '#5c4528',
          900: '#46331f',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
