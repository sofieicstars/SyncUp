/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4C5FD9",
        secondary: "#Db5d50",
        accent: "#D92DE0",
        neutral: {
          light: "#F5F7F9",
          dark: "#2b2d42",
        },
      },
    },
  },
  plugins: [],
};
