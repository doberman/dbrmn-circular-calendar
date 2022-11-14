/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Gerstner-Programm', 'ui-sans-serif', 'system-ui']
    },
    extend: {
      colors: {
        'bright-orange': '#FF8100',
        'bright-red': '#FF002D',
        'bright-pink': '#E300FF',
        'bright-purple': '#6C00FF',
        'bright-blue': '#004EFF',
        'lime-green': '#ADFF00'
      }
    }
  },
  plugins: []
}
