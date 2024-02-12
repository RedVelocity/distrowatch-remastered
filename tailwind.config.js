import colors from './src/styles/colors';

export const darkMode = 'class';
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    colors,
    gridTemplateColumns: {
      responsive: 'repeat(auto-fit,minmax(10rem,1fr))',
    },
  },
};
export const plugins = [];
