/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#09090b",
        "secondary": "#1c1917",
        "tertiary":"#3f3f46"
      },
      fontFamily:{
        "dongle": "Dongle, sans-serif",
        "rubick": "Rubik, sans-serif"
      }

    },
  },
  plugins: [],
}

