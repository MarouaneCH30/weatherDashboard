/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0050C8',
        danger: '#EA2D67',
        info: '#63BAAA',
      },
    },
  },
  plugins: [],
}