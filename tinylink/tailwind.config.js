/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  theme: {
    extend: {
      colors: {
        neonBlue: '#0ff',   // neon cyan
        neonPink: '#ff49db',
        neonGreen: '#39ff14',
        neonYellow: '#f9ff00',
        darkBg: '#0d0d0d'
      },
    },
  },
  plugins: [],
}
