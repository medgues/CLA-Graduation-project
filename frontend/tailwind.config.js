/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        40: ".4",
        30: ".3",
      },
      spacing: {
        "10vw": "10vw",
      },
    },
  },
  plugins: [require("daisyui")],
};
