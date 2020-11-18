/* eslint-disable */
/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.nuxtjs.org/options
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const colors = require('./client/constants/config/tailwindcss/colors.js')
const fonts = require('./client/constants/config/tailwindcss/fonts.js')
const srcDir = './client'
module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  important: true,
  theme: {
    extend: {
      colors: colors,
      fontFamily: fonts,
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      srcDir + '/components/**/*.vue',
      srcDir + '/layouts/**/*.vue',
      srcDir + '/pages/**/*.vue',
      srcDir + '/plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
