/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#3B2B4A',
        'purple-medium': '#7F6ABE',
        'purple-light': '#C4A6DE',
        'purple-lighter': '#E6B3DF',
        'purple-sidebar': '#C4A6DE',
        'purple-sidebar-dark': '#7F5A9F',
        'purple-sidebar-active': '#55466D',
        'purple-header': '#55466D',
        'purple-table-header': '#55466D',
        'purple-table-bg': '#C4A6DE',
        'purple-button': '#9276D9',
        'purple-button-hover': '#7F5A9F',
      },
      fontFamily: {
        'inria': ['Inria Serif', 'serif'],
      },
    },
  },
  plugins: [],
}

