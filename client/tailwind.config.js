/** @type {import('tailwind').Config} */ 
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    container:{
      center: true,
    },
    extend: {},
    fontFamily: {
      monserrat: ['Montserrat', 'sans-serif'],
      smooch: ['Smooch', 'cursive']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}