/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        card: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff"
        }
      }
    },
  },
  plugins: [],
}