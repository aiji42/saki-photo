// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      heading: ['Cormorant', ...defaultTheme.fontFamily.serif],
      serif: [...defaultTheme.fontFamily.serif]
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwindcss-textshadow')]
}
