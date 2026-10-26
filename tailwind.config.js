/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js",
    "./data.js"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#DC2626",
        secondary: "#FFFFFF",
        accent: "#FACC15",

        brand: {
          DEFAULT: "#DC2626",
          dark: "#991B1B",
          light: "#FEE2E2",
        },


        ink: "#1F2937",
        muted: "#545B68",
        ground: "#F3F4F6",
        line: "#D5D9E1",
      },

      fontFamily: {
        display: ["Trebuchet MS", "sans-serif"],
        body: ["Arial", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },

      borderRadius: {
        card: "20px",
      },
    },
  },
   
   

  

  plugins: [],
};
