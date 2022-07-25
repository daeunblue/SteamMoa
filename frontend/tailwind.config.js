/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans'],
        'blackSans': ['Black Han Sans'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
