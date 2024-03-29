module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        'bb-purple': '#a855f7',
        'bb-env': '#F1F5F9',
        'bb-border': '#E4E4E7',
        'bb-gray-700': '#37415',
        'bb-gray-600': '#4B5563',
        'bb-red': '#F56565',
        'bb-green': '#31C48D',
        'bb-yellow': '#F6B100',
        "nitro-gray-800": "#1F2937",
      },
    },
    boxShadow: {
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
    },
    minHeight: {
      'screen': '90vh',
    },
  },
  variants: {},
  plugins: [],
}
