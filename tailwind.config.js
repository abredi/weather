module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html'],
  theme: {
    extend: {
      inset: {
        10: '10%',
        5: '5%',
      },
      minWidth: {
        10: '2.5rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
