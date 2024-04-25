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
        "tertiary":"#3f3f46",
        "ligter":"#22d3ee",
        "soport":"#fb923c",
         "error":"#ef4444"
      },
      fontFamily:{
        "dongle": "Dongle, sans-serif",
        "rubick": "Rubik, sans-serif"
      }

    },
  },
  plugins: [],
}

