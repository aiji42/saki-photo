const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ['./src/**/*.tsx', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      heading: [
        "Cormorant",
        ...defaultTheme.fontFamily.serif
      ],
      serif: [
        ...defaultTheme.fontFamily.serif
      ]
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
