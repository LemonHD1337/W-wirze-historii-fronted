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
        md: { max: "768px" },
        mobileS: { max: "320px" },
        mobileM: { max: "375px" },
        mobileL: { max: "425px" },
        lapL: { max: "1440px" },
        lap: { max: "1024px" },
      },
    },
  },
  plugins: [],
};
