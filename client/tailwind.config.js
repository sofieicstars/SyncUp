/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4C5FD5",
        secondary: "#9B5DE5",
        accent: "#00C2BA",
        neutralLight: "#F5F7FA",
        neutralDark: "#2B2D42",
      },
    },
  },
  plugins: [],
};
