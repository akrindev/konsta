const tailwindMobile = require('./src/config');

module.exports = tailwindMobile({
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  variants: {
    extend: {
      width: ['ios', 'material'],
      height: ['ios', 'material'],
      inset: ['ios', 'material'],
    },
  },
});
