/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swachh: {
          green: "#064E3B",      // Dark green from UI header
          emerald: "#10B981",    // Emerald green for buttons/highlights
          light: "#ECFDF5",      // Light green background elements
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
