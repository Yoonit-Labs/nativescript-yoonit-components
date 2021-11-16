const colors = require('./src/components/quarks/Tokens/Colors')
const spacingNumbersByScale = require('./src/components/quarks/Tokens/SpacingNumberByScale')
const spacingBreakpointsByScale = require('./src/components/quarks/Tokens/SpacingBreakpointsByScale')
const spacingPercentage = require('./src/components/quarks/Tokens/SpacingPercentage')

module.exports = {
  prefix: 'yoo-',
  purge: {
    enabled: false
  },
  important: true,
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors,
    fontFamily: {
      'mont-regular': ['Montserrat', 'Montserrat-Regular'],
      'mont-medium': ['Montserrat', 'Montserrat-medium'],
      'mont-semibold': ['Montserrat', 'Montserrat-SemiBold'],
      'mont-bold': ['Montserrat', 'Montserrat-Bold']
    },
    spacing: {
      ...spacingNumbersByScale(4),
      ...spacingPercentage
    },
    height: {
      ...spacingNumbersByScale(4),
      ...spacingPercentage
    },
    width: {
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
  plugins: []
}
