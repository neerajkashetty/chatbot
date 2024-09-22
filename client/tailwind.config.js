/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          700: "#E7F5FE",
        },
      },

      fontSize: {
        xs: "0.7rem",
      },
    },
  },
  plugins: [],
};
