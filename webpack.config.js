/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * NativeScript Yoonit Components
 * NativeScript VueJS Atomic Design System framework
 *
 * Luigui Delyer @ 2021
 */

// https://docs.nativescript.org/webpack
const { resolve } = require('path')

module.exports = config => {
  config.module
    .rule('pug')
    .test(/\.pug$/)
    .use('pug-plain-loader')
    .loader('pug-plain-loader')
    .end()

  config.module
    .rule('scss')
    .test(/\.(sass|scss)$/)
    .use('sass-loader')
    .options({
      sassOptions: {
        indentedSyntax: true
      }
    })

  config.module
    .rule('css')
    .use('vue-css-loader')
    .after('css2json-loader')
    .loader('vue-loader/lib/loaders/stylePostLoader.js')

  config.module
    .rule('scss')
    .use('vue-css-loader')
    .after('css2json-loader')
    .loader('vue-loader/lib/loaders/stylePostLoader.js')
}
