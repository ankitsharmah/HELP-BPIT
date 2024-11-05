/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this line if you use different file extensions
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
