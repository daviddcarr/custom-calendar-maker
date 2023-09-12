/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Josefin Slab", "sans-serif"],
        heading: ["Roboto Condensed", "sans-serif"],
      }
    },
  },
  plugins: [],
}

