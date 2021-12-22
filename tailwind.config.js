const colors = require('./src/components/quarks/Tokens/Colors')
const spacingNumbersByScale = require('./src/components/quarks/Tokens/SpacingNumberByScale')
const spacingBreakpointsByScale = require('./src/components/quarks/Tokens/SpacingBreakpointsByScale')
const spacingPercentage = require('./src/components/quarks/Tokens/SpacingPercentage')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = {
  prefix: 'yoo-',
  purge: [
    './**/**/*.{css,scss,sass,vue,pug,ts}'
  ],
  important: false,
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors,
    fontFamily: {
      'awesome-brands': ['Font Awesome 5 Brands', 'fa-brands-400'],
      'awesome-solid': ['Font Awesome 5 Free', 'fa-solid-900'],
      'awesome-regular': ['Font Awesome 5 Free', 'fa-regular-400'],
      'mont-regular': ['Montserrat', 'Montserrat-Regular'],
      'mont-medium': ['Montserrat', 'Montserrat-medium'],
      'mont-semibold': ['Montserrat', 'Montserrat-SemiBold'],
      'mont-bold': ['Montserrat', 'Montserrat-Bold']
    },
    spacing: {
      ...spacingNumbersByScale(4),
      ...spacingPercentage
    },
    minHeight: {
      ...spacingNumbersByScale(4),
      ...spacingPercentage
    },
    height: {
      ...spacingNumbersByScale(4),
      ...spacingPercentage
    },
    maxHeight: {
      ...spacingNumbersByScale(4),
      ...spacingPercentage
    },
    minWidth: {
      ...spacingNumbersByScale(4),
      ...spacingPercentage
    },
    width: {
      ...spacingNumbersByScale(4),
      ...spacingPercentage
    },
    maxWidth: {
      ...spacingNumbersByScale(4),
      ...spacingPercentage
    },
    borderRadius: {
      ...spacingPercentage
    },
    fontSize: {
      ...spacingBreakpointsByScale(1, 4)
    },
    borderWidth: {
      ...spacingNumbersByScale(1)
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'))
      delete colors['default']

      const colorMap = Object.keys(colors)
        .map(color => ({
          [`.${e(`border-t-${color}`)}`]: { 'border-top-color': colors[color] },
          [`.${e(`border-r-${color}`)}`]: { 'border-right-color': colors[color] },
          [`.${e(`border-b-${color}`)}`]: { 'border-bottom-color': colors[color] },
          [`.${e(`border-l-${color}`)}`]: { 'border-left-color': colors[color] }
        }))

      console.log(colorMap)

      addUtilities(colorMap, variants('borderColor'))
    }
  ]
}
