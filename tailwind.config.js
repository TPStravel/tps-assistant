/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ← esta linha ativa o modo escuro via classe
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
