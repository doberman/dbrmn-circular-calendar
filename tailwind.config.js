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
        'light-pink': '#F3BAFA',
        'light-purple': '#D4B9F9',
        'bright-blue': '#004EFF',
        'lime-green': '#ADFF00'
      }
    }
  },
  plugins: []
}
