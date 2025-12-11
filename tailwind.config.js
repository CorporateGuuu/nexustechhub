/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0066cc",
        dark: "#111",
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.05)",
      },
      // Better mobile spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      // Fix iOS button tap highlight
      transitionProperty: {
        'height': 'height',
      }
    },
  },
  plugins: [
    // Hide scrollbars for thumbnail galleries
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};
