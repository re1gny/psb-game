import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'min-lg': { min: '450px' },
      'max-lg': { max: '449px' }
    },
    fontFamily: {
      gilroy: ['Gilroy', fontFamily.sans],
      inter: ['Inter', fontFamily.sans]
    }
  },
}
