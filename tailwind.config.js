/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ["Rubik", ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        "dark-gray": {
          400: "hsl(0, 0%, 59%)",
          800: "hsl(0, 0%, 17%)"
        }
      }
    },
  },
  plugins: [],
  darkMode: "class"
}
