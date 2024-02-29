/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-500": "#ffc600",
        "custom-400": "#ffe51b",
        "white-100": "#efefef",
        "white-200": "#dcdcdc",
        bor: "#eeeeee",
        secondary: "#030303",
      },
      screens: {
        md: { max: "767px" },
      },
    },
  },
  plugins: [],
};
