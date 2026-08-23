/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D9A5D",
        "primary-dull": "#157A49",
        surface: "#F3F7F4",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(17, 24, 39, 0.05)",
        "card-hover": "0 8px 20px rgba(17, 24, 39, 0.08)",
      },
    },
  },
  plugins: [],
};
