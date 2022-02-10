const colors = require('./src/styles/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
      gridTemplateColumns: {
        responsive: 'repeat(auto-fit,minmax(10rem,1fr))',
      },
    },
  },
  plugins: [],
};
