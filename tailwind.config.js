/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      boxShadow: {
        'outer': '0 0 8px rgba(0,0,0,0.3)',
        'top':'0 -2px 8px rgba(0,0,0,0.2)'
      }
    },
  },
  plugins: [],
}