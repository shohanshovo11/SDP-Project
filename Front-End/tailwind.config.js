/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors:
      {
        pinkSoft: '#EDC7B7',
        bt: '#165069',
      },
    },
    fontFamily: {
      cairo: ['"Cairo"', "sans-serif"],
      poppins: ['"Poppins"', "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
