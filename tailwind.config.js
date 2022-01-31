const colors = require('./styles/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
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
