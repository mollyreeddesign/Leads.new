/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#211951',
        'brand-purple': '#836fff',
        'brand-gray': '#f1f3ff',
        'brand-white': '#ffffff',
        'brand-green': '#16f5ba',
      },
      fontFamily: {
        'onest': ['Onest', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

